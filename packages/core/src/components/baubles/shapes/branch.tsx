import type { AnimatedProps } from "@react-spring/web";
import { animated, useSpring } from "@react-spring/web";

// update ref to work with animated expectations no old refs
export type BasePathDOMProps = Omit<React.ComponentProps<"path">, "ref"> & {
  ref?: React.Ref<SVGPathElement>;
};
export type PathAttrs = Omit<BasePathDOMProps, "d">; // d will be calculated

export type PathProps = PathAttrs & { d: string; animated: boolean };

/** React component that renders a path.
 * The fill is defaulted to 'none' but is overwritten by anything in attrs
 */

export const animatableBranchKeys = ["d", "stroke", "strokeWidth"] as const;

type AnimKey = (typeof animatableBranchKeys)[number];

// attribute get spread here interactions come in
function pickAnimatable(
  props: Record<string, unknown>,
): Partial<Record<AnimKey, number | string>> {
  const out: Partial<Record<AnimKey, number | string>> = {};
  for (const k of animatableBranchKeys) {
    const v = props[k];
    // Keep 0; only exclude null/undefined
    if (v != null && (typeof v === "number" || typeof v === "string")) {
      out[k] = v;
    }
  }
  return out;
}

export function BasePath(props: PathProps) {
  const { animated: a, ...rest } = props;
  const aAttrs = pickAnimatable(rest);
  // Keep hooks count constant
  const animatedValues = useSpring({
    ...aAttrs,
    config: { duration: 500 },
  });
  if (!a) {
    return <animated.path {...rest} />;
  } else {
    return (
      <animated.path
        {...rest}
        {...(animatedValues as AnimatedProps<BasePathDOMProps>)}
      />
    );
  }
}
