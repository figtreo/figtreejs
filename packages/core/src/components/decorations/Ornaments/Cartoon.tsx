import React from "react"
import { layoutClass } from "../../../Layouts"
import { tipIterator } from "../../../Evo"
import { useAttributeMappers } from "../../../hooks"
import { toHaveTextContent } from "@testing-library/jest-dom/matchers"
import { thresholdScott } from "d3-array"

export function Cartoon(props: any) {
  const {
    node,
    padding = 10,
    scale,
    layout,
    tree,
    dimensions,
    layoutClass: layoutType,
  } = props

  const shapeProps = useAttributeMappers(props)
  const { attrs, interactions } = shapeProps(node)
  if (layoutType === layoutClass.Radial) {
    return null
  } else {
    let d:string;
    if (layoutType === layoutClass.Rectangular) {
      const v = layout(node)
      const { x, y } = scale(v)

      let maxX = -Infinity
      let maxY = -Infinity
      let minY = Infinity
      for (const tip of tipIterator(tree, node)) {
        const v = scale(layout(tip))
        if (v.x > maxX) maxX = v.x
        if (v.y > maxY) maxY = v.y
        if (v.y < minY) minY = v.y
      }

       d = `M${x},${y}L${maxX},${maxY}L${maxX},${minY}Z`
    } else if (layoutType === layoutClass.Polar) {
      const v = layout(node)         // 0     1
      const { x, y } = scale(v); //[top,bottom,target,source,step]
      
      let maxR = -Infinity
      let maxTheta = -Infinity
      let minTheta = Infinity
      let bottom =v;
      let top =v;
      for (const tip of tipIterator(tree, node)) {
        const v = scale(layout(tip))

        if (v.r > maxR) maxR = v.r
        if (v.theta > maxTheta){
          maxTheta = v.theta
          bottom = v;
        }
        if (v.y < minTheta){
          minTheta= v.theta;
          top=v;
        } 
      }


      const arcBit =  top.theta===bottom.theta||top.r===0?"": `A${top.r},${top.r} 0 0 ${top.theta<bottom.theta ?1:0} ${bottom.x},${bottom.y}`; 
       d = `M${x},${y}L${top.x},${top.y} ${arcBit} Z`
      // return `${initial}${curvyBit}`
    }
    return <path d={d!} {...attrs} {...interactions} />

  }
}
