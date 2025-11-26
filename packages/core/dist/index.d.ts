import { immerable } from 'immer';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { Maybe } from '@figtreejs/maybe/maybe';
import { ScaleContinuousNumeric } from 'd3-scale';

/** A single, generic annotation, discriminated by `type`. */
export declare type AbstractAnnotation<T extends BaseAnnotationType> = {
    id: string;
    type: T;
    value: ValueOf<T>;
};

export declare interface AbstractAnnotationSummary<T extends BaseAnnotationType> {
    id: string;
    type: T;
    domain: DomainOf<T>;
}

export declare type Annotation = {
    [K in BaseAnnotationType]: AbstractAnnotation<K>;
}[BaseAnnotationType];

export declare type AnnotationDomain = {
    [K in BaseAnnotationType]: DomainOf<K>;
}[BaseAnnotationType];

export declare type AnnotationSummary = {
    [K in BaseAnnotationType]: AbstractAnnotationSummary<K>;
}[BaseAnnotationType];

export declare type AnnotationValue = {
    [K in BaseAnnotationType]: ValueOf<K>;
}[BaseAnnotationType];

export declare interface ArbitraryVertex {
    hidden: boolean;
    labelHidden: boolean;
    number: number;
    x: number;
    y: number;
    level: number;
    theta?: number;
    pathPoints: {
        x: number;
        y: number;
    }[];
    nodeLabel: {
        dx: number;
        dy: number;
        alignmentBaseline: string;
        textAnchor: string;
        rotation?: number;
    };
}

export declare interface ArbitraryVertices {
    vertices: ArbitraryVertex[];
    extent: {
        x: [number, number];
        y: [number, number];
    };
}

/** Attribute as they are passed internally to possibly animated svg elements */
declare type Attrs = Record<string, number | string>;

declare type AxisBarOptions = Omit<AxisBarsProps, "axisY" | "type" | "tickValues" | "scale" | "figureScale" | "layoutClass">;

declare interface AxisBarsProps {
    evenFill?: string;
    oddFill?: string;
    attrs?: Attrs;
    lift?: number;
    type?: "Rectangular" | "Polar";
    tickValues: number[];
    scale: ScaleContinuousNumeric<number, number>;
    axisY: number;
}

declare type AxisOrientation = "horizontal" | "vertical" | "polar";

declare interface AxisProps {
    offsetBy?: number;
    scaleBy?: number;
    reverse?: boolean;
    gap?: number;
    title?: {
        text: string;
        padding: number;
        style: Attrs;
    };
    ticks?: AxisTicksOptions;
    direction?: AxisOrientation;
    scale?: ScaleContinuousNumeric<number, number>;
    attrs: Attrs;
    type?: "Polar" | "Rectangular";
    bars?: AxisBarOptions;
}

declare type AxisTicksOptions = {
    number?: number;
    format?: (value: number) => string;
    padding?: number;
    style?: {
        [key: string]: number | string;
    };
    length?: number;
    values?: number[];
};

export declare enum BaseAnnotationType {
    DISCRETE = "DISCRETE",// string  could also be stringy numbers
    BOOLEAN = "BOOLEAN",// true false
    NUMERICAL = "NUMERICAL",// float
    NUMERICAL_SET = "NUMERICAL_SET",// number[]
    DISCRETE_SET = "DISCRETE_SET",// string[]
    MARKOV_JUMPS = "MARKOV_JUMPS",// {from: to: time:}
    DENSITIES = "DENSITIES"
}

declare type BaseBaubleOptions<A> = {
    id?: string;
    attrs: A;
    interactions?: InteractionType;
} & (filterOption | nodeOption);

declare type BaseCircleDOMProps = Omit<React.ComponentProps<"circle">, "ref"> & {
    ref?: React.Ref<SVGCircleElement>;
};

declare type BasePathDOMProps = Omit<React.ComponentProps<"path">, "ref"> & {
    ref?: React.Ref<SVGPathElement>;
};

