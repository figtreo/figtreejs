import React from "react"
import {  useAttributeMappers,  } from "../../../hooks";

import { NodeRef } from "../../../Evo/Tree/Tree.types";
import { BranchProps } from "./Branches.types";
import { Branch } from "./Branch";
import { preOrderIterator } from "../../../Evo/Tree";
//TODO very similar to Nodes

//todo pull out defaults
export default function Branches(props:BranchProps) {

    const  {tree,filter= (n:NodeRef) => true, 
    attrs= { stroke: "black", strokeWidth: 2,fill:"none" },interactions,
    keyBy=n=>n.number,
    ...rest} = props;
    const shapeProps = useAttributeMappers({attrs,interactions}); //TODO not obvious why in an object
    return (
        <g className={"branch-layer"}>
             {[...preOrderIterator(tree)].filter(node=>filter(node) && tree.hasBranchLength(node)).map((node) => {
                        return <Branch key={keyBy(node)} node={node}  parent={tree.getParent(node)} shapeProps={shapeProps} tree={tree} {...rest}/> 
                    
                })
                }
        </g>
    )
}



