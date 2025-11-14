import type { SpringValue, Interpolation } from "@react-spring/web";
import { to, animated, useSpring } from "@react-spring/web";
import type { numerical } from "../types";
import { isSpringNumber } from "../types";
import type { LabelInjection } from "../../HOC/withNode";

/**
 * Label attributes for styling and rendering labels.
 * These will be stripped and trickle up to the user
 */

type BaseTextDOMProps = Omit<React.ComponentProps<"text">, "ref"> & {
  ref?: React.Ref<SVGTextElement>;
};
export type TextAttrs = BaseTextDOMProps & { text: string };
type LabelProps = TextAttrs & LabelInjection; // need these to match injected exactly for type inference

/** The props needed for rendering a label in the svg*/

// transform={to([animatedProperties.x, animatedProperties.y, animatedProperties.rotation], (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`)}
function getTransform(
  x: numerical,
  y: numerical,
  rotation: numerical,
): string | SpringValue<string> | Interpolation<string> {
  if (isSpringNumber(x) || isSpringNumber(y) || isSpringNumber(rotation)) {
    return to(
      [x, y, rotation],
      (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`,
    );
  }
  return `translate(${x},${y}) rotate(${rotation})`;
}

export function BaseLabel(props: LabelProps) {
  const {
    alignmentBaseline,
    textAnchor,
    rotation,
    x,
    y,
    text,
    d,
    animated: a,
    ...other
  } = props;

  const animatedValues = useSpring({
    x,
    y,
    rotation,
    config: { duration: 500 },
  });

  if (!a) {
    const transform = getTransform(x, y, rotation);
    return (
      <g>
        <animated.text
          alignmentBaseline={alignmentBaseline}
          textAnchor={textAnchor}
          transform={transform}
          {...other}
        >
          {text}
        </animated.text>
        {d ? (
          <animated.path
            strokeWidth={1}
            stroke="grey"
            strokeDasharray="2"
            d={d}
          />
        ) : null}
      </g>
    );
  } else {
    const animatedTransform = getTransform(
      animatedValues.x,
      animatedValues.y,
      animatedValues.rotation,
    );
    return (
      <g>
        <animated.text
          alignmentBaseline={alignmentBaseline}
          textAnchor={textAnchor}
          transform={animatedTransform}
          {...other}
        >
          {text}
        </animated.text>
        {d ? (
          <animated.path
            strokeWidth={1}
            stroke="grey"
            strokeDasharray="2"
            d={d}
          />
        ) : null}
      </g>
    );
  }
}
