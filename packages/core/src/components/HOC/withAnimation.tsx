

import { useSpring } from "@react-spring/web";
import type {  BaseAttrs, BaseBaubleProps, StripProps } from "../Baubles/types";



// keep this as a const tuple to narrow keys
const animatableProperties = ["stroke", "strokeWidth", "fill", "width", "height", "r"] as const;


/**
 * An HOC that take an animatable shape and wraps the logic needed to animate using springs
 * The props of the returned component are raw string/number not spring<value>
 *
 */
export function withAnimation<
BaseComponentProps extends BaseBaubleProps & {attrs:BaseAttrs}
>
(
  AnimatableShape: React.FC<BaseComponentProps>
): 
React.FC<StripProps<BaseComponentProps> & {animated?:boolean }> 
{
  const AnimatedComponent: React.FC<StripProps<BaseComponentProps> & {animated?:boolean }>  = (props) => {
    const { attrs, x, y, d, interactions, animated, ...rest } = props;

    // Pick only attrs we plan to animate
    const aAttrs = animatableProperties.reduce<Record<string, number | string>>(
      (acc, key) => {
        const v = attrs[key];
        acc[key] = v;
        return acc;
      },
      {}
    );
    // Keep hooks count constant
    const animatedValues = useSpring({
      ...aAttrs,
      x,
      y,
      d,
      config: { duration: 500 },
    });
    const nonAnimated = { ...aAttrs, x, y,d };


    const {
      x: xFinal,
      y: yFinal,
      d: dFinal,
      ...possiblyAnimatedAttrs
    } = animated ? animatedValues : nonAnimated;

    // Merge possibly animated attrs with provided attrs for the shape
    const finalAttrs = {
      ...attrs,
      ...possiblyAnimatedAttrs,
    } as BaseComponentProps["attrs"];

    // Exact prop shape expected by the wrapped component
    const shapeProps = {
      ...(rest as Omit<StripProps<BaseComponentProps>, "x" | "y" | "d" | "attrs" | "animated">), // remove the ones we'll add
      x: xFinal as BaseComponentProps["x"],
      y: yFinal as BaseComponentProps["y"],
      d: dFinal as BaseComponentProps["d"],
      attrs: finalAttrs,
      interactions,
    } as BaseComponentProps;

    return <AnimatableShape {...shapeProps} />;
  };

  return AnimatedComponent;
}


