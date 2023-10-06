/// <reference types="react" />
import { ScaleContinuousNumeric } from "d3-scale";
export type AxisOrientation = "horizontal" | "vertical" | "polar";
export interface AxisProps {
    offsetBy?: number;
    scaleBy?: number;
    reverse?: boolean;
    gap?: number;
    title?: {
        text: string;
        padding: number;
        style: any;
    };
    ticks?: {
        number?: number;
        format?: (value: number) => string;
        padding?: number;
        style?: {};
        length?: number;
    };
    direction?: AxisOrientation;
    scale?: ScaleContinuousNumeric<number, number>;
    strokeWidth?: number;
    children?: React.ReactNode;
}
export interface AxisScaleContext {
    width: number;
    height: number;
    maxDivergence: number;
    maxR?: number;
    theta?: [number, number];
}
export declare const defaultAxisProps: AxisProps;
export declare const defaultAxisBarsProps: {
    evenFill: string;
    oddFill: string;
    attrs: {
        rx: number;
        ry: number;
    };
    lift: number;
};
export interface AxisBarsProps {
    evenFill?: string;
    oddFill?: string;
    attrs?: {
        [key: string]: any;
    };
    lift?: number;
}
