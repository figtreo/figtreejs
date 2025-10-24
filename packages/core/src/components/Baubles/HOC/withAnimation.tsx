import {  useSpring } from "@react-spring/web";
import React from "react";
import { AnimatableBaubleProps, attrType, BaseAttrs, numericAttr, plainAttr, PlainProps, stringAttr } from "../baubleTypes";

/**
 * This is a HOC that wraps a bauble and applies a string to it's visible attributes if the animation is true.
 * @param WrappedComponent 
 * @returns 
 */

type FlatAnimObject<A extends BaseAttrs> =
  // Turn each attr key into a union we can accept from both animated/non-animated paths
  { [K in keyof A]: attrType | undefined } & {
    x?: numericAttr;
    y?: numericAttr;
    d?: stringAttr;
  };



//TODO no interaction here
function withAnimation<A extends BaseAttrs>(WrappedComponent: React.ComponentType<AnimatableBaubleProps<A> >):
React.ComponentType<PlainProps<A> >
{
    function AnimatedComponent(props:PlainProps<A>) {
        const animation = props.animated;
        const { attrs, d, x , y, interactions,id } = props;
        //need to run both so the number of hooks doesn't change
        const animatedProperties = useSpring({...attrs,d,x,y, config: { duration: 500 }}) as FlatAnimObject<A>; //TODO adjust animation config.
        // get plain types here for unanimated values
        const nonAnimated : FlatAnimObject<A> = {
          ...(attrs as { [K in keyof A]: plainAttr | undefined }),
          x:x as number|undefined,
          y:y as number| undefined,
          d: d as string | undefined} 

        const {x:xFinal,y:yFinal,d:dFinal,...attrsFinal}=animation?animatedProperties:nonAnimated;
         return (<WrappedComponent  attrs={attrsFinal as A} x={xFinal as numericAttr|undefined} y={yFinal as numericAttr|undefined} d={dFinal as stringAttr|undefined} interactions={interactions} id={id}/>)
    
    }
    return AnimatedComponent;
}


export default withAnimation;