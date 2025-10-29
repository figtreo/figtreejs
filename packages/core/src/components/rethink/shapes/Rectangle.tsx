import React from "react";
import { animated, Interpolation, SpringValue, to, useSpring } from "@react-spring/web";
import {Interactions, numerical,stringy, StripSprings} from "./types"
import { isSpringNumber } from "./utils";
import { withAnimation } from "./withAnimation";



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

export type BaseRectangleProps ={
    x:numerical
    y:numerical
    interactions?:Interactions
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



export  type RectAttrs= StripSprings<BaseRectAttrs>


export const Rectangle = withAnimation(BaseRectangle)

