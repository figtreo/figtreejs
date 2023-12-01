import { AbstractLayout, ArbitraryVertices, internalLayoutOptions, Vertices } from "./LayoutInterface";
import { Tree } from "../Tree";
export declare class RectangularLayout extends AbstractLayout {
    static getArbitraryLayout(tree: Tree, opts: internalLayoutOptions): ArbitraryVertices;
    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats: {
        tipCount: number;
    }, opts: internalLayoutOptions): Vertices;
    static pathGenerator(points: {
        x: number;
        y: number;
    }[], { curvature, }: {
        curvature?: number | undefined;
    }): string;
}
export declare const fishEyeTransform: (fishEye: number, pointOfInterestY: number) => (y: number) => number;
