import { NodeRef } from "../../Evo"
import {  AttrsRecord, InternalInteractionType } from "../Baubles/types"

export type NodeProps<A extends object>= {
    nodes:NodeRef[],
    attrs?:AttrsRecord<A>
    interactions?:{[key:string]:InternalInteractionType}, // keyed by node id // check type
    // shape:NodeShapes,
    keyBy?:(n:NodeRef)=>string
}




/**
 * A component that
 * The factory accepts the options above and returns a Bauble to be rendered by the figure.
 */
//TODO do interactions
export function withNodes< T extends object>
(ShapeComponent:React.FC< T & {node:NodeRef}>)
    : React.FC<NodeProps<T>>  {
    
        const withNodes = (props:NodeProps<T>)=>{
        
        const {nodes,keyBy=(n:NodeRef)=>n._id,attrs={}, interactions={}} = props
            
        return (
                    <g className={"node-layer"}>
                        {nodes
                        .map((node) => {
                            const nodeAttrs = attrs[node._id]?? {}
                            // const nodeInteractions = interactions[node._id]?? {}
                         return <ShapeComponent 
                            key={keyBy(node)} 
                            node={node}
                            {...nodeAttrs}
                            // interactions={nodeInteractions}
                            /> 
                        }
                        )}
                    </g>
                )
    }
    withNodes.displayName =
    `withNodesArray(${ShapeComponent.displayName || ShapeComponent.name || 'Component'})`;
    return withNodes
    
}


