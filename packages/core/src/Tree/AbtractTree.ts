import { NodeRef, Tree } from "./Tree.types";
import {  processAnnotationValue } from ".";

export abstract class AbstractTree implements Tree {
    annotateNodeUnknownType(node: NodeRef, annotations: {value:any,id:string}[]|{value:any,id:string}): void {
        if(!Array.isArray(annotations)){
            annotations = [annotations]
        }
        for(const annotation of annotations){
            let { type, value } = processAnnotationValue(annotation.value);
            this.annotateNode(node, { name: annotation.id, value, type })
        }
       
    }

    orderNodesByDensity(increasing: boolean,node?:NodeRef): void {
        if(node===undefined){
            if(this.root===null){
                throw new Error("No root node and no node provided to density ordering")
            }
            node = this.root
        }
        const factor = increasing ? 1 : -1;
        orderNodes(this,node, (nodeA, countA, nodeB, countB) => {
            return (countA - countB) * factor;
        });
    }

    abstract sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): void;
    abstract getNodeByName(name: string): NodeRef | null;
    abstract getNodeByLabel(name: string): NodeRef | null;
    abstract setRoot(node: NodeRef): void
    abstract addChild(parent: NodeRef, child: NodeRef): void 
    abstract setParent(node: NodeRef, parent: NodeRef): void 
    abstract getName(node: NodeRef): string | null
    abstract getNode(id: string): NodeRef
    abstract getDivergence(node: NodeRef): number
    abstract getHeight(node: NodeRef): number
    abstract getLength(node: NodeRef): number
    abstract getChildCount(node: NodeRef): number
    abstract getChild(node: NodeRef, index: number): NodeRef
    abstract getParent(node: NodeRef): NodeRef | null
    abstract getChildren(node: NodeRef): NodeRef[]
    abstract getAnnotation(node: NodeRef, name: string): any | null
    abstract getLabel(node: NodeRef): string | null
    abstract getAnnotationType(name: string): string
    abstract get nodeCount(): number
    abstract get externalNodeCount(): number
    abstract get InternalNodeCount(): number
    abstract get externalNodes(): NodeRef[]
    abstract get internalNodes(): NodeRef[]
    abstract get root(): NodeRef | null
    abstract setHeight(node: NodeRef, height: number): void
    abstract setDivergence(node: NodeRef, divergence: number): void
    abstract setLength(node: NodeRef, length: number): void
    abstract annotateNode(node: NodeRef, annotations: { [key: string]: any; }): void;
    abstract addNode(): NodeRef;
    abstract setName(node: NodeRef, name: string): void;
    abstract setLabel(node: NodeRef, label: string): void;
    abstract isRoot(node: NodeRef): boolean;
    abstract isExternal(node: NodeRef): boolean;
    abstract isInternal(node: NodeRef): boolean;
    getTips(node?: NodeRef): Generator<NodeRef> {
        if (node === undefined) {
            if (this.root !== null) {
                node = this.root
            } else {
                throw new Error("No root node and no node provided to tip generator")
            }
        }
        return tipGenerator(this, node)
    }


    getPostorderNodes(node?: NodeRef): Generator<NodeRef> {
        if (node === undefined) {
            if (this.root !== null) {
                node = this.root
            } else {
                throw new Error("No root node and no node provided to postorder generator")
            }
        }
        return postorderGenerator(this, node)
    }
    // getPostorderNodes():Generator<NodeRef>

    getPreorderNodes(node?: NodeRef): Generator<NodeRef> {
        if (node === undefined) {
            if (this.root !== null) {
                node = this.root
            } else {
                throw new Error("No root node and no node provided to preorder generator")
            }
        }
        return preorderGenerator(this, node)
    }
    //TODO annotations
    _toString(node: NodeRef): string {
        return (this.getChildCount(node) > 0 ? `(${this.getChildren(node).map(child => this._toString(child)).join(",")})${this.getLabel(node) ? "#" +this.getLabel(node) : ""}` : `${this.getName(node) ? this.getName(node) : ""}`) + (this.getLength(node) ? `:${this.getLength(node)}` : "");
    }

    toNewick(node?:NodeRef,options?: { includeAnnotations: boolean; } ): string {
        if (options === undefined) {
            options = { includeAnnotations: false }
        }
        if (node === undefined) {
            if(this.root===null){
                throw new Error("No root node and no node provided to newick generator")
            }
            node = this.root
        }
        
        return this._toString(node) +";";
    }
}

   


function* tipGenerator(tree: Tree, node: NodeRef): Generator<NodeRef> {
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
function* postorderGenerator(tree: Tree, node: NodeRef): Generator<NodeRef> {

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
    yield* traverse(node);

}
function* preorderGenerator(tree: Tree, node: NodeRef): Generator<NodeRef> {

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
    yield* traverse(node);

}

/**
 * A private recursive function that rotates nodes to give an ordering provided
 * by a function.
 * @param node
 * @param ordering function that takes (a,number of tips form a, b, number of tips from b) and sorts a and be by the output.
 * @param callback an optional callback that is called each rotate
 * @returns {number}
 */
function orderNodes(tree:Tree,node:NodeRef, ordering:(a:NodeRef,numberOfATips:number,b:NodeRef,numberOfBTips:number)=>number, callback?:Function)  {
    let count = 0;
    if (tree.getChildCount(node)>0) {
        // count the number of descendents for each child
        const counts = new Map();
        for (const child of tree.getChildren(node)) {
            const value = orderNodes(tree,child, ordering, callback);
            counts.set(child, value);
            count += value;
        }

        // sort the children using the provided function
        tree.sortChildren(node,(a, b) => {
            return ordering(a, counts.get(a), b, counts.get(b))
        });

        if (callback) callback();
    } else {
        count = 1
    }
    return count;
}
