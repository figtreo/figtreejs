import React from 'react'
import { line } from "d3-shape"
import { mean, quantile, range } from "d3-array"
import { ScaleContinuousNumeric, scaleLinear } from 'd3-scale';
import { AxisOrientation, AxisProps, AxisScaleContext, defaultAxisProps } from './Axis.types';
import { degrees, textSafeDegrees } from '../../../Layouts/polarLayout';

//TODO do things to scale and allow date as origin not maxD.


export default function PolarAxis(props: AxisProps) {
    throw new Error("PolarAxis is not implemented");
//     const scaleContext = useScale();
//     const verticies = useLayout();

//     const { direction = defaultAxisProps.direction!, 
//         gap = defaultAxisProps.gap!,
//         strokeWidth = defaultAxisProps.strokeWidth!,
//     x,y } = props;
    
//     const ticks = props.ticks?{...defaultAxisProps.ticks!,...props.ticks}:defaultAxisProps.ticks!;
//     const title = props.title?{...defaultAxisProps.title!, ...props.title}:defaultAxisProps.title!;

//     const scale = makeAxisScale(props, {domain:scaleContext.domain,range:verticies.axisLength!});

//     // scaleSequentialQuantile doesn’t implement tickValues or tickFormat.
//     let tickValues: number[];
//     if (!scale.ticks) {
//         tickValues = range(ticks.number!).map(i => quantile(scale.domain(), i / (ticks.number! - 1))) as number[];
//     } else {
//         tickValues = scale.ticks(ticks.number);
//     }
//     // start at the root and go outwards
//     const origin = verticies.origin!;
//     const theta = verticies.theta!;

//     let transform;
//     if(x!==undefined && y!==undefined){
//         transform = `translate(${x},${y})`;
//     }else{
//         transform =  `translate(${origin.x},${origin.y})` 

//     }


//     // update scale to account for changing range 
//     //move rotation off bars so we can calculate the angles better
//     //TODO fix magic number 0.1 here and in bars
//     return (
//         <g className={"axis"} transform={transform} >
//             {/*This is for Bars*/}
//             <AxisContext.Provider value={{ tickValues, gap,scale,direction }}>
//                 {props.children}
//             </AxisContext.Provider>
          
//             <g transform={`rotate(${degrees(theta[1]+0.1)})`}> 
//             <path d={getPath(scale, direction)} stroke={"black"} strokeWidth={strokeWidth} />
//             <g>
//                 {tickValues.map((t, i) => {
//                     return (
//                         <g key={i} transform={`translate(${scale(t)},${0})`}>
//                             <line {...getTickLine(ticks.length!, direction)} stroke={"black"} strokeWidth={strokeWidth}/>
//                             <text transform={`translate(${ 0 },${ ticks.padding}) rotate(${-degrees(theta[1]+0.1)})`}
//                                 textAnchor={"middle"} dominantBaseline={"center"}  {...ticks.style} >{ticks.format!(t)}</text>
//                         </g>
//                     )
//                 })}
//                 {/*TODO sometimes scale doesn't have a range*/}
//                 <g transform={`translate(${ mean(scale.range()) },${ title.padding}) rotate(${-degrees(theta[1]+0.1)})`}>
//                     <text textAnchor={"middle"}>{title.text}</text>
//                 </g>
//             </g>
//             </g>

//         </g>

//     )
// }
// //TODO merge these in instead of overwriting;



// function getPath(scale: ScaleContinuousNumeric<number, number, never>, direction: AxisOrientation): string {
//     const f = line<[number, number]>().x(d => d[0]).y(d => d[1]);

//     switch (direction) {
//         case 'horizontal' || 'polar':
//             return f(scale.range().map<[number, number]>(d => [d, 0]))!
//         case 'vertical':
//             return f(scale.range().map<[number, number]>(d => [0, d]))!

//         default:
//             throw new Error(`Direction ${direction} not implemented`)
//     }

// }

// function getTickLine(length: number, direction: AxisOrientation) {
//     if (direction === "horizontal"|| direction==="polar") {
//         return { x1: 0, y1: 0, y2: length, x2: 0 }
//     } else if (direction === "vertical") {
//         return { x1: 0, y1: 0, y2: 0, x2: -1 * length }

//     }
// }

// /**
//  * A helper function to make the scale used in the axis. if supplied by props then no modifications are
//  * applied.
//  * @param props
//  * @param contextScales
//  * @returns {*}
//  */
// //TODO can make maxR and height the same parameter and use this  all axes

// function makeAxisScale(props: any, { domain ,range }: {domain:[number,number],range:number}) {
//     const { reverse = defaultAxisProps.reverse,
//         offsetBy = defaultAxisProps.offsetBy,
//         scaleBy = defaultAxisProps.scaleBy, 
//         scale= defaultAxisProps.scale} = props;
        

//     const axisScale = scale === undefined ?  scaleLinear().domain(domain).range([0, range]) : scale.copy();
//     if (scale === undefined) {
//         if (reverse) {
//             const newMax = axisScale.domain()[0];
//             const newMin = axisScale.domain()[0]-axisScale.domain()[1];
//             axisScale.domain([newMin,newMax]);
//         }
//         if (offsetBy !== 0 || scaleBy !== 1) {
//             const domain = axisScale.domain().map((d: number) => (d + offsetBy) * scaleBy)
//             axisScale.domain(domain);
//         }
//     }
//     return axisScale.nice();

}

