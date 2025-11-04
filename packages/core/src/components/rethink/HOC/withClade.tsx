import React from 'react'
import { NodeRef } from '../../../Evo';
import { layout, scale } from '../../../store/store';
import { AttrAndInteractionApplier, Attrs, BaubleProps, DShape, XYShape } from '../types';

export type NodedProps<A extends Attrs> ={
    node:NodeRef,
    applyAttrInteractions:AttrAndInteractionApplier<A>;
    scale:scale;
    layout:layout;
}


// Overload
function withClade<
  A extends Attrs,
  E extends object ={}
    >
    (
    WrappedComponent: React.FC<XYShape<A> & E>
    ):React.FC<CladeProps<A> & E>;
    
function withClade<
  A extends Attrs,
  E extends object ={}
    >
    (
    WrappedComponent: React.FC<DShape<A> & E>
    ):React.FC<CladeProps<A> & E>;

function withClade <
    A extends Attrs,
    E extends object ={}
    >
    (
    WrappedComponent: React.FC<BaubleProps &{attrs:A} & E>
    ):React.FC<CladeProps<A> & E>
    {
        // we will now calculate the x,y, attrs, and interactions
    function CladedComponent(props:CladeProps<A>){
        const {clade,applyAttrInteractions,scale,layout,...rest} = props
        const v = scale(layout(clade.root));
        const {attrs,interactions} = applyAttrInteractions(clade.root)

        return <WrappedComponent  attrs={attrs} interactions={interactions} x={v.x} y={v.y} {...(rest as E)} />
    } 
    return CladedComponent;
}


export default withClade;