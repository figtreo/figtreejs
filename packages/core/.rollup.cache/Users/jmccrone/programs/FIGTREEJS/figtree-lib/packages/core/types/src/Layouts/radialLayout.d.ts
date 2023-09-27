import { AbstractLayout, ArbitraryVertices, internalLayoutOptions, Vertices } from "./LayoutInterface";
import { Tree } from "../Tree";
export declare class RadialLayout extends AbstractLayout {
    static getArbitraryLayout(tree: Tree, option: internalLayoutOptions): ArbitraryVertices;
    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats: {
        tipCount: number;
    }, opts: internalLayoutOptions): Vertices;
    static pathGenerator(points: {
        x: number;
        y: number;
    }[], opts: internalLayoutOptions): string;
}
