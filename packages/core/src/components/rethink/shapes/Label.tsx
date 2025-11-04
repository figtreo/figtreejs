import React from "react";
import { to,  animated, SpringValue, Interpolation } from "@react-spring/web";
import { numerical, stringy, StripSprings } from "../types";
import { isSpringNumber } from "./utils";
import { withAnimation } from "../HOC/withAnimation";


export type BaseLabelAttrs={  
        alignmentBaseline?: React.SVGAttributes<SVGTextElement>['alignmentBaseline'];
        textAnchor?: React.SVGAttributes<SVGTextElement>['textAnchor'];
        fontFamily?:React.SVGAttributes<SVGTextElement>['fontFamily'],
        fontWeight?:numerical,
        fill?:stringy,
        rotation:numerical
    }

export interface BaseLabelProps  {
    x:numerical,
    y:numerical,
    attrs:BaseLabelAttrs,
    text:string;
    d?:stringy // path
    animated?:boolean
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


export const Label = withAnimation(BaseLabel)