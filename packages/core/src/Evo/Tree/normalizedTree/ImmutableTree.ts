
import { extent } from "d3-array";
import { Annotation, AnnotationType, NodeRef, Tree, newickParsingOptions } from "../Tree.types"
import { parseNewick, parseNexus, processAnnotationValue } from "../Parsers";
import {createDraft, finishDraft, immerable, produce} from "immer"

interface Node extends NodeRef{
    number: number,
    name: string | undefined,
    label: string | undefined,
    children: number[],
    parent: number | undefined,
    length: number | undefined,
    height: number | undefined,
    divergence: number | undefined,//derive height and divergence from this for now
    level: number | undefined,
    annotations: {[annotation: string]: string | string[] | number | number[]},
    _id: symbol // an id so we can mark updates to root when toplogy changes
}

interface ImmutableTreeData {
    nodes: {
        allNodes:Node[],
        byName: {
            [name: string]: number
        },
        byLabel: {
            [label: string]: number
        },
    },
    rootNode: number,
    is_rooted:boolean

    annotations: {[annotation: string]: Annotation}
}


export class ImmutableTree implements Tree  {
    [immerable]=true;

    _data: ImmutableTreeData;
    _draft:any|undefined;
    _changeLog:number[] = [];
    constructor(data?: ImmutableTreeData) {
        if (data === undefined) {
            data = {
                nodes: {
                    allNodes:[{
                        number:0,
                        children: [],
                        parent: undefined,
                        label: '',
                        length: undefined,
                        divergence: undefined,
                        height: undefined,
                        name: undefined,
                        level: undefined,
                        annotations: {},
                        _id: Symbol()}],
                    byName: {},
                    byLabel: {},
                },
                rootNode: 0,
                is_rooted:true,
                annotations: { },
            }
        }
        this._data = data;
    }


    // Parsers and constructors

    static fromNewick(newick: string, options?: newickParsingOptions | undefined): ImmutableTree {
        const tree = new this();
        return parseNewick(tree, newick, options);

    }
    static fromNexus(nexus: string, options?: newickParsingOptions | undefined): ImmutableTree {
        const tree = new this();
        return parseNexus(tree, nexus, options);

    }
    static fromString(string: string, options?: newickParsingOptions | undefined): ImmutableTree {
        if (string.toLowerCase().includes("#nexus")) {
            return this.fromNexus(string, options)
        } else {
            return this.fromNewick(string, options)
        }
    }



    // ------------------ Getters ----------------------

    isRooted(): boolean {
        return this._data.is_rooted;
    }
    getAnnotationType(name: string): AnnotationType|undefined {
        if(this._draft){
            return this._draft.getAnnotationType(name);
        }
        if(this._data.annotations[name]===undefined){
            return undefined;
        }
        return this._data.annotations[name].type

    }

    getAnnotationKeys(): string[] {
        if(this._draft){
            return this._draft.getAnnotationKeys();
        }
        return Object.keys(this._data.annotations)
    }

    getAnnotationSummary(annotation:string):Annotation{
        if(this._draft){
            return this._draft.getAnnotationSummary(annotation);
        }
       return this._data.annotations[annotation] 
    }
    getRoot(): NodeRef {
        if(this._draft){
            return this._draft.getRoot();
        }
        return this._data.nodes.allNodes[this._data.rootNode];
    }
    getNodeCount(): number {
        if(this._draft){
            return this._draft.getNodeCount();
        }

        return this._data.nodes.allNodes.length
    }
    getInternalNodeCount(): number {
        if(this._draft){
           return this._draft.getInternalNodeCount();
        }
        return this._data.nodes.allNodes.filter(n=>n.children.length>0).length
    }
    getExternalNodeCount(): number {
        if(this._draft){
            return this._draft.getExternalNodeNodesCount();
        }
        return this._data.nodes.allNodes.filter(n=>n.children.length==0).length
    }
    getInternalNodes(): NodeRef[] {
        if(this._draft){
            this._draft.getInternalNodes();
        }
       return this._data.nodes.allNodes.filter(n=>n.children.length>0)
    }
    getExternalNodes(): NodeRef[] {
        if(this._draft){
            return this._draft.getExternalNodeNodes();
        }
        return this._data.nodes.allNodes.filter(n=>n.children.length==0)
    }
    getTaxon(node: NodeRef): string{
        if(this._draft){
            return this._draft.getNodeTaxon(node)
        }
        const n = this._data.nodes.allNodes[node.number] as Node;
        const name= n.name
        if(name ===undefined){
            throw new Error(`Node ${node} does not have a taxon`)
        }
        return name;
    }