/**
 * Rectangle attributes for styling and rendering a rectangle.
 * These will be stripped and trickle up to the user
 */
declare type BaseRectangleDOMProps = Omit<React.ComponentProps<"rect">, "ref"> & {
    ref?: React.Ref<SVGRectElement>;
};

/**
 * Label attributes for styling and rendering labels.
 * These will be stripped and trickle up to the user
 */
declare type BaseTextDOMProps = Omit<React.ComponentProps<"text">, "ref"> & {
    ref?: React.Ref<SVGTextElement>;
};

declare enum BaubleTarget {
    Node = 0,
    Branch = 1,
    NodeLabel = 2,
    BranchLabel = 3,
    Clade = 4,
    Axis = 5
}

declare type BranchAttrs = ExposedAttrs<PathAttrs>;

/**
 * This function takes options from the user about the branches they would like in the figure
 * and passes it to the figure. It is a nice functional API.
 *
 */
export declare function Branches(options: BranchOptions): InternalBranchOptions;

export declare function BranchLabels(options: ExternalLabelOptions): InternalLabelOptions;

export declare type BranchOptions = BaseBaubleOptions<BranchAttrs> & {
    curvature?: number;
};

declare type CartoonAttrs = ExposedAttrs<PathAttrs>;

export declare function CartoonClades(options: CartoonOptions): InternalCladeOptions;

export declare interface CartoonData {
    cartooned: boolean;
    collapseFactor: number;
}

export declare type CartoonOptions = BaseBaubleOptions<CartoonAttrs>;

declare type CircleAttrs = Omit<BaseCircleDOMProps, "cx" | "cy"> & {
    r: number;
};

declare type CircleNodeAttrs = ExposedAttrs<CircleAttrs>;

export declare type CircleNodeOptions = BaseBaubleOptions<CircleNodeAttrs>;

export declare function CircleNodes(options: CircleNodeOptions): InternalNodeOptions;

declare enum CladeShapes {
    Cartoon = 0,
    Highlight = 1
}

/**
 * A function that converts a date into a decimal.
 * @param date
 * @return {number}
 */
export declare function dateToDecimal(date: Date): number;

/**
 * A function which converts a decimal float into a date object
 * @param decimalDate
 * @return {Date}
 */
export declare function decimalToDate(decimal: number): Date;

export declare const defaultInternalLayoutOptions: {
    width: number;
    height: number;
    rootLength: number;
    rootAngle: number;
    angleRange: number;
    tipSpace: () => number;
    curvature: number;
    showRoot: boolean;
    spread: number;
    fishEye: {
        x: number;
        y: number;
        scale: number;
    };
    cartoonedNodes: Map<any, any>;
    pollard: number;
    padding: number;
    invert: boolean;
    minRadius: number;
};

export declare type DomainOf<T extends BaseAnnotationType> = T extends BaseAnnotationType.DISCRETE ? string[] : T extends BaseAnnotationType.BOOLEAN ? [boolean, boolean] : T extends BaseAnnotationType.NUMERICAL ? [number, number] : T extends BaseAnnotationType.NUMERICAL_SET ? [number, number] : T extends BaseAnnotationType.DISCRETE_SET ? string[] | number[] : T extends BaseAnnotationType.MARKOV_JUMPS ? string[] : T extends BaseAnnotationType.DENSITIES ? string[] : never;

declare type ExposedAttrs<A> = {
    [K in keyof A]: A[K] | ((n: NodeRef) => A[K]);
};

export declare type ExternalLabelOptions = Omit<LabelOptions, "attrs"> & {
    attrs?: LabelAttrs;
};

export declare function FigTree(props: FigtreeProps): JSX_2.Element;

export declare interface FigtreeProps {
    width: number;
    height: number;
    layout: layoutFunction;
    tree: ImmutableTree;
    margins?: Margins;
    baubles?: InternalBaubleOptions[];
    opts?: layoutOptions;
    animated?: boolean;
    x?: number;
    y?: number;
    axis?: AxisProps;
}

