// Layouts are classes that define the layout of the tree. They are responsible for
// calculating those layouts, but they should not create side effects. So each class here 
// is should only use static methods. and store any state as static constants.

import { NodeRef, Tree } from "../Tree"
import { layoutOptions } from "../components/FigTree/Figtree.types"
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
    type: "Rectangular" | "Polar" |"Radial"
    byId: { [id: string]: Vertex },
    allIds: string[]
    origin?: { x: number, y: number } // used by polar layout to denote the position of the root (or stem) which can change
    theta?: [number, number] // used by polar layout to denote the range of angles
    axisLength?:number // provided by layouts that support axis
}   

export interface ArbitraryVertices {
    byId: { [id: string]: ArbitraryVertex },
    allIds: string[]
    extent: { x: [number, number], y: [number, number] }
}

export interface internalLayoutOptions extends layoutOptions { // all layout options plus width and height of drawable area
    width: number,
    height: number,
}

export interface NodeDecoration{
    cartooned:boolean,
    collapseFactor:number,
    hilighted:boolean,
    customColor:string|undefined
    taxaCustomColor:string|undefined
}

export const defaultInternalLayoutOptions = {
    width: 1000,
    height: 1000,
    rootLength: 0,
    rootAngle: 0,
    angleRange:( 2 * Math.PI )-0.3,
    tipSpace: (tip1:NodeRef, tip2:NodeRef) => 1,
    curvature: 0,
    showRoot: false,
    spread: 1,
    pointOfInterest: { x: 0, y: 0 },
    fishEye: 0,
    nodeDecorations:{}
}





export abstract class AbstractLayout {
    static readonly padding = 20;
    static layout(tree: Tree, layoutOptions: internalLayoutOptions): Vertices {
        const arbitraryLayout = this.getArbitraryLayout(tree, layoutOptions);
        const treeStats = { tipCount: [...tree.getTips()].length,rootId:tree.root!.id } //todo cache this count
        return this.finalizeArbitraryLayout(arbitraryLayout, treeStats, layoutOptions);
    }

    static getArbitraryLayout(tree: Tree, opts: internalLayoutOptions): ArbitraryVertices {
        throw new Error("Method not implemented.")
    }
    static finalizeArbitraryLayout(arbitraryVertices: ArbitraryVertices, treeStats: { tipCount: number }, opts: internalLayoutOptions): Vertices {
        throw new Error("Method not implemented.")
    }
    //  cartoonGenerator(tree:NormalizedTree,vertices:Vertices,):string

}


