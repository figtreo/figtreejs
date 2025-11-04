import React from 'react'
import { NodeRef } from '../../../Evo';
import { layout, scale } from '../../../store/store';
import { AttrAndInteractionApplier, Attrs, XYShape } from '../types';




//The goal here is now to take a shape components that accepts Attrs: number | string , x/y
// and return a component that takes a node / layout/ scale and attrs:number|string | function


export type NodedProps<A extends Attrs> ={
    node:NodeRef,
    applyAttrInteractions:AttrAndInteractionApplier<A>;
    scale:scale;
    layout:layout;
    animated?:boolean
}

// TODO may need to think about options here for caching
function withNode<
  A extends Attrs,
    >
    (
    WrappedComponent: React.FC<XYShape<A>>
    ):React.FC<NodedProps<A>> {
        // we will now calculate the x,y, attrs, and interactions
    function NodedComponent(props:NodedProps<A>){
        const {node,applyAttrInteractions,scale,layout,animated=false} = props
        const v = scale(layout(node));
        const {attrs,interactions} = applyAttrInteractions(node)
        return <WrappedComponent  attrs={attrs} interactions={interactions} x={v.x} y={v.y} animated={animated} />
    } 
    return NodedComponent;
}


export default withNode;