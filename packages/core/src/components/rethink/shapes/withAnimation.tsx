import React from "react";
import { DeSpring, Interactions, numerical, stringy, StripSprings } from "./types";
import { useSpring } from "@react-spring/web";


type BaseAttrs = Record<string, numerical | stringy>;


/** Strip x/y/d/attrs value types while preserving required/optional-ness */
// infer prop types here
type StripProps<P> = {
  [K in keyof P]:
    K extends "attrs" ? StripSprings<P[K]> :
    K extends "x" | "y" | "d" ? DeSpring<P[K]> :
    P[K];
};


// keep this as a const tuple to narrow keys
const animatableProperties = ["stroke", "strokeWidth", "fill", "width", "height", "r"] as const;

// animatableKeys?: readonly (keyof CProps["attrs"])[]

export function withAnimation
<
CProps extends {
    attrs: BaseAttrs;
    interactions?: Interactions;
    x?: numerical;
    y?: numerical;
    d?: stringy;
  }
>
(
  AnimatableShape: React.FC<CProps>
): React.FC<StripProps<CProps> & { animated?: boolean }> {
  const AnimatedComponent: React.FC<StripProps<CProps> & { animated?: boolean }>  = (props) => {
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
    } as CProps["attrs"];

    // Exact prop shape expected by the wrapped component
    const shapeProps = {
      ...(rest as Omit<StripProps<CProps>, "x" | "y" | "d" | "attrs" | "animated">), // remove the ones we'll add
      x: xFinal as CProps["x"],
      y: yFinal as CProps["y"],
      d: dFinal as CProps["d"],
      attrs: finalAttrs,
      interactions,
    } as CProps;

    return <AnimatableShape {...shapeProps} />;
  };

  return AnimatedComponent;
}


