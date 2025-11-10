import React from "react"
import { line } from "d3-shape"
import { mean } from "d3-array"
import type { ScaleContinuousNumeric } from "d3-scale"
import type {
  AxisOrientation,
  AxisProps,
  WorkingTipOptions} from "./Axis.types";
import {
  defaultAxisProps,
} from "./Axis.types"
import { makeAxisScale } from "./PolarAxis"
import { unNullify } from "../../../utils";

export default function Axis(props: AxisProps) {
  const { dimensions, layoutClass } = props
  const {
    direction = defaultAxisProps.direction,
    gap = defaultAxisProps.gap,
    strokeWidth = defaultAxisProps.strokeWidth,
    scale:figureScale,
    attrs
  } = props

  const ticks:WorkingTipOptions = props.ticks
    ? { ...defaultAxisProps.ticks, ...props.ticks }
    : defaultAxisProps.ticks
  const title = props.title
    ? { ...defaultAxisProps.title, ...props.title }
    : defaultAxisProps.title

  // todo options to provide tick values so can specify breaks

  const scale = makeAxisScale(props, dimensions)

  // scaleSequentialQuantile doesn’t implement tickValues or tickFormat.
  let tickValues: number[]
  if (ticks.values !==undefined) {
    tickValues = ticks.values
  } else {
    // if (!scale.ticks) {
    //   const tickNum = unNullify(ticks.number,`No values provided for ticks, and scale does not provide ticks function. Please specify the target number of ticks`)
    //   tickValues = range(tickNum).map((i) =>
    //     quantile(scale.domain(), i / (tickNum - 1)),
    //   ) as number[]
    // } else {
      tickValues = scale.ticks(ticks.number)
    // }
  }


  const axisY = dimensions.domainY[1]+dimensions.domainY[1]*0.01;
  const start = figureScale({x:dimensions.domainX[0],y:axisY});
  const end = figureScale({x:dimensions.domainX[1],y:axisY});
  const axisPath = `M${start.x},${start.y+gap} L${end.x},${end.y+gap}`;

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
        }),
      )
    : null
  //TODO break this into parts HOC with logic horizontal/ vertical axis ect.
  const xPos = unNullify(mean(scale.range()),`Error calculating x position for title`)
   const titlePos = figureScale({x:xPos,y:axisY})
  return (
    <g className={"axis"} >
      {/*This is for Bars*/}

      {bars}

      <path d={axisPath} stroke={"black"} strokeWidth={strokeWidth} {...attrs}/> 
      <g>
        {tickValues.map((t, i) => {
            const point = figureScale({x:scale(t),y:axisY});
          return (
                  <g key={`tick-${i}`} transform={`translate(${point.x},${point.y+gap})`}>
               
                    <line x1={0} y1={0} x2={0} y2={ticks.length} stroke={"black"} strokeWidth={strokeWidth} {...attrs} />
                      <text transform={`translate(0,${ticks.padding})`} textAnchor={"middle"} dominantBaseline={"central"}  {...ticks.style} >{ticks.format(t)}</text>
                </g>
          )
        })}
        {/*TODO sometimes scale doesn't have a range*/}
        <g transform={`translate(${ titlePos.x},${ titlePos.y+gap}) `}>
                    <text textAnchor={"middle"} transform={`translate(0,${ title.padding})`} {...title.style } >{title.text}</text>
                </g>
      </g>
    </g>
  )
}
//TODO merge these in instead of overwriting;

export function getPath(
  scale: ScaleContinuousNumeric<number, number>,
  direction: AxisOrientation,
): string {
  const f = line()
    .x((d) => d[0])
    .y((d) => d[1])

  
  let range;
  switch (direction) {
    case 'vertical' :
      range =scale.range().map<[number, number]>((d) => [0, d]);
      break
    default:
      range =scale.range().map<[number, number]>((d) => [d, 0])
  }
  const rangeLine = unNullify(f(range),`Error in makeing axis line`)

  return rangeLine;
}

export function getTickLine(length: number, direction: AxisOrientation) {
  if (direction === "horizontal" || direction === "polar") {
    return { x1: 0, y1: 0, y2: length, x2: 0 }
  } 
    return { x1: 0, y1: 0, y2: 0, x2: -1 * length }
  
}

