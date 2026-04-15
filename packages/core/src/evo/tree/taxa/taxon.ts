import { MaybeType } from "../../../utils";
import { maybeGetNameFromIndex, maybeGetTaxonByName } from "./helper-functions";

/**
 * A interface for taxon.
 * There should only be one taxon per individual sampled.
 * The taxon is meant to be synonymous with the individual and may be shared across multiple trees.
 */
export interface Taxon {
  name: string;
  number: number;
  annotations: { [annotation: string]: string | string[] | number | number[] };
}

/**
 * An internal helper function for constructing a new taxon.
 * @param name - taxon name
 * @param number - taxon number
 * @returns
 */
function newTaxon(name: string, number: number): Taxon {
  return {
    name,
    number,
    annotations: {},
  };
}

/**
 * An interface for a taxon set - a group of taxa in a tree.
 */
export interface TaxonSetInterface {
  /**
   * Add a taxon the the set
   * @param name - Add a new taxon with this name
   */
  addTaxon(name: string): TaxonSetInterface;
  /**
   * Get a taxon by it's number
   * @param id -taxon number
   */
  getTaxon(id: number): Taxon | undefined; // remove this undefined?
  /**
   * Get a taxon object by it's name.
   * @param name -the taxon name
   */
  getTaxonByName(name: string): Taxon;
  /**
   * Return the number of taxa in the set.
   */
  getTaxonCount(): number;
  /**
   * Lock the taxa set. No taxa can be added or removed at this point. The population is fixed.
   */
  lockTaxa(): TaxonSetInterface;
}

/**
 * The interface for a taxon set internal data structure.
 */
export interface TaxonSetData {
  allNames: string[];
  byName: { [taxon: string]: Taxon };
  finalized: boolean;
}

/**
 * A concrete implementation of the taxonset interface
 */
export class TaxonSet implements TaxonSetInterface {
  _data: TaxonSetData;
  constructor(taxonSetData?: TaxonSetData) {
    this._data = taxonSetData
      ? taxonSetData
      : {
          allNames: [],
          byName: {},
          finalized: false,
        };
  }
  lockTaxa(): TaxonSetInterface {
    if (!this._data.finalized) {
      this._data.finalized = true;
    }
    return this;
  }
  addTaxon(taxonOrName: string | Taxon): this {
    if (this._data.finalized) {
      throw new Error("Cannot add taxon to finalized set");
    }
    let taxon: Taxon;
    if (typeof taxonOrName === "string") {
      const name = taxonOrName;

      if (Object.prototype.hasOwnProperty.call(this._data.byName, name)) {
        throw new Error(
          `taxon ${name} already exists in the set. Names must be unique`,
        );
      }

      taxon = newTaxon(name, this._data.allNames.length);
    } else {
      taxon = taxonOrName;
      if (Object.prototype.hasOwnProperty.call(this._data.byName, taxon.name)) {
        throw new Error(
          `taxon ${taxon.name} already exists in the set. Names must be unique`,
        );
      }
      if (
        this._data.allNames[taxon.number] &&
        this._data.allNames[taxon.number] !== taxon.name
      ) {
        throw new Error(
          `taxon number ${taxon.number} already exists in the set with name ${this._data.allNames[taxon.number]}. Taxon numbers must be unique`,
        );
      }
    }
    this._data.allNames[taxon.number] = taxon.name;
    this._data.byName[taxon.name] = taxon;
    return this;
  }

  getTaxon(id: number): Taxon {
    const taxon = maybeGetTaxonByName(
      this._data,
      maybeGetNameFromIndex(this._data, id),
    );
    switch (taxon.type) {
      case MaybeType.Some:
        return taxon.value;
      case MaybeType.Nothing:
        throw new Error(`Taxon by name ${id} not found`); // won't get here I dont' think
    }
  }
  getTaxonByName(name: string): Taxon {
    const taxon = maybeGetTaxonByName(this._data, name);
    switch (taxon.type) {
      case MaybeType.Some:
        return taxon.value;
      case MaybeType.Nothing:
        throw new Error(`Taxon by name ${name} not found`);
    }
  }
  hasTaxon(id: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._data.byName, id);
  }

  getTaxonCount(): number {
    return this._data.allNames.length;
  }
  get isFinalized() {
    return this._data.finalized;
  }
}
