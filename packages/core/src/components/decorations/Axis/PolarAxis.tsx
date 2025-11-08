import React from 'react'

import { mean, quantile, range } from "d3-array"
import {  scaleLinear } from 'd3-scale';
import type { AxisProps, AxisTicksOptions} from './Axis.types';
import { defaultAxisProps } from './Axis.types';

import { normalizeAngle, type PolarScaleType } from '../../../store/polarScale';
import type { dimensionType } from '../../FigTree/Figtree.types';

//TODO do things to scale and allow date as origin not maxD.


export default function PolarAxis(props: AxisProps) {

  const { dimensions, layoutClass, attrs} = props
  const {
    direction = defaultAxisProps.direction,
    gap = defaultAxisProps.gap,
    strokeWidth = defaultAxisProps.strokeWidth,
    scale  : figureScale,

  } = props as { scale: PolarScaleType } & AxisProps;
  
  const ticks = props.ticks
    ? { ...defaultAxisProps.ticks, ...props.ticks }
    : defaultAxisProps.ticks
  const title = props.title
    ? { ...defaultAxisProps.title, ...props.title }
    : defaultAxisProps.title

   
  // todo options to provide tick values so can specify breaks
// we make the scale and then move it to the origin.
  const scale = makeAxisScale(props, dimensions)

  let tickValues: number[]
  if ((ticks as AxisTicksOptions).values !=undefined) {
    tickValues = (ticks as AxisTicksOptions).values!
    } else {
      if (!scale.ticks) {
          tickValues = range(ticks.number).map((i) =>
          quantile(scale.domain(), i / (ticks.number - 1)),
          ) as number[]
      } else {
          tickValues = scale.ticks(ticks.number)
      }
    }


     // start at the root and go outwards


    const theta = normalizeAngle(figureScale({x:dimensions.domainX[1],y:dimensions.domainY[1]}).theta);
    const startAngle = figureScale({x:dimensions.domainX[1],y:dimensions.domainY[0]}).theta + Math.PI/2 ;  
    const endAngle = startAngle + 0.05+ (figureScale({x:dimensions.domainX[1],y:dimensions.domainY[1]}).theta - figureScale({x:dimensions.domainX[1],y:dimensions.domainY[0]}).theta);




    const axisY = dimensions.domainY[1]+dimensions.domainY[1]*0.005;
    const start = figureScale({x:dimensions.domainX[0],y:axisY});
    const end = figureScale({x:dimensions.domainX[1],y:axisY});
    const axisPath = `M${start.x},${start.y} L${end.x},${end.y}`;

      // We draw the ticks in line with the axis then rotate them 90 degrees
      const x2 = ticks.length*Math.cos(theta);
      const y2 = ticks.length*Math.sin(theta);

      const xPadding = ticks.padding*Math.cos(theta);
      const yPadding = ticks.padding*Math.sin(theta);



      const rawBars = props.children
    ? Array.isArray(props.children)
      ? props.children
      : [props.children]
    : null
  const bars = rawBars
    ? rawBars.map((b: React.ReactElement,i:number) =>
        React.cloneElement(b, {
          key:i,
          figureScale,
          scale,
          axisY,
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

    const titlePos = figureScale({x:mean(scale.range())!,y:axisY});
    const titleXPadding = title.padding*Math.cos(theta);
    const titleYPadding = title.padding*Math.sin(theta);

    return (
      <g className={"axis"} >
        {bars}
         <path d={axisPath} stroke={"black"} strokeWidth={strokeWidth} {...attrs}/> 
         <g>
                 {tickValues.map((t, i) => {
                  const point = figureScale({x:scale(t),y:axisY});
                    return (
                        <g key={`tick-${i}`} transform={`translate(${point.x},${point.y}) rotate(90)`}>
                            
                            <line x1={x2} y1={y2} x2={0} y2={0} stroke={"black"} strokeWidth={strokeWidth} {...attrs} />
                            <text transform={`translate(${ xPadding },${yPadding}) rotate(-90)`} textAnchor={"middle"} dominantBaseline={"central"}  {...ticks.style} >{ticks.format(t)}</text>
                        </g>
                       
                    )
                })}
                {/*TODO sometimes scale doesn't have a range*/}
                <g transform={`translate(${ titlePos.x},${ titlePos.y}) rotate(90)`}>
                    <text textAnchor={"middle"} transform={`translate(${ titleXPadding},${ titleYPadding}) rotate(-90)` } >{title.text}</text>
                </g>
            </g>
        
      </g>
    )

  }


//TODO can make maxR and height the same parameter and use this  all axes

export function makeAxisScale(props: AxisProps, dimensions:dimensionType) {
    const { reverse = defaultAxisProps.reverse,
        offsetBy = defaultAxisProps.offsetBy,
        scaleBy = defaultAxisProps.scaleBy, 
        axisScale:_scale} = props;
      const {domainX} = dimensions;
        
// just radius
     // negative range to play nicely with transform above
    const axisScale = _scale === undefined ?  scaleLinear().domain(domainX).range(domainX) : _scale.copy();
    if (_scale === undefined) {
      // assume domain goes 0 to max divergence make adjustments on this scale and then update min if it is not 0
      const offset = domainX.map((d) => d + offsetBy)
      const newDomain = offset.map((d) => (d - offsetBy) * scaleBy + offsetBy)
  
      axisScale.domain(newDomain)
  
      if (reverse) {
        axisScale.domain([offsetBy - (newDomain[1] - newDomain[0]), offsetBy])
      }
    }
    return axisScale.nice();

}

