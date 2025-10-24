import React from "react";
import { useSpring, to,  animated, SpringValue } from "@react-spring/web";
import { BaseAttrs, PlainProps } from "../../baubleTypes";
import { NodeRef } from "../../../../Evo";

//We don't use the HOC here because of how the rotation transform is applied
export type labelProps<A extends BaseAttrs=BaseAttrs> = PlainProps<A>& {
    alignmentBaseline: React.SVGAttributes<SVGTextElement>['alignmentBaseline'];
    textAnchor: React.SVGAttributes<SVGTextElement>['textAnchor'];
    rotation:number;
    id:string|number;
    text:(n:NodeRef)=>string; // redundant to have both
    node:NodeRef;
}

export default function Label(props: labelProps) {
    const animation = props.animated;

    const { attrs, text, node, x, y, d, alignmentBaseline, textAnchor, rotation,id } = props;
    
     //need to run both so the number of hooks doesn't change
    const animatedProperties = useSpring({ x, y, rotation, d, config: { duration: 500 } });
    const nonAnimated = { x, y, rotation, d }

    // radial layout do not provide an aligned Position

    if (animation) {
        return (
            <g  className={"node-label"} node-id={id} >
                <animated.text alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} transform={to([animatedProperties.x, animatedProperties.y, animatedProperties.rotation], (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`)} {...attrs}>{text(node)}</animated.text>
                {d?<animated.path strokeWidth={1} stroke='grey' strokeDasharray="2" d={(animatedProperties.d as SpringValue<string>).to((value:string)=>value as string)} />:null}
            </g>
        )
    } 
    return (
        <g  className={"node-label"} node-id={id} >
            <text  alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} x={nonAnimated.x} y={nonAnimated.y} transform={`rotate(${nonAnimated.rotation},${nonAnimated.x},${nonAnimated.y})`} {...attrs}>{text(node)}</text>
            {d?<path strokeWidth={1} stroke='grey' strokeDasharray="2" d={nonAnimated.d} />:null}
        </g>
    )
}