    hasNodeHeights(): boolean {
        throw new Error("hasNodeHeights not implemented.");
    }
    getHeight(node: NodeRef): number {
        if(this._draft){
            return this._draft.getNodeHeight(node);
        }
        const n = this.getNode(node.number) as Node;
        const height= (n as Node).height

        return height!;
    }
    hasBranchLength(node: NodeRef): number {
        throw new Error("hasBranchLength not implemented.");
    }
    getLength(node: NodeRef): number|undefined {
        if(this._draft){
            return this._draft.getLength(node);
        }
        const n = this.getNode(node.number) as Node;
        const length= (node as Node).length

        return length; 
   }

   _toString(node: NodeRef): string {
    return (this.getChildCount(node) > 0 ? `(${this.getChildren(node).map(child => this._toString(child)).join(",")})${this.getLabel(node) ? "#" + this.getLabel(node) : ""}` : `${this.getTaxon(node) ? this.getTaxon(node) : ""}`) + (this.getLength(node) ? `:${this.getLength(node)}` : "");
}

    toNewick(node?: NodeRef, options?: { includeAnnotations: boolean; }): string {
    if (options === undefined) {
        options = { includeAnnotations: false }
    }
    if (node === undefined) {
        if (this.getRoot() === undefined) {
            throw new Error("No root node and no node provided to newick generator")
        }
        node = this.getRoot();
    }

    return this._toString(node!) + ";";
}

    getMRCA(nodes: NodeRef[]): NodeRef {
        throw new Error("getMRCA not implemented.");
    }


    getNextSibling(node: NodeRef): NodeRef | undefined {
        if(this._draft){
            return this._draft.getNextSibling(node)
        }
        const parent = this._data.nodes.allNodes[this._data.nodes.allNodes[node.number].parent!]
        const index = parent.children.map(c=>c).indexOf(node.number);
        if (this.getChildCount(this.getParent(node)!) === 1) {
            console.warn(`Node ${node.number} has only no sibling`)
            return undefined
        } else if (index === this.getChildCount(this.getParent(node)!) - 1) {
            return this.getChild(this.getParent(node)!, 0)
        } else {
            return this.getChild(this.getParent(node)!, index + 1)
        }
    }


    getNode(number: number): NodeRef {
        if(this._draft){
            return this._draft.getNode(number);
        }
        return this._data.nodes.allNodes[number]
    }
    getDivergence(node: NodeRef): number {
        if(this._draft){
            return this._draft.getDivergence(node);
        }
        return this._data.nodes.allNodes[node.number].divergence!
    }

    getChildCount(node: NodeRef): number {
        if(this._draft){
            return this._draft.getChildCount(node);
        }
        return this._data.nodes.allNodes[node.number].children.length

    }
    getChild(node: NodeRef, index: number): NodeRef {
        if(this._draft){
            return this._draft.getChild(node,index);
        }
        return this._data.nodes.allNodes[this._data.nodes.allNodes[node.number].children[index]];
    }
    getParent(node: NodeRef): NodeRef | undefined {
        if(this._draft){
            return this._draft.getParent(node);
        }   
        const parentId = this._data.nodes.allNodes[node.number].parent;
        if (parentId === undefined) {
            return undefined
        } else {
            return this._data.nodes.allNodes[parentId]
        }
    }
    getChildren(node: NodeRef): NodeRef[] {
        if(this._draft){
            return this._draft.getChildren(node);
        }
        return this._data.nodes.allNodes[node.number].children.map(n=>this.getNode(n))
    }

    getAnnotation(node: NodeRef, name: string): any | undefined {
        if(this._draft){
            return this._draft.getAnnotation(node,name);
        }
        return (this.getNode(node.number)as Node).annotations[name]
    }
    getLabel(node: NodeRef): string | undefined {
        if(this._draft){
            return this._draft.getLabel(node);
        }
        return this._data.nodes.allNodes[node.number].label
    }

