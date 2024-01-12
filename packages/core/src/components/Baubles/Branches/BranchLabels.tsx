import React, { useMemo } from "react"

import {useAttributeMappers, useLayout, useTree} from "../../../hooks";
import Label from "../Nodes/Shapes/Label";
import { NodeRef } from "../../../Tree/Tree.types";




//todo pull out defaults
export default function BranchLabels(props:any ) {
    const {filter=(n:NodeRef)=>true,hoverKey,selectionKey,sortFactor,...rest} = props;

    const tree = useTree();
    const vertices = useLayout();
    const attrMapper =useAttributeMappers(props);
    

    return (
        <g className={"branch-label-layer"}>
            {
            vertices.allIds.filter(id => vertices.byId[id].branch).filter(id => !vertices.byId[id].hidden && filter(tree.getNode(id))).map(id => {
                const v = vertices.byId[id];
                const {alignmentBaseline,textAnchor,rotation,x,y} = v.branch!.label;
                return (<Label key={id}   node={tree.getNode(v.id)} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={x} y={y}  {...attrMapper(v)} {...rest}/>)
            })
            }
        </g>
    )
}

