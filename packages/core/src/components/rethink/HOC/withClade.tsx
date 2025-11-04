import React from 'react'
import { NodeRef } from '../../../Evo';
import { layout, scale } from '../../../store/store';
import { AttrAndInteractionApplier, Attrs, BaubleProps } from '../types';
import { CladeProps } from '../Clades/makeClade';

export type NodedProps<A extends Attrs> ={
    node:NodeRef,
    applyAttrInteractions:AttrAndInteractionApplier<A>;
    scale:scale;
    layout:layout;
}



function withClade <
    A extends Attrs,
    >
    (
    WrappedComponent: React.FC<BaubleProps &{attrs:A} >
    ):React.FC<CladeProps<A>>
    {
        // we will now calculate the x,y, attrs, and interactions
    function CladedComponent(props:CladeProps<A>){
        const {clade,applyAttrInteractions,scale,layout} = props
        const v = scale(layout(clade.root));
        const {attrs,interactions} = applyAttrInteractions(clade.root)

        return <WrappedComponent  attrs={attrs} interactions={interactions} x={v.x} y={v.y}  />
    } 
    return CladedComponent;
}


export default withClade;