
export interface NodeRef{
    number:number
}
export enum AnnotationType {
    DISCRETE = "DISCRETE",
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    CONTINUOUS = "CONTINUOUS",
    RANGE = "RANGE",
    SET= "SET",
    PROBABILITIES = "PROBABILITIES",
    MARKOV_JUMP = "MARKOV_JUMP",

}

export interface Annotation {
    id: string;
    type: AnnotationType;
    domain: [number, number] | string[] | number[] | [boolean, boolean] | undefined;
}

// For small standalone apps we want a OO model with a figure subscribing to the tree
// for observable we want a functional, immutable approach. 
// Does the functional immutable approach pretend to be a class


export interface newickParsingOptions  {
     labelName?: string,  parseAnnotations?: boolean , tipNameMap?: Map<string, string>
}
export interface Tree  {
    
    getRoot():NodeRef|undefined
    getNodeCount():number
    getInternalNodeCount():number
    getExternalNodeCount():number
    getNode(i: number): NodeRef 
    getInternalNodes():NodeRef[]
    getExternalNodes():NodeRef[]

    getNodeTaxon(node:NodeRef):string
    hasNodeHeights():boolean
    hasBranchLength(node:NodeRef):number


    isExternal(node:NodeRef):boolean
    isRoot(node:NodeRef):boolean

    getChildCount(node:NodeRef):number
    getChild(node:NodeRef,i:number):NodeRef

    getNodeByName(name: string): NodeRef|undefined
    getNodeByLabel(label: string): NodeRef|undefined
    getLevel(node:NodeRef):number;
   
    // getNode(id: string): NodeRef 
    getDivergence(node: NodeRef): number |undefined
    getNodeHeight(node:NodeRef):number |undefined
    getBranchLength(node: NodeRef): number |undefined
    
    getParent(node: NodeRef): NodeRef | undefined
    getChildren(node: NodeRef): NodeRef[] 

    getAnnotation(node: NodeRef, name: string): any | null 
    getLabel(node: NodeRef): string | undefined 

    getAnnotationType(name: string): string |undefined

    addNode(n?:number): Tree
    removeChild(parent:NodeRef,child:NodeRef):void
    getNextSibling(node:NodeRef):NodeRef|undefined

    setHeight(node:NodeRef,height:number):void
    setDivergence(node:NodeRef,divergence:number):void
    setBranchLength(node:NodeRef,length:number):void
    setName(node:NodeRef,name:string):void
    setLabel(node:NodeRef,label:string):void
    annotateNode(node:NodeRef,annotation:{name:string,value:any,type:AnnotationType}):void

    addChild(parent: NodeRef, child: NodeRef): void
    setRoot(node: NodeRef): void
    toNewick(node?:NodeRef,options?:{includeAnnotations:boolean}): string;
    orderNodesByDensity(increasing:boolean):void
    sortChildren(node:NodeRef,compare:(a:NodeRef,b:NodeRef)=>number):void
    isRoot(node:NodeRef):boolean;
    getMRCA(nodes:NodeRef[]):NodeRef;
    rotate(node:NodeRef,recursive:boolean):void;
    reroot(node:NodeRef,proportion:number):void;
    //TODO decide if we want to keep integers different from continuous
    getAnnotationDomain(name:string):[number,number]|[boolean,boolean]|string[]|number[]|undefined;
    isExternal(node:NodeRef):boolean
    isInternal(node:NodeRef):boolean

}


//TODO abstact Tree with parsing implementations