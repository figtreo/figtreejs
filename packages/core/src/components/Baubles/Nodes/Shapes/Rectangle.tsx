import React from "react"
import { animated, SpringValue,to as springTo, Interpolation } from "@react-spring/web";
import withAnimation from "../../HOC/withAnimation";
import withNode from "../../HOC/withNode";
import {  AnimatableBaubleProps, BaseAttrs, numericAttr, stringAttr } from "../../baubleTypes";


const isSpringNumber = (v: numericAttr): v is SpringValue<number> =>  v instanceof SpringValue

function centerNumber(
  pos: number | SpringValue<number> ,
  size: number | SpringValue<number> 
): number | SpringValue<number> | Interpolation<number> {
  if (isSpringNumber(pos) || isSpringNumber(size)) {
    // derive animated value
    return springTo([pos as numericAttr, size as numericAttr], (p: number, s: number) => p - s / 2);
  }
  // plain numbers
  return pos - size / 2;
}


const BaseRect = function(props: RectangleProps){
    const {attrs,x,y,interactions} = props; // absorb d if present
    //adjust rect to be centered on x,y
        const xCentered = centerNumber((x as numericAttr), attrs.width);
        const yCentered = centerNumber((y as numericAttr), attrs.height);

    return (
        <animated.rect className={"node-shape"} {...interactions} {...attrs} x={xCentered} y={yCentered}/>
    );
};


const AnimatedRect = withAnimation<RectangleAttrs>(BaseRect);
const Rectangle = withNode<RectangleAttrs>(AnimatedRect);

export type RectangleAttrs = BaseAttrs & {
  width: numericAttr;
  height: numericAttr;
  fill?: stringAttr;
  stroke?: stringAttr;
  strokeWidth?: numericAttr;
};

export type RectangleProps = AnimatableBaubleProps<RectangleAttrs>;

export default Rectangle;