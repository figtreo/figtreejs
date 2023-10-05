/// <reference types="react" />
import { AbstractLayout, NodeDecoration } from "../../Layouts/LayoutInterface";
import { Tree, NodeRef } from "../../Tree/Tree.types";
interface Margins {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface layoutOptions {
    rootLength?: number;
    rootAngle?: number;
    angleRange?: number;
    tipSpace?: (tip1: NodeRef, tip2: NodeRef) => number;
    curvature?: number;
    showRoot?: boolean;
    spread?: number;
    pointOfInterest?: {
        x: number;
        y: number;
    };
    fishEye?: number;
    nodeDecorations: {
        [key: string]: NodeDecoration;
    };
}
export interface FigtreeProps {
    width: number;
    height: number;
    layout: typeof AbstractLayout;
    tree: Tree;
    margins: Margins;
    children: React.ReactNode;
    opts: layoutOptions;
    animated: boolean;
}
export {};
