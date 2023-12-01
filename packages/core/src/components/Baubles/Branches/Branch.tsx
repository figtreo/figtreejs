import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { useAnimation } from "../../../hooks";
import { useSpring ,animated} from "@react-spring/web";
import withAnimation from "../../HOC/withAnimation";


//props types
function BaseBranch(props:any){
    const {attrs,interactions,id}=props; //d is included in attrs here

    return (
    <animated.path className={"branch-path"} key={`branch-${id}`} {...attrs}  {...interactions} fill={"none"} node-id={props.node.id}/>)
    // <animated.path key={`branch-${vertex.id}`} {...attrs}  {...animatedAttrs} d={d} strokeWidth={pathX.x} fill={"none"} />)
    

}

export const Branch= withAnimation(BaseBranch);
