import { NodeRef, tipIterator } from "../../../Evo/Tree";
import { useLayout, useTree } from "../../../hooks";
import React from "react";
export function RectangularHighlight(props:{attrs:{[key:string]:any},node:NodeRef}){
    const {attrs,node}=props;
    const tree = useTree ();
    const verticies = useLayout();
    const minX = tree.getParent(node)? (verticies.vertices[node.number].x +verticies.vertices[tree.getParent(node)!.number].x)/2:0;
        
        let maxX = -Infinity;
        let maxY=-Infinity;
        let minY = Infinity;
        let lastY;
        let padding = 0;
        for(const tip of tipIterator(tree,node) ){
            const v = verticies.vertices[tip.number];
            if(v.x>maxX) maxX=v.x;
            if(v.y>maxY) maxY=v.y;
            if(v.y<minY) minY=v.y

            if(lastY){
                padding = (v.y-lastY)/2;
            }
            lastY=v.y;

        }
        // console.log(padding)
        const width = maxX-minX;
        const height = maxY-minY;

        return (<rect {...attrs} height={height+2*padding} width={width} x={minX} y={minY-padding} />)
}