    getLevel(node: NodeRef): number {
        if(this._draft){
            return this._draft.getLevel(node);
        }
        return this._data.nodes.allNodes[node.number].level!;
    }
    isExternal(node: NodeRef): boolean {
        if(this._draft){
            return this._draft.isExternal(node);
        }
        return (this.getNode(node.number) as Node).children.length === 0
    }
    isInternal(node: NodeRef): boolean {
        if(this._draft){
            return this._draft.isInternal(node);
        }
        return (this.getNode(node.number) as Node).children.length > 0
    }
    isRoot(node: NodeRef) {
        if(this._draft){
            return this._draft.isRoot(node);
        }
        return this._data.rootNode === node.number
    }
    getNodeByTaxon(name: string): NodeRef | undefined {
        if(this._draft){
            return this._draft.getNodeByName(name);
        }
        return this.getNode(this._data.nodes.byName[name])
    }

    getNodeByLabel(label: string): NodeRef | undefined {
        if(this._draft){
            return this._draft.getNodeByLabel(label);
        }
        return this.getNode(this._data.nodes.byLabel[label])
    }

    isInEdit(): boolean {
        return this._draft !== undefined
    }
    // ------------------ Setters ----------------------
    beginBatchedEdits():ImmutableTree{
        this._draft = createDraft(this);
        this._draft._draft=undefined;
    
        return this;
    }
    endBatchedEdits(){
        this._draft._draft=undefined;
        //update all other nodes 
        this._draft._changeLog.forEach((n:number)=>{
            const node = this._draft.getNode(n) as Node;
            this._draft._updateNodesToRoot(node)
        })
        this._draft._changeLog = [];
        return finishDraft(this._draft)
    }

    addNodes(n?:number): [Tree,NodeRef[]] {
        const newNodes:NodeRef[] =[]
        if(n===undefined){
            n=1;
        }
        if(!this._draft){

        const tree =  produce(this,draft=>{
            const number = draft._data.nodes.allNodes.length
            for (let i = 0; i < n!; i++) {
                const newNode = {
                    number:number+i,
                    children: [],
                    parent: undefined,
                    label: '',
                    length: undefined,
                    divergence: undefined,
                    height: undefined,
                    name: undefined,
                    level: undefined,
                    annotations: {},
                    _id: Symbol(),
                }
                newNodes.push(newNode);
                draft._data.nodes.allNodes.push(newNode)
            }
        })
        return [tree,newNodes];
    }else{
        const number = this._draft._data.nodes.allNodes.length
        for (let i = 0; i < n!; i++) {
            const newNode = {
                number:number+i,
                children: [],
                parent: undefined,
                label: '',
                length: undefined,
                divergence: undefined,
                height: undefined,
                name: undefined,
                level: undefined,
                annotations: {},
                _id: Symbol(),
            }
            newNodes.push(newNode);
        this._draft._data.nodes.allNodes.push(newNode)
    }
        return [this,newNodes];
    }
}


    setTaxon(node: NodeRef, name: string): ImmutableTree {
        if (this._data.nodes.byName[name] !== undefined) {
            throw new Error(`Duplicate node name ${name}`)
        }
        if(!this._draft){
        return(produce(this,draft=>{
            const n = draft.getNode(node.number) as Node;
            n.name = name;
            this._data.nodes.byName[name] = node.number
        }))
    }else{
        this._draft._data.nodes.allNodes[node.number].name = name;
        this._draft._data.nodes.byName[name] = node.number
        return this;
    }
    }


    getAnnotationDomain(name: string): [number, number]|[boolean,boolean] | string[] | number[] | undefined {
        if(this._draft){
            return this._draft.getAnnotationDomain(name);
        }
        if(this._data.annotations[name]===undefined){
            return undefined;
        }
        return this._data.annotations[name].domain
    }

    annotateNode(node: NodeRef, annotation: { name: string, value: any }): ImmutableTree
    annotateNode(node: NodeRef,annotation:{[name:string]:any}): ImmutableTree
    annotateNode(node: NodeRef,  annotation:{ name: string, value: any }[]): ImmutableTree

    annotateNode(node: NodeRef, annotation: { name: string, value: any }|  { name: string, value: any }[]|{[name:string]:any} ): ImmutableTree {
        if(Array.isArray(annotation)){
            return this._annotateNodeFromArrary(node,annotation)
        }else{
            if(annotation.name && annotation.value){
                return this._annotateNodeFromNameValue(node,annotation as {name:string,value:any})
            }else{
                return this._annotateNodeFromObject(node,annotation)
            }
        }
    }
   

    // ---------------- Setters ---------------------


