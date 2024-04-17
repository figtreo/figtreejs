import React from "react"
import {linkHorizontal} from "d3-shape";
import {extent, max, min} from "d3-array";
import { useLayout,useTree} from "../../../../hooks";
import { Vertex } from "../../../../Layouts/LayoutInterface";
import withLinearGradient from "../../../HOC/WithLinearGradient";
import { NodeRef, tipIterator } from "../../../../Evo/Tree";
import { NodeProps } from "..";

type genericAttr = {[key:string]:any};

const pathComponent=({attrs,interactions}:{attrs:genericAttr,interactions:genericAttr})=><path pointerEvents={"visiblePoint"} {...attrs} {...interactions}/>;

export const FadedPath=withLinearGradient(pathComponent);

export default function CoalescentShape (props:CoalescentProps){
    const vertices =  useLayout();
    const tree = useTree();

    const {vertex,attrs,interactions,startWidth,FadeEndpoint,curveSlope} =props;

    const targets:Vertex[] = [...tipIterator(tree,tree.getNode(vertex.number))].map( (decedent:NodeRef) => vertices.vertices[decedent.number])
        .concat(tree.getChildren(tree.getNode(vertex.number)).map( (decedent:NodeRef) => vertices.vertices[decedent.number]));


    const slope =calcSlope(targets,curveSlope);

    const d=makeCoalescent(vertex,targets,slope,startWidth);
    const endingX= FadeEndpoint==="min"?100/slope:FadeEndpoint==="max"?100:parseFloat(FadeEndpoint)?parseFloat(FadeEndpoint):100/slope;

    return  <FadedPath className="node-shape" attrs={{...attrs,d:d}} interactions={interactions} endingX={`${endingX}%`} colorRamper={()=>attrs.fill} opacityRamper={(i:number)=>1-i*1} />
};



//TODO extract vertex type
export interface CoalescentProps{
    attrs:{
        fill:string,
        strokeWidth:number,
        stoke:string,
        [key:string]:any
    }
    startWidth:number,
    FadeEndpoint:string,
    curveSlope:"min"    |"max" |number,
    vertex:Vertex
    interactions?:any
}


export interface CoalescentNodeProps extends NodeProps{
    attrs:{
        fill:string,
        strokeWidth:number,
        stoke:string,
        [key:string]:any
    }
    startWidth:number,
    FadeEndpoint:string,
    curveSlope:"min"    |"max" |number,
}

CoalescentShape.defaultProps= {
    attrs: {
        fill: "steelblue",
        strokeWidth: 1,
        stroke: 'black'
    },
    startWidth:2,
    FadeEndpoint:"min",
    curveSlope:"min"
};
type linkData = {source:point,target:point};
const link = linkHorizontal<linkData,point>()
    .x((d:point) => d.x )
    .y((d:point) =>  d.y );

/**
 * A helper function that takes a source and target object (with x, and y positions each) It calculates a symmetric
 * coalescent shape between source, the target and the reflection of the taget about a horizontal line through the source.
 * @param source -
 * @param target -  the target object {x:,y:}
 * @param slope - a number that deterimines how quickly the curve reaches the max/min height
 * @param startWidth - The starting width of the shape
 * @return string
 */

// need max x for top and bottom, diff y
export function coalescentPath(source:point,topTarget:point,bottomTarget:point,slope=1,startWidth=2){
    const adjustedTopTarget={y:topTarget.y,x:topTarget.x/slope};
   const adjustedBottomTarget = {x:bottomTarget.x/slope,y:bottomTarget.y};

   const start = {x:source.x,y:source.y-startWidth/2};
   const end = {x:source.x,y:source.y+startWidth/2};

   const topD=link({source:start,target:adjustedTopTarget});
   const linker=`L${topTarget.x},${topTarget.y}v${adjustedBottomTarget.y-adjustedTopTarget.y},0L${adjustedBottomTarget.x},${adjustedBottomTarget.y}`;
   const bottomD=link({source:adjustedBottomTarget,target:end});

   return topD+linker+bottomD+`L${start.x},${start.y}`;
}
type point = {x:number,y:number}

/**
 * This function takes a source vertex and target vertices. It calculates the target
 * for vertex and passes data on to the coalescent path function.
 * @param vertex
 * @param targets
 * @param scales
 * @param slope
 * @return string
 */
export function makeCoalescent(vertex:Vertex,targets:Vertex[],slope:number=1,startWidth:number=2){
    const xStart = vertex.x;
    const xEnd=max(targets,d=>d.x)!;
    const yStart = vertex.y;
    const yTop= min(targets,d=>d.y)! -0.4;
    const yBottom =max(targets,d=>d.y)!+0.4;
    return coalescentPath({x:xStart,y:yStart},{x:xEnd,y:yTop},{x:xEnd,y:yBottom},slope,startWidth)
}

/**
 * A helper function that takes the source and target vertices
 * and calculates the slope so that the curve flattens and at
 * at the closest vertex (in the x direction).

 * @param targets
 */
export function calcSlope(targets:Vertex[],option:"min"|"max"|number){
    const [min,max]=extent(targets,d=>d.x);

    if(min===undefined || max===undefined){
        throw new Error("cannot find min or max of targets in coalescent shape");}
    switch (option) {
        case "min":
            return max/min;
        case "max":
            return 1;
        case option:
            return max/(min+ (max-min)*(option as number))
        default:
            return max/min;
    }
}



// const CoalescentShape = withLinearGradient(BaseCoalescentShape);
// CoalescentShape.defaultProps={
//     x1:"0%",
//     x2:"50%",
//     y1:"0%",
//     y2:"0%",
//     n:10,
//     colorRamper:i=>"grey",
//     opacityRamper:i=>1-i*3,
//     slope:5
// };
// export default CoalescentShape;
