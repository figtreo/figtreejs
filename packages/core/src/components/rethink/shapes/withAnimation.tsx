import React from "react";
import { BaseBaubleProps, BaubleProps, Interactions, numerical, stringy, StripSprings } from "./types";
import { useSpring } from "@react-spring/web";


type BaseAttrs = Record<string, numerical | stringy>;


type AnimIn<InBase extends BaseBaubleProps, TAttrs extends BaseAttrs> =
  InBase & { attrs: TAttrs };


  // remove any springvalues from base and attrs and add animated
type ExposedOut<InBase extends BaseBaubleProps, TAttrs extends BaseAttrs> =
  StripSprings<InBase> & { animated?: boolean } & { attrs: StripSprings<TAttrs> };





// keep this as a const tuple to narrow keys
const animatableProperties = ["stroke", "strokeWidth", "fill", "width", "height", "r"] as const;



export function withAnimation
<
  InBase extends BaseBaubleProps, // base type
  TAttrs extends BaseAttrs, // Attrs type
  TExtra extends object = {} // anything else
>
(
  AnimatableShape: React.FC<TExtra & AnimIn<InBase, TAttrs>>
): React.FC<TExtra & ExposedOut<InBase, TAttrs>> {
  const AnimatedComponent: React.FC<TExtra & ExposedOut<InBase, TAttrs>>  = (props) => {
    const { attrs, x, y, d, interactions, animated, ...rest } = props;

    // Pick only attrs we plan to animate
    const aAttrs = animatableProperties.reduce<Record<string, number | string>>(
      (acc, key) => {
        const v = attrs[key];
        if (v !== undefined) acc[key] = v;
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
    } as TAttrs;

    // Exact prop shape expected by the wrapped component
    const shapeProps = {
      ...(rest as TExtra),
      x: xFinal as BaseBaubleProps["x"],
      y: yFinal as BaseBaubleProps["y"],
      d: dFinal as BaseBaubleProps["d"],
      attrs: finalAttrs,
      interactions,
    } as TExtra & AnimIn<InBase, TAttrs>;

    return <AnimatableShape {...shapeProps} />;
  };

  return AnimatedComponent;
}


