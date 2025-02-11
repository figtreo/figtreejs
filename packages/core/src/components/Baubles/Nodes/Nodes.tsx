
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import {useAttributeMappers} from "../../../hooks";

import React from "react";
import Label from "./Shapes/Label";
import {  Circle } from "./Shapes/Circle";
import Rectangle from "./Shapes/Rectangle";
// import CoalescentShape from "./Shapes/CoalescentShape";
import { NodeProps } from "./Node.types";
import {  useVertexFactory } from "../../../store/store";
import { preOrderIterator } from "../../../Evo/Tree";
import { textSafeDegrees } from "../../../store/polarScale";

// todo don't expose in index
export function NodesHOC(ShapeComponent:React.ComponentType<any>) {
    return function Nodes(props:NodeProps) {
        const shapeProps = useAttributeMappers(props);
        const {tree,filter=(n:NodeRef)=>true,
            keyBy=n=>n.number,...rest} = props;
        // pass x and y position here so can be animated with react-spring in useAnimation hook
        return (
            <g className={"node-layer"}>
                {[...preOrderIterator(tree)].filter(n=>filter(n)).map((node) => {
                     {
                        return <ShapeComponent key={keyBy(node)} node={node}  shapeProps={shapeProps} {...rest}/> 
                    }
                })
                }
            </g>
        )
    }
}

function NodeLabels(props:any){

        const {tree,
            filter=(n:NodeRef)=>true,
            keyBy=(n:NodeRef)=>n.number,
            aligned=false,
            gap = 6,
            layout,
            scale,
            dimensions,
            ...rest} = props;

        const shapeProps = useAttributeMappers(props);
        const useVertex = useVertexFactory(layout);
        const {domainX,layoutClass} = dimensions
        
    return (
        <g className={"node-label-layer"}>
            {[...preOrderIterator(tree)].filter(filter).map((node) => { 
                    const v = useVertex(node);
                     // TODO move to function to calculate on the fly
                    const scaledV = scale(v);
                    const nodeLabel = scaledV.nodeLabel;
                    const dx = nodeLabel.dxFactor*gap; 
                    const dy = nodeLabel.dyFactor*gap;
                                             
                    const scaledMax = scale({x:domainX[1],y:v.y})
                    
                    const xpos = (aligned? scaledMax.x :scaledV.x) + dx;
                    const ypos = (aligned && layoutClass==="Polar"? scaledMax.y :scaledV.y) + dy;

                    const {alignmentBaseline,rotation,textAnchor}=nodeLabel;

                    const d =        
                    aligned ?`M${scaledV.x} ${scaledV.y}L${xpos} ${ypos}`:`M${scaledV.x} ${scaledV.y}L${scaledV.x} ${scaledV.y}`

                    return <Label key={keyBy(node)} {...rest} node={node}  d={d} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={xpos} y={ypos} {...shapeProps(node)}/> 
                    // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                })
            
            }
        </g>
    )
}




const CircleNodes = NodesHOC(Circle);



const RectangularNodes = NodesHOC(Rectangle);



// const CoalescentNodes=NodesHOC(CoalescentShape);




const Nodes={Circle:CircleNodes,Rectangle:RectangularNodes,Label:NodeLabels};
export default Nodes;





