import React from 'react'
import { AxisBarsProps, defaultAxisBarsProps } from './Axis.types';
import { useAxisContext } from './Axis.context';
import { useScale } from '../../../hooks';

/**
 * This component adds vertical bars to the backgound of a figure. It is used a child of an Axis component and gets
 * it's size and position attributes from it's parent.
 * @param props
 * @return {*}
 * @constructor
 */
export  default function AxisBars(props:AxisBarsProps):JSX.Element {
    const {
        attrs,
        evenFill=defaultAxisBarsProps.evenFill,
        oddFill=defaultAxisBarsProps.oddFill,
        lift=defaultAxisBarsProps.lift} = props;

        const {tickValues,scale,gap,direction} = useAxisContext();
        const {width,height} = useScale();

    return(
        <g className={"axisBars"}>
                {tickValues.reduce((acc:JSX.Element[],curr,i)=>{
                    const width=i===tickValues.length-1?scale.range()[1]-scale(tickValues[i]):scale(tickValues[i+1]) - scale(tickValues[i]);
                    const fill = i%2===0?evenFill:oddFill;
                    acc.push(<rect key={i} transform={`translate(${scale(tickValues[i])},0)`}
                                   width={width}
                                   y={-1*(height+gap+lift)}
                                   height ={(height+gap+lift)}
                                   fill={fill} {...{rx:2,ry:2,...attrs}} />);
                    return acc;
                },[])}
        </g>
    )
}
    
