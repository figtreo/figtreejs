import { ScaleContinuousNumeric } from "d3-scale";
import React from "react";
import { AxisOrientation } from "./Axis.types";
export declare const AxisContext: React.Context<{
    tickValues: number[];
    gap: number;
    scale: ScaleContinuousNumeric<number, number>;
    direction: AxisOrientation;
}>;
export declare const useAxisContext: () => {
    tickValues: number[];
    gap: number;
    scale: ScaleContinuousNumeric<number, number>;
    direction: AxisOrientation;
};