declare type filterOption = {
    filter?: (n: NodeRef) => boolean;
};

declare type fishEyeOptions = {
    x: number;
    y: number;
    scale: number;
};

export declare interface FunctionalVertex extends simpleVertex {
    layoutClass: layoutClass;
    nodeLabel?: NodeLabelType;
}

declare type HighlightAttrs = ExposedAttrs<HighlightRectAttrs>;

export declare function HighlightClades(options: HighlightOptions): InternalCladeOptions;

export declare type HighlightOptions = BaseBaubleOptions<HighlightAttrs>;

declare type HighlightRectAttrs = Omit<RectAttrs, "width" | "height">;

export declare class ImmutableTree implements Tree, TaxonSetInterface {
    [immerable]: boolean;
    _data: ImmutableTreeData;
    taxonSet: TaxonSet;
    constructor(input?: {
        data?: ImmutableTreeData;
        taxonSet?: TaxonSet;
    });
    lockTaxa(): TaxonSetInterface;
    addTaxon(taxonOrName: string | Taxon): this;
    getTaxonCount(): number;
    getTaxonSet(): TaxonSetInterface;
    static fromNewick(newick: string, options?: newickParsingOptions): ImmutableTree;
    static fromNexus(nexus: string, options?: newickParsingOptions): ImmutableTree;
    static fromString(string: string, options?: newickParsingOptions): ImmutableTree;
    static fromTree(tree: ImmutableTree, rootNode: NodeRef): ImmutableTree;
    static _addNodeWithMetadata(tree: ImmutableTree, node: NodeRef, newTree: ImmutableTree): ImmutableTree;
    static _copyNodeMetadata(tree: ImmutableTree, node: NodeRef, newTree: ImmutableTree, newNode: NodeRef): ImmutableTree;
    isRooted(): boolean;
    getAnnotationType(name: string): BaseAnnotationType;
    getAnnotationKeys(): string[];
    getRoot(): NodeRef;
    getNodeCount(): number;
    getInternalNodeCount(): number;
    getExternalNodeCount(): number;
    getInternalNodes(): NodeRef[];
    getExternalNodes(): NodeRef[];
    getNodes(): NodeRef[];
    getNode(i: nodeIndex): NodeRef;
    getNodeByTaxon(taxon: Taxon): NodeRef;
    getTaxonByName(name: string): Taxon;
    getNodeByLabel(label: string): NodeRef;
    hasTaxon(node: NodeRef): boolean;
    getTaxonFromNode(node: NodeRef): Taxon;
    getTaxon(id: number | NodeRef | string): Taxon;
    hasNodeHeights(): boolean;
    getHeight(node: NodeRef): number;
    hasBranchLength(node: NodeRef): boolean;
    getLength(node: NodeRef): number;
    hasLengths(): boolean;
    _toString(node: NodeRef, options?: {
        blFormat: (value: number) => string;
        includeAnnotations: boolean;
    }): string;
    _writeAnnotations(node: NodeRef): string;
    toNewick(node?: NodeRef, options?: {
        blFormat?: (value: number) => string;
        includeAnnotations?: boolean;
    }): string;
    getMRCA(node1: NodeRef | NodeRef[], node2?: NodeRef): NodeRef;
    getPath(node1: NodeRef, node2: NodeRef): NodeRef[];
    getPathLength(node1: NodeRef, node2: NodeRef): number;
    getPathToRoot(node: NodeRef): Generator<NodeRef>;
    getNextSibling(node: NodeRef): NodeRef;
    hasRightSibling(node: NodeRef): boolean;
    getRightSibling(node: NodeRef): NodeRef;
    hasLeftSibling(node: NodeRef): boolean;
    getLeftSibling(node: NodeRef): NodeRef;
    getDivergence(node: NodeRef): number;
    getChildCount(node: NodeRef): number;
    getChild(node: NodeRef, index: number): NodeRef;
    getParent(node: NodeRef): NodeRef;
    getChildren(node: NodeRef): NodeRef[];
    hasLabel(node: NodeRef): boolean;
    getLabel(node: NodeRef): string;
    isExternal(node: NodeRef): boolean;
    isInternal(node: NodeRef): boolean;
    isRoot(node: NodeRef): boolean;
    addNodes(n?: number): {
        tree: ImmutableTree;
        nodes: NodeRef[];
    };
    setTaxon(node: NodeRef, taxon: Taxon): this;
    getAnnotationSummary(name: string): AnnotationSummary;
    getAnnotations(): AnnotationSummary[];
    getAnnotation(node: NodeRef, name: string, d?: AnnotationValue): AnnotationValue;
    getFullNodeAnnotation(node: NodeRef, name: string): Annotation;
    hasAnnotation(node: NodeRef, name: string): boolean;
    annotateNode(node: NodeRef, name: string, value: RawAnnotationValue): Tree;
    annotateNode(node: NodeRef, annotation: Record<string, RawAnnotationValue>): Tree;
    setHeight(node: NodeRef, height: number): this;
    setLength(node: NodeRef, length: number): this;
    deleteLength(node: NodeRef): this;
    setDivergence(node: NodeRef, divergence: number): this;
    setLabel(node: NodeRef, label: string): this;
    insertNode(n: NodeRef, proportion?: number): this;
    unroot(_n: NodeRef): ImmutableTree;
    deleteNode(_n: NodeRef): ImmutableTree;
    deleteClade(_n: NodeRef): ImmutableTree;
    orderNodesByDensity(down: boolean, node?: NodeRef): this;
    rotate(nodeRef: NodeRef, recursive?: boolean): this;
    reroot(node: NodeRef, proportion?: number): this;
    removeChild(parent: NodeRef, child: NodeRef): this;
    sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): this;
    addChild(parent: NodeRef, child: NodeRef): this;
    setRoot(node: NodeRef): this;
}

