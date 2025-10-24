import React from "react";
import { animated} from "@react-spring/web";
import { BaseShapeProps } from "..";
import withAnimation from "../HOC/withAnimation";
import withBranch from "../HOC/withBranch";


//props types
function BaseBranch(props){
    const {attrs,interactions,id}=props; //d is included in attrs here

    return (
    <animated.path className={"branch-path"} key={`branch-${id}`} {...attrs} fill={"none"} {...interactions} node-id={id}/>) //TODO move fill to attrs
    // <animated.path key={`branch-${vertex.id}`} {...attrs}  {...animatedAttrs} d={d} strokeWidth={pathX.x} fill={"none"} />)
    

}

interface BaseBranchProps extends BaseShapeProps{
    id:string,
    attrs:{
        fill:string,
        d:string,
        strokeWidth:number,
        stroke:string
    }
}
export const Branch= withBranch(withAnimation(BaseBranch));
