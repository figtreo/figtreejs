export interface Node {
    id:string,
    name:string|null,
    label:string|null,
    children:string[],
    parent:string|null,
    length:number|null, 
    height:number|null,
    divergence:number|null,//derive height and divergence from this for now
}

export interface NormalizedTreeData {
nodes:{
    byId:{
        [id:string]:Node
    },
    byName:{
        [name:string]:string
    },
    byLabel:{
        [label:string]:string
    }
    allIds:string[]
    },
rootNode:string|null,
annotations:{
    [nodeId:string]:{
        [annotation:string]:string|string[]|number|number[]
    }
},
annotationTypes:{
    [annotation:string]:string
}
}