import React from "react"

import {useAttributeMappers} from "../../../hooks";
import Label from "../Nodes/Shapes/Label";
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import {  useVertexFactory } from "../../../store/store";
import { preOrderIterator } from "../../../Evo/Tree";
import { textSafeDegrees } from "../../../store/polarScale";



export default function BranchLabels(props:any){
    const {tree,
        filter=()=>true,
        gap=6,
        layout,
        scale,
        keyBy=(n:NodeRef)=>n.number,
        ...rest} = props;
    const shapeProps = useAttributeMappers(props);
    const useVertex = useVertexFactory(layout);

return (
    <g className={"node-label-layer"}>
        {[...preOrderIterator(tree)].filter(node=>filter(node) && !tree.isRoot(node)).map((node) => { 
                const v = useVertex(node);
                const parentVertex = useVertex(tree.getParent(node)!);
                const scaledV = scale(useVertex(node));
                const scaledpV = scale(parentVertex);
                const layoutClass = v.layoutClass;

                const rotation = layoutClass==="Polar"?textSafeDegrees(scaledV.theta!):0;
                const step = scale({x:parentVertex.x,y:v.y})
                const {dx,dy} = layoutClass==="Polar"? getPolarBranchDs(scaledV.theta!,gap):{dx:0,dy:-1*gap};
                const x = (layoutClass==="Polar"? (scaledV.x+step.x)/2 : (scaledV.x+scaledpV.x)/2 )+dx;
                const y = (layoutClass==="Polar"? (scaledV.y+step.y)/2  : layoutClass==="Radial"? (scaledV.y+scaledpV.y)/2 : scaledV.y )+dy;

                return <Label key={keyBy(node)} {...rest}  node={node}  alignmentBaseline={"bottom"} textAnchor={"middle"} rotation={rotation} x = {x}  y={y} {...shapeProps(node)}/> 
                // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
            })
        
        }
    </g>
)
}


function getPolarBranchDs(theta:number,gap:number){
                //branch lable dx dy;
                let branchDx,branchDy;
                if(theta>0 && theta<Math.PI/2){//good
                    branchDx = Math.sin((Math.PI/2) -theta)*gap;
                    branchDy = -Math.cos((Math.PI/2) -theta)*gap;
                }else if(theta>Math.PI/2 && theta<Math.PI){ //good
                    branchDx = -Math.cos((Math.PI/2) - (Math.PI-theta))*gap;
                    branchDy = -Math.sin((Math.PI/2) - (Math.PI-theta))*gap;
                }else if (theta>Math.PI && theta<3*Math.PI/2){ // good
                    branchDx = Math.cos((Math.PI/2) - (theta-Math.PI))*gap;
                    branchDy = -Math.sin((Math.PI/2) - (theta-Math.PI))*gap;
                }else{
                    branchDx = -Math.cos((Math.PI/2) - (2*Math.PI-theta))*gap;
                    branchDy = -Math.sin((Math.PI/2) - (2*Math.PI-theta))*gap;
                }
                return {dx:branchDx,dy:branchDy};
}