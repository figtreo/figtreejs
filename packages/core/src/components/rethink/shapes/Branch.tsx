import React from "react";
import { animated,  useSpring} from "@react-spring/web";
import { Interactions, numerical, stringy, StripSprings } from "../types";
import { withAnimation } from "../HOC/withAnimation";


export type BaseBranchAttrs = {
    stroke?: stringy;
    strokeWidth?: numerical;
};

export type BaseBranchProps ={
    attrs: BaseBranchAttrs,
    d:stringy,
    interactions?:Interactions
    transform?:string
}

//props types
export function BasePath(props:BaseBranchProps){
    const {attrs,interactions,d,...rest}=props; //d is included in attrs here
    return (
    <animated.path  {...attrs} {...interactions} d={d} {...rest}/>) //TODO move fill to attrs

}

export type BranchAttrs =StripSprings<BaseBranchAttrs>

