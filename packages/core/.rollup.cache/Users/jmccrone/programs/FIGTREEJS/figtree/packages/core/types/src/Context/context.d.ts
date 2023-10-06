import React from "react";
import { Vertices } from "../Layouts/LayoutInterface";
import { Tree } from "../Tree/Tree.types";
export declare const InteractionStateContext: React.Context<boolean>;
export declare const InteractionDispatchContext: React.Context<boolean>;
export declare const DataContext: React.Context<{
    x: number;
    y: number;
}[]>;
export declare const TreeContext: React.Context<Tree>;
export declare const LayoutContext: React.Context<Vertices>;
export type scaleContextType = {
    width: number;
    height: number;
    maxDivergence: number;
    maxR?: number;
    theta?: [number, number];
};
export declare const ScaleContext: React.Context<scaleContextType>;
export declare const AnimationContext: React.Context<boolean>;
