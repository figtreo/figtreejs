import { getColorScale, useAppSelector } from "../../app/hooks";
import { selectShapeState } from "../Settings/panels/shapes/shapeSlice";
import {  Nodes, NodeRef } from "@figtreejs/core";
import { COLOUR_ANNOTATION } from "../../app/constants";


function tipShapeGenerator(target: "tip" | "tipBackground" ) {
    return function(props:any){
    const settings = useAppSelector(selectShapeState(target));
    const tipColourBy = useAppSelector(selectShapeState("tip")).colourBy;
    const activated = useAppSelector(selectShapeState("tip")).activated && settings.activated;
    const {tree, filter:baseFilter} = props;

    //if we color by an attribute and the tip doesn't have that attribute, don't show it

    function filter(n:NodeRef):boolean{
        if(tipColourBy==="User selection"){
           return  baseFilter(n) && tree.getChildCount(n) === 0;
        }else{
            const annotation = tree.getAnnotation(n,tipColourBy);
           return baseFilter(n) && annotation!==undefined && tree.getChildCount(n) === 0;
        }
    }

    // const filter = (n: NodeRef) => tree.getChildCount(n) === 0;

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

    // check if sizing by an attribute or by a constant
    const radius = settings.maxSize / 2;

    const stroke = settings.outlineColour;
    const strokeWidth = settings.outlineWidth;


    if (activated) {
        if (settings.shape === "Circle") {
            return (
                <Nodes.Circle {...props} filter={filter} attrs={{ r: radius, fill:filler, stroke, strokeWidth }} />

            )
        } else if (settings.shape === "Rectangle") {
            return (
                <Nodes.Rectangle {...props} filter={filter} attrs={{ width: settings.maxSize, height: settings.maxSize, fill:filler, stroke, strokeWidth }} />
            )
        }
        else {
            throw new Error("Invalid tip shape")
        }
    } else {
        return <g></g>;
    }

    }
}

export const Tips = tipShapeGenerator("tip")
export const TipsBackground = tipShapeGenerator("tipBackground")
