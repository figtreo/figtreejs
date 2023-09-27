import { AbstractTree } from "../AbtractTree"
import { AnnotationType, NodeRef, Tree, newickParsingOptions } from "../Tree.types"
import { parseNewick } from "../..";
import { NormalizedTreeData } from "./normalizedTree.types"
//todo clean up null vs undefined
export class NormalizedTree extends AbstractTree {
    isExternal(node: NodeRef): boolean {
        return this._data.nodes.byId[node.id].children.length === 0
    }
    isInternal(node: NodeRef): boolean {
        return this._data.nodes.byId[node.id].children.length > 0
    }
    isRoot(node:NodeRef){
        return this._data.rootNode===node.id
    }
    sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): void {
        this._data.nodes.byId[node.id].children = this._data.nodes.byId[node.id].children.map(node_id=>this.getNode(node_id)).sort(compare).map(node=>node.id)
    }
    getNodeByName(name: string): NodeRef | null {
        return this.getNode(this._data.nodes.byName[name])
    }

    getNodeByLabel(label: string): NodeRef | null {
        return this.getNode(this._data.nodes.byLabel[label])

    }
    static fromNewick(newick: string, options?: newickParsingOptions | undefined): Tree {
        const tree = new this();
        return parseNewick(tree, newick, options);

    }
    addChild(parent: NodeRef, child: NodeRef): void {
        this._data.nodes.byId[parent.id].children.push(child.id)
    }
    setParent(child: NodeRef, parent: NodeRef): void {
        this._data.nodes.byId[child.id].parent = parent.id
    }
    setName(node: NodeRef, name: string): void {
        this._data.nodes.byId[node.id].name = name;
        if (this._data.nodes.byName[name] !== undefined) {
            throw new Error(`Duplicate node name ${name}`)
        }
        this._data.nodes.byName[name] = node.id
    }
    setLabel(node: NodeRef, label: string): void {

        this._data.nodes.byId[node.id].label = label;
        if (this._data.nodes.byLabel[label] !== undefined) {
            throw new Error(`Duplicate node label ${label}`)
        }
        this._data.nodes.byLabel[label] = node.id

    }
    setHeight(node: NodeRef, height: number): void {
        this._data.nodes.byId[node.id].height = height;
    }
    setDivergence(node: NodeRef, divergence: number): void {
        this._data.nodes.byId[node.id].divergence = divergence;
    }
    setLength(node: NodeRef, length: number): void {
        this._data.nodes.byId[node.id].length = length;
    }
    setRoot(node: NodeRef): void {
        this._data.rootNode = node.id
    }



    annotateNode(node: NodeRef, annotation: { name: string, value: any, type: AnnotationType }): void {
        //todo check annotation type 
        let type = checkAnnotation(this, { name: annotation.name, suggestedType: annotation.type })
        this._data.annotations[node.id][annotation.name] = annotation.value;
        this._data.annotationTypes[annotation.name] = type
    }


    _data: NormalizedTreeData
    constructor(data?: NormalizedTreeData) {
        super();
        if (data === undefined) {
            data = {
                nodes: {
                    byId: {},
                    allIds: [],
                    byName: {},
                    byLabel: {}
                },
                rootNode: null,
                annotations: {
                },
                annotationTypes: {
                }
            }
        }
        this._data = data
    }
    get data() {
        return this._data
    }

    getNode(id: string): NodeRef {
        return this._data.nodes.byId[id]
    }
    getDivergence(node: NodeRef): number {
        return this._data.nodes.byId[node.id].divergence!
    }
    getHeight(node: NodeRef): number {
        return this._data.nodes.byId[node.id].height!
    }

    getLength(node: NodeRef): number {
        return this._data.nodes.byId[node.id].length!
    }
    getChildCount(node: NodeRef): number {
        return this._data.nodes.byId[node.id].children.length

    }
    getChild(node: NodeRef, index: number): NodeRef {
        return this._data.nodes.byId[this._data.nodes.byId[node.id].children[index]];
    }
    getParent(node: NodeRef): NodeRef | null {
        const parentId = this._data.nodes.byId[node.id].parent;
        if (parentId === null) {
            return null
        } else {
            return this._data.nodes.byId[parentId]
        }
    }
    getChildren(node: NodeRef): NodeRef[] {
        return this._data.nodes.byId[node.id].children.map((id) => this._data.nodes.byId[id])
    }

    getAnnotation(node: NodeRef, name: string): any | null {
        return this._data.annotations[node.id][name]
    }
    getLabel(node: NodeRef): string | null {
        return this._data.nodes.byId[node.id].label
    }

    getAnnotationType(name: string): string {
        return this._data.annotationTypes[name]
    }
    addNode(): NodeRef {
        const id = `Node-${this._data.nodes.allIds.length}`
        this._data.nodes.byId[id] = {
            id,
            children: [],
            parent: null,
            label: '',
            length: null,
            divergence: null,
            height: null,
            name: null
        }
        this._data.nodes.allIds.push(id)
        this._data.annotations[id] = {}
        return this._data.nodes.byId[id]
    }

    get nodeCount(): number {
        return this._data.nodes.allIds.length
    }
    get externalNodeCount(): number {
        return this._data.nodes.allIds.filter(n => this.getChildCount(this.getNode(n)) === 0).length
    }
    get InternalNodeCount(): number {
        return this._data.nodes.allIds.filter(n => this.getChildCount(this.getNode(n)) > 0).length
    }
    get externalNodes(): NodeRef[] {
        throw new Error("Method not implemented.")
    }
    get internalNodes(): NodeRef[] {
        throw new Error("Method not implemented.")
    }
    get root(): NodeRef | null {
        return this.getNode(this._data.rootNode!)
    }

    // set root(node: Node | null) {
    //     throw new Error("Method not implemented.")
    // }

    getName(node: NodeRef): string | null {
        return this._data.nodes.byId[node.id].name
    }
}



function checkAnnotation(tree: Tree, input: { name: string, suggestedType: AnnotationType }): AnnotationType {
    let annotationType = tree.getAnnotationType(input.name);
    let suggestedType = input.suggestedType

    if (!annotationType) {
        return suggestedType;
    } else if (annotationType === suggestedType){
        return annotationType;
    }
    else if (annotationType  !== suggestedType) {
        if ((suggestedType === AnnotationType.INTEGER && annotationType === AnnotationType.CONTINUOUS) ||
            (suggestedType === AnnotationType.CONTINUOUS && annotationType === AnnotationType.INTEGER)) {
            // upgrade to float
            return AnnotationType.CONTINUOUS;
        } 
    }
    throw new Error(`Annotation ${input.name} has type ${suggestedType} but previously seen as ${annotationType}`)
}