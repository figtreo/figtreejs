
import React from 'react'
import type {  AxisBarsProps} from './Axis.types';
import { defaultAxisBarsProps } from './Axis.types';


/**
 * This component adds vertical bars to the backgound of a figure. It is used a child of an Axis component and gets
 * it's size and position attributes from it's parent.
 * @param props
 * @return {*}
 * @constructor
 */
// we are already rotated by the axis parent
export  default function PolarAxisBars(props:AxisBarsProps) {
      const {
        attrs,
        evenFill = defaultAxisBarsProps.evenFill,
        oddFill = defaultAxisBarsProps.oddFill,
        tickValues,
        scale,
        figureScale,
        axisY,
      } = props


          return(
        <g className={"axisBars"}>
                {tickValues.filter((t:number,i:number,all:number[]) =>i<all.length-1).map((t:number,i:number)=>{

                    

                    const start = figureScale({x:scale(t),y:axisY});
                    const end = figureScale({x:scale(t),y:0});

                    const secondStart =  figureScale({x:scale(tickValues[i+1]),y:0});
                    const secondEnd =  figureScale({x:scale(tickValues[i+1]),y:axisY});

                    
                    const arcBit = start.theta===end.theta||start.r===0?"":`A${start.r},${start.r} 0 1 0 ${end.x},${end.y}`; 


                    const secondArcBit = secondStart.theta===secondEnd.theta||secondStart.r===0?"":`A${secondStart.r},${secondStart.r} 0 1 1 ${secondEnd.x},${secondEnd.y}`;
                   
                    const shape = `M${start.x},${start.y} ${arcBit} L${end.x},${end.y} L${secondStart.x},${secondStart.y} ${secondArcBit} L ${start.x} ${start.y} Z`; 
                    const fill = i%2===0?evenFill:oddFill;

                    return (
 
                        <path key={i} d={shape} fill={fill}  {...attrs} />
                        );
                                 
                })}
        </g>
    )
    // const {
    //     attrs,
    //     evenFill=defaultAxisBarsProps.evenFill,
    //     oddFill=defaultAxisBarsProps.oddFill,
    //     lift=defaultAxisBarsProps.lift} = props;

    //     const {tickValues,scale,gap,direction} = useAxisContext();
    //     const {theta} = useLayout();
    //     //d3 starts with 0 at 12 o'clock and svg starts with 0 at 3 o'clock

    //     const angleRange = theta![0]>theta![1]+0.1?2*Math.PI-(theta![0]-(theta![1]+0.1)):(theta![1]+0.1)-theta![0];


    //     const startAngle = theta![0]+Math.PI/2 ;
    //     const endAngle = angleRange+startAngle;

        
    // return(
    //     <g className={"axisBars"}>
    //             {tickValues.reduce((acc:JSX.Element[],curr,i)=>{

    //                 const shape = arc(
    //                     {
    //                         innerRadius:scale(tickValues[i]),
    //                         outerRadius:scale(tickValues[i+1]),
    //                         startAngle: startAngle,
    //                         endAngle:endAngle 
    //                     }
    //                 )!
                    
    //                 const fill = i%2===0?evenFill:oddFill;
    //                 acc.push(<path key={i} d={shape} fill={fill} {...attrs} />);
                                 
    //                 return acc;
    //             },[])}
    //     </g>
    // )
}

