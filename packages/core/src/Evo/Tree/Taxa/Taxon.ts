import { immerable, produce } from "immer"
import { AnnotationType } from "../Tree.types"

export interface Taxon {
    name:string,
    number:number,
    annotations: { [annotation: string]: string | string[] | number | number[] }
}

function newTaxon(name:string,number:number):Taxon{
    return {
        name,
        number,
        annotations:{}
    }
}

export interface TaxonSetInterface{
    addTaxon(name:string):TaxonSetInterface;
    getTaxon(id:number):Taxon|undefined;
    getTaxonByName(name:string):Taxon;
    getTaxonCount():number;
    lockTaxa():TaxonSetInterface;
}

export interface TaxonSetData{
    allNames:string[],
    byName:{[taxon:string]:Taxon},
    finalized:boolean
}
export class TaxonSet implements TaxonSetInterface{
    _data:TaxonSetData;
    constructor(taxonSetData?:TaxonSetData){
        this._data = taxonSetData?taxonSetData:{
            allNames:[],
            byName:{},
            finalized:false
        }
    }
    lockTaxa(): TaxonSetInterface {
        if(!this._data.finalized){
            this._data.finalized = true;
        }
        return this;
    }
    addTaxon(name:string):TaxonSet{
        if(this._data.finalized){
            throw new Error('Cannot add taxon to finalized set')
        }
        if(this._data.byName[name]){
            throw new Error(`taxon ${name} already exists in the set. Names must be unique`)
        }
        const taxon = newTaxon(name,this._data.allNames.length)
        this._data.allNames.push(name);
        this._data.byName[name] = taxon;
        return this;
    }

    getTaxon(id:number):Taxon|undefined{
        return this._data.byName[this._data.allNames[id]]
    }
    getTaxonByName(name:string):Taxon{
        return this._data.byName[name]
    }
    getTaxonCount():number{
        return this._data.allNames.length
    }
    get isFinalized(){
        return this._data.finalized
    }
  }