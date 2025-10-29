import React from "react";
import { animated,  useSpring} from "@react-spring/web";
import { Interactions, numerical, stringy, StripSprings } from "./types";


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

export type BranchProps = StripSprings<BaseBranchProps> &{
    attrs: BranchAttrs,
    animated?:boolean
}


type animatable= "stroke"|"strokeWidth"

const animatableAttrs:animatable[] = ["stroke","strokeWidth"]

function withAnimation(AnimatableShape:React.FunctionComponent<BaseBranchProps>):React.FunctionComponent<BranchProps>{
    function AnimatedComponent(props:BranchProps) {
        const animation = props.animated;
        const { attrs, d, interactions } = props;
        const aAttrs = animatableAttrs
        .filter(d=>attrs[d]!==undefined)
        .reduce<{[key:string]:number|string}>((acc,d)=> {acc[d]=attrs[d]!;return acc },{});
        
        //need to run both so the number of hooks doesn't change
        const animatedProperties = useSpring({...aAttrs,d, config: { duration: 500 }}) ; //TODO adjust animation config.
        // get plain types here for unanimated values
        const nonAnimated = {...aAttrs,d}

        const {d:dFinal,...possiblyAnimatedAttrs}=animation?animatedProperties:nonAnimated;
        const finalAttrs = {...attrs,...possiblyAnimatedAttrs}
         return (<AnimatableShape  d={d} attrs={finalAttrs} interactions={interactions} />)
    
    }
    return AnimatedComponent;
}

export const Branch = withAnimation(BaseBranch)