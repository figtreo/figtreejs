import { format } from "d3-format";
import { ScaleContinuousNumeric } from "d3-scale";


export type AxisOrientation = "horizontal" | "vertical" | "polar"


export interface AxisProps {
    offsetBy?: number,
    scaleBy?: number,
    reverse?: boolean,
    gap?: number,
    title?: { text: string, padding: number, style: any },
    ticks?: { number?: number, format?: (value: number) => string, padding?: number, style?: {}, length?: number },
    direction?: AxisOrientation,
    scale?: ScaleContinuousNumeric<number, number> ,
    strokeWidth?: number,
    x?: number,
    y?: number,
    children?: React.ReactNode
}


export interface AxisScaleContext {
    width: number;
    height: number;
    domain: [number,number];
    maxR?: number;
    theta?: [number, number];
    padding:number
}

export const defaultAxisProps: AxisProps = {
    offsetBy: 0,
    scaleBy: 1,
    reverse: false,
    gap: 5,
    title: { text: "", padding: 40, style: {} },
    ticks: { number: 5, format: format(".1f"), padding: 20, style: {}, length: 6 },
    direction: "horizontal",
    scale: undefined,
    strokeWidth:1
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
    attrs?:{[key:string]:any},
    lift?:number,



}