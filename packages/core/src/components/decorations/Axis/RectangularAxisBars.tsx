import React from "react"
import { AxisBarsProps, defaultAxisBarsProps } from "./Axis.types"

/**
 * This component adds vertical bars to the backgound of a figure. It is used a child of an Axis component and gets
 * it's size and position attributes from it's parent.
 * @param props
 * @return {*}
 * @constructor
 */
export default function AxisBars(props: any): JSX.Element {
  const {
    attrs,
    evenFill = defaultAxisBarsProps.evenFill,
    oddFill = defaultAxisBarsProps.oddFill,
    lift = defaultAxisBarsProps.lift,
    tickValues,
    scale,
    gap,
    direction,
    reverse,
  } = props

  const { canvasHeight } = props.dimensions
  console.log(props)


  return (
    <g className={"axisBars"} key="axisBars">
      {tickValues.reduce((acc: JSX.Element[], curr: any, i: number) => {
        let width;
        let x;
        if(reverse){
            // then scale goes right to left 
            width =
            i === tickValues.length - 1
              ? scale(tickValues[i]) - scale.range()[1] 
              :scale(tickValues[i]) -  scale(tickValues[i + 1])
            x=i === tickValues.length - 1?scale.range()[1] :scale(tickValues[i+1])
        }else{
        width =
            i === tickValues.length - 1
              ? scale.range()[1] - scale(tickValues[i])
              : scale(tickValues[i + 1]) - scale(tickValues[i])
            x=scale(tickValues[i])
        }


        const fill = i % 2 === 0 ? evenFill : oddFill
        acc.push(
          <rect
            key={`recBar-${i}`}
            transform={`translate(${x},0)`} // to deal with reverse scales
            width={width} // to deal with negative scales
            y={-1 * (canvasHeight + gap + lift)}
            height={canvasHeight + gap + lift}
            fill={fill}
            {...{ rx: 2, ry: 2, ...attrs }}
          />,
        )
        return acc
      }, [])}
    </g>
  )
}
