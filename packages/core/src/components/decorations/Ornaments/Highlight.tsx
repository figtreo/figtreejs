import React from "react";
import {arc as arcgen} from "d3-shape"

import { NodeRef, tipIterator, Tree } from "../../../Evo";
import { layoutClass } from "../../../Layouts";
import { useAttributeMappers } from "../../Baubles/baubleHelpers";
import { layout, scale } from "../../../store/store";
import { BaseInteraction, plainAttr, plainAttrGetter } from "../../Baubles/baubleTypes";


const arc = arcgen();

interface CladeProps {
    node:NodeRef,
    padding?:number,
    scale:scale,
    layout:layout,
    tree:Tree,
    layoutClass:layoutClass,
    attrs: { [key: string]: plainAttr | plainAttrGetter | undefined};
    interactions: { [key: string]: BaseInteraction; };
}
function CladeHighlight(props:CladeProps ){

    const {node, padding = 10,scale,layout,tree,layoutClass:layoutType} = props;

    const v = layout(node);
    const shapeProps = useAttributeMappers(props);
    const {attrs,interactions} = shapeProps(node);
    if(layoutType===layoutClass.Rectangular){
        const {x} = scale(v);
        
        let maxX = -Infinity;
        let maxY = -Infinity;
        let minY = Infinity;
        for(const tip of tipIterator(tree,node)){
            const v = scale(layout(tip));
            if(v.x>maxX) maxX=v.x;
            if(v.y>maxY) maxY=v.y;
            if(v.y<minY) minY=v.y;
        }

        const minX = x - padding; //padding
         minY -= padding;
        
        const width = maxX-minX+ padding*2; //padding
        const height = (maxY-minY)+padding*2 ;
        return (<rect {...attrs} {...interactions} height={height} width={width} x={minX} y={minY} />)
    }else if(layoutType===layoutClass.Polar){
        const origin = scale({x:0,y:0});
        const transform =  `translate(${origin.x},${origin.y})` 
        // const scaleR = scaleLinear().domain([0,scaleContext.maxR!]).range([0,verticies.axisLength!])
        const minR =  scale(v).r!; //padding?
        let maxR = -Infinity;
        let maxTheta=-Infinity;
        let minTheta = Infinity;
        let lastTheta;
        let padding = 0;
        for(const tip of tipIterator(tree,node)){
            const v = scale(layout(tip));
            if(v.r!>maxR) maxR=v.r!;
            if(v.y>maxTheta) maxTheta=v.theta!;
            if(v.y<minTheta) minTheta=v.theta!;

            if(lastTheta && v.theta!>lastTheta){ // TODO account for crossing 0;
                padding = (v.theta!-lastTheta)/2;
            }
            lastTheta=v.theta;
        }
        const angleRange =  minTheta>maxTheta?2*Math.PI-(minTheta-(maxTheta)):(maxTheta)-minTheta;

        const startAngle = minTheta-padding+Math.PI/2
        const endAngle = startAngle+angleRange +(padding*2)

        const shape = arc( {
            innerRadius:minR, 
            outerRadius:maxR+5,
            startAngle: startAngle,
            endAngle: endAngle
        }
    )!

        return <path d={shape} {...attrs} transform={transform} /> //transform={transform}

    }else{
        return null
    }
}

const Highlight =CladeHighlight // NodesHOC(CladeHighlight)
export default Highlight;