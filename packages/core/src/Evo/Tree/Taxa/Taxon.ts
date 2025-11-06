

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
    addTaxon(taxonOrName:string | Taxon):this{
        if(this._data.finalized){
            throw new Error('Cannot add taxon to finalized set')
        }
        let taxon: Taxon;
        if(typeof taxonOrName === "string"){
          const name = taxonOrName;
          if(this._data.byName[name]){
              throw new Error(`taxon ${name} already exists in the set. Names must be unique`)
          }
        taxon = newTaxon(name,this._data.allNames.length)
        }else{
          taxon = taxonOrName;
          if(this._data.byName[taxon.name]){
              throw new Error(`taxon ${taxon.name} already exists in the set. Names must be unique`)
          }
          if(this._data.allNames[taxon.number] && this._data.allNames[taxon.number] !== taxon.name){
            throw new Error(`taxon number ${taxon.number} already exists in the set with name ${this._data.allNames[taxon.number]}. Taxon numbers must be unique`)
          }
          console.log("Adding existing taxon:", taxon.name);
        }
        this._data.allNames[taxon.number] = taxon.name;
        this._data.byName[taxon.name] = taxon;
        return this;
    }

    getTaxon(id:number):Taxon{
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