import { format } from "d3-format";
import type { ScaleContinuousNumeric } from "d3-scale";
import type { scaleType } from "../../../store/store";
import type { layoutClass } from "../../../Layouts";
import type { dimensionType } from "../../FigTree/Figtree.types";
import type { Attrs } from "../../Baubles/types";



export type AxisOrientation = "horizontal" | "vertical" | "polar"

export type AxisTicksOptions = { number?: number, format?: (value: number) => string, padding?: number, style?: {[key:string]:number|string}, length?: number,values?:number[] }
// export type fullAxisTickOptions =
// optionals are filled by default below
export interface AxisProps {
    offsetBy?: number,
    scaleBy?: number,
    reverse?: boolean,
    gap?: number,
    title?: { text: string, padding: number, style: Attrs },
    ticks?: AxisTicksOptions ,
    direction?: AxisOrientation,
    scale: scaleType,
    axisScale?:ScaleContinuousNumeric<number,number>,
    strokeWidth?: number,
    x: number,
    y: number,
    children?: React.ReactNode,
    dimensions:dimensionType,
    layoutClass:layoutClass,
    attrs:Attrs
    type?: "Polar" | "Rectangular" //yuck
}


export type DefaultAxisPropType  = {
    offsetBy: number,
    scaleBy: number,
    reverse: boolean,
    gap: number,
    title: { text: string, padding: number, style: Attrs },
    ticks: { number: number, format: (n:number)=>string, padding: number, style:Attrs, length: number },
    direction: AxisOrientation,
    strokeWidth:number,
    type: "Polar" | "Rectangular"

}

export const defaultAxisProps:DefaultAxisPropType  = {
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

export interface WorkingTipOptions extends AxisTicksOptions {
    number: number, format: (n:number)=>string, padding: number, style:Attrs, length: number , values?:number[]
}
export interface WorkingAxisProps extends AxisProps {
    offsetBy: number,
    scaleBy: number,
    reverse: boolean,
    gap: number,
    title: { text: string, padding: number, style: Attrs },
    ticks: { number: number, format: (n:number)=>string, padding: number, style:Attrs, length: number , values?:number[]},
    direction: AxisOrientation,
    strokeWidth:number,
    type: "Polar" | "Rectangular"
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
    attrs?:Attrs,
    lift?:number,
    type?:"Rectangular"|"Polar"
    tickValues:number[],
    scale:ScaleContinuousNumeric<number,number>,
    figureScale:scaleType,
    axisY:number,
    layoutClass:layoutClass

}