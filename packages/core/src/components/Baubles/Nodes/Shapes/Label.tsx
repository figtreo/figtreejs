import React from "react";
import { useAnimation } from "../../../../hooks";
import { useSpring, to,  animated } from "@react-spring/web";
import { BaseBaubleProps } from "..";
import { NodeRef } from "../../../../Tree";
//We don't use the HOC here because of how the rotation transform is applied
export default function Label(props: any) {
    const animation = useAnimation()

    const { attrs, text, node, x, y, d, alignmentBaseline, textAnchor, rotation,id } = props;

    let visibleProperties;
    if (animation) {
        visibleProperties = useSpring({ x, y, rotation, d, config: { duration: 500 } });
    }
    else {
        visibleProperties = { x, y, rotation, d }
    }

    // radial layout do not provide an aligned Position
    if (animation) {
        return (
            <g  className={"node-label"} node-id={id} >
                <animated.text alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} transform={to([visibleProperties.x, visibleProperties.y, visibleProperties.rotation], (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`)} {...attrs}>{text(node)}</animated.text>
                {d?<animated.path strokeWidth={1} stroke='grey' strokeDasharray="2" d={visibleProperties.d.to((value:string)=>value as string)} />:null}
            </g>
        )
    } else {

    }
    return (

        <g  className={"node-label"} node-id={id} >
            <text  alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} transform={`translate(${visibleProperties.x},${visibleProperties.y}) rotate(${visibleProperties.rotation})`} {...attrs}>{text(node)}</text>
            {d?<path strokeWidth={1} stroke='grey' strokeDasharray="2" d={visibleProperties.d} />:null}
        </g>
    )
}

//TODO add defaults
interface LabelProps extends BaseBaubleProps{
    alignmentBaseline:string,
    textAnchor:string,
    x:number,
    y:number,
    d:string,
    node:NodeRef,
    rotation?:number,


    text:(n:NodeRef)=>string,
}


