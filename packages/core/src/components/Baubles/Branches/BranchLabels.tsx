import React, { useMemo } from "react"

import {useAttributeMappers} from "../../../hooks";
import Label from "../Nodes/Shapes/Label";
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import { useFigtreeStore, useVertex } from "../../../store";
import { preOrderIterator } from "../../../Evo/Tree";



export default function BranchLabels(props:any){
    const {filter=(n:NodeRef)=>true,aligned=false,...rest} = props;
    const shapeProps = useAttributeMappers(props);

    const tree = useFigtreeStore(state=>state.tree);  
    const x = useFigtreeStore(state=>state.scaleX);
    const y = useFigtreeStore(state=>state.scaleY);

return (
    <g className={"node-label-layer"}>
        {[...preOrderIterator(tree)].filter(node=>filter(node) && !tree.isRoot(node)).map((node) => { 
                const v = useVertex(node);
                const vP = useVertex(tree.getParent(node)!);
                return <Label key={node.number} {...rest}  node={node}  alignmentBaseline={"bottom"} textAnchor={"middle"} rotation={0} x = {(x(v.x)+x(vP.x))/2}  y={y(v.y)-6} {...shapeProps(node)}/> 
                // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
            })
        
        }
    </g>
)
}
