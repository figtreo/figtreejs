import { PayloadAction, createSlice,configureStore} from "@reduxjs/toolkit";
import { NormalizedTreeData,Node, NormalizedTree } from "../normalizedTree";
import { AnnotationType, NodeRef, Tree, newickParsingOptions } from "../Tree.types";
import { checkAnnotation, updateDomain } from "./treedux";
import { AbstractTree } from "../AbtractTree";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { TreeList } from "../TreeList/TreeListInterface";

type treeduxState ={
    currentTree:number;
    trees:NormalizedTreeData[];
}

const initialState:treeduxState ={
    currentTree:-1,
    trees:[]

}


const treeListSlice = createSlice({
    name:"treeList",
    initialState,
    reducers:{
        addTree: {
            reducer: (state, action: PayloadAction<{ tree: NormalizedTreeData }>) => {

               state.trees.push(action.payload.tree);
            },
            prepare: (tree:NormalizedTreeData) => {
                return { payload: { tree} };
            }
        },
        nextTree(state,action:PayloadAction){
                if(state.currentTree===state.trees.length-1){
                    throw new Error("no more trees")
                }
                state.currentTree+=1;
            },
        previousTree(state,action:PayloadAction){
                if(state.currentTree===0){
                    throw new Error("no more trees")
                }
                state.currentTree-=1;
            },
        setCurrentTree:{
            reducer:(state,action:PayloadAction<{index:number}> )=>{
                if(action.payload.index<0 || action.payload.index>state.trees.length-1){
                    throw new Error(`index out of range: only ${state.trees.length} trees in list but index ${action.payload.index}`)
                }
                state.currentTree = action.payload.index;
            },
            prepare:(index:number)=>{
                return {payload:{index}}
            }
        },
        // reducers that act on a given tree.
        setLevel: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; level: number }>) => {
                const { node, level } = action.payload;
                state.trees[state.currentTree].nodes.byId[node.id].level = level;
            },
            prepare: (node: NodeRef, level: number) => {
                return { payload: { node, level} };
            },
        },
            removeChild: {
                reducer: (state, action: PayloadAction<{ parent: NodeRef; child: NodeRef }>) => {
                    const { parent, child } = action.payload;
                    state.trees[state.currentTree].nodes.byId[parent.id].children = state.trees[state.currentTree].nodes.byId[parent.id].children.filter(
                        (id) => id !== child.id
                    );
                },
                prepare: (parent: NodeRef, child: NodeRef) => {
                    return { payload: { parent, child } };
                },
            },
            sortChildren: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; compare: (a: NodeRef, b: NodeRef) => number }>) => {
                    const { node, compare } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].children = state.trees[state.currentTree].nodes.byId[node.id].children
                        .map((node_id) => state.trees[state.currentTree].nodes.byId[node_id])
                        .sort(compare)
                        .map((node) => node.id);
                },
                prepare: (node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number) => {
                    return { payload: { node, compare } };
                },
            },
            addNode: {
                reducer: (state, action: PayloadAction<{ node: Node }>) => {
                    const id = action.payload.node.id;
                    state.trees[state.currentTree].nodes.byId[id] = action.payload.node;
                    state.trees[state.currentTree].nodes.allIds.push(id);
                    state.trees[state.currentTree].nodes.annotations[id] = {};
                },
                prepare: (node: Node) => {
                    return { payload: { node } };
                },
            },
            rotate:{
                reducer:(state,action:PayloadAction<{node:NodeRef,recursive:boolean}> )=>{
                    const { node,recursive } = action.payload;
                    const tree = state.trees[state.currentTree];
                    const fakeTree = new NormalizedTree(tree);
                    fakeTree.rotate(node,recursive);
                    state.trees[state.currentTree] = fakeTree.data;
                },
                prepare:(node:NodeRef,recursive:boolean)=>{
                    return {payload:{node,recursive}}
                }
            },

            addChild: {
                reducer: (state, action: PayloadAction<{ parent: NodeRef; child: NodeRef }>) => {
                    const { parent, child } = action.payload;
                    state.trees[state.currentTree].nodes.byId[parent.id].children.push(child.id);
                },
                prepare: (parent: NodeRef, child: NodeRef) => {
                    return { payload: { parent, child } };
                },
            },
            removeAllChildren: {
                reducer: (state, action: PayloadAction<{ node: NodeRef }>) => {
                    const { node } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].children = [];
                },
                prepare: (node: NodeRef) => {
                    return { payload: { node } };
                },
            },
            setParent: {
                reducer: (state, action: PayloadAction<{ child: NodeRef; parent: NodeRef }>) => {
                    const { child, parent } = action.payload;
                    state.trees[state.currentTree].nodes.byId[child.id].parent = parent.id;
                },
                prepare: (child: NodeRef, parent: NodeRef) => {
                    return { payload: { child, parent } };
                },
            },
            setName: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; name: string }>) => {
                    const { node, name } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].name = name;
                    if (state.trees[state.currentTree].nodes.byName[name] !== undefined) {
                        throw new Error(`Duplicate node name ${name}`);
                    }
                    state.trees[state.currentTree].nodes.byName[name] = node.id;
                },
                prepare: (node: NodeRef, name: string) => {
                    return { payload: { node, name } };
                },
            },
            setLabel: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; label: string }>) => {
                    const { node, label } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].label = label;
                    if (state.trees[state.currentTree].nodes.byLabel[label] !== undefined) {
                        throw new Error(`Duplicate node label ${label}`);
                    }
                    state.trees[state.currentTree].nodes.byLabel[label] = node.id;
                },
                prepare: (node: NodeRef, label: string) => {
                    return { payload: { node, label } };
                },
            },
            setHeight: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; height: number }>) => {
                    const { node, height } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].height = height;
                },
                prepare: (node: NodeRef, height: number) => {
                    return { payload: { node, height } };
                },
            },
            setDivergence: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; divergence: number }>) => {
                    const { node, divergence } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].divergence = divergence;
                },
                prepare: (node: NodeRef, divergence: number) => {
                    return { payload: { node, divergence } };
                },
            },
            setLength: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; length: number }>) => {
                    const { node, length } = action.payload;
                    state.trees[state.currentTree].nodes.byId[node.id].length = length;
                },
                prepare: (node: NodeRef, length: number) => {
                    return { payload: { node, length } };
                },
            },
            setRoot: {
                reducer: (state, action: PayloadAction<{ node: NodeRef }>) => {
                    const { node } = action.payload;
                    state.trees[state.currentTree].rootNode = node.id;
                },
                prepare: (node: NodeRef) => {
                    return { payload: { node } };
                },
            },
            orderNodesByDensity: {
                //could be simplified by using the orderNodesByDensity function from normalizedTree 
                reducer: (state, action: PayloadAction<{ increasing: boolean; node?: NodeRef }>) => {
                    const { increasing, node } = action.payload;
                    const factor = increasing ? 1 : -1;
                    const tree = state.trees[state.currentTree];
                    let thisNode = node;
                    if(thisNode===undefined){
                        if(tree.rootNode===null){
                            throw new Error("No root node set can not order nodes")
                        }
                        thisNode = tree.nodes.byId[tree.rootNode]
                    }
                    const orderer =(tree:NormalizedTreeData,node:NodeRef,factor:number):number=>{
                    
                    const counts :{[key:string]:number} = {};
                    let descendants=0
                    for(const child of tree.nodes.byId[node.id].children){
                        const thisLine = orderer(tree,tree.nodes.byId[child],factor);
                        descendants+=thisLine+1; //one for the child itself
                        counts[child]=thisLine;
                    }
                    tree.nodes.byId[node.id].children.sort((a,b)=>factor*(counts[a]-counts[b]));
                    return descendants
                  }

                    orderer(tree,thisNode,factor);
                }
                  ,
                prepare: (increasing: boolean, node?: NodeRef) => {
                    return { payload: { increasing, node } };
                },
            },
            reroot: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; proportion: number }>) => {
                    const { node, proportion } = action.payload;
                    const tree = state.trees[state.currentTree];
                    const fakeTree = new NormalizedTree(tree);
                    fakeTree.reroot(node, proportion);
                
                    state.trees[state.currentTree] = fakeTree.data;
                },
                prepare: (node: NodeRef, proportion: number) => {
                    return { payload: { node, proportion } };
                },
            },
            annotateNode: {
                reducer: (state, action: PayloadAction<{ node: NodeRef; annotation: { name: string; value: any; type: AnnotationType } }>) => {
                    const currentType = state.trees[state.currentTree].annotations.byId[action.payload.annotation.name]
                        ? state.trees[state.currentTree].annotations.byId[action.payload.annotation.name].type
                        : undefined;
                    const currentDomain = state.trees[state.currentTree].annotations.byId[action.payload.annotation.name]
                        ? state.trees[state.currentTree].annotations.byId[action.payload.annotation.name].domain
                        : undefined;
    
                    const checkedType = checkAnnotation(action.payload.annotation.type, currentType);
                    const domain = updateDomain(
                        { id: action.payload.annotation.name, value: action.payload.annotation.value, type: checkedType },
                        currentDomain
                    );
    
                    state.trees[state.currentTree].nodes.annotations[action.payload.node.id][action.payload.annotation.name] =
                        action.payload.annotation.value;
                        state.trees[state.currentTree].annotations.byId[action.payload.annotation.name] = {
                        id: action.payload.annotation.name,
                        domain,
                        type: checkedType,
                    };
                },
                prepare: (node: NodeRef, annotation: { name: string; value: any; type: AnnotationType }) => {
                    return { payload: { node, annotation } };
                },
            }
        }   
    });

    const {
        setLevel,
        removeChild,
        sortChildren,
        addChild,
        removeAllChildren,
        setParent,
        setName,
        setLabel,
        setHeight,
        setDivergence,
        setLength,
        setRoot,
        annotateNode,
        addNode,
        setCurrentTree,
        addTree,
        nextTree,
        previousTree,
        //overwrite abstract methods for speed
        orderNodesByDensity,
        reroot,
        rotate
    } = treeListSlice.actions;
    
