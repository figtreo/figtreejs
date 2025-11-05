import React from "react";
import { to,  animated, SpringValue, Interpolation } from "@react-spring/web";
import { BaseAttrs, isSpringNumber, numerical, stringy } from "../types";



/**
 * Label attributes for styling and rendering labels.
 * These will be stripped and trickle up to the user
 */

export type BaseLabelAttrsType= BaseAttrs & {  

        fontFamily?:React.SVGAttributes<SVGTextElement>['fontFamily'],
        fontWeight?:numerical,
        fill?:stringy,
}
/** attrs derived by higher order components */
export type DerivedAttrs ={
        alignmentBaseline: React.SVGAttributes<SVGTextElement>['alignmentBaseline'];
        textAnchor: React.SVGAttributes<SVGTextElement>['textAnchor'];
        rotation:numerical
    }
/** The props needed for rendering a label in the svg*/

export interface BaseLabelProps  {
    x:numerical,
    y:numerical,
    attrs:BaseLabelAttrsType & DerivedAttrs,
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

export function BaseLabel(props: BaseLabelProps) {
        const {alignmentBaseline, textAnchor,rotation,...other} = props.attrs
        const {x,y,text,d} = props;
        const transform = getTransform(x,y,rotation)
    return (<g>
                    <animated.text alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} transform={transform} {...other}>{text}</animated.text>
                    {d?<animated.path strokeWidth={1} stroke='grey' strokeDasharray="2" d={d} />:null}
                </g>)
}


