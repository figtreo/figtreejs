import React from "react"
import { layoutClass } from "../../../Layouts"
import { tipIterator } from "../../../Evo"
import { useAttributeMappers } from "../../../hooks";

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

    const shapeProps = useAttributeMappers(props);
    const {attrs,interactions} = shapeProps(node);
  if (layoutType === layoutClass.Radial) {
    return null
  } else if (layoutType === layoutClass.Rectangular) {
    const v = layout(node);
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

    const triangleBit = `M${x},${y}L${maxX},${maxY}L${maxX},${minY}Z`
    return <path d={triangleBit} {...attrs} {...interactions} />

}else{
    return null;
}
  }


