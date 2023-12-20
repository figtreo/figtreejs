import { configureStore, createSlice, createStore, PayloadAction } from '@reduxjs/toolkit';
import { Node, NormalizedTreeData } from '../normalizedTree';
import { AnnotationType, newickParsingOptions, NodeRef, Tree } from '../Tree.types';
import { extent } from 'd3-array';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AbstractTree } from '../AbtractTree';
import { parseNewick } from '../parsing';

function checkAnnotation(suggestedType: AnnotationType , currentType:AnnotationType|undefined): AnnotationType {
    let annotationType = currentType;
   

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
    }
    throw new Error(`Annotation has type ${suggestedType} but previously seen as ${annotationType}`)
}

function updateDomain( annotation: { id: string; value: any;type:AnnotationType },domain:[number, number] | string[] | number[]|[boolean,boolean]|undefined  ): [number, number] | string[] | number[]|[boolean,boolean]  {
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
        default: {
            throw new Error(`Unknown annotation type ${annotation.type}`)
        }
    }
    return newDomain!;

}



const initialState: NormalizedTreeData = {
        nodes: {
            byId: {},
            allIds: [],
            byName: {},
            byLabel: {},
            annotations: {},
        },
        rootNode: null,

        annotations: {
            byId: {},
            allIds: []
        },
}


