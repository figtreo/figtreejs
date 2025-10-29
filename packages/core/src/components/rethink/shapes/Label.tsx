import React from "react";
import { to,  animated, SpringValue, Interpolation, useSpring } from "@react-spring/web";
import { BaseBaubleProps, BaubleProps, numerical, stringy, StripSprings } from "./types";
import { isSpringNumber } from "./utils";


export type BaseLabelAttrs={  
        alignmentBaseline?: React.SVGAttributes<SVGTextElement>['alignmentBaseline'];
        textAnchor?: React.SVGAttributes<SVGTextElement>['textAnchor'];
        fontFamily?:React.SVGAttributes<SVGTextElement>['fontFamily'],
        fontWeight?:numerical,
        fill?:stringy,
        rotation:numerical
    }

//We don't use the HOC here because of how the rotation transform is applied
export interface BaseLabelProps extends BaseBaubleProps {
    x:numerical,
    y:numerical,
    attrs:BaseLabelAttrs,
    text:string;
    d?:stringy // path
}
// transform={to([animatedProperties.x, animatedProperties.y, animatedProperties.rotation], (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`)}
function getTransform(x:numerical,y:numerical,rotation:numerical):string| SpringValue<string> | Interpolation<string>{
    if(isSpringNumber(x)||isSpringNumber(y)||isSpringNumber(rotation)){
        return to([x, y, rotation], (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`)
    }
    return `translate(${x},${y}) rotate(${rotation})`
}

export default function BaseLabel(props: BaseLabelProps) {
        const {alignmentBaseline, textAnchor,rotation,...other} = props.attrs
        const {x,y,text,d} = props;
        const transform = getTransform(x,y,rotation)
    return (<g>
                    <animated.text alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} transform={transform} {...other}>{text}</animated.text>
                    {d?<animated.path strokeWidth={1} stroke='grey' strokeDasharray="2" d={d} />:null}
                </g>)
}


export type LabelAttrs=StripSprings<BaseLabelAttrs>

//We don't use the HOC here because of how the rotation transform is applied
export type LabelProps =  BaubleProps & {
    attrs:LabelAttrs,
    text:string;
    d?:string // path
}

type animatable= "fontWeight"|"fill"|"rotation"

const animatableAttrs:animatable[] = ["fontWeight","fill","rotation"]

function withAnimation(AnimatableShape:React.FunctionComponent<BaseLabelProps>):React.FunctionComponent<LabelProps>{
    function AnimatedComponent(props:LabelProps) {
        const animation = props.animated;
        const { attrs, d,x,y, interactions, ...rest } = props;
        const aAttrs = animatableAttrs
        .filter(d=>attrs[d]!==undefined)
        .reduce<{[key:string]:number|string}>((acc,d)=> {acc[d]=attrs[d]!;return acc },{});
        
        //need to run both so the number of hooks doesn't change
        const animatedProperties = useSpring({...aAttrs,d,x,y, config: { duration: 500 }}) ; //TODO adjust animation config.
        // get plain types here for unanimated values
        const nonAnimated = {...aAttrs,d,x,y}

        const {d:dFinal,x:xFinal,y:yFinal,...possiblyAnimatedAttrs}=animation?animatedProperties:nonAnimated;
        const finalAttrs = {...attrs,...possiblyAnimatedAttrs}
         return (<AnimatableShape  d={dFinal}  x={xFinal} y={yFinal}  attrs={finalAttrs} interactions={interactions} {...rest}/>)
    
    }
    return AnimatedComponent;
}

export const Label = withAnimation(BaseLabel)