
import { animated} from "@react-spring/web";
import type { BaseAttrs, InternalInteractionType, numerical, stringy } from "../types";


/**
 * Path attributes for styling and rendering a path.
 * These will be stripped and trickle up to the user
 */
export type BaseBranchAttrsType = BaseAttrs &{
    stroke?: stringy;
    strokeWidth?: numerical;
};

// TODO link these types with bauble types
/** The props for rendering a path */
export type BaseBranchProps ={
    attrs: BaseBranchAttrsType,
    d:stringy,
    interactions?:InternalInteractionType
    transform?:string,
    animated?:boolean,
}

/** React component that renders a path. 
 * The fill is defaulted to 'none' but is overwritten by anything in attrs
 */
export function BasePath(props:BaseBranchProps){
    const {attrs,interactions,d,...rest}=props; //d is included in attrs here
    return (
    <animated.path  fill={"none"} {...attrs} {...interactions} d={d} {...rest} />) //TODO move fill to attrs

}




