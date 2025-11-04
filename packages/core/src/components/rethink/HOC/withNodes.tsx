


import React from 'react'
import { NodeRef, preOrderIterator, Tree } from "../../../Evo";
import { layout, scale } from "../../../store/store";

import { BaseInteraction } from "../../Baubles/baubleTypes";
import withNode, { NodedProps } from "./withNode";
import { Attrs, ResolvedAttrs, UserAttrs } from "../types";
import { useAttributeMappers } from '../Baubles/helpers';
import { withAnimation } from './withAnimation';
import { BaseCircle } from '../shapes/Circle';

// We will return a component that accepts (tree,scale, and layout) -  
// the main class will use this


export type NodeHOCProps<U extends UserAttrs> ={
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs:U,
        interactions?:Record<string,(n:NodeRef)=>void>,
        tree:Tree,
        scale:scale,
        layout:layout
}

export type BaubleProps<A extends UserAttrs> = {
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>
}


// “Remaining” app props after you bind BaubleProps
export type RemainingProps<U extends UserAttrs> =
  Omit<NodeHOCProps<U>, keyof BaubleProps<U>>;



// todo don't expose in index
export function NodesHOC<
    U extends UserAttrs,
    E extends object={}
    >(ShapeComponent:React.FC<NodedProps<ResolvedAttrs<U>> & E>)
    :React.FC<NodeHOCProps<U>> {
    
    return function Nodes(props:NodeHOCProps<U>) {
        const {attrs,interactions,tree,filter=()=>true,
            keyBy=(n:NodeRef)=>n.number,scale,layout,...rest} = props;
        const applyAttrInteractions = useAttributeMappers<U>(attrs,interactions);
        
        // pass x and y position here so can be animated with react-spring in useAnimation hook
        
        return (
            <g className={"node-layer"}>
                {[...preOrderIterator(tree)].filter(n=>filter(n)).map((node) => {
                     {
                        return <ShapeComponent key={keyBy(node)} node={node}  applyAttrInteractions={applyAttrInteractions} scale={scale} layout={layout} {...(rest as E)}/> 
                    }
                })
                }
            </g>
        )
    }
}







// const x = NodesHOC(withNode(withAnimation(BaseCircle)))