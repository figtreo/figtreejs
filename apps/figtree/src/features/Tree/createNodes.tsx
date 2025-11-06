import { getColorScale, useAppSelector } from "../../app/hooks";
import { selectShapeState } from "../Settings/panels/shapes/shapeSlice";
import {   CircleNodes, type NodeRef } from "@figtreejs/core";
import { COLOUR_ANNOTATION } from "../../app/constants";
import { RectangleNodes } from "@figtreejs/core";


export function createNodeComponent( {
    tree,
  settings,
  fillColorScale,
  factory,
  filter,
  ...rest}
) {

    // check if sizing by an attribute or by a constant
    const radius = settings.maxSize / 2;

  
    function filler(n:NodeRef):string{
      if(settings.colourBy==="User selection"){
        const custom = tree.getAnnotation(n,COLOUR_ANNOTATION);
        return custom===undefined?settings.colour:(custom as string);
    }else{
      const annotation = tree.getAnnotation(n,settings.colourBy);
      if(annotation===undefined){
        return settings.colour;
      }
      return fillColorScale(tree.getAnnotation(n,settings.colourBy)) as string;
    }
  }
    
    const stroke = settings.outlineColour;
    const strokeWidth = settings.outlineWidth;

    if (settings.activated) {
        if (settings.shape === "Circle") {
            return (
                CircleNodes( { filter, attrs:{ r: radius, fill:filler, stroke, strokeWidth } })
            )
        } else if (settings.shape === "Rectangle") {
            return (
                RectangleNodes({filter, attrs:{ width: settings.maxSize, height: settings.maxSize, fill:filler, stroke, strokeWidth }})
            )
        }
        else {
            throw new Error("Invalid node shape")
        }
    } else {
        return <g></g>;
    }



}