import type { Maybe, Undefinable } from "@figtreejs/maybe/maybe";
import { Nothing, Some, MaybeType } from "@figtreejs/maybe/maybe";
import type { Taxon, TaxonSetData } from "./taxon";

export function maybeGetNameFromIndex(
  data: TaxonSetData,
  id: Maybe<number> | number,
): Maybe<string> {
  let n: number;
  if (id instanceof Object) {
    if (id.type === MaybeType.Nothing) {
      return id;
    } else {
      n = id.value;
    }
  } else {
    n = id;
  }
  const name = data.allNames[n] as Undefinable<string>;
  if (name === undefined) {
    return Nothing();
  }
  return Some(name);
}

export function maybeGetTaxonByName(
  data: TaxonSetData,
  id: Maybe<string> | string,
): Maybe<Taxon> {
  let n: string;
  if (id instanceof Object) {
    if (id.type === MaybeType.Nothing) {
      return id;
    } else {
      n = id.value;
    }
  } else {
    n = id;
  }
  const taxon = data.byName[n] as Undefinable<Taxon>;
  if (taxon === undefined) {
    return Nothing();
  } else {
    return Some(taxon);
  }
}
