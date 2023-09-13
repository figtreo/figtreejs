// Layouts are classes that define the layout of the tree. They are responsible for
// calculating those layouts, but they should not create side effects. So each class here 
// is should only use static methods. and store any state as static constants.

import { max } from "d3-array"
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree"
import { scaleLinear } from "d3-scale"
//TODO make tree

// TODO caching

//
export interface Vertex {
    id: string,
    x: number,
    y: number,
    level: number,
    d?: string, //path
    theta?: number, //angle
    r?: number, //radius
}


export interface ArbitraryVertex {
    id: string,
    x: number,
    y: number,
    level: number,
    pathPoints: { x: number, y: number }[]
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

export type layoutOptions = {
    width: number,
    height: number,
    rootLength: number,
    rootAngle: number,
    angleRange: number,
    tipSpace: (tip1: NodeRef, tip2: NodeRef) => number, //Todo make arguements nodeRefs
    curvature: number,
    showRoot: boolean,
}

export abstract class AbstractLayout {
    static readonly padding = 20;
    static  layout(tree: NormalizedTree, layoutOptions: layoutOptions): Vertices {
        const arbitraryLayout = this.getArbitraryLayout(tree, layoutOptions);
        return this.finalizeArbitraryLayout(arbitraryLayout, layoutOptions);
    }

    static getArbitraryLayout(tree: NormalizedTree,opts:layoutOptions): ArbitraryVertices{
        throw new Error("Method not implemented.")
    }
    static finalizeArbitraryLayout(arbitraryVertices:ArbitraryVertices, opts: layoutOptions): Vertices{
        throw new Error("Method not implemented.")
    }
    //  cartoonGenerator(tree:NormalizedTree,vertices:Vertices,):string

}


