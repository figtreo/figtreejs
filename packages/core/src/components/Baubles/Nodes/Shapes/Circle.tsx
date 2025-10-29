import {animated} from "@react-spring/web";
import React from "react";
import withNode from "../../HOC/withNode";
import withAnimation from "../../HOC/withAnimation";
import { AnimatableBaubleProps, BaseAttrs, numericAttr, stringAttr } from "../../baubleTypes";



const BaseCircle = function(props:CircleProps){
 
   const {attrs,interactions,x,y} = props;
    return (
        <animated.circle  className={"node-shape"} {...attrs} {...interactions} cx={x} cy={y} />
        );
};


export const Circle = withNode<CircleAttrs>(withAnimation<CircleAttrs>(BaseCircle));



export type CircleAttrs = BaseAttrs & {
  fill?: stringAttr;
  stroke?: stringAttr;
  strokeWidth?: numericAttr;
  r:numericAttr
};

export type CircleProps = AnimatableBaubleProps<CircleAttrs>;