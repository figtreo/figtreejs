import { AnnotationType, NodeRef, Tree } from "./Tree.types";
export declare abstract class AbstractTree implements Tree {
    annotateNodeUnknownType(node: NodeRef, annotations: {
        value: any;
        id: string;
    }[] | {
        value: any;
        id: string;
    }): void;
    orderNodesByDensity(increasing: boolean, node?: NodeRef): void;
    abstract removeChild(parent: NodeRef, child: NodeRef): void;
    abstract getLevel(node: NodeRef): number;
    abstract sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): void;
    abstract getNodeByName(name: string): NodeRef | null;
    abstract getNodeByLabel(name: string): NodeRef | null;
    abstract setRoot(node: NodeRef): void;
    abstract addChild(parent: NodeRef, child: NodeRef): void;
    abstract setParent(node: NodeRef, parent: NodeRef): void;
    abstract getName(node: NodeRef): string | null;
    abstract getNode(id: string): NodeRef;
    abstract getDivergence(node: NodeRef): number;
    abstract getHeight(node: NodeRef): number;
    abstract getLength(node: NodeRef): number;
    abstract getChildCount(node: NodeRef): number;
    abstract getChild(node: NodeRef, index: number): NodeRef;
    abstract getParent(node: NodeRef): NodeRef | null;
    abstract getChildren(node: NodeRef): NodeRef[];
    abstract getAnnotation(node: NodeRef, name: string): any | null;
    abstract getLabel(node: NodeRef): string | null;
    abstract getAnnotationType(name: string): string;
    abstract get nodeCount(): number;
    abstract get externalNodeCount(): number;
    abstract get InternalNodeCount(): number;
    abstract get externalNodes(): NodeRef[];
    abstract get internalNodes(): NodeRef[];
    abstract get root(): NodeRef | null;
    abstract setHeight(node: NodeRef, height: number): void;
    abstract setDivergence(node: NodeRef, divergence: number): void;
    abstract setLength(node: NodeRef, length: number): void;
    abstract annotateNode(node: NodeRef, annotations: {
        [key: string]: any;
    }): void;
    abstract addNode(): NodeRef;
    abstract setName(node: NodeRef, name: string): void;
    abstract setLabel(node: NodeRef, label: string): void;
    abstract isRoot(node: NodeRef): boolean;
    abstract isExternal(node: NodeRef): boolean;
    abstract isInternal(node: NodeRef): boolean;
    abstract removeAllChildren(node: NodeRef): void;
    abstract getSibling(node: NodeRef): NodeRef | null;
    abstract setLevel(node: NodeRef, level: number): void;
    abstract getAnnotationDomain(name: string): [number, number] | [boolean, boolean] | string[] | number[] | undefined;
    getTips(node?: NodeRef): Generator<NodeRef>;
    getPostorderNodes(node?: NodeRef): Generator<NodeRef>;
    getPreorderNodes(node?: NodeRef): Generator<NodeRef>;
    getPathToRoot(node: NodeRef): Generator<NodeRef>;
    _toString(node: NodeRef): string;
    toNewick(node?: NodeRef, options?: {
        includeAnnotations: boolean;
    }): string;
    getMRCA(nodes: NodeRef[]): NodeRef;
    rotate(node: NodeRef, recursive: boolean): void;
    reroot(node: NodeRef, proportion: number): void;
    protected checkAnnotation(input: {
        name: string;
        suggestedType: AnnotationType;
    }): AnnotationType;
    protected updateDomain(annotation: {
        id: string;
        value: any;
    }): [number, number] | string[] | number[] | [boolean, boolean];
}