    setHeight(node: NodeRef, height: number): ImmutableTree {
        if(!this._draft){
            return produce(this,draft=>{
                const n = draft.getNode(node.number) as Node;
                n.height = height;
                //update all nodes to root
                draft._updateNodesToRoot(node);
    
            })
            }else{
                const n = this._draft.getNode(node.number) as Node;
                n.height = height;
                this._draft._changeLog.push(n.number);
                return this;
            }
    }
        
    setDivergence(node: NodeRef, divergence: number): ImmutableTree {
        if(!this._draft){
            return produce(this,draft=>{
                const n = draft.getNode(node.number) as Node;
                n.divergence = divergence;
                //update all nodes to root
                draft._updateNodesToRoot(node);
    
            })
            }else{
                const n = this._draft.getNode(node.number) as Node;
                n.divergence = divergence;
                this._draft._changeLog.push(n.number);
                return this;
            }
        }   
     
    

    setLabel(node: NodeRef, label: string): ImmutableTree {
        if (this._data.nodes.byLabel[label] !== undefined) {
            throw new Error(`Duplicate node label ${label}`)
        }
        if(!this._draft){
        return(produce(this,draft=>{
            const n = draft.getNode(node.number) as Node;
            n.label = label;
            this._data.nodes.byLabel[label] = node.number
        }))
    }else{
        this._draft._data.nodes.allNodes[node.number].label = label;
        this._draft._data.nodes.byLabel[label] = node.number
        return this;
    }
    }

    
    setLength(node: NodeRef, length: number): ImmutableTree {
        if(!this._draft){
        return produce(this,draft=>{
            const n = draft.getNode(node.number) as Node;
            n.length = length;
            //update all nodes to root
            draft._updateNodesToRoot(n);

        })
        }else{
            const n = this._draft.getNode(node.number) as Node;
            n.length = length;
            this._draft._changeLog.push(n.number);
            return this;
        }
    }

    treeSubscribeCallback(callback: (tree?: Tree | undefined, TreeEdits?: [] | undefined) => any): Tree {
        throw new Error("Method not implemented.");
    }
    
    // getAnnotationType(name: string): AnnotationType|undefined {
    //     if(this._data.annotations.allNodes[name]){
    //         return this._data.annotations.allNodes[name].type
    //     }else{
    //         return undefined
    //     }
    // }


    // Topology changes 

    root(n:NodeRef):ImmutableTree{
        throw new Error("root not implemented in immutable tree");
    }
    unroot(n:NodeRef):ImmutableTree{
        throw new Error("unroot not implemented in immutable tree");
    }
    deleteNode(n:NodeRef):ImmutableTree{
        throw new Error("deleteNode not implemented in immutable tree");
    }

    deleteClade(n:NodeRef):ImmutableTree{
        throw new Error("deleteClade not implemented in immutable tree");
    }
    

    orderNodesByDensity(increasing: boolean, node?: NodeRef): ImmutableTree {
        if(!this._draft){
            return produce(this,draft=>{
                if (node === undefined) {
                    if (draft._data.rootNode === undefined) {
                        throw new Error("No root node and no node provided to density ordering")
                    }
                    node = draft._data.nodes.allNodes[draft._data.rootNode];
                }
                const factor = increasing ? 1 : -1;
                 orderNodes(draft._data, node, (nodeA, countA, nodeB, countB) => {
                    return (countA - countB) * factor;
                });
                
            })
        }else{
            if (node === undefined) {
                if (this._draft._data.rootNode === undefined) {
                    throw new Error("No root node and no node provided to density ordering")
                }
                node = this._draft._data.nodes.allNodes[this._draft._data.rootNode];
            }
            const factor = increasing ? 1 : -1;
            orderNodes(this._draft._data, node!, (nodeA, countA, nodeB, countB) => {
                return (countA - countB) * factor;
            });

            return this;
        }
    }

