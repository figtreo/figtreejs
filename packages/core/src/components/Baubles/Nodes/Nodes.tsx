
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import {useAttributeMappers} from "../../../hooks";

import React from "react";
import Label from "./Shapes/Label";
import {  Circle } from "./Shapes/Circle";
import Rectangle from "./Shapes/Rectangle";
// import CoalescentShape from "./Shapes/CoalescentShape";
import { NodeProps } from "./Node.types";
import { useFigtreeStore, useVertex } from "../../../store/store";
import { preOrderIterator } from "../../../Evo/Tree";
import { textSafeDegrees } from "../../../store/polarScale";

// todo don't expose in index
export function NodesHOC(ShapeComponent:React.ComponentType<any>) {
    return function Nodes(props:NodeProps) {

        const {filter=(n:NodeRef)=>true} = props;

        const shapeProps = useAttributeMappers(props);

        const tree = useFigtreeStore(state=>state.tree);  


        // pass x and y position here so can be animated with react-spring in useAnimation hook
        return (
            <g className={"node-layer"}>
                {[...preOrderIterator(tree)].filter(filter).map((node) => {
                     {
                        return <ShapeComponent key={node.number} node={node}  shapeProps={shapeProps}/> 
                    }
                })
                }
            </g>
        )
    }
}

function NodeLabels(props:any){
        const {filter=(n:NodeRef)=>true,aligned=false,gap = 6,...rest} = props;
        const shapeProps = useAttributeMappers(props);

        const tree = useFigtreeStore(state=>state.tree);  
        const scale = useFigtreeStore(state=>state.scale);
        const rootV = useVertex(tree.getRoot());
        const {maxX} = rootV
    return (
        <g className={"node-label-layer"}>
            {[...preOrderIterator(tree)].filter(filter).map((node) => { 
                    const v = useVertex(node);
                     // TODO move to function to calculate on the fly
                    const scaledV = scale(v);
                    const layoutClass = v.layoutClass;
                    const labelScootFactor = tree.isInternal(node) ? -1 : 1;
                    const dx = layoutClass==="Rectangular"? labelScootFactor*gap: Math.cos(scaledV.theta!)*gap  ; 
                    const dy = layoutClass==="Rectangular"? 0: Math.sin(scaledV.theta!)*gap ; 

                    const scaledMax = scale({x:maxX,y:v.y})
                    const xpos = (aligned? scaledMax.x :scaledV.x) + dx;
                    const ypos = (aligned &&layoutClass==="Polar"? scaledMax.y :scaledV.y) + dy
                    const rotation = layoutClass==="Polar"? textSafeDegrees(scaledV.theta!):0 

                    const alignmentBaseline=layoutClass==="Polar"? "middle":
                    tree.isInternal(node) ? 
                        ((tree.getChildCount(node) > 0 && (tree.getParent(node) === undefined || tree.getChild(tree.getParent(node)!, 0) !== node)) ? "bottom" :
                            "hanging") :
                        "middle";
                    const textAnchor=layoutClass==="Polar"? 
                        (scaledV.theta!>Math.PI/2 && scaledV.theta!<3*Math.PI/2?"end":
                            "start"):
                        tree.isInternal(node)?"end":
                            "start"

                    const d =        
                    aligned ?`M${scaledV.x} ${scaledV.y}L${xpos} ${ypos}`:`M${scaledV.x} ${scaledV.y}L${scaledV.x} ${scaledV.y}`

                    return <Label key={node.number} {...rest} node={node}  d={d} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={xpos} y={ypos} {...shapeProps(node)}/> 
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





