import React, { useMemo } from "react"

import {useAttributeMappers, useLayout, useTree} from "../../../hooks";
import Label from "../Nodes/Shapes/Label";
import { NodeRef } from "../../../Evo/Tree/Tree.types";




//todo pull out defaults
export default function BranchLabels(props:any ) {
    const {filter=(n:NodeRef)=>true,hoverKey,selectionKey,sortFactor,...rest} = props;

    const tree = useTree();
    const vertices = useLayout();
    const attrMapper =useAttributeMappers(props);
    

    return (
        <g className={"branch-label-layer"}>
            {
            vertices.vertices.filter(v => v.branch).filter(v => !v.hidden && filter(tree.getNode(v.number))).map(v => {
                const {alignmentBaseline,textAnchor,rotation,x,y} = v.branch!.label;
                return (<Label key={v.number}   node={tree.getNode(v.number)} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={x} y={y}  {...attrMapper(tree.getNode(v.number))} {...rest}/>)
            })
            }
        </g>
    )
}