    rotate(node: NodeRef, recursive: boolean=false): ImmutableTree {
        if(this._draft){
            this._draft.rotate(node,recursive);
            return this;
        }else{
            return produce(this,draft=>{
                rotate(draft,node,recursive);
            })
        }
    }
    //TODO infinte loop
    reroot(node: NodeRef, proportion: number): ImmutableTree {
        if(!this._draft){
            return produce(this,draft=>{
                
                if (node.number === draft._data.rootNode) {
                    // the node is the root - nothing to do
                    return draft ;
                }
                if(draft._data.rootNode===undefined){
                    throw new Error("No root node in this tree to begin with")
                }
                const rootNode = draft.getRoot() as Node;
                if(rootNode.children.length!==2){
                    console.warn("Root node has more than two children and we are rerooting! There be dragons!")
                }
                const rootLength = rootNode.children.map(n=>draft.getNode(n)).map(n=>draft.getLength(n)).reduce((acc,l) => l! + acc!,0)!

                const treeNode = draft.getNode(node.number) as Node; 
                if (draft.getParent(node) !== rootNode) {
                    // the node is not a child of the existing root so the root is actually changing

                    let node0 = treeNode;
                    let parent = draft.getParent(treeNode)! as Node;

                    if(!parent){
                        throw new Error("no parent")
                    }

                    // was the node the first child in the parent's children?
                    const nodeAtTop = draft.getChild(parent, 0).number === node.number;

                    const rootChild1 = treeNode;
                    const rootChild2 = parent;

                    let oldLength = draft.getLength(parent)!;

                    while (draft.getParent(parent) !== undefined) {

                        // remove the node that will becoming the parent from the children 

                        parent.children = parent.children.filter(n=>n!==node0.number)

                        if (draft.getParent(parent)!.number === rootNode.number) {
                            const sibling = draft.getNextSibling(parent)! as Node;
                            
                            if(!sibling){
                                console.log(parent.number)
                                console.log(draft.getChildren(draft.getParent(parent)!).map(d=>d.number))
                                throw new Error("no sibling in rerooting")
                            }
                            parent.children.push(sibling.number);
                            sibling.parent = parent.number;
                            sibling.length=rootLength;

                        } else {
                            // swap the parent and parent's parent's length around
                            const nan = draft.getParent(parent)! as Node; // your mammy's mammy
                            if(!nan){
                            throw new Error("no nan!")
                            }
                            const nanLength = draft.getLength(nan)!;
                            nan.length = oldLength;
                            oldLength = nanLength;

                            //

                            // add the new child don't update the parent yet - need for loop.
                            // nan.parent = parent.number;
                            parent.children.push(nan.number);
                        }

                        node0=parent;
                        
                        parent = draft.getParent(parent)! as Node;
                    }

                    // Reuse the root node as root...

                    // Set the order of the children to be the same as for the original parent of the node.
                    // This makes for a more visually consistent rerooting graphically.
                    rootChild1.parent = rootNode.number;
                    rootChild2.parent = rootNode.number;
                    rootNode.children = [rootChild1.number, rootChild2.number]

                    if (!nodeAtTop) {
                        rootNode.children = rootNode.children.reverse();
                    }
                    // connect all the children to their parents which we put off above
                    this.getInternalNodes()
                        .forEach((node) => {
                            for (const child of draft.getChildren(node) as Node[]) {
                                child.parent  = node.number;
                            }
                        });

                    const l = draft.getLength(rootChild1)! * proportion;
                    rootChild2.length = l;
                    rootChild1.length! -= l;

                } else {
                    // the root is staying the same, just the position of the root changing
                    const l = draft.getLength(node)! * (1.0 - proportion);
                    treeNode.length = l;
                    const sibling = draft.getNextSibling(node)! as Node;
                    sibling.length = rootLength - l;
                    draft._updateNodesToRoot(node);
                }

        });
        }else{
            throw new Error("reroot not implemented in draft")
        }


    }
    removeChild(parent: NodeRef, child: NodeRef): ImmutableTree {
        if(!this._draft){
            return(produce(this,draft=>{
                draft._data.nodes.allNodes[parent.number].children = draft._data.nodes.allNodes[parent.number].children.filter(n => n !== child.number)
                draft._data.nodes.allNodes[child.number].parent=-1;
            }))
        }else{
            this._draft._data.nodes.allNodes[parent.number].children = this._draft._data.nodes.allNodes[parent.number].children.filter((n: number) => n !== child.number)
            this._draft._data.nodes.allNodes[child.number].parent=-1;
            return this;
        }
    }
    sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): ImmutableTree {
        if(!this._draft){
            return(produce(this,draft=>{
                draft._data.nodes.allNodes[node.number].children = this._data.nodes.allNodes[node.number].children.map(n=>draft.getNode(n)).sort(compare).map(n=>n.number);
                draft._updateNodesToRoot(node);
            }))
        }else{
            this._draft._data.nodes.allNodes[node.number].children = this._draft._data.nodes.allNodes[node.number].children.map((n:number)=>this._draft.getNode(n)).sort(compare).map((n:NodeRef)=>n.number);
            this._draft._data.nodes.allNodes[node.number].children.forEach((n:NodeRef)=>{this._draft._changeLog.push(n.number)})
            return this;
        }
    }

    
    addChild(parent: NodeRef, child: NodeRef): ImmutableTree {
        if(!this._draft){
            return(produce(this,draft=>{
                const c = draft.getNode(child.number) as Node;
                const p = draft.getNode(parent.number) as Node;
                p.children.push(c.number);
                c.parent=parent.number
                draft._updateNodesToRoot(child);
            }))
        }else{
            const c = this._draft.getNode(child.number) as Node;
            const p = this._draft.getNode(parent.number) as Node;
            p.children.push(c.number);
            c.parent=parent.number   
            this._draft._changeLog.push(c.number);
            return this;
        }
    }
    setRoot(node: NodeRef): ImmutableTree {
        if(!this._draft){
        return produce(this,draft=>{
                draft._data.rootNode = node.number;
            })
        }else{
            this._draft._data.rootNode = node.number;
            this._draft._changeLog.push(node.number);
            return this;
        }
    }

    // Helper functions

    _updateNodesToRoot( node: NodeRef): void {
        let n = node as Node;
        while( n.parent!==undefined){
            const p = this.getParent(n) as Node; // important to use 'this' since its is a proxy here
            p._id = Symbol()
            n=p;
        }
    }
    _checkAnnotation(input: { name: string, suggestedType: AnnotationType }): AnnotationType {
        let annotationType = this.getAnnotationType(input.name);
        let suggestedType = input.suggestedType
    
        if (!annotationType) {
            return suggestedType;
        } else if (annotationType === suggestedType) {
            return annotationType;
        }
        else if (annotationType !== suggestedType) {
            if ((suggestedType === AnnotationType.INTEGER && annotationType === AnnotationType.CONTINUOUS) ||
                (suggestedType === AnnotationType.CONTINUOUS && annotationType === AnnotationType.INTEGER)) {
                // upgrade to float
                return AnnotationType.CONTINUOUS;
            }
            if(suggestedType===AnnotationType.RANGE && annotationType===AnnotationType.SET){
                return AnnotationType.RANGE;
            }
            if(suggestedType===AnnotationType.SET && annotationType===AnnotationType.RANGE){
                return AnnotationType.RANGE;
            }
        }
        
        throw new Error(`Annotation ${input.name} has type ${suggestedType} but previously seen as ${annotationType}`)
    }


    _getUpdatedDomain( annotation: { id: string; value: any;type:AnnotationType }): [number, number] | string[] | number[]|[boolean,boolean]  {
        const domain = this.getAnnotationDomain(annotation.id);
        // const type = this.getAnnotationType(annotation.id);
        let newDomain = domain;
        switch (annotation.type) {
            case AnnotationType.CONTINUOUS: {
                if (domain === undefined) {
                    newDomain = [annotation.value, annotation.value]
                } else {
                    newDomain = extent([...domain, annotation.value]) as [number, number];
                }
                break;
            }
            case AnnotationType.INTEGER || AnnotationType.DISCRETE: {
                if (domain === undefined) {
                    newDomain = [annotation.value]
                } else {
                    newDomain = [...new Set([...domain, annotation.value])]
                    newDomain.sort()
                }
                break;
            }
            case AnnotationType.BOOLEAN: {
                newDomain = [true, false]
                break;
            }
            case AnnotationType.PROBABILITIES: {
                newDomain = [0, 1]
                break;
            }
            case AnnotationType.MARKOV_JUMP:{
                if (domain === undefined) {
                    newDomain = [annotation.value.to, annotation.value.from]
                } else {
                    newDomain = [...new Set([...domain, annotation.value.to, annotation.value.from])]
                    
                }
                newDomain.sort()
                break;
            }
            case AnnotationType.DISCRETE:{
                if (domain === undefined) {
                    newDomain = [annotation.value]
                } else {
                    newDomain = [...new Set([...domain, annotation.value])]
                    newDomain.sort()
                }
                break;
            }
            case AnnotationType.SET:{
                if (domain === undefined) {
                    newDomain = [annotation.value]
                } else {
                    newDomain = [...new Set([...domain, annotation.value])]
                    newDomain.sort()
                }
                break;
            }
            case AnnotationType.RANGE:{
                if (domain === undefined) {
                    newDomain = extent(annotation.value) as unknown as [number, number]
                } else {
                    newDomain = extent([...domain, ...annotation.value]) as unknown as [number, number]
                }
                break;
            }
            default: {
                throw new Error(`Unknown annotation type ${annotation.type}`)
            }
    
    
        }
        return newDomain!;
    
    }

    _annotateNodeFromNameValue(node: NodeRef, annotation: { name: string, value: any,type?:AnnotationType }): ImmutableTree {

        if(!this._draft){
            return produce(this,draft=>{
               annotateNodeHelper(draft,node,annotation);
        })  
      
        }else{
           annotateNodeHelper(this._draft,node,annotation);
            return this;
        }
    }
    _annotateNodeFromArrary(node: NodeRef, annotation: { name: string, value: any,type?:AnnotationType }[]): ImmutableTree {
            if(!this._draft){
                return produce(this,draft=>{
                    for(const a of annotation){
                        annotateNodeHelper(draft,node,a)
                    }
                })
            }else{
                for(const a of annotation){
                    annotateNodeHelper(this._draft,node,a)
                }
                return this;
            }
        }
    

    _annotateNodeFromObject(node: NodeRef, annotation: {[name:string]:any}): ImmutableTree {
        if(!this._draft){
            return produce(this,draft=>{
                for(const a in annotation){
                    if(annotation[a].type && annotation[a].value){
                        annotateNodeHelper(draft,node,{name:a,value:annotation[a].value,type:annotation[a].type})
                    }else{
                        annotateNodeHelper(draft,node,{name:a,value:annotation[a]})
                    }
                }
            })
        }else{
            for(const a in annotation){
                if(annotation[a].type && annotation[a].value){
                    annotateNodeHelper(this._draft,node,{name:a,value:annotation[a].value,type:annotation[a].type})
                }else{
                    annotateNodeHelper(this._draft,node,{name:a,value:annotation[a]})
                }            
            }
            return this;
        }
    }

    
}

