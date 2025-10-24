import { format } from "d3-format";
import { ScaleContinuousNumeric } from "d3-scale";
import { rawAttrType } from "../../Baubles/baubleTypes";
import { scale } from "../../../store/store";
import { layoutClass } from "../../../Layouts";
import { dimensionType } from "../../FigTree/Figtree.types";


export type AxisOrientation = "horizontal" | "vertical" | "polar"

export type AxisTicksOptions = { number?: number, format?: (value: number) => string, padding?: number, style?: {[key:string]:number|string}, length?: number,values?:number[] }

// optionals are filled by default below
export interface AxisProps {
    offsetBy?: number,
    scaleBy?: number,
    reverse?: boolean,
    gap?: number,
    title?: { text: string, padding: number, style: {[key:string]:rawAttrType} },
    ticks?: AxisTicksOptions ,
    direction?: AxisOrientation,
    scale: scale,
    axisScale?:ScaleContinuousNumeric<number,number>,
    strokeWidth?: number,
    x: number,
    y: number,
    children?: React.ReactNode,
    dimensions:dimensionType,
    layoutClass:layoutClass,
    attrs:{[key:string]:rawAttrType}
    type?: "Polar" | "Rectangular" //yuck
}

export const defaultAxisProps  = {
    offsetBy: 0,
    scaleBy: 1,
    reverse: false,
    gap: 5,
    title: { text: "", padding: 40, style: {} },
    ticks: { number: 5, format: format(".1f"), padding: 20, style: {}, length: 6 },
    direction: "horizontal",
    strokeWidth:1,
    type: "Rectangular"
}

export interface AxisScaleContext {
    width: number;
    height: number;
    domain: [number,number];
    maxR?: number;
    theta?: [number, number];
    padding:number
}





export const defaultAxisBarsProps={
    evenFill:"#EDEDED",
    oddFill:"none",
    attrs:{
        rx:2,
        ry:2,
       },
    lift:5,
};

export interface AxisBarsProps{
    evenFill?:string,
    oddFill?:string,
    attrs?:{[key:string]:rawAttrType},
    lift?:number,
    type?:"Rectangular"|"Polar"
    tickValues:number[],
    scale:ScaleContinuousNumeric<number,number>,
    figureScale:scale,
    axisY:number,
    layoutClass:layoutClass

}