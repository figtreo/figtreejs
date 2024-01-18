import React from "react"
import ColorRamp from "./ColorRamp";
import {format} from "d3-format";
import {quantize, interpolate, interpolateRound} from "d3-interpolate";
import{ScaleContext} from "../../../Context/context";
import RectangularAxis from "../Axis/RectangularAxis";

/**
 * ContinuousLegend
 *
 * A color legend that accept continuous and sequential color scales. It is modeled after the color legends
 * at https://observablehq.com/@d3/color-legend
 *
 * @param props
 * @param scale
 * @param pos
 * @param width
 * @param height
 * @param direction
 * @param title
 * @param ticks
 * @param tickFormat
 * @return {(number|*)[]|*}
 * @constructor
 */
//TODO also need to remove the scale context provider here so axis can be used in other contexts
export default function ContinuousLegend(props:{scale:any,pos:{x:number,y:number},width:number,height:number,direction:"horizontal"|"vertical",title:string,ticks:{number: number, format: (n:number)=>string, padding: number, style:any, length: number}} ){

    const {scale,pos,width,height,direction,title,ticks} = props;
    let x;
    let colorRamper;
    //Continuous
    if(scale.interpolate){
        const n = Math.min(scale.domain().length,scale.range().length);
        x = scale.copy().rangeRound(quantize(interpolate(0, width), n)); // for numbers
        colorRamper = scale.copy().domain(quantize(interpolate(0, 1), n)) // for colors
    }  // Sequential
    else if (scale.interpolator) {
        x= Object.assign(scale.copy().interpolator(interpolateRound(0,width)), // update interpolator to work on x scale
            {range(){return[0,width]}}) //vc assigns range function so we can use it later!
        colorRamper=scale.interpolator();
    }
    //TODO need to remove the scale context provider here so axis can be used in other contexts
    return(
        <g className={"legend"} transform={`translate(${pos.x},${pos.y})`}>
            <text transform={`translate(0,-6)`}>{title}</text>
            <ColorRamp {...{colorRamper: colorRamper,width,height}}/>
            <ScaleContext.Provider value={{domain:scale.domain,width,height, padding:0}}> 
                <RectangularAxis x={0} y={height} {...{width,height,direction,ticks}} scale={x} />
            </ScaleContext.Provider>
        </g>
    )

}

ContinuousLegend.defaultProps={
    pos:{x:0,y:0},
    width:200,
    height:50,
    direction:"horizontal",
    ticks: {number: 5, format: format(".1f"), padding: 20, style: {}, length: 6},
    title:"",
}