function rotate(draft:ImmutableTree,n:NodeRef,recursive:boolean): void{
    
        const node = draft.getNode(n.number) as Node;
        node.children = node.children.reverse();
        if(recursive){
            for(const child of node.children.map(n=>draft.getNode(n))){
                rotate(draft,child,recursive)
            }
        }
}

/**
 * A private recursive function that rotates nodes to give an ordering provided
 * by a function.
 * @param node
 * @param ordering function that takes (a,number of tips form a, b, number of tips from b) and sorts a and be by the output.
 * @param callback an optional callback that is called each rotate
 * @returns {number}
 */
//I don't think this needs to update to the root because it is a preorder traversal or is it postorder anyway it's a traversal that probably works
function orderNodes(treeData: ImmutableTreeData, node: NodeRef, ordering: (a: NodeRef, numberOfATips: number, b: NodeRef, numberOfBTips: number) => number):number {
    let count = 0;
    if (treeData.nodes.allNodes[node.number].children.length > 0) {
        // count the number of descendents for each child
        const counts = new Map();
        for (const child of treeData.nodes.allNodes[node.number].children.map(n=>treeData.nodes.allNodes[n])) {
            const value = orderNodes(treeData, child, ordering);
            counts.set(child, value);
            count += value;
        }

        // sort the children using the provided function
        treeData.nodes.allNodes[node.number].children = treeData.nodes.allNodes[node.number].children.sort( (a, b) => {
            return ordering(treeData.nodes.allNodes[a], counts.get(a), treeData.nodes.allNodes[b], counts.get(b))
        });

    } else {
        count = 1
    }
    return count;
}

