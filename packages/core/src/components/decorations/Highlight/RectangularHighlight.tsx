import { NodeRef, tipIterator } from "../../../Evo/Tree";
import React from "react";
import { useFigtreeStore } from "../../../store";
export function RectangularHighlight(props:{attrs:{[key:string]:any},node:NodeRef}){
    const {attrs,node}=props;
    const tree = useFigtreeStore(state=>state.tree);
    const layout = useFigtreeStore(state=>state.layout);   
    const x = useFigtreeStore(state=>state.scaleX);   
    const y = useFigtreeStore(state=>state.scaleY);   

    const minX = tree.getParent(node)? (x(layout(node).x) +x(layout(tree.getParent(node)!).x))/2:0;
        
        let maxX = -Infinity;
        let maxY=-Infinity;
        let minY = Infinity;
        let lastY;
        let padding = 0;
        for(const tip of tipIterator(tree,node) ){
            const v = layout(tip);
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