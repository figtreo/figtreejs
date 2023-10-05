import { NodeRef, Tree } from "../Tree";
import { layoutOptions } from "../components/FigTree/Figtree.types";
export interface Label {
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
export interface Vertex {
    id: string;
    x: number;
    y: number;
    level: number;
    branch?: {
        d: string;
        label: Label;
    };
    theta?: number;
    r?: number;
    nodeLabel: Label;
}
export interface ArbitraryVertex {
    id: string;
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
export interface Vertices {
    byId: {
        [id: string]: Vertex;
    };
    allIds: string[];
}
export interface ArbitraryVertices {
    byId: {
        [id: string]: ArbitraryVertex;
    };
    allIds: string[];
    extent: {
        x: [number, number];
        y: [number, number];
    };
}
export interface internalLayoutOptions extends layoutOptions {
    width: number;
    height: number;
}
export interface NodeDecoration {
    cartooned: boolean;
    collapseFactor: number;
    hilighted: boolean;
    customColor: string | undefined;
    taxaCustomColor: string | undefined;
}
export declare const defaultInternalLayoutOptions: {
    width: number;
    height: number;
    rootLength: number;
    rootAngle: number;
    angleRange: number;
    tipSpace: (tip1: NodeRef, tip2: NodeRef) => number;
    curvature: number;
    showRoot: boolean;
    spread: number;
    pointOfInterest: {
        x: number;
        y: number;
    };
    fishEye: number;
    nodeDecorations: {};
};
export declare abstract class AbstractLayout {
    static readonly padding = 20;
    static layout(tree: Tree, layoutOptions: internalLayoutOptions): Vertices;
    static getArbitraryLayout(tree: Tree, opts: internalLayoutOptions): ArbitraryVertices;
    static finalizeArbitraryLayout(arbitraryVertices: ArbitraryVertices, treeStats: {
        tipCount: number;
    }, opts: internalLayoutOptions): Vertices;
}