function annotateNodeHelper(tree:ImmutableTree,node:NodeRef,annotation:{name:string,value:any,type?:AnnotationType}):void{
    const suggestedType  = annotation.type? annotation: processAnnotationValue(annotation.value);
    let checkedType = tree._checkAnnotation({ name: annotation.name, suggestedType: suggestedType.type! })
    tree._data.nodes.allNodes[node.number].annotations[annotation.name] = suggestedType.value;
    const domain = tree._getUpdatedDomain( { id:annotation.name, value:annotation.value, type:checkedType })
    tree._data.annotations[annotation.name]={id:annotation.name,domain,type:checkedType}
}

export function* preOrderIterator(tree:Tree,node:NodeRef|undefined = undefined):Generator<NodeRef> {


    const traverse = function* (node: NodeRef): Generator<NodeRef> {
        yield node;
        const childCount = tree.getChildCount(node);
        if (childCount > 0) {
            for (let i = 0; i < childCount; i++) {
                const child = tree.getChild(node, i);
                yield* traverse(child);
            }
        }
    };
    if(node===undefined){
        node = tree.getRoot();
        if(node===undefined){
            throw new Error("Tree has no root node. Cannot traverse tree");
        }
    }


    yield* traverse(node!);



}

export function* postOrderIterator(tree:Tree,node:NodeRef|undefined = undefined):Generator<NodeRef> {


    const traverse = function* (node: NodeRef): Generator<NodeRef> {
        const childCount = tree.getChildCount(node);
        if (childCount > 0) {
            for (let i = 0; i < childCount; i++) {
                const child = tree.getChild(node, i);
                yield* traverse(child);
            }
        }
        yield node;

    };
    if(node===undefined){
        node = tree.getRoot();
        if(node===undefined){
            throw new Error("Tree has no root node. Cannot traverse tree");
        }
    }

    yield* traverse(node!);

}

