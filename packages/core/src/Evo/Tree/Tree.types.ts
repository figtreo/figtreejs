

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
    
    getRoot():NodeRef
    isRooted():boolean
    getNodeCount():number
    getInternalNodeCount():number
    getExternalNodeCount():number
    getNode(i: number|string): NodeRef 
    getInternalNodes():NodeRef[]
    getExternalNodes():NodeRef[]

    getTaxon(node:NodeRef):string

    isExternal(node:NodeRef):boolean
    isInternal(node:NodeRef):boolean
    isRoot(node:NodeRef):boolean

    getChildCount(node:NodeRef):number
    getChild(node:NodeRef,i:number):NodeRef

    getNodeByTaxon(name: string): NodeRef|undefined
    getNodeByLabel(label: string): NodeRef|undefined
    getLevel(node:NodeRef):number;
   
    getDivergence(node: NodeRef): number |undefined
    getHeight(node:NodeRef):number |undefined
    getLength(node: NodeRef): number |undefined
    
    getParent(node: NodeRef): NodeRef | undefined
    getChildren(node: NodeRef): NodeRef[] 

    getAnnotation(node: NodeRef, name: string): any | null 
    getLabel(node: NodeRef): string | undefined 
    getAnnotationKeys(): string[]
    getAnnotationType(name: string): string |undefined

    addNodes(n?:number): NodeRef[] 
    deleteNode(n:NodeRef):Tree
    removeChild(parent:NodeRef,child:NodeRef):Tree
    deleteClade(n:NodeRef):Tree
    getNextSibling(node:NodeRef):NodeRef|undefined
    getRightSibling(node:NodeRef):NodeRef|undefined
    getLeftSibling(node:NodeRef):NodeRef|undefined
    setHeight(node:NodeRef,height:number):Tree
    setDivergence(node:NodeRef,divergence:number):Tree
    setLength(node:NodeRef,length:number):Tree
    setTaxon(node:NodeRef,name:string):Tree
    setLabel(node:NodeRef,label:string):Tree
    annotateNode(node:NodeRef,annotation:{name:string,value:any,type:AnnotationType}):Tree

    addChild(parent: NodeRef, child: NodeRef): Tree
    root(node: NodeRef,portion:number): Tree
    unroot(node:NodeRef):Tree
    toNewick(node?:NodeRef,options?:{includeAnnotations:boolean}): string;
    orderNodesByDensity(down:boolean):Tree
    sortChildren(node:NodeRef,compare:(a:NodeRef,b:NodeRef)=>number):Tree
    isRoot(node:NodeRef):boolean;
    getMRCA(node1:NodeRef,node2:NodeRef):NodeRef;
    rotate(node:NodeRef,recursive:boolean):Tree;
    reroot(node:NodeRef,proportion:number):Tree;
    //TODO decide if we want to keep integers different from continuous
    getAnnotationDomain(name:string):[number,number]|[boolean,boolean]|string[]|number[]|undefined;


}
export type TreeListener = (tree:Tree,node:NodeRef)=> void;

//TODO abstact Tree with parsing implementations