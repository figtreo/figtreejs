import { getColorScale, useAppSelector } from "../../app/hooks";
import { selectShapeState } from "../Settings/panels/shapes/shapeSlice";
import {  Nodes, NodeRef } from "@figtreejs/core";
import { COLOUR_ANNOTATION } from "../../app/constants";
import { selectTree } from '../../app/hooks';

export function InternalNodes() {
    const settings = useAppSelector(selectShapeState("node"));
    const tree = useAppSelector(selectTree);

    const filter = (n: NodeRef) => tree.getChildCount(n) > 0;

    // check if sizing by an attribute or by a constant
    const radius = settings.maxSize / 2;
    const fillColorScale = useAppSelector( (state)=>getColorScale(state,settings.colourBy));
  
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
    
    const stroke = settings.outlineColour;;
    const strokeWidth = settings.outlineWidth;

    if (settings.activated) {
        if (settings.shape === "Circle") {
            return (
                <Nodes.Circle filter={filter} attrs={{ r: radius, fill:filler, stroke, strokeWidth }} />
            )
        } else if (settings.shape === "Rectangle") {
            return (
                <Nodes.Rectangle filter={filter} attrs={{ width: settings.maxSize, height: settings.maxSize, fill:filler, stroke, strokeWidth }} />
            )
        }
        // } else if (settings.shape === "Swoosh") {
        //     return (
        //         <Nodes.Coalescent filter={filter} attrs={{ width: settings.maxSize, height: settings.maxSize, fill:filler, stroke, strokeWidth }} />
        //     )
        // }
        else {
            throw new Error("Invalid node shape")
        }
    } else {
        return <g></g>;
    }



}