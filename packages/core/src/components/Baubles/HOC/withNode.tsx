import React from "react";
import { AttrAndInteractionApplier, BaseAttrs,  PlainProps, UnwrappedAnimatableProps } from "../baubleTypes";
import { NodeRef } from "../../../Evo";
import { layout, scale } from "../../../store/store";


//With node adds adds x and y to a component and converts attrs functions into bondafide attributes


export type NodedProps<A extends BaseAttrs> ={
    node:NodeRef,
    applyAttrInteractions:AttrAndInteractionApplier<UnwrappedAnimatableProps<A>>;
    scale:scale;
    layout:layout;
}

function withNode<A extends BaseAttrs>(WrappedComponent: React.ComponentType<PlainProps<A>>){
    function NodedComponent(props:NodedProps<A>){
        const {node,applyAttrInteractions,scale,layout} = props

        const v = scale(layout(node));
        const {attrs,interactions} = applyAttrInteractions(node)
        return <WrappedComponent  attrs={attrs} interactions={interactions} x={v.x} y={v.y} id={node.number}/>
    } 
    return NodedComponent;
}
export default withNode;

