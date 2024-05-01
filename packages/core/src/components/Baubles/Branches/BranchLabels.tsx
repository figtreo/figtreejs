import React, { useMemo } from "react"

import {useAttributeMappers} from "../../../hooks";
import Label from "../Nodes/Shapes/Label";
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import { useFigtreeStore, useVertex } from "../../../store/store";
import { preOrderIterator } from "../../../Evo/Tree";



export default function BranchLabels(props:any){
    const {filter=(n:NodeRef)=>true,aligned=false,...rest} = props;
    const shapeProps = useAttributeMappers(props);

    const tree = useFigtreeStore(state=>state.tree);  
    const scale = useFigtreeStore(state=>state.scale);

return (
    <g className={"node-label-layer"}>
        {[...preOrderIterator(tree)].filter(node=>filter(node) && !tree.isRoot(node)).map((node) => { 
                const v = scale(useVertex(node));
                const vP = scale(useVertex(tree.getParent(node)!));
                return <Label key={node.number} {...rest}  node={node}  alignmentBaseline={"bottom"} textAnchor={"middle"} rotation={0} x = {(v.x+vP.x)/2}  y={v.y-6} {...shapeProps(node)}/> 
                // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
            })
        
        }
    </g>
)
}
