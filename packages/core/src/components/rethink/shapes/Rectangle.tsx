import React from "react";
import { animated, Interpolation, SpringValue, to, useSpring } from "@react-spring/web";
import {BaseBaubleProps, BaubleProps, numerical,stringy, StripSprings} from "./types"
import { isSpringNumber } from "./utils";



function centerNumber(
  pos: number | SpringValue<number> ,
  size: number | SpringValue<number> 
): number | SpringValue<number> | Interpolation<number> {
  if (isSpringNumber(pos) || isSpringNumber(size)) {
    // derive animated value
    return to([pos as numerical, size as numerical], (p: number, s: number) => p - s / 2);
  }
  // plain numbers
  return pos - size / 2;
}

export type  BaseRectAttrs ={
        width:numerical,
        height:numerical,
        fill?:stringy,
        stroke?:stringy,
        strokeWidth?:numerical
    }

export type BaseRectangleProps = BaseBaubleProps & {
    attrs:BaseRectAttrs,
}


export const BaseRectangle = function(props:BaseRectangleProps){
   const {attrs,interactions,x,y} = props;

        const xCentered = centerNumber((x as numerical), attrs.width);
        const yCentered = centerNumber((y as numerical), attrs.height);
    return (
        <animated.rect  className={"node-shape"} {...attrs} {...interactions} x={xCentered} y={yCentered} />
        );
};


// export  type RectAttrs={
//         width:number,
//         height:number,
//         fill?:string,
//         stroke?:string,
//         strokeWidth?:number
// }

export  type RectAttrs= StripSprings<BaseRectAttrs>

export type RectangleProps = BaubleProps & {
    attrs:RectAttrs,
}
type animatable= "width"|"height"|"fill"|"stroke"|"strokeWidth"

// Rectangle
export const rectAnimatableKeys = ['width','height','fill','stroke','strokeWidth'] as const;
export type RectaAttrKey = typeof rectAnimatableKeys[number];

export type RectRootKey   = 'x' | 'y';



const animatableAttrs:animatable[] = ["width","height","fill","stroke","strokeWidth"]

function withAnimation(AnimatableShape:React.FunctionComponent<BaseRectangleProps>):React.FunctionComponent<RectangleProps>{
    function AnimatedComponent(props:RectangleProps) {
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

export const Rectangle = withAnimation(BaseRectangle)

