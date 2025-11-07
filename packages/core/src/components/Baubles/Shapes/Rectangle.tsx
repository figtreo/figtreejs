
import type { Interpolation, SpringValue} from "@react-spring/web";
import { animated, to } from "@react-spring/web";
import type {BaseAttrs, InternalInteractionType, numerical} from "../types";
import { isSpringNumber} from "../types"




/** Find where to put a position so the center is the provided location
 * used below for centered rectangles. Nodes provide the x,y of the center.
 */
function centerNumber(
  pos: number | SpringValue<number> ,
  size: number | SpringValue<number> 
): number | SpringValue<number> | Interpolation<number> {
  if (isSpringNumber(pos) || isSpringNumber(size)) {
    // derive animated value
    return to([pos as numerical, size as numerical], (p: number, s: number) => p - s / 2);
  }
  // plain numbers
  return pos - size / 2;
}

/**
 * Rectangle attributes for styling and rendering a rectangle.
 * These will be stripped and trickle up to the user
 */
export type  BaseRectAttrsType = BaseAttrs & {
        width:numerical,
        height:numerical,
    }

// Props for the rectangle shape
export type BaseRectangleProps ={
    x:numerical
    y:numerical
    interactions?:InternalInteractionType
    attrs:BaseRectAttrsType,
}

/** A Rectangle centered on the provided x,y */
export const CenteredRectangle = function(props:BaseRectangleProps){
   const {attrs,interactions,x,y} = props;

        const xCentered = centerNumber((x), attrs.width);
        const yCentered = centerNumber((y), attrs.height);
    return (
        <animated.rect  className={"node-shape"} {...attrs} {...interactions} x={xCentered} y={yCentered} />
        );
};
/**
 * A rectangle rendered as expected in an svg
 */
export const BaseRectangle = function(props:BaseRectangleProps){
   const {attrs,interactions,x,y} = props;
    return (
        <animated.rect  className={"node-shape"} {...attrs} {...interactions} x={x} y={y} />
        );
};






