export interface NodeRef {
    id: string;
}
export declare enum AnnotationType {
    DISCRETE = "DISCRETE",
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    CONTINUOUS = "CONTINUOUS",
    PROBABILITIES = "PROBABILITIES",
    MARKOV_JUMP = "MARKOV_JUMP"
}
export interface newickParsingOptions {
    labelName?: string;
    parseAnnotations: boolean;
    tipNameMap?: Map<string, string>;
}
export interface Tree {
    getNodeByName(name: string): NodeRef | null;
    getNodeByLabel(label: string): NodeRef | null;
    getName(node: NodeRef): string | null;
    getLevel(node: NodeRef): number;
    getNode(id: string): NodeRef;
    getDivergence(node: NodeRef): number;
    getHeight(node: NodeRef): number;
    getLength(node: NodeRef): number;
    getChildCount(node: NodeRef): number;
    getChild(node: NodeRef, index: number): NodeRef;
    getParent(node: NodeRef): NodeRef | null;
    getChildren(node: NodeRef): NodeRef[];
    getAnnotation(node: NodeRef, name: string): any | null;
    getLabel(node: NodeRef): string | null;
    getAnnotationType(name: string): string | undefined;
    addNode(): NodeRef;
    removeAllChildren(node: NodeRef): void;
    removeChild(parent: NodeRef, child: NodeRef): void;
    getSibling(node: NodeRef): NodeRef | null;
    setHeight(node: NodeRef, height: number): void;
    setDivergence(node: NodeRef, divergence: number): void;
    setLength(node: NodeRef, length: number): void;
    setName(node: NodeRef, name: string): void;
    setLabel(node: NodeRef, label: string): void;
    annotateNodeUnknownType(node: NodeRef, annotations: {
        [key: string]: any;
    }): void;
    annotateNode(node: NodeRef, annotation: {
        name: string;
        value: any;
        type: AnnotationType;
    }): void;
    addChild(parent: NodeRef, child: NodeRef): void;
    setParent(node: NodeRef, parent: NodeRef): void;
    setRoot(node: NodeRef): void;
    toNewick(node?: NodeRef, options?: {
        includeAnnotations: boolean;
    }): string;
    orderNodesByDensity(increasing: boolean): void;
    sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): void;
    isRoot(node: NodeRef): boolean;
    getMRCA(nodes: NodeRef[]): NodeRef;
    rotate(node: NodeRef, recursive: boolean): void;
    reroot(node: NodeRef, proportion: number): void;
    setLevel(node: NodeRef, level: number): void;
    getAnnotationDomain(name: string): [number, number] | [boolean, boolean] | string[] | number[] | undefined;
    get nodeCount(): number;
    get externalNodeCount(): number;
    get InternalNodeCount(): number;
    get externalNodes(): NodeRef[];
    get internalNodes(): NodeRef[];
    get root(): NodeRef | null;
    getTips(node: NodeRef): Generator<NodeRef>;
    getTips(): Generator<NodeRef>;
    isExternal(node: NodeRef): boolean;
    isInternal(node: NodeRef): boolean;
    getPostorderNodes(node: NodeRef): Generator<NodeRef>;
    getPostorderNodes(): Generator<NodeRef>;
    getPreorderNodes(node: NodeRef): Generator<NodeRef>;
    getPreorderNodes(): Generator<NodeRef>;
}
