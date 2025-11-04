import React from "react";
import { animated,  useSpring } from "@react-spring/web";
import {   Interactions, numerical, stringy, StripSprings } from "../types";
import { withAnimation } from "../HOC/withAnimation";

export type BaseCircleAttrs={
        r:numerical,
        fill?:stringy,
        stroke?:stringy,
        strokeWidth?:numerical
    }

export type BaseCircleProps ={
    x:numerical
    y:numerical
    interactions?:Interactions
    attrs:BaseCircleAttrs,
    animated?:boolean
}

export const BaseCircle = function(props:BaseCircleProps){
   const {attrs,interactions,x,y} = props;
    return (
        <animated.circle  className={"node-shape"} {...attrs} {...interactions} cx={x} cy={y} />
        );
};


export type CircleAttrs= StripSprings<BaseCircleAttrs>

export const Circle = withAnimation(BaseCircle)