export const TreeduxListReducer = treeListSlice.reducer;

 export class TreeduxList extends AbstractTree implements TreeList {
   
    _store:ToolkitStore
   private  _getMySlice:()=>treeduxState //selector
    constructor( store?:ToolkitStore,treeGetter?:(state:ToolkitStore)=>treeduxState){
        super();
        
        if(store){
            this._store = store;
            if(!treeGetter){
                throw new Error('treeGetter must be defined if store is provided')
            }
            this._getMySlice = ()=> treeGetter(store);
        }else{
        this._store = configureStore({reducer:{treeList:TreeduxListReducer}});
        this._getMySlice = ()=>this._store.getState().treeList;

        }
    }
    
    private getTreeSlice():NormalizedTreeData{
        if(this._getMySlice().currentTree<0){
            throw new Error("No tree loaded or at least currentTree index is -1")
        }
        return this._getMySlice().trees[this._getMySlice().currentTree];
    }
    getNextTree(): Tree {
         this._store.dispatch(nextTree());
         return this;
     }
     getPreviousTree(): Tree {
        this._store.dispatch(previousTree());
        return this;
    }
     getTree(index: number): Tree {
        this._store.dispatch(setCurrentTree(index));
        return this;
    }
     getCurrentIndex(): number {
        return  this._getMySlice().currentTree;
     }
     getTreeCount(): number {
        return this._getMySlice().trees.length;
     }
     getTrees(): Generator<Tree, any, unknown> {
            throw new Error("Method not implemented.");
     }
     addTree(tree: Tree): void {
            throw new Error("Method not implemented.");
     }
     hasTree(): boolean {
         return this._getMySlice().currentTree<this._getMySlice().trees.length-1
     }


    static fromNewick(newick: string, options?: newickParsingOptions | undefined): TreeduxList {
            const tree = new this();
            tree.addFromNewick( newick, options);
            return tree;
    }
    addFromNewick(newick: string, options?: newickParsingOptions | undefined): void {
        const fakeTree:NormalizedTree = (NormalizedTree.fromNewick(newick, options)as NormalizedTree);
        //this avoids pushing all the parsing events to the redux store
        this._store.dispatch(addTree(fakeTree.data))
        this._store.dispatch(setCurrentTree(this._getMySlice().trees.length-1))
        
    }
    addFromNexus(nexus: string, options?: newickParsingOptions | undefined): void {
        const fakeTree:NormalizedTree = (NormalizedTree.fromNexus(nexus, options)as NormalizedTree);
        //this avoids pushing all the parsing events to the redux store
        this._store.dispatch(addTree(fakeTree.data))
        this._store.dispatch(setCurrentTree(this._getMySlice().trees.length-1))
    }
    addFromString(string: string, options?: newickParsingOptions | undefined): void {
        const fakeTree:NormalizedTree = (NormalizedTree.fromString(string, options)as NormalizedTree);
        //this avoids pushing all the parsing events to the redux store
        this._store.dispatch(addTree(fakeTree.data))
        this._store.dispatch(setCurrentTree(this._getMySlice().trees.length-1))
    }
    reroot(node: NodeRef, proportion: number): void {
        this._store.dispatch(reroot(node,proportion))
    }
    rotate(node: NodeRef, recursive: boolean): void {
        this._store.dispatch(rotate(node,recursive))
    }
    setLevel(node: NodeRef, level: number): void {
            this._store.dispatch(setLevel(node,level))
    }
    removeChild(parent: NodeRef, child: NodeRef): void {
        this._store.dispatch(removeChild(parent,child))
    }
    sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): void {
        this._store.dispatch(sortChildren(node,compare))
    }
    addChild(parent: NodeRef, child: NodeRef): void {
        this._store.dispatch(addChild(parent,child))
    }
    removeAllChildren(node: NodeRef): void {
        this._store.dispatch(removeAllChildren(node))
    }
    setParent(child: NodeRef, parent: NodeRef): void {
        this._store.dispatch(setParent(child,parent))
    }
    addNode(): NodeRef {
        const tree = this.getTreeSlice();
        const id = `Node-${tree.nodes.allIds.length}`
        const Node = {
            id,
            children: [],
            parent: null,
            label: '',
            length: undefined,
            divergence: undefined,
            height: undefined,
            name: null,
            level: undefined
        }
        this._store.dispatch(addNode(Node))
        return Node;
    }

    orderNodesByDensity(increasing: boolean, node?: NodeRef): void {
        this._store.dispatch(orderNodesByDensity(increasing,node));
    }
    setName(node: NodeRef, name: string): void {
        this._store.dispatch(setName(node,name))
    }
    setLabel(node: NodeRef, label: string): void {
        this._store.dispatch(setLabel(node,label))
    }
    setHeight(node: NodeRef, height: number): void {
        this._store.dispatch(setHeight(node,height))
    }
    setDivergence(node: NodeRef, divergence: number): void {
        this._store.dispatch(setDivergence(node,divergence))
    }
    setLength(node: NodeRef, length: number): void {
        this._store.dispatch(setLength(node,length))
    }
    setRoot(node: NodeRef): void {
        this._store.dispatch(setRoot(node))
    }
    annotateNode(node: NodeRef, annotation: { name: string, value: any, type: AnnotationType }): void {
        this._store.dispatch(annotateNode(node,annotation))
    }
    getLevel(node: NodeRef): number {
        return this.getTreeSlice().nodes.byId[node.id].level!
    }
    getNodeByName(name: string): NodeRef | null {
        return this.getNode(this.getTreeSlice().nodes.byName[name])
    }
    getNodeByLabel(name: string): NodeRef | null {
        return this.getNode(this.getTreeSlice().nodes.byLabel[name])
    }
    getName(node: NodeRef): string | null {
        return this.getTreeSlice().nodes.byId[node.id].name
    }
    getNode(id: string): NodeRef {
        return this.getTreeSlice().nodes.byId[id]
    }
    getDivergence(node: NodeRef): number {
        return this.getTreeSlice().nodes.byId[node.id].divergence!
    }
    getHeight(node: NodeRef): number {
        return this.getTreeSlice().nodes.byId[node.id].height!
    }
    getLength(node: NodeRef): number {
        return this.getTreeSlice().nodes.byId[node.id].length!
    }
    getChildCount(node: NodeRef): number {
        return this.getTreeSlice().nodes.byId[node.id].children.length
    }
    getChild(node: NodeRef, index: number): NodeRef {
        const tree = this.getTreeSlice();
        return tree.nodes.byId[tree.nodes.byId[node.id].children[index]];
    }
    getParent(node: NodeRef): NodeRef | null {
        const tree = this.getTreeSlice();
        const parentId = tree.nodes.byId[node.id].parent;
        if (parentId === null) {
            return null
        } else {
            return tree.nodes.byId[parentId]
        }
    }
    getNodeCount(): number {
        return this.getTreeSlice().nodes.allIds.length
    }
    getChildren(node: NodeRef): NodeRef[] {
        const tree = this.getTreeSlice();
        return tree.nodes.byId[node.id].children.map((id:string) => tree.nodes.byId[id])
    }
    getAnnotation(node: NodeRef, name: string):any {
        const tree = this.getTreeSlice();
        return tree.nodes.annotations[node.id][name]
    }
    getLabel(node: NodeRef): string | null {
        const tree = this.getTreeSlice();
        return tree.nodes.byId[node.id].label
    }
    getAnnotationType(name: string): string | undefined {
        const tree = this.getTreeSlice();
        return tree.annotations.byId[name].type
    }
    getAnnotations(): string[] {
        const tree = this.getTreeSlice();
        return tree.annotations.allIds
    }
    get nodeCount(): number {
        return this.getTreeSlice().nodes.allIds.length
    }
    get externalNodeCount(): number {
        const tree = this.getTreeSlice()
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) === 0).length
    }
    get InternalNodeCount(): number {
        const tree = this.getTreeSlice()
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) > 0).length
    }
    get externalNodes(): NodeRef[] {
        const tree = this.getTreeSlice()
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) === 0).map((n:string) => this.getNode(n))
    }
    get internalNodes(): NodeRef[] {
        const tree = this.getTreeSlice()
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) > 0).map((n:string) => this.getNode(n))
    }
    get root(): NodeRef | null {
        const tree = this.getTreeSlice()
        return this.getNode(tree.rootNode!)
    }
    isRoot(node: NodeRef): boolean {
        const tree = this.getTreeSlice()
        return tree.rootNode === node.id
    }
    isExternal(node: NodeRef): boolean {
        const tree = this.getTreeSlice()
        return tree.nodes.byId[node.id].children.length === 0;
    }
    isInternal(node: NodeRef): boolean {
        const tree = this.getTreeSlice()
        return tree.nodes.byId[node.id].children.length > 0;
    }
    getSibling(node: NodeRef): NodeRef | null {
        const tree = this.getTreeSlice()
        const index = tree.nodes.byId[tree.nodes.byId[node.id].parent!].children.indexOf(node.id);
        if (this.getChildCount(this.getParent(node)!) === 1) {
            console.warn(`Node ${node.id} has only no sibling`)
            return null
        } else if (index === this.getChildCount(this.getParent(node)!) - 1) {
            return this.getChild(this.getParent(node)!, 0)
        } else {
            return this.getChild(this.getParent(node)!, index + 1)
        }
    }
    getAnnotationDomain(name: string): string[] | [number, number] | number[] | [boolean, boolean] | undefined {
        const tree = this.getTreeSlice();
        return tree.annotations.byId[name].domain
    }

}
    
    



//treefunctions