export declare interface ImmutableTreeData {
    nodes: {
        allNodes: Node_2[];
        byTaxon: number[];
        byLabel: {
            [label: string]: number;
        };
    };
    heights: [];
    nodeToTaxon: number[];
    rootNode: number;
    is_rooted: boolean;
    hasLengths: boolean;
    annotations: {
        [annotation: string]: AnnotationSummary;
    };
}

declare type InteractionType = {
    onClick?: (n: NodeRef) => void;
    OnMouseOver?: (n: NodeRef) => void;
    onEnter?: (n: NodeRef) => void;
    onExit?: (n: NodeRef) => void;
};

declare type InternalBaubleOptions = InternalNodeOptions | InternalBranchOptions | InternalLabelOptions | InternalCladeOptions;

export declare type InternalBranchOptions = BranchOptions & {
    target: BaubleTarget.Branch;
};

export declare type InternalCladeOptions = ((HighlightOptions & {
    shape: CladeShapes.Highlight;
}) | (CartoonOptions & {
    shape: CladeShapes.Cartoon;
})) & {
    target: BaubleTarget.Clade;
};

export declare type InternalLabelOptions = LabelOptions & ({
    target: BaubleTarget.NodeLabel;
    aligned?: boolean;
} | {
    target: BaubleTarget.BranchLabel;
});

export declare interface internalLayoutOptions extends layoutOptions {
    width?: number;
    height?: number;
}

export declare type InternalNodeOptions = ((CircleNodeOptions & {
    shape: NodeShapes.Circle;
}) | (RectangleNodeOptions & {
    shape: NodeShapes.Rectangle;
})) & {
    target: BaubleTarget.Node;
};

export declare interface Label {
    x: number;
    y: number;
    alignmentBaseline: string;
    textAnchor: string;
    rotation: number;
    alignedPos?: {
        x: number;
        y: number;
    };
}

declare type LabelAttrs = ExposedAttrs<LabelSpecificTextAttrs>;

declare type LabelOptions = BaseBaubleOptions<LabelAttrs> & ExposedAttrs<{
    text: string;
}>;

declare type LabelSpecificTextAttrs = Omit<TextAttrs, "text">;

