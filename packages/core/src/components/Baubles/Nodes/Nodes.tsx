
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import {useAttributeMappers, useLayout, useTree} from "../../../hooks";

import React from "react";
import Label from "./Shapes/Label";
import {  Circle } from "./Shapes/Circle";
import Rectangle from "./Shapes/Rectangle";
import CoalescentShape from "./Shapes/CoalescentShape";
import { NodeProps, NodeShape } from "./Node.types";

// todo don't expose in index
export function NodesHOC(ShapeComponent:React.ComponentType<any>) {
    return function Nodes(props:NodeProps) {
        const vertices =useLayout();
        const tree = useTree();
        const {filter=(n:NodeRef)=>true,
            ...rest} = props;
        const shapeProps = useAttributeMappers(props);
        
        return (
            <g className={"node-layer"}>
                {vertices.vertices.filter(v=>!v.hidden).sort((a,b)=>(a.x-b.x)).reduce<React.ReactNode[]>( (all, v) => {
                    if (filter(tree.getNode(v.number))) {//filter needs to us tree api
                        const element = <ShapeComponent key={v.number} {...rest} theta={v.theta} x={v.x} y={v.y} {...shapeProps(tree.getNode(v.number))} id={v.number}/> 
                        // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                            all.push(element)
                    }
                    return all
                }, [])
                }
            </g>
        )
    }
}

function NodeLabels(props:any){
    const vertices =useLayout();
    const tree = useTree();
    const {filter=(n:NodeRef)=>true,
        aligned=false,
        ...rest} = props;
    const shapeProps = useAttributeMappers(props);
    return (
        <g className={"node-label-layer"}>
                {vertices.vertices.filter(v=>!v.hidden).sort((a,b)=>(a.x-b.x)).reduce<React.ReactNode[]>( (all, v) => {
                if (filter(tree.getNode(v.number))) {//filter needs to us tree api
                    const {alignmentBaseline,textAnchor,rotation} = v.nodeLabel;
                    const {x,y} = aligned &&  v.nodeLabel.alignedPos ? v.nodeLabel.alignedPos:v.nodeLabel;
                    const d =        
                    aligned &&  v.nodeLabel.alignedPos ?`M${v.x} ${v.y}L${x} ${y}`:`M${v.x} ${v.y}L${v.x} ${v.y}`
                    const element = <Label key={v.number} {...rest}  node={tree.getNode(v.number)}  d={d} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={x} y={y} {...shapeProps(v)}/> 
                    // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                        all.push(element)
                }
                return all
            }, [])
            }
        </g>
    )
}




const CircleNodes = NodesHOC(Circle);



const RectangularNodes = NodesHOC(Rectangle);



const CoalescentNodes=NodesHOC(CoalescentShape);




const Nodes={Circle:CircleNodes,Coalescent:CoalescentNodes,Rectangle:RectangularNodes,Label:NodeLabels};
export default Nodes;





