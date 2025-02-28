import React from 'react'
import { line } from "d3-shape"
import { mean, quantile, range } from "d3-array"
import { ScaleContinuousNumeric, scaleLinear } from 'd3-scale';
import { AxisOrientation, AxisProps, AxisScaleContext, defaultAxisProps } from './Axis.types';
import { degrees, textSafeDegrees } from '../../../Layouts/polarLayout';
import { getPath, getTickLine } from './RectangularAxis';
import { normalizeAngle } from '../../../store/polarScale';

//TODO do things to scale and allow date as origin not maxD.


export default function PolarAxis(props: any) {

  const { dimensions, layoutClass, attrs} = props
  const {
    direction = defaultAxisProps.direction!,
    gap = defaultAxisProps.gap!,
    strokeWidth = defaultAxisProps.strokeWidth!,
    x,
    y,
    scale:figureScale,

  } = props
  
  const ticks = props.ticks
    ? { ...defaultAxisProps.ticks!, ...props.ticks }
    : defaultAxisProps.ticks!
  const title = props.title
    ? { ...defaultAxisProps.title!, ...props.title }
    : defaultAxisProps.title!

   
  // todo options to provide tick values so can specify breaks
// we make the scale and then move it to the origin.
  const scale = makeAxisScale(props, dimensions)

    let tickValues: number[]
    if (ticks.values) {
    tickValues = ticks.values
    } else {
    if (!scale.ticks) {
        tickValues = range(ticks.number!).map((i) =>
        quantile(scale.domain(), i / (ticks.number! - 1)),
        ) as number[]
    } else {
        tickValues = scale.ticks(ticks.number)
    }
    }


     // start at the root and go outwards

    const maxPoint = figureScale({x:dimensions.domainX[1],y:dimensions.domainY[1]+0.1}); // go a little bit past last tip


    const theta = normalizeAngle(figureScale({x:dimensions.domainX[1],y:dimensions.domainY[1]}).theta);
    const startAngle = figureScale({x:dimensions.domainX[1],y:dimensions.domainY[0]}).theta + Math.PI/2 ;  
    const endAngle = startAngle + 0.05+ (figureScale({x:dimensions.domainX[1],y:dimensions.domainY[1]}).theta - figureScale({x:dimensions.domainX[1],y:dimensions.domainY[0]}).theta);

    let transform;
    if(x!==undefined && y!==undefined){
        transform = `translate(${x},${y})`;
    }else{
        transform =  `translate(${maxPoint.x},${maxPoint.y})` 
    }
const rawBars = props.children
    ? Array.isArray(props.children)
      ? props.children
      : [props.children]
    : null
  const bars = rawBars
    ? rawBars.map((b: React.ReactElement,i:number) =>
        React.cloneElement(b, {
          key:i,
          scale : scale.copy().range([0,-1*scale.range()[1]]),
          direction,
          layoutClass,
          dimensions,
          tickValues,
          gap,
          reverse:props.reverse,
          startAngle,
          endAngle
        }),
      )
    : null

    const axisY = dimensions.domainY[1]+dimensions.domainY[1]*0.005;
    const start = figureScale({x:dimensions.domainX[0],y:axisY});
    const end = figureScale({x:dimensions.domainX[1],y:axisY});
    const axisPath = `M${start.x},${start.y} L${end.x},${end.y}`;

      // We draw the ticks in line with the axis then rotate them 90 degrees
      const x2 = ticks.length*Math.cos(theta);
      const y2 = ticks.length*Math.sin(theta);

      const xPadding = ticks.padding*Math.cos(theta);
      const yPadding = ticks.padding*Math.sin(theta);

//   <text transform={`translate(${ xPadding },${yPadding}) rotate(${-textSafeDegrees(normalizeAngle(point.theta))})`} 
// textAnchor={"middle"} dominantBaseline={"center"}  {...ticks.style} >{ticks.format!(t)}</text>
    return (
      <g>
         <path d={axisPath} stroke={"black"} strokeWidth={strokeWidth} {...attrs}/> 
         <g>
                 {tickValues.map((t, i) => {
                  const point = figureScale({x:scale(t),y:axisY});
                    return (
                        <g key={i} transform={`translate(${point.x},${point.y}) rotate(90)`}>
                            <line x1={x2} y1={y2} x2={0} y2={0} stroke={"black"} strokeWidth={strokeWidth} {...attrs} />
                            <text transform={`translate(${ xPadding },${yPadding}) rotate(-90)`} textAnchor={"middle"} dominantBaseline={"center"}  {...ticks.style} >{ticks.format!(t)}</text>
                        </g>
                    )
                })}
                {/*TODO sometimes scale doesn't have a range*/}
                <g transform={`translate(${ mean(scale.range()) },${ title.padding}) rotate(${-degrees(theta+0.1)})`}>
                    <text textAnchor={"middle"}>{title.text}</text>
                </g>
            </g>
        
      </g>
    )

    return (
       <g transform={transform}>
          {/*This is for Bars*/}
          
          {bars}

     
      <g className={"axis"}  >
          <g  transform={`rotate(${degrees(theta)})`}> 
             <path d={getPath(scale, direction)} stroke={"black"} strokeWidth={strokeWidth} /> 
             <g>
                 {tickValues.map((t, i) => {
                    return (
                        <g key={i} transform={`translate(${scale(t)},${0})`}>
                            <line {...getTickLine(ticks.length!, direction)} stroke={"black"} strokeWidth={strokeWidth}/>
                            <text transform={`translate(${ 0 },${ ticks.padding}) rotate(${-degrees(theta+0.1)})`}
                                textAnchor={"middle"} dominantBaseline={"center"}  {...ticks.style} >{ticks.format!(t)}</text>
                        </g>
                    )
                })}
                {/*TODO sometimes scale doesn't have a range*/}
                <g transform={`translate(${ mean(scale.range()) },${ title.padding}) rotate(${-degrees(theta+0.1)})`}>
                    <text textAnchor={"middle"}>{title.text}</text>
                </g>
            </g>
            </g>

        </g>
        </g>
      )
}
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


//TODO can make maxR and height the same parameter and use this  all axes

function makeAxisScale(props: any, { domainX ,domainY }: {domainX:[number,number],domainY:[number,number]}) {
    const { reverse = defaultAxisProps.reverse,
        offsetBy = defaultAxisProps.offsetBy,
        scaleBy = defaultAxisProps.scaleBy, 
        _scale= defaultAxisProps.scale,
    scale} = props;
        
// just radius
     // negative range to play nicely with transform above
    const axisScale = _scale === undefined ?  scaleLinear().domain(domainX).range(domainX) : _scale.copy();
    if (_scale === undefined) {
      // assume domain goes 0 to max divergence make adjustments on this scale and then update min if it is not 0
      const offset = domainX.map((d) => d + offsetBy)
      const newDomain = offset.map((d, i) => (d - offsetBy) * scaleBy + offsetBy)
  
      axisScale.domain(newDomain)
  
      if (reverse) {
        axisScale.domain([offsetBy - (newDomain[1] - newDomain[0]), offsetBy])
      }
    }
    return axisScale.nice();

}

