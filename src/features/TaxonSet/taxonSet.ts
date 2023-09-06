
export class TaxonSet{
    _taxa: Taxon[];
    _taxonMap: Map<string, Taxon>;

    constructor(taxa: Taxon[]=[]){
        this._taxa = taxa;
        this._taxonMap = new Map();
        for(const taxon of taxa){
            this._taxonMap.set(taxon.id, taxon);
        }
    }

    addTaxon(taxon: Taxon){
        this._taxa.push(taxon);
        this._taxonMap.set(taxon.id, taxon);
    }
    getTaxon(id: string): Taxon{
        return this._taxonMap.get(id)!;
    }
    has(taxon: string): boolean
    has(taxon: Taxon): boolean
    has(taxon: string|Taxon): boolean{
        if(taxon instanceof Taxon){
        if(this._taxonMap.has(taxon.id)){
            return this._taxonMap.get(taxon.id) ===taxon;
        }else{
            return false;
        }
        
    }else{
        return this._taxonMap.has(taxon);
    }
}

    
}
//Taxon
// A taxon is a leaf node in a tree. It has an id and a name. The Id may be the same as the name or it may be a number and match the mapping set in a nexus file.
export class Taxon{
    _id:string;

    constructor(id:string,){
        this._id = id;
    }
    get id(){
        return this._id;
    }

}