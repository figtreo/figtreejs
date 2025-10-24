import React from "react"
import { Branch, BranchAttrs } from "./Branch";
import { NodeRef, preOrderIterator, Tree } from "../../../Evo/Tree";
import { useAttributeMappers } from "../baubleHelpers";
import { BaseInteraction, UnwrappedAnimatableProps } from "../baubleTypes";
import { layout, scale } from "../../../store/store";
//TODO very similar to Nodes

//todo pull out defaults

type BranchesProps = {
        tree:Tree,
        scale:scale;
        layout:layout;
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs?:UnwrappedAnimatableProps<BranchAttrs>,
        interactions?:Record<string, BaseInteraction>;
}
export default function Branches(props:BranchesProps) {

    const  {tree,filter= () => true, 
    attrs= { stroke: "black", strokeWidth: 2,fill:"none" },interactions={},
    keyBy=n=>n.number,
    scale,
    layout
} = props;
    
    
    const shapeProps = useAttributeMappers<UnwrappedAnimatableProps<BranchAttrs>>({attrs,interactions}); //TODO not obvious why in an object
    
    return (
        <g className={"branch-layer"}>
             {[...preOrderIterator(tree)].filter(node=>filter(node) && tree.getLength(node)).map((node) => {
                        return <Branch key={keyBy(node)} node={node}  parent={tree.getParent(node)} applyAttrInteractions={shapeProps} tree={tree} scale={scale} layout={layout}/> 
                    
                })
                }
        </g>
    )
}



