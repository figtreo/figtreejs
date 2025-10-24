import React from "react";
import { animated} from "@react-spring/web";
import withAnimation from "../HOC/withAnimation";
import withBranch from "../HOC/withBranch";
import { AnimatableBaubleProps, BaseAttrs, numericAttr, stringAttr } from "../baubleTypes";


//props types
function BaseBranch(props:BranchProps){
    const {attrs,interactions,id,d}=props; //d is included in attrs here

    return (
    <animated.path className={"branch-path"} key={`branch-${id}`} {...attrs} {...interactions} d={d} node-id={id}/>) //TODO move fill to attrs
    

}

export type BranchAttrs = BaseAttrs & {
    stroke: stringAttr;
    strokeWidth?: numericAttr;
    strokeLinecap?:React.SVGAttributes<SVGPathElement>['strokeLinecap'],
    strokeLinejoin?:React.SVGAttributes<SVGPathElement>['strokeLinejoin']
};

export type BranchProps  = AnimatableBaubleProps<BranchAttrs>

export const Branch= withBranch(withAnimation<BranchAttrs>(BaseBranch));
