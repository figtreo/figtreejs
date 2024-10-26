import React from 'react'
import { AxisBarsProps, defaultAxisBarsProps } from './Axis.types';

/**
 * This component adds vertical bars to the backgound of a figure. It is used a child of an Axis component and gets
 * it's size and position attributes from it's parent.
 * @param props
 * @return {*}
 * @constructor
 */
export  default function AxisBars(props:any):JSX.Element {
    const {
        attrs,
        evenFill=defaultAxisBarsProps.evenFill,
        oddFill=defaultAxisBarsProps.oddFill,
        lift=defaultAxisBarsProps.lift,
        tickValues,scale,gap,direction} = props;

        const {canvasHeight} = props.dimensions;
        console.log(props)
    return(
        <g className={"axisBars"}>
                {tickValues.reduce((acc:JSX.Element[],curr:any,i:number)=>{
                    const width=i===tickValues.length-1?scale.range()[1]-scale(tickValues[i]):scale(tickValues[i+1]) - scale(tickValues[i]);
                    const fill = i%2===0?evenFill:oddFill;
                    acc.push(<rect key={i} transform={`translate(${scale(tickValues[i])},0)`}
                                   width={width}
                                   y={-1*(canvasHeight+gap+lift)}
                                   height ={(canvasHeight+gap+lift)}
                                   fill={fill} {...{rx:2,ry:2,...attrs}} />);
                    return acc;
                },[])}
        </g>
    )
}
    