export declare enum layoutClass {
    Rectangular = "Rectangular",
    Polar = "Polar",
    Radial = "Radial"
}

declare type layoutFunction = (tree: ImmutableTree, options?: layoutOptions) => (node: NodeRef) => FunctionalVertex;

declare interface layoutOptions {
    rootLength?: number;
    rootAngle?: number;
    angleRange?: number;
    showRoot?: boolean;
    spread?: number;
    fishEye?: fishEyeOptions;
    pollard: number;
    invert?: boolean;
    minRadius?: number;
    padding?: number;
}

/**
 * Helper function to determine if the provided year is a leap year
 * @param year
 * @return {boolean}
 */
export declare function leapYear(year: number): boolean;

declare interface Margins {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export declare type MarkovJumpValue = {
    from: string;
    to: string;
    time?: number;
};

export declare type maybeNodeIndex = Maybe<nodeIndex>;

export declare interface newickParsingOptions {
    dateFormat?: string;
    datePrefix?: string;
    labelName?: string;
    parseAnnotations?: boolean;
    tipNameMap?: Map<string, string>;
    taxonSet?: TaxonSet;
}

export declare class NexusImporter {
    reader: ReadableStreamDefaultReader<string>;
    taxonSet: TaxonSet;
    currentBlock: string | undefined;
    hasTree: boolean | undefined;
    options: {
        labelName?: string;
    };
    translateTaxonMap: Map<string, string> | undefined;
    constructor(stream: ReadableStream<BufferSource>, options?: {
        labelName?: string;
    });
    getTrees(): AsyncIterableIterator<ImmutableTree>;
    private parseNextBlock;
    private nextToken;
    private skipSemiColon;
    private getNextBlockName;
    private readToEndOfBlock;
    private skipUntil;
    private readUntil;
    private parseTaxaBlock;
    private parseTreesBlock;
}

declare interface Node_2 extends NodeRef {
    number: number;
    taxon: number | undefined;
    label: string | undefined;
    children: number[];
    parent: number | undefined;
    length: number | undefined;
    annotations: {
        [annotation: string]: Annotation;
    };
    _id: string;
}
export { Node_2 as Node }

export declare type nodeIndex = string | number | Taxon;

export declare function NodeLabels(options: ExternalLabelOptions & {
    aligned?: boolean;
}): InternalLabelOptions;

export declare type NodeLabelType = {
    alignmentBaseline: React.SVGAttributes<SVGTextElement>["alignmentBaseline"];
    textAnchor: React.SVGAttributes<SVGTextElement>["textAnchor"];
    dxFactor: number;
    dyFactor: number;
    rotation: number;
};

declare type nodeOption = {
    nodes: NodeRef[];
};

export declare interface NodeRef {
    number: number;
    _id: string;
}

declare enum NodeShapes {
    Circle = 0,
    Rectangle = 1
}

export declare function notNull<T>(x: T, message: string): asserts x is NonNullable<T>;

export declare function panic(message: string): never;

declare type PathAttrs = Omit<BasePathDOMProps, "d">;

export declare function pathToRootIterator(tree: Tree, node: NodeRef): Generator<NodeRef>;

export declare const polarLayout: (tree: ImmutableTree) => (node: NodeRef) => FunctionalVertex;

export declare interface PolarVertex extends simplePolarVertex {
    layoutClass: layoutClass.Polar;
    nodeLabel?: NodeLabelType;
}

export declare function postOrderIterator(tree: Tree, node?: NodeRef | undefined): Generator<NodeRef>;

export declare function preOrderIterator(tree: Tree, node?: NodeRef | undefined): Generator<NodeRef>;

export declare class PreOrderTraversalCache implements TreeTraversal {
    _forwardCache: Map<NodeRef, NodeRef>;
    _reverseCache: Map<NodeRef, NodeRef>;
    constructor();
    traverse(tree: Tree, node?: NodeRef): Generator<NodeRef>;
    getNext(tree: Tree, node: NodeRef): NodeRef | undefined;
    getPrevious(tree: Tree, node: NodeRef): NodeRef | undefined;
}

export declare function psuedoRootPostOrderIterator(tree: Tree, node?: NodeRef | undefined, sort?: (a: NodeRef, b: NodeRef) => number): Generator<NodeRef>;

export declare function psuedoRootPreOrderIterator(tree: Tree, node?: NodeRef | undefined, sort?: (a: NodeRef, b: NodeRef) => number): Generator<NodeRef>;

export declare function radialLayout(tree: ImmutableTree, options?: {
    spread?: number;
}): (node: NodeRef) => FunctionalVertex;

export declare type RawAnnotationValue = {
    [K in BaseAnnotationType]: RawValueOf<K>;
}[BaseAnnotationType];

export declare type RawValueOf<T extends BaseAnnotationType> = T extends BaseAnnotationType.DISCRETE ? string : T extends BaseAnnotationType.BOOLEAN ? boolean : T extends BaseAnnotationType.NUMERICAL ? number : T extends BaseAnnotationType.NUMERICAL_SET ? number[] : T extends BaseAnnotationType.DISCRETE_SET ? string[] : T extends BaseAnnotationType.MARKOV_JUMPS ? [number, string, string][] | [string, string, string][] : T extends BaseAnnotationType.DENSITIES ? Record<string, number> : never;

declare type RectangleNodeAttrs = ExposedAttrs<RectAttrs>;

export declare type RectangleNodeOptions = BaseBaubleOptions<RectangleNodeAttrs>;

export declare function RectangleNodes(options: RectangleNodeOptions): InternalNodeOptions;

export declare const rectangularLayout: (tree: ImmutableTree) => (node: NodeRef) => FunctionalVertex;

declare type RectAttrs = BaseRectangleDOMProps & {
    width: number;
    height: number;
};

export declare interface simplePolarVertex extends simpleVertex {
    theta: number;
    r: number;
}

export declare interface simpleVertex {
    x: number;
    y: number;
}

export declare interface Taxon {
    name: string;
    number: number;
    annotations: {
        [annotation: string]: string | string[] | number | number[];
    };
}

export declare class TaxonSet implements TaxonSetInterface {
    _data: TaxonSetData;
    constructor(taxonSetData?: TaxonSetData);
    lockTaxa(): TaxonSetInterface;
    addTaxon(taxonOrName: string | Taxon): this;
    getTaxon(id: number): Taxon;
    getTaxonByName(name: string): Taxon;
    hasTaxon(id: string): boolean;
    getTaxonCount(): number;
    get isFinalized(): boolean;
}

export declare interface TaxonSetData {
    allNames: string[];
    byName: {
        [taxon: string]: Taxon;
    };
    finalized: boolean;
}

export declare interface TaxonSetInterface {
    addTaxon(name: string): TaxonSetInterface;
    getTaxon(id: number): Taxon | undefined;
    getTaxonByName(name: string): Taxon;
    getTaxonCount(): number;
    lockTaxa(): TaxonSetInterface;
}

declare type TextAttrs = BaseTextDOMProps & {
    text: string;
};

export declare function tipIterator(tree: Tree, node?: NodeRef): Generator<NodeRef>;

export declare interface Tree {
    getRoot(): NodeRef;
    isRooted(): boolean;
    getNodeCount(): number;
    getInternalNodeCount(): number;
    getExternalNodeCount(): number;
    getNode(i: string | Taxon | number): NodeRef;
    getInternalNodes(): NodeRef[];
    getExternalNodes(): NodeRef[];
    getNodes(): NodeRef[];
    getTaxon(id: number | NodeRef): Taxon;
    isExternal(node: NodeRef): boolean;
    isInternal(node: NodeRef): boolean;
    isRoot(node: NodeRef): boolean;
    getChildCount(node: NodeRef): number;
    getChild(node: NodeRef, i: number): NodeRef;
    getNodeByTaxon(taxon: Taxon): NodeRef;
    getNodeByLabel(label: string): NodeRef;
    getDivergence(node: NodeRef): number;
    getHeight(node: NodeRef): number;
    getLength(node: NodeRef): number;
    getParent(node: NodeRef): NodeRef;
    getChildren(node: NodeRef): NodeRef[];
    getAnnotation(node: NodeRef, name: string, d?: AnnotationValue): AnnotationValue;
    annotateNode(node: NodeRef, name: string, value: RawAnnotationValue): Tree;
    annotateNode(node: NodeRef, annotation: Record<string, RawAnnotationValue>): Tree;
    getLabel(node: NodeRef): string;
    hasLabel(node: NodeRef): boolean;
    getAnnotationKeys(): string[];
    getAnnotationType(name: string): BaseAnnotationType;
    getAnnotations(): AnnotationSummary[];
    getAnnotationSummary(name: string): AnnotationSummary;
    addNodes(n?: number): {
        tree: Tree;
        nodes: NodeRef[];
    };
    deleteNode(n: NodeRef): Tree;
    removeChild(parent: NodeRef, child: NodeRef): Tree;
    deleteClade(n: NodeRef): Tree;
    getNextSibling(node: NodeRef): NodeRef;
    hasRightSibling(node: NodeRef): boolean;
    getRightSibling(node: NodeRef): NodeRef;
    hasLeftSibling(node: NodeRef): boolean;
    getLeftSibling(node: NodeRef): NodeRef;
    setHeight(node: NodeRef, height: number): Tree;
    setDivergence(node: NodeRef, divergence: number): Tree;
    setLength(node: NodeRef, length: number): Tree;
    setTaxon(node: NodeRef, taxon: Taxon): Tree;
    setLabel(node: NodeRef, label: string): Tree;
    addChild(parent: NodeRef, child: NodeRef): Tree;
    unroot(node: NodeRef): Tree;
    toNewick(node?: NodeRef, options?: {
        includeAnnotations: boolean;
    }): string;
    orderNodesByDensity(down: boolean): Tree;
    sortChildren(node: NodeRef, compare: (a: NodeRef, b: NodeRef) => number): Tree;
    isRoot(node: NodeRef): boolean;
    getMRCA(node1: NodeRef, node2: NodeRef): NodeRef;
    getMRCA(nodes: NodeRef[]): NodeRef;
    rotate(node: NodeRef, recursive: boolean): Tree;
    reroot(node: NodeRef, proportion: number): Tree;
}

export declare type TreeListener = (tree: Tree, node: NodeRef) => void;

declare interface TreeTraversal {
    getNext(tree: Tree, node: NodeRef): NodeRef | undefined;
    getPrevious(tree: Tree, node: NodeRef): NodeRef | undefined;
}

export declare function u<T>(x: T | undefined): NonNullable<T>;

export declare function unNullify<T>(x: T, message: string): NonNullable<T>;

export declare type ValueOf<T extends BaseAnnotationType> = T extends BaseAnnotationType.DISCRETE ? string : T extends BaseAnnotationType.BOOLEAN ? boolean : T extends BaseAnnotationType.NUMERICAL ? number : T extends BaseAnnotationType.NUMERICAL_SET ? number[] : T extends BaseAnnotationType.DISCRETE_SET ? string[] : T extends BaseAnnotationType.MARKOV_JUMPS ? MarkovJumpValue[] : T extends BaseAnnotationType.DENSITIES ? Record<string, number> : never;

export declare interface Vertex {
    number: number;
    x: number;
    y: number;
    hidden: boolean | undefined;
    labelHidden: boolean | undefined;
    level: number;
    branch?: {
        d: string;
        label: Label;
    };
    theta?: number;
    r?: number;
    nodeLabel: Label;
}

export declare interface Vertices {
    type: "Rectangular" | "Polar" | "Radial";
    vertices: Vertex[];
    origin?: {
        x: number;
        y: number;
    };
    theta?: [number, number];
    axisLength?: number;
}

export { }
