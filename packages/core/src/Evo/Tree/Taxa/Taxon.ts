import { immerable, produce } from "immer"
import { AnnotationType } from "../Tree.types"

interface TaxonInterface {
    name:string,
    number:number,
    annotations: { [annotation: string]: string | string[] | number | number[] }
}

export class Taxon implements TaxonInterface{
    name: string
    number: number
    annotations: { [annotation: string]: string | number | string[] | number[] }

    constructor(name:string,number:number){
        this.name=name;
        this.number = number;
        this.annotations = {}
    }
}

export class TaxonSet{
    allNames:string[]; 
    byName:{[taxon:string]:Taxon};
    
    constructor(taxonSet?:TaxonSet){
      if(taxonSet===undefined){
        this.allNames=[];
        this.byName={};
      }
      else{
        this.allNames = taxonSet.allNames;
        this.byName = taxonSet.byName;
      }
    }
    addTaxon(name:string):TaxonSet{
        if(this.byName[name]){
            throw new Error(`taxon ${name} already exists in the set. Names must be unique`)
        }
        return produce(this, (draft) => {
            const taxon = new Taxon(name,draft.allNames.length)
            draft.allNames.push(name);
            draft.byName[name] = taxon;
          })
    }

    getTaxon(id:number):Taxon|undefined{
        return this.byName[this.allNames[id]]
    }
    getTaxonByName(name:string):Taxon{
        return this.byName[name]
    }
    getTaxonCount():number{
        return this.allNames.length
    }
  }