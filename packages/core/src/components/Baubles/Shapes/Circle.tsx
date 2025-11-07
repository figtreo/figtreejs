
import { animated } from "@react-spring/web";
import type {   BaseAttrs, InternalInteractionType, numerical } from "../types";




/**
 * Circle attributes for styling and rendering a circle.
 * These will be stripped and trickle up to the user
 */
export type BaseCircleAttrsType= BaseAttrs & {r:numerical}


/** The props needed for rendering a circle in the svg*/
export type BaseCircleProps ={
    x:numerical
    y:numerical
    interactions?:InternalInteractionType
    attrs:BaseCircleAttrsType,
}

/** React component that renders a circle */
export const BaseCircle = function(props:BaseCircleProps){
   const {attrs,interactions,x,y} = props;
    return (
        <animated.circle  className={"node-shape"} {...attrs} {...interactions} cx={x} cy={y} />
        );
};


