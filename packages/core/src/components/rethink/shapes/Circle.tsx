import React from "react";
import { animated,  useSpring } from "@react-spring/web";
import { BaseBaubleProps, BaubleProps, numerical, stringy, StripSprings } from "./types";

export type BaseCircleAttrs={
        r:numerical,
        fill?:stringy,
        stroke?:stringy,
        strokeWidth?:numerical
    }

export type BaseCircleProps = BaseBaubleProps & {
    attrs:BaseCircleAttrs
}

export const BaseCircle = function(props:BaseCircleProps){
   const {attrs,interactions,x,y} = props;
    return (
        <animated.circle  className={"node-shape"} {...attrs} {...interactions} cx={x} cy={y} />
        );
};


export type CircleAttrs= StripSprings<BaseCircleAttrs>


export type CircleProps = BaubleProps &{
    attrs:CircleAttrs
}
type animatable= "r"|"fill"|"stroke"|"strokeWidth"





// Circle
export const circAnimatableKeys = ['r','fill','stroke','strokeWidth'] as const;
export type CircaAttrsKey = typeof circAnimatableKeys[number];
export type CircleRootKey = 'x' | 'y';


const animatableAttrs:animatable[] = ["r","fill","stroke","strokeWidth"]

function withAnimation(AnimatableShape:React.FunctionComponent<BaseCircleProps>):React.FunctionComponent<CircleProps>{
    function AnimatedComponent(props:CircleProps) {
        const animation = props.animated;
        const { attrs,  x , y, interactions } = props;
        const aAttrs = animatableAttrs
        .filter(d=>attrs[d]!==undefined)
        .reduce<{[key:string]:number|string}>((acc,d)=> {acc[d]=attrs[d]!;return acc },{});
        
        //need to run both so the number of hooks doesn't change
        const animatedProperties = useSpring({...aAttrs,x,y, config: { duration: 500 }}) ; //TODO adjust animation config.
        // get plain types here for unanimated values
        const nonAnimated = {...aAttrs,x,y}

        const {x:xFinal,y:yFinal,...possiblyAnimatedAttrs}=animation?animatedProperties:nonAnimated;
        const finalAttrs = {...attrs,...possiblyAnimatedAttrs}
         return (<AnimatableShape  x={x} y={y} attrs={finalAttrs} interactions={interactions} />)
    }
    return AnimatedComponent;
}

export const Circle = withAnimation(BaseCircle)