const normalizedTreeSlice = createSlice({
    name: 'normalizedTree',
    initialState,
    reducers: {
        setLevel: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; level: number }>) => {
                const { node, level } = action.payload;
                state.nodes.byId[node.id].level = level;
            },
            prepare: (node: NodeRef, level: number) => {
                return { payload: { node, level } };
            },
        },
        removeChild: {
            reducer: (state, action: PayloadAction<{ parent: NodeRef; child: NodeRef }>) => {
                const { parent, child } = action.payload;
                state.nodes.byId[parent.id].children = state.nodes.byId[parent.id].children.filter(
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
                state.nodes.byId[node.id].children = state.nodes.byId[node.id].children
                    .map((node_id) => state.nodes.byId[node_id])
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
                state.nodes.byId[id] = action.payload.node;
                state.nodes.allIds.push(id);
                state.nodes.annotations[id] = {};
            },
            prepare: (node: Node) => {
                return { payload: { node } };
            },
        },
        addChild: {
            reducer: (state, action: PayloadAction<{ parent: NodeRef; child: NodeRef }>) => {
                const { parent, child } = action.payload;
                state.nodes.byId[parent.id].children.push(child.id);
            },
            prepare: (parent: NodeRef, child: NodeRef) => {
                return { payload: { parent, child } };
            },
        },
        removeAllChildren: {
            reducer: (state, action: PayloadAction<{ node: NodeRef }>) => {
                const { node } = action.payload;
                state.nodes.byId[node.id].children = [];
            },
            prepare: (node: NodeRef) => {
                return { payload: { node } };
            },
        },
        setParent: {
            reducer: (state, action: PayloadAction<{ child: NodeRef; parent: NodeRef }>) => {
                const { child, parent } = action.payload;
                state.nodes.byId[child.id].parent = parent.id;
            },
            prepare: (child: NodeRef, parent: NodeRef) => {
                return { payload: { child, parent } };
            },
        },
        setName: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; name: string }>) => {
                const { node, name } = action.payload;
                state.nodes.byId[node.id].name = name;
                if (state.nodes.byName[name] !== undefined) {
                    throw new Error(`Duplicate node name ${name}`);
                }
                state.nodes.byName[name] = node.id;
            },
            prepare: (node: NodeRef, name: string) => {
                return { payload: { node, name } };
            },
        },
        setLabel: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; label: string }>) => {
                const { node, label } = action.payload;
                state.nodes.byId[node.id].label = label;
                if (state.nodes.byLabel[label] !== undefined) {
                    throw new Error(`Duplicate node label ${label}`);
                }
                state.nodes.byLabel[label] = node.id;
            },
            prepare: (node: NodeRef, label: string) => {
                return { payload: { node, label } };
            },
        },
        setHeight: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; height: number }>) => {
                const { node, height } = action.payload;
                state.nodes.byId[node.id].height = height;
            },
            prepare: (node: NodeRef, height: number) => {
                return { payload: { node, height } };
            },
        },
        setDivergence: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; divergence: number }>) => {
                const { node, divergence } = action.payload;
                state.nodes.byId[node.id].divergence = divergence;
            },
            prepare: (node: NodeRef, divergence: number) => {
                return { payload: { node, divergence } };
            },
        },
        setLength: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; length: number }>) => {
                const { node, length } = action.payload;
                state.nodes.byId[node.id].length = length;
            },
            prepare: (node: NodeRef, length: number) => {
                return { payload: { node, length } };
            },
        },
        setRoot: {
            reducer: (state, action: PayloadAction<{ node: NodeRef }>) => {
                const { node } = action.payload;
                state.rootNode = node.id;
            },
            prepare: (node: NodeRef) => {
                return { payload: { node } };
            },
        },
        annotateNode: {
            reducer: (state, action: PayloadAction<{ node: NodeRef; annotation: { name: string; value: any; type: AnnotationType } }>) => {
                const currentType = state.annotations.byId[action.payload.annotation.name]
                    ? state.annotations.byId[action.payload.annotation.name].type
                    : undefined;
                const currentDomain = state.annotations.byId[action.payload.annotation.name]
                    ? state.annotations.byId[action.payload.annotation.name].domain
                    : undefined;

                const checkedType = checkAnnotation(action.payload.annotation.type, currentType);
                const domain = updateDomain(
                    { id: action.payload.annotation.name, value: action.payload.annotation.value, type: checkedType },
                    currentDomain
                );

                state.nodes.annotations[action.payload.node.id][action.payload.annotation.name] =
                    action.payload.annotation.value;
                state.annotations.byId[action.payload.annotation.name] = {
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

export const {
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
    addNode
} = normalizedTreeSlice.actions;




export const TreeduxReducer = normalizedTreeSlice.reducer;

/** This class wrapps a redux store and provides all the usual access to the tree
 * It generates a store if none is provided
 */
export class Treedux extends AbstractTree {
   
    _store:ToolkitStore
    _getTree:()=>NormalizedTreeData
    constructor( store?:ToolkitStore,treeGetter?:()=>NormalizedTreeData){
        super();
        
        if(store){
            this._store = store;
            if(!treeGetter){
                throw new Error('treeGetter must be defined if store is provided')
            }
            this._getTree = treeGetter!;
        }else{
        this._store = configureStore({reducer:{tree:TreeduxReducer}});
        this._getTree = ()=>this._store.getState().tree;
        }
    }
    static fromNewick(newick: string, options?: newickParsingOptions | undefined): Tree {
        const tree = new this();
        return parseNewick(tree, newick, options);

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
        const tree = this._store.getState().tree;
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
       return this._store.getState().tree.nodes.byId[node.id].level!
    }
    getNodeByName(name: string): NodeRef | null {
      return this.getNode(this._store.getState().tree.nodes.byName[name])
    }
    getNodeByLabel(name: string): NodeRef | null {
        return this.getNode(this._store.getState().tree.nodes.byLabel[name])
    }
    getName(node: NodeRef): string | null {
       return this._store.getState().tree.nodes.byId[node.id].name
    }
    getNode(id: string): NodeRef {
        return this._store.getState().tree.nodes.byId[id]
    }
    getDivergence(node: NodeRef): number {
        return this._store.getState().tree.nodes.byId[node.id].divergence!
    }
    getHeight(node: NodeRef): number {
        return this._store.getState().tree.nodes.byId[node.id].height!
    }
    getLength(node: NodeRef): number {
        return this._store.getState().tree.nodes.byId[node.id].length!
    }
    getChildCount(node: NodeRef): number {
        return this._store.getState().tree.nodes.byId[node.id].children.length
    }
    getChild(node: NodeRef, index: number): NodeRef {
        const tree = this._store.getState().tree;
        return tree.nodes.byId[tree.nodes.byId[node.id].children[index]];
    }
    getParent(node: NodeRef): NodeRef | null {
        const tree = this._store.getState().tree;
        const parentId = tree.nodes.byId[node.id].parent;
        if (parentId === null) {
            return null
        } else {
            return tree.nodes.byId[parentId]
        }
    }
    getChildren(node: NodeRef): NodeRef[] {
        const tree = this._store.getState().tree;
        return tree.nodes.byId[node.id].children.map((id:string) => tree.nodes.byId[id])
    }
    getAnnotation(node: NodeRef, name: string) {
        const tree = this._store.getState().tree;
        return tree.nodes.annotations[node.id][name]
    }
    getLabel(node: NodeRef): string | null {
        const tree = this._store.getState().tree;
        return tree.nodes.byId[node.id].label
    }
    getAnnotationType(name: string): string | undefined {
        const tree = this._store.getState().tree;
        return tree.annotations.byId[name].type
    }
    get nodeCount(): number {
        return this._store.getState().tree.nodes.allIds.length
    }
    get externalNodeCount(): number {
        const tree = this._store.getState().tree
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) === 0).length
    }
    get InternalNodeCount(): number {
        const tree = this._store.getState().tree
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) > 0).length
    }
    get externalNodes(): NodeRef[] {
       const tree = this._store.getState().tree
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) === 0).map((n:string) => this.getNode(n))
    }
    get internalNodes(): NodeRef[] {
       const tree = this._store.getState().tree
        return tree.nodes.allIds.filter((n:string) => this.getChildCount(this.getNode(n)) > 0).map((n:string) => this.getNode(n))
    }
    get root(): NodeRef | null {
        const tree = this._store.getState().tree
        return this.getNode(tree.rootNode!)
    }
    isRoot(node: NodeRef): boolean {
        const tree = this._store.getState().tree
        return tree.rootNode === node.id
    }
    isExternal(node: NodeRef): boolean {
       const tree = this._store.getState().tree
       return tree.nodes.byId[node.id].children.length === 0;
    }
    isInternal(node: NodeRef): boolean {
        const tree = this._store.getState().tree
        return tree.nodes.byId[node.id].children.length > 0;
    }
    getSibling(node: NodeRef): NodeRef | null {
        const tree = this._store.getState().tree
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
        const tree = this._store.getState().tree;
        return tree.annotations.byId[name].domain
    }

}



