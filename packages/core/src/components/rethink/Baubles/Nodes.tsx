import React from 'react'
import { NodeRef, preOrderIterator, Tree } from "../../../Evo";
import { layout, scale } from "../../../store/store";

import {  Attrs,  UserAttrs } from "../types";
import { LiftToUser, useAttributeMappers } from './helpers';

import withNode, { NodedProps } from "../HOC/withNode";
import { withAnimation } from '../HOC/withAnimation';
import { BaseCircle } from '../Shapes/Circle';
import { CenteredRectangle } from '../Shapes/Rectangle';

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


// Lift a resolved attrs shape (A) so each key allows literal or function-of-node


// todo don't expose in index
function makeNodes<
    AResolved extends Attrs
    >(ShapeComponent:React.FC<NodedProps<AResolved>>)
    :(initial: BaubleProps<LiftToUser<AResolved>>) => React.FC<RemainingProps<AResolved>>  {
    
        return (initial)=>{

        const Nodes: React.FC<RemainingProps<AResolved>> = ({ tree, scale, layout }) => {
                const {
                    filter = () => true,
                    keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                    attrs,
                    interactions,
                } = initial;

                const applyAttrInteractions = useAttributeMappers<AResolved>(attrs,interactions);
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
                            /> 
                        ))}
                    </g>
                )
            }
        return Nodes;
    }
}
export const CircleNodes = makeNodes(withNode(withAnimation(BaseCircle)));
export const RectangleNodes = makeNodes(withNode(withAnimation(CenteredRectangle)));
