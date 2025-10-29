import React from 'react'
import { NodeRef } from '../../../Evo';
import { Interaction } from '../../Baubles/baubleTypes';
import { layout, scale } from '../../../store/store';
import { Attrs, BaubleProps } from '../shapes/types';



//The goal here is now to take a shape components that accepts Attrs: number | string , x/y
// and return a component that takes a node / layout/ scale and attrs:number|string | function

export type AttrAndInteractionApplier =
  (n: NodeRef) => { attrs: Attrs; interactions?: Interaction };

export type NodedProps ={
    node:NodeRef,
    applyAttrInteractions:AttrAndInteractionApplier;
    scale:scale;
    layout:layout;
}

function withNode(WrappedComponent: React.ComponentType<BaubleProps>){
    function NodedComponent(props:NodedProps){
        const {node,applyAttrInteractions,scale,layout} = props
        const v = scale(layout(node));
        const {attrs,interactions} = applyAttrInteractions(node)
        return <WrappedComponent  attrs={attrs} interactions={interactions} x={v.x} y={v.y}/>
    } 
    return NodedComponent;
}


export default withNode;