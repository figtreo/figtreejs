// Layouts are classes that define the layout of the tree. They are responsible for
// calculating those layouts, but they should not create side effects. So each class here 
// is should only use static methods. and store any state as static constants.

import { max } from "d3-array"
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree"
import { scaleLinear } from "d3-scale"
//TODO make tree

// TODO caching

//
export interface Label {
    x: number,
    y: number,
    alignmentBaseline: string,
    textAnchor: string,
    rotation: number,
    alignedPos?: { x: number, y: number }
}
export interface Vertex {
    id: string,
    x: number,
    y: number,
    level: number,
    branch?: {
        d: string,
        label: Label
    },
    d?: string, //path
    theta?: number, //angle
    r?: number, //radius
    nodeLabel: Label
}


export interface ArbitraryVertex {
    id: string,
    x: number,
    y: number,
    level: number,
    theta?: number, //angle
    pathPoints: { x: number, y: number }[]
    nodeLabel:{dx:number,dy:number,alignmentBaseline:string,textAnchor:string,rotation?:number}
}

//ids match node ids
export interface Vertices {
    byId: { [id: string]: Vertex },
    allIds: string[]
}

export interface ArbitraryVertices {
    byId: { [id: string]: ArbitraryVertex },
    allIds: string[]
    extent: { x: [number, number], y: [number, number] }
}

export type internalLayoutOptions = { // all layout options plus width and height of drawable area
    width: number,
    height: number,
    rootLength: number,
    rootAngle: number,
    angleRange: number,
    tipSpace: (tip1: NodeRef, tip2: NodeRef) => number, //Todo make arguements nodeRefs
    curvature: number,
    showRoot: boolean,
    spread: number,
    pointOfInterest: { x: number; y: number; };
    fishEye: number;
}

export abstract class AbstractLayout {
    static readonly padding = 20;
    static layout(tree: NormalizedTree, layoutOptions: internalLayoutOptions): Vertices {
        const arbitraryLayout = this.getArbitraryLayout(tree, layoutOptions);
        const treeStats = { tipCount: [...tree.getTips()].length } //todo cache this count
        return this.finalizeArbitraryLayout(arbitraryLayout, treeStats, layoutOptions);
    }

    static getArbitraryLayout(tree: NormalizedTree, opts: internalLayoutOptions): ArbitraryVertices {
        throw new Error("Method not implemented.")
    }
    static finalizeArbitraryLayout(arbitraryVertices: ArbitraryVertices, treeStats: { tipCount: number }, opts: internalLayoutOptions): Vertices {
        throw new Error("Method not implemented.")
    }
    //  cartoonGenerator(tree:NormalizedTree,vertices:Vertices,):string

}