export function* tipIterator(tree: Tree, node: NodeRef): Generator<NodeRef> {
    const traverse = function* (node: NodeRef): Generator<NodeRef> {
        const childCount = tree.getChildCount(node);;
        if (childCount > 0) {
            for (let i = 0; i < childCount; i++) {
                const child = tree.getChild(node, i);
                yield* traverse(child);
            }
        } else {
            yield node;
        }
    };
    yield* traverse(node);
}

// reroot(node: NodeRef, proportion: number): void {
//     if (node === this.root) {
//         // the node is the root - nothing to do
//         return;
//     }
//     if(!this.root){
//         throw new Error("No root node")
//     }

//     const rootLength = this.getLength(this.getChild(this.root!, 0)) + this.getLength(this.getChild(this.root!, 1))

//     if (this.getParent(node) !== this.root) {
//         // the node is not a child of the existing root so the root is actually changing

//         let node0 = node;
//         let parent = this.getParent(node)!;

//         if(!parent){
//             throw new Error("no parent")
//         }
//         let lineage: NodeRef[] = [];

//         // was the node the first child in the parent's children?
//         const nodeAtTop = this.getChild(parent, 0) === node;

//         const rootChild1 = node;
//         const rootChild2 = parent;

//         let oldLength = this.getLength(parent);

//         while (this.getParent(parent) !== null) {

//             // remove the node that will becoming the parent from the children
//             this.removeChild(parent, node0);

//             if (this.getParent(parent) === this.root) {
//                 const sibling = this.getSibling(parent)!;
                
//                 if(!sibling){
//                     console.log(parent.id)
//                     console.log(this.getChildren(this.getParent(parent)!).map(d=>d.id))
//                     throw new Error("no sibling")
//                 }
//                 this.addChild(parent, sibling)
//                 this.setBranchLength(sibling, rootLength);

//             } else {
//                 // swap the parent and parent's parent's length around
//                 const nan = this.getParent(parent)!;
//                 if(!nan){
//                 throw new Error("no nan!")
//                 }
//                 const nanLength = this.getLength(nan);
//                 this.setBranchLength(nan, oldLength);
//                 this.setBranchLength(parent, nanLength);

//                 // add the new child
//                 // parent._children.push(parent.parent);
//                 this.addChild(parent, nan);
//             }

//             lineage = [parent, ...lineage];

//             node0 = parent;
//             parent = this.getParent(parent)!;
//         }

//         // Reuse the root node as root...

//         // Set the order of the children to be the same as for the original parent of the node.
//         // This makes for a more visually consistent rerooting graphically.
//         this.removeAllChildren(this.root!)
//         this.addChild(this.root!, rootChild1)
//         this.addChild(this.root!, rootChild2)
//         if (nodeAtTop) {
//             this.rotate(this.root!, false)
//         }
//         // connect all the children to their parents
//         this.internalNodes
//             .forEach((node) => {
//                 for (const child of this.getChildren(node)) {
//                     this.setParent(child, node)
//                 }

//             });

//         const l = this.getLength(rootChild1) * proportion;
//         this.setBranchLength(rootChild2, l)
//         this.setBranchLength(rootChild1, this.getLength(rootChild1) - l)

//     } else {
//         // the root is staying the same, just the position of the root changing
//         const l = this.getLength(node) * (1.0 - proportion);
//         this.setBranchLength(node, l)
//         this.setBranchLength(this.getSibling(node)!, rootLength - l)
//     }