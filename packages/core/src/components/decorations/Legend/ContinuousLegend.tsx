/* eslint-disable */

import React from "react"
import ColorRamp from "./ColorRamp";

import {quantize, interpolate, interpolateRound} from "d3-interpolate";
import RectangularAxis from "../Axis/RectangularAxis";
import { ScaleContinuousNumeric, ScaleSequential } from "d3-scale";

/**
 * ContinuousLegend
 *
 * A color legend that accept continuous and sequential color scales. It is modeled after the color legends
 * at https://observablehq.com/@d3/color-legend
 *
 */

type possibleScale = ScaleContinuousNumeric<number,number>| ScaleSequential<number,number> 
interface ContinuousLegendProps{
    scale: possibleScale,
    pos:{x:number,y:number},
    width:number,
    height:number,
    direction:"horizontal"|"vertical",
    title:string,
    ticks:{number: number, format: (n:number)=>string, padding: number, style:object,length: number}
}


function isContinuousScale(scale: possibleScale): boolean {
  return 'interpolate' in scale;
}function isSequentialScale(scale: possibleScale): boolean {
  return 'interpolator' in scale;
}


//TODO also need to remove the scale context provider here so axis can be used in other contexts
export default function ContinuousLegend(props:ContinuousLegendProps ){
    throw new Error("continuous scale is not implemented")
    const {scale,pos,width,height,direction,title,ticks} = props;
    let x;
    let colorRamper;
    //Continuous
    if(isContinuousScale(scale) ){
        const n = Math.min(scale.domain().length,scale.range().length);
        x = scale.copy().rangeRound(quantize(interpolate(0, width), n)); // for numbers
        colorRamper = scale.copy().domain(quantize(interpolate(0, 1), n)) // for colors
    }  // Sequential
    else if (isSequentialScale(scale)) {
        x= Object.assign(( scale as ScaleSequential<number,number>).copy().interpolator(interpolateRound(0,width)), // update interpolator to work on x scale
            {range(){return[0,width]}}) //vc assigns range function so we can use it later!
        colorRamper=( scale as ScaleSequential<number,number>).interpolator();
    }
    //TODO need to remove the scale context provider here so axis can be used in other contexts
    return(
        <g className={"legend"} transform={`translate(${pos.x},${pos.y})`}>
            <text transform={`translate(0,-6)`}>{title}</text>
            <ColorRamp {...{colorRamper: colorRamper,width,height}}/>
            <RectangularAxis x={0} y={height} {...{width,height,direction,ticks}} scale={x} />
        </g>
    )

}

