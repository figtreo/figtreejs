import React, { useMemo } from "react"

import {useAttributeMappers, useLayout, useTree} from "../../../../hooks";

import BranchLabel from "./BranchLabel";



//todo pull out defaults
export default function BranchLabels(props ) {
    const {filter,hoverKey,selectionKey,sortFactor,...rest} = props;
    const tree = useTree();
    const vertices = useLayout();
    const attrMapper =useAttributeMappers(props);
    

    return (
        <g className={"branch-layer"}>
            {
            vertices.allIds.filter(id => vertices.byId[id].branch).filter(id => filter(tree.getNode(id))).map(id => {
                const v = vertices.byId[id];
                return (<BranchLabel node={tree.getNode(v.id)}   vertex={v} {...attrMapper(v)} {...rest}/>)
            })
            }
        </g>
    )
}

