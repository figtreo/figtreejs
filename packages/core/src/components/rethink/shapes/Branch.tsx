import React from "react";
import { animated,  useSpring} from "@react-spring/web";
import { Interactions, numerical, stringy, StripSprings } from "./types";
import { withAnimation } from "../HOC/withAnimation";


export type BaseBranchAttrs = {
    stroke?: stringy;
    strokeWidth?: numerical;
};

export type BaseBranchProps ={
    attrs: BaseBranchAttrs,
    d:stringy,
    interactions?:Interactions
}

//props types
export function BaseBranch(props:BaseBranchProps){
    const {attrs,interactions,d}=props; //d is included in attrs here
    return (
    <animated.path className={"branch-path"}  {...attrs} {...interactions} d={d} />) //TODO move fill to attrs

}

export type BranchAttrs =StripSprings<BaseBranchAttrs>

export const Branch = withAnimation(BaseBranch)