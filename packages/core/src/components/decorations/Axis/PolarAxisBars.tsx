
import React from 'react'
import { AxisBarsProps, defaultAxisBarsProps } from './Axis.types';
import { useAxisContext } from './Axis.context';
import { useLayout, useScale } from '../../../hooks';
import {arc as arcgen} from "d3-shape"
import { normalizeAngle } from '../../../Layouts/polarLayout';

const arc = arcgen();
/**
 * This component adds vertical bars to the backgound of a figure. It is used a child of an Axis component and gets
 * it's size and position attributes from it's parent.
 * @param props
 * @return {*}
 * @constructor
 */
// we are already rotaed by the axis parent
export  default function PolarAxisBars(props:AxisBarsProps):JSX.Element {
    const {
        attrs,
        evenFill=defaultAxisBarsProps.evenFill,
        oddFill=defaultAxisBarsProps.oddFill,
        lift=defaultAxisBarsProps.lift} = props;

        const {tickValues,scale,gap,direction} = useAxisContext();
        const {theta} = useLayout();
        //d3 starts with 0 at 12 o'clock and svg starts with 0 at 3 o'clock

        const angleRange = theta![0]>theta![1]+0.1?2*Math.PI-(theta![0]-(theta![1]+0.1)):(theta![1]+0.1)-theta![0];


        const startAngle = theta![0]+Math.PI/2 ;
        const endAngle = angleRange+startAngle;
        console.log(startAngle,endAngle)

        
    return(
        <g className={"axisBars"}>
                {tickValues.reduce((acc:JSX.Element[],curr,i)=>{
                    const shape = arc(
                        {
                            innerRadius:scale(tickValues[i]),
                            outerRadius:scale(tickValues[i+1]),
                            startAngle: startAngle,
                            endAngle:endAngle 
                        }
                    )!
                    const fill = i%2===0?evenFill:oddFill;
                    acc.push(<path key={i} d={shape} fill={fill} {...attrs} />);
                                 
                    return acc;
                },[])}
        </g>
    )
}

