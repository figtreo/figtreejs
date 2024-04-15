import { AnnotationType, NodeRef, Tree } from "./Tree.types";
import { extent } from "d3-array";
import { processAnnotationValue } from "./parsing";

export abstract class AbstractTree implements Tree {


    annotateNodeUnknownType(node: NodeRef, annotations: { value: any, id: string }[] | { value: any, id: string }): void {
        if (!Array.isArray(annotations)) {
            annotations = [annotations]
        }
        for (const annotation of annotations) {
            let { type, value } = processAnnotationValue(annotation.value);
            this.annotateNode(node, { name: annotation.id, value, type })
        }

    }

    orderNodesByDensity(increasing: boolean, node?: NodeRef): void {
        if (node === undefined) {
            if (this.root === null) {
                throw new Error("No root node and no node provided to density ordering")
            }
            node = this.root
        }
        const factor = increasing ? 1 : -1;
        orderNodes(this, node, (nodeA, countA, nodeB, countB) => {
            return (countA - countB) * factor;
        });
    }
    abstract removeChild(parent: NodeRef, child: NodeRef): void;
    abstract getLevel(node: NodeRef): number;
    abstract sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): void;
    abstract getNodeByName(name: string): NodeRef | null;
    abstract getNodeByLabel(name: string): NodeRef | null;
    abstract setRoot(node: NodeRef): void
    abstract addChild(parent: NodeRef, child: NodeRef): void
    abstract setParent(node: NodeRef, parent: NodeRef): void
    abstract getName(node: NodeRef): string | null
    abstract getNode(number:number): NodeRef
    abstract getDivergence(node: NodeRef): number
    abstract getHeight(node: NodeRef): number
    abstract getLength(node: NodeRef): number
    abstract getChildCount(node: NodeRef): number
    abstract getChild(node: NodeRef, index: number): NodeRef
    abstract getParent(node: NodeRef): NodeRef | null
    abstract getChildren(node: NodeRef): NodeRef[]
    abstract getAnnotation(node: NodeRef, name: string): any | undefined
    abstract getLabel(node: NodeRef): string | null
    abstract getAnnotationType(name: string): string|undefined
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
    abstract removeAllChildren(node: NodeRef): void;
    abstract getSibling(node: NodeRef): NodeRef | null;
    abstract setLevel(node: NodeRef,level:number):void; 
    abstract getAnnotationDomain(name: string): [number, number]|[boolean,boolean] | string[] | number[] | undefined ;
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

    getPathToRoot(node: NodeRef): Generator<NodeRef> {
        return toRootGenerator(this, node);
    }
    //TODO annotations
    _toString(node: NodeRef): string {
        return (this.getChildCount(node) > 0 ? `(${this.getChildren(node).map(child => this._toString(child)).join(",")})${this.getLabel(node) ? "#" + this.getLabel(node) : ""}` : `${this.getName(node) ? this.getName(node) : ""}`) + (this.getLength(node) ? `:${this.getLength(node)}` : "");
    }

    toNewick(node?: NodeRef, options?: { includeAnnotations: boolean; }): string {
        if (options === undefined) {
            options = { includeAnnotations: false }
        }
        if (node === undefined) {
            if (this.root === null) {
                throw new Error("No root node and no node provided to newick generator")
            }
            node = this.root
        }

        return this._toString(node) + ";";
    }
    getMRCA(nodes: NodeRef[]): NodeRef {
        const ancestors = new Set()

        let mrca;
        for (const node of nodes) {
            for (const ancestor of this.getPathToRoot(node)) {
                if (ancestors.has(ancestor)) {
                    mrca = mrca === undefined ? ancestor : this.getLevel(mrca) > this.getLevel(ancestor) ? mrca : ancestor;
                    mrca = ancestor;
                    break;
                }
                ancestors.add(ancestor)
            }
        }

        return mrca!;

    }
    rotate(node: NodeRef, recursive: boolean): void {
        if (recursive) {
            const children = this.getChildren(node);
            for (const child of children) {
                this.rotate(child, recursive);
            }
        }
        const children = this.getChildren(node);
        this.removeAllChildren(node);
        for (let i = children.length - 1; i >= 0; i--) {
            this.addChild(node, children[i])
        }
    }
    reroot(node: NodeRef, proportion: number): void {
        if (node === this.root) {
            // the node is the root - nothing to do
            return;
        }
        if(!this.root){
            throw new Error("No root node")
        }

        const rootLength = this.getLength(this.getChild(this.root!, 0)) + this.getLength(this.getChild(this.root!, 1))

        if (this.getParent(node) !== this.root) {
            // the node is not a child of the existing root so the root is actually changing

            let node0 = node;
            let parent = this.getParent(node)!;

            if(!parent){
                throw new Error("no parent")
            }
            let lineage: NodeRef[] = [];

            // was the node the first child in the parent's children?
            const nodeAtTop = this.getChild(parent, 0) === node;

            const rootChild1 = node;
            const rootChild2 = parent;

            let oldLength = this.getLength(parent);

            while (this.getParent(parent) !== null) {

                // remove the node that will becoming the parent from the children
                this.removeChild(parent, node0);

                if (this.getParent(parent) === this.root) {
                    const sibling = this.getSibling(parent)!;
                    
                    if(!sibling){
                        console.log(parent.id)
                        console.log(this.getChildren(this.getParent(parent)!).map(d=>d.id))
                        throw new Error("no sibling")
                    }
                    this.addChild(parent, sibling)
                    this.setLength(sibling, rootLength);

                } else {
                    // swap the parent and parent's parent's length around
                    const nan = this.getParent(parent)!;
                    if(!nan){
                    throw new Error("no nan!")
                    }
                    const nanLength = this.getLength(nan);
                    this.setLength(nan, oldLength);
                    this.setLength(parent, nanLength);

                    // add the new child
                    // parent._children.push(parent.parent);
                    this.addChild(parent, nan);
                }

                lineage = [parent, ...lineage];

                node0 = parent;
                parent = this.getParent(parent)!;
            }

            // Reuse the root node as root...

            // Set the order of the children to be the same as for the original parent of the node.
            // This makes for a more visually consistent rerooting graphically.
            this.removeAllChildren(this.root!)
            this.addChild(this.root!, rootChild1)
            this.addChild(this.root!, rootChild2)
            if (nodeAtTop) {
                this.rotate(this.root!, false)
            }
            // connect all the children to their parents
            this.internalNodes
                .forEach((node) => {
                    for (const child of this.getChildren(node)) {
                        this.setParent(child, node)
                    }

                });

            const l = this.getLength(rootChild1) * proportion;
            this.setLength(rootChild2, l)
            this.setLength(rootChild1, this.getLength(rootChild1) - l)

        } else {
            // the root is staying the same, just the position of the root changing
            const l = this.getLength(node) * (1.0 - proportion);
            this.setLength(node, l)
            this.setLength(this.getSibling(node)!, rootLength - l)
        }

//update divergence and hights and levels

        updateByLengths(this);

    }

    protected checkAnnotation(input: { name: string, suggestedType: AnnotationType }): AnnotationType {
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
    
    protected updateDomain( annotation: { id: string; value: any;type:AnnotationType }): [number, number] | string[] | number[]|[boolean,boolean]  {
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

}

function updateDivergenceAndLevelsFromLengths(tree: Tree):number{
    let maxD = 0;
    for(const node of tree.getPreorderNodes()){
        const parent = tree.getParent(node);
        if(parent){
            const divergence = tree.getDivergence(parent) + tree.getLength(node);
            const level = tree.getLevel(parent) + 1;
            tree.setDivergence(node,divergence);
            tree.setLevel(node,level);
            if(divergence>maxD){
                maxD = divergence;
            }
        }else{
            tree.setDivergence(node,0);
            tree.setLevel(node,0);
        }
    }
    return maxD;
}
function updateHeightsFromDivergence(tree: Tree,maxD:number):void{
    for(const node of tree.getPreorderNodes()){
        const height = maxD - tree.getDivergence(node);
        tree.setHeight(node,height);
    }
}

function updateByLengths(tree: Tree): void {
    const maxD = updateDivergenceAndLevelsFromLengths(tree);
    updateHeightsFromDivergence(tree,maxD);
}

function* toRootGenerator(tree: Tree, node: NodeRef): Generator<NodeRef> {
    const travel = function* (node: NodeRef): Generator<NodeRef> {
        let n: NodeRef | null = node
        while (n) {
            yield n;
            n = tree.getParent(n);
        }
    }
    yield* travel(node);
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
function orderNodes(tree: Tree, node: NodeRef, ordering: (a: NodeRef, numberOfATips: number, b: NodeRef, numberOfBTips: number) => number, callback?: Function) {
    let count = 0;
    if (tree.getChildCount(node) > 0) {
        // count the number of descendents for each child
        const counts = new Map();
        for (const child of tree.getChildren(node)) {
            const value = orderNodes(tree, child, ordering, callback);
            counts.set(child, value);
            count += value;
        }

        // sort the children using the provided function
        tree.sortChildren(node, (a, b) => {
            return ordering(a, counts.get(a), b, counts.get(b))
        });

        if (callback) callback();
    } else {
        count = 1
    }
    return count;
}
