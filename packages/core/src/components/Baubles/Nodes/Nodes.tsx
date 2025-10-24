
import { NodeRef, Tree } from "../../../Evo/Tree/Tree.types";


import React from "react";
import Label from "./Shapes/Label";
import {  Circle, CircleAttrs } from "./Shapes/Circle";
import Rectangle, { RectangleAttrs } from "./Shapes/Rectangle";

import {  layout, scale, useVertexFactory } from "../../../store/store";
import { preOrderIterator } from "../../../Evo/Tree";
import { BaseAttrs, BaseInteraction,  UnwrappedAnimatableProps } from "../baubleTypes";
import { useAttributeMappers } from "../baubleHelpers";
import { NodedProps } from "../HOC/withNode";
import { dimensionType } from "../../FigTree/Figtree.types";
import { simpleVertex } from "../../../Layouts/functional/rectangularLayout";


type NodeProps<A extends BaseAttrs> = {
        tree:Tree,
        scale:scale;
        layout:layout;
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs?:Partial<UnwrappedAnimatableProps<A>>,
        interactions?:Record<string, BaseInteraction>;
}

// todo don't expose in index
export function NodesHOC<A extends BaseAttrs>(ShapeComponent:React.ComponentType<NodedProps<A>>) {
    return function Nodes(props:NodeProps<A>) {
        const {attrs={},interactions={}} = props;
        const applyAttrInteractions = useAttributeMappers<A>({attrs,interactions});
        
        const {tree,filter=()=>true,
            keyBy=(n:NodeRef)=>n.number,scale,layout} = props;
        // pass x and y position here so can be animated with react-spring in useAnimation hook
        
        return (
            <g className={"node-layer"}>
                {[...preOrderIterator(tree)].filter(n=>filter(n)).map((node) => {
                     {
                        return <ShapeComponent key={keyBy(node)} node={node}  applyAttrInteractions={applyAttrInteractions} scale={scale} layout={layout}/> 
                    }
                })
                }
            </g>
        )
    }
}


export type LabelProps<A extends BaseAttrs=BaseAttrs> = {
        tree:Tree,
        scale:scale;
        layout:layout;
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs?:Partial<UnwrappedAnimatableProps<A>>,
        interactions?:Record<string, BaseInteraction>;
        aligned?:boolean,
        gap?:number,
        dimensions:dimensionType,
        text:(n:NodeRef)=>string
}


function NodeLabels<A extends BaseAttrs=BaseAttrs>(props:LabelProps<A>){

        const {tree,
            filter=()=>true,
            keyBy=(n:NodeRef)=>n.number,
            aligned=false,
            gap = 6,
            layout,
            scale,
            dimensions,
            text} = props;

        const {attrs={},interactions={}} = props;
        const shapeProps = useAttributeMappers({attrs,interactions});
        const useVertex = useVertexFactory(layout);
        const {domainX,layoutClass} = dimensions
        
    return (
        <g className={"node-label-layer"}>
            {[...preOrderIterator(tree)].filter(filter).map((node) => { 
                    const v = useVertex(node);
                     // TODO move to function to calculate on the fly
                    const scaledV = scale(v) as simpleVertex &{nodeLabel:{dxFactor:number,dyFactor:number,alignmentBaseline: React.SVGAttributes<SVGTextElement>['alignmentBaseline'],rotation:number,textAnchor:React.SVGAttributes<SVGTextElement>['textAnchor']}}; // todo don't like that this is not really inherent
                    const nodeLabel = scaledV.nodeLabel;
                    const dx = nodeLabel.dxFactor*gap; 
                    const dy = nodeLabel.dyFactor*gap;
                                             
                    const scaledMax = scale({x:domainX[1],y:v.y})
                    
                    const xpos = (aligned? scaledMax.x :scaledV.x) + dx;
                    const ypos = (aligned && layoutClass==="Polar"? scaledMax.y :scaledV.y) + dy;

                    const {alignmentBaseline,rotation,textAnchor}=nodeLabel;

                    const d =        
                    aligned ?`M${scaledV.x} ${scaledV.y}L${xpos} ${ypos}`:`M${scaledV.x} ${scaledV.y}L${scaledV.x} ${scaledV.y}`

                    return <Label id={node.number} text = {text} key={keyBy(node)}  node={node}  d={d} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={xpos} y={ypos} {...shapeProps(node)}/> 
                    // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                })
            
            }
        </g>
    )
}




const CircleNodes = NodesHOC<CircleAttrs>(Circle);
const RectangularNodes = NodesHOC<RectangleAttrs>(Rectangle);



// const CoalescentNodes=NodesHOC(CoalescentShape);




const Nodes={Circle:CircleNodes,Rectangle:RectangularNodes,Label:NodeLabels};
export default Nodes;





