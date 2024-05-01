
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
        const {filter=(n:NodeRef)=>true,aligned=false,...rest} = props;
        const shapeProps = useAttributeMappers(props);

        const tree = useFigtreeStore(state=>state.tree);  
        const scale = useFigtreeStore(state=>state.scale);
        const rootV = useVertex(tree.getRoot());
        const {maxX} = rootV
    return (
        <g className={"node-label-layer"}>
            {[...preOrderIterator(tree)].filter(filter).map((node) => { 
                    const v = useVertex(node);
                    const {alignmentBaseline,textAnchor,rotation} = v.nodeLabel;
                    const scaledMaxX = scale({x:maxX,y:0}).x
                    const scaledV = scale(v);
                    const xpos = aligned? scaledMaxX+6 :scaledV.x+v.nodeLabel.dx;
                    const ypos = scaledV.y +v.nodeLabel.dy
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





