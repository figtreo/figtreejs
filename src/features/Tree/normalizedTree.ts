import { AnnotationType } from "./parsing/TreeParser"
import { TreeState,Node } from "./treeSlice"

//Trying something here 
// Can we use a tree class to make getters etc easier.


export class NormalizedTree  {
    _data:TreeState
    constructor(data:TreeState){
        this._data = data
    }
    get data(){
        return this._data
    }


    getNodeDivergence(node: Node): number {
        return this._data.nodes.byId[node.id].divergence!
    }

    getChildCount(node: Node): number {
        return this._data.nodes.byId[node.id].children.length
       
    }
    private getNode(id:string):Node{
        return this._data.nodes.byId[id]
    }
    getChild(node: Node, index: number): Node {
        return this._data.nodes.byId[this._data.nodes.byId[node.id].children[index]];
    }
    getParent(id: string): string | null {
        const parentId = this._data.nodes.byId[id].parent;
        if(parentId===null){
            return null
        }else{
            return parentId
        }
    }

    getAnnotation(node: Node, name: string): any | null {
        return this._data.annotations[node.id][name]
    }
    getLabel(node: Node): string | null {
        return this._data.nodes.byId[node.id].label
    }

    getAnnotationType(name: string): string {
        return this._data.annotationTypes[name]
    }
    // addChild(parent: Node, child: Node): void {
    //     throw new Error("Method not implemented.")
    // }
    // setParent(node: Node, parent: Node): void {
    //     throw new Error("Method not implemented.")
    // }
    // removeChild(parent: Node, child: Node): void {
    //     throw new Error("Method not implemented.")
    // }
    // removeParent(node: Node): void {
    //     throw new Error("Method not implemented.")
    // }
    // getNodeHeight(node: Node): number {
    //     throw new Error("Method not implemented.")
    // }
    // getBranchLength(node: Node): number {
    //     throw new Error("Method not implemented.")
    // }
    // setBranchLength(node: Node, length: number): void {
    //     throw new Error("Method not implemented.")
    // }
    // setNodeHeight(node: Node, height: number): void {
    //     throw new Error("Method not implemented.")
    // }
    // setNodeDivergence(node: Node, divergence: number): void {
    //     throw new Error("Method not implemented.")
    // }
    // setLabel(node: Node, label: string): void {
    //     throw new Error("Method not implemented.")
    // }
    // setTaxon(node: Node, taxon: Taxon): void {
    //     throw new Error("Method not implemented.")
    // }
    // annotateNode(node: Node, annotations: { [key: string]: any }): void
    // annotateNode(node: Node, annotations: Annotation[]): void
    // annotateNode(node: Node, annotation: Annotation): void
    // annotateNode(node: unknown, annotation: unknown): void {
    //     throw new Error("Method not implemented.")
    // }
    // addNode(): Node {
    //     throw new Error("Method not implemented.")
    // }
    // toNewick(): string {
    //     throw new Error("Method not implemented.")
    // }
    get nodeCount(): number {
        return this._data.nodes.allIds.length
    }
    get externalNodeCount(): number {
        return  this._data.nodes.allIds.filter(n=>this.getChildCount(this.getNode(n))===0).length
    }
    get InternalNodeCount(): number {
        return  this._data.nodes.allIds.filter(n=>this.getChildCount(this.getNode(n))>0).length
    }
    get externalNodes(): Node[] {
        throw new Error("Method not implemented.")
    }
    get internalNodes(): Node[] {
        throw new Error("Method not implemented.")
    }
    get root(): Node | null {
        return this.getNode(this._data.rootNode!)
    }
    // set root(node: Node | null) {
    //     throw new Error("Method not implemented.")
    // }
   

}