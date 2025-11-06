import type { Taxon, TaxonSet } from "./Taxa/Taxon";


export interface NodeRef{
    number:number
}
export enum BaseAnnotationType {
    DISCRETE = "DISCRETE",// string  could also be stringy numbers
    BOOLEAN = "BOOLEAN", // true false
    NUMERICAL = "NUMERICAL", // float
    
    NUMERICAL_SET = "NUMERICAL_SET", // number[]
    DISCRETE_SET= "DISCRETE_SET", // string[] 
  
    MARKOV_JUMPS = "MARKOV_JUMPS", // {from: to: time:}
    DENSITIES = "DENSITIES" // Record<string, number>
}
export type MarkovJumpValue = { from: string; to: string; time?: number };

export type ValueOf<T extends BaseAnnotationType> =
  T extends BaseAnnotationType.DISCRETE      ? string :
  T extends BaseAnnotationType.BOOLEAN       ? boolean :
  T extends BaseAnnotationType.NUMERICAL       ? number :
  T extends BaseAnnotationType.NUMERICAL_SET       ? number[] :
  T extends BaseAnnotationType.DISCRETE_SET       ? string[] :
  T extends BaseAnnotationType.MARKOV_JUMPS   ? MarkovJumpValue[] :
  T extends BaseAnnotationType.DENSITIES ? Record<string, number> :
  never;

  export type RawValueOf<T extends BaseAnnotationType> =
  T extends BaseAnnotationType.DISCRETE      ? string :
  T extends BaseAnnotationType.BOOLEAN       ? boolean :
  T extends BaseAnnotationType.NUMERICAL       ? number :
  T extends BaseAnnotationType.NUMERICAL_SET       ? number[] :
  T extends BaseAnnotationType.DISCRETE_SET       ? string[] :
  T extends BaseAnnotationType.MARKOV_JUMPS   ? [number,string,string][] |[string,string,string][] :
  T extends BaseAnnotationType.DENSITIES ? Record<string, number> :
  never;

export type DomainOf<T extends BaseAnnotationType> =
  T extends BaseAnnotationType.DISCRETE      ? string[] :
  T extends BaseAnnotationType.BOOLEAN       ? [boolean, boolean] :
  T extends BaseAnnotationType.NUMERICAL       ? [number,number] :
  T extends BaseAnnotationType.NUMERICAL_SET    ? [number, number] :
  T extends BaseAnnotationType.DISCRETE_SET           ? string[] | number[] :
  T extends BaseAnnotationType.MARKOV_JUMPS   ? string[] : // just locations
  T extends BaseAnnotationType.DENSITIES   ? string[] : // just states
  never;



/** A single, generic annotation, discriminated by `type`. */
export type AbstractAnnotation<T extends BaseAnnotationType> = {
  id: string;
  type: T;
  value: ValueOf<T>; 
};


export type Annotation = { [K in BaseAnnotationType]: AbstractAnnotation<K> }[BaseAnnotationType];


export interface AbstractAnnotationSummary<T extends BaseAnnotationType> {
    id: string;
    type: T;
    domain: DomainOf<T>;
}

export type AnnotationDomain = { [K in BaseAnnotationType]: DomainOf<K> }[BaseAnnotationType];
export type AnnotationValue = { [K in BaseAnnotationType]: ValueOf<K> }[BaseAnnotationType];
export type AnnotationSummary = { [K in BaseAnnotationType]: AbstractAnnotationSummary<K> }[BaseAnnotationType];
export type RawAnnotationValue ={ [K in BaseAnnotationType]: RawValueOf<K> }[BaseAnnotationType];





export interface newickParsingOptions  {
    dateFormat?: string,
    datePrefix?: string,
     labelName?: string,  parseAnnotations?: boolean , tipNameMap?: Map<string, string>,
     taxonSet?: TaxonSet
}
export interface Tree  {
    
    getRoot():NodeRef
    isRooted():boolean
    getNodeCount():number
    getInternalNodeCount():number
    getExternalNodeCount():number
    getNode(i:string):NodeRef|undefined;
    getNode(taxon:Taxon):NodeRef|undefined;
    getNode(node:number):NodeRef|undefined;
    getInternalNodes():NodeRef[]
    getExternalNodes():NodeRef[]
    getNodes():NodeRef[]
    getTaxon(id:number|NodeRef):Taxon|undefined

    isExternal(node:NodeRef):boolean
    isInternal(node:NodeRef):boolean
    isRoot(node:NodeRef):boolean

    getChildCount(node:NodeRef):number
    getChild(node:NodeRef,i:number):NodeRef

    getNodeByTaxon(taxon: Taxon): NodeRef|undefined
    getNodeByLabel(label: string): NodeRef|undefined
    getLevel(node:NodeRef):number;
   
    getDivergence(node: NodeRef): number |undefined
    getHeight(node:NodeRef):number |undefined
    getLength(node: NodeRef): number |undefined
    
    getParent(node: NodeRef): NodeRef | undefined
    getChildren(node: NodeRef): NodeRef[] 

    getAnnotation(node: NodeRef, name: string): Annotation
    getAnnotationValue<T extends BaseAnnotationType>(node:NodeRef, name:string,type:T):ValueOf<T>
    // annotateNode<T extends BaseAnnotationType>(node:NodeRef,annotation:{name:string,value:RawValueOf<T>}):Tree
    annotateNode(node: NodeRef, name: string, value: RawAnnotationValue): Tree
    annotateNode(node: NodeRef, annotation: Record<string, RawAnnotationValue>): Tree
    getLabel(node: NodeRef): string | undefined 
    getAnnotationKeys(): string[]
    getAnnotationType(name: string): BaseAnnotationType

    getAnnotations():AnnotationSummary[]
    getAnnotationSummary(name:string):AnnotationSummary;
   
    addNodes(n?:number):  {tree:Tree,nodes:NodeRef[]}
    deleteNode(n:NodeRef):Tree
    removeChild(parent:NodeRef,child:NodeRef):Tree
    deleteClade(n:NodeRef):Tree
    getNextSibling(node:NodeRef):NodeRef|undefined
    getRightSibling(node:NodeRef):NodeRef|undefined
    getLeftSibling(node:NodeRef):NodeRef|undefined
    setHeight(node:NodeRef,height:number):Tree
    setDivergence(node:NodeRef,divergence:number):Tree
    setLength(node:NodeRef,length:number):Tree
    setTaxon(node:NodeRef,taxon:Taxon):Tree
    setLabel(node:NodeRef,label:string):Tree

    addChild(parent: NodeRef, child: NodeRef): Tree
    root(node: NodeRef,portion:number): Tree
    unroot(node:NodeRef):Tree
    toNewick(node?:NodeRef,options?:{includeAnnotations:boolean}): string;
    orderNodesByDensity(down:boolean):Tree
    sortChildren(node:NodeRef,compare:(a:NodeRef,b:NodeRef)=>number):Tree
    isRoot(node:NodeRef):boolean;
    getMRCA(node1:NodeRef,node2:NodeRef):NodeRef;
    getMRCA(nodes:NodeRef[]):NodeRef;
    rotate(node:NodeRef,recursive:boolean):Tree;
    reroot(node:NodeRef,proportion:number):Tree;



}
export type TreeListener = (tree:Tree,node:NodeRef)=> void;

//TODO abstact Tree with parsing implementations