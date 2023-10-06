import { AbstractLayout, ArbitraryVertices, internalLayoutOptions, Vertices } from "./LayoutInterface";
import { Tree } from "..";
export declare class PolarLayout extends AbstractLayout {
    static getArbitraryLayout(tree: Tree, opts: internalLayoutOptions): ArbitraryVertices;
    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats: {
        tipCount: number;
        rootId: string;
    }, opts: internalLayoutOptions): Vertices;
    static pathGenerator(points: {
        x: number;
        y: number;
        r: number;
        theta: number;
    }[], opts: internalLayoutOptions): string;
}
export declare function polarToCartesian(r: number, theta: number): number[];
export declare function degrees(theta: number): number;
export declare function textSafeDegrees(radians: number): number;
