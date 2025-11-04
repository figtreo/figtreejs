import React from 'react'
import { NodeRef, preOrderIterator, Tree } from "../../../Evo";
import { layout, scale } from "../../../store/store";

import { ResolvedAttrs, UserAttrs } from "../types";
import { useAttributeMappers } from '../Baubles/helpers';

import withNode, { NodedProps } from "../HOC/withNode";
import { withAnimation } from '../HOC/withAnimation';
import { BaseCircle } from '../shapes/Circle';
import { CenteredRectangle } from '../shapes/Rectangle';
// We will return a component that accepts (tree,scale, and layout) -  
// the main class will use this


type NodeHOCProps<U extends UserAttrs> ={
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
        animated?:boolean
}


// “Remaining” app props after you bind BaubleProps
type RemainingProps<U extends UserAttrs> =
  Omit<NodeHOCProps<U>, keyof BaubleProps<U>>;


// todo don't expose in index
function makeNodes<
    U extends UserAttrs,
    E extends object={}
    >(ShapeComponent:React.FC<NodedProps<ResolvedAttrs<U>> & E>)
    :(initial: BaubleProps<U> & E) => React.FC<RemainingProps<U>>  {
    
        return (initial)=>{

        const Nodes: React.FC<RemainingProps<U>> = ({ tree, scale, layout }) => {
                const {
                    filter = () => true,
                    keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                    attrs,
                    interactions,
                    ...rest // all shape-specific extras E
                } = initial;

                const applyAttrInteractions = useAttributeMappers<U>(attrs,interactions);
                // pass x and y position here so can be animated with react-spring in useAnimation hook
                return (
                    <g className={"node-layer"}>
                        {[...preOrderIterator(tree)]
                        .filter(n=>filter(n))
                        .map((node) => (
                         <ShapeComponent 
                            key={keyBy(node)} 
                            node={node}  
                            applyAttrInteractions={applyAttrInteractions} 
                            scale={scale} 
                            layout={layout} 
                            {...(rest as E)}/> 
                        ))}
                    </g>
                )
            }
        return Nodes;
    }
}
export const CircleNodes = makeNodes(withNode(withAnimation(BaseCircle)));
export const RectangleNodes = makeNodes(withNode(withAnimation(CenteredRectangle)));
