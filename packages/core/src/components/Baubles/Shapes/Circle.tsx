
import { animated, AnimatedProps, useSpring } from "@react-spring/web";

// update ref to work with animated expectations no old refs
type BaseCircleDOMProps = Omit< React.ComponentProps<'circle'>, 'ref'> & {ref?: React.Ref<SVGCircleElement>};
export type CircleProps = Omit<BaseCircleDOMProps,'cx'|'cy'> & {x:number,y:number,animated:boolean}
export const animatableCircleKeys = [
  'cx',
  'cy', 
  'r',
  'stroke',
  'strokeWidth',
] as const;

type AnimKey = typeof animatableCircleKeys[number];

// attribute get spread here interactions come in 
function pickAnimatable(
  props: Record<string, unknown>
): Partial<Record<AnimKey, number | string>> {
  const out: Partial<Record<AnimKey, number | string>> = {};
  for (const k of animatableCircleKeys) {
    const v = props[k];
    // Keep 0; only exclude null/undefined
    if (v != null && (typeof v === 'number' || typeof v === 'string')) {
      out[k] = v as number | string;
    }
  }
  return out;
}

/** React component that renders a circle */
export const BaseCircle = function(props:CircleProps){
   const { animated:a,x,y,...attrs} = props;
   // maybe could put animation logic in an HOC but that's causing type issues 
   const mappedProps = {...attrs,cx:x,cy:y} 
    const aAttrs = pickAnimatable(mappedProps)
    // Keep hooks count constant
    const animatedValues = useSpring({
        ...aAttrs,
      config: { duration: 500 },
    });
    if(!a){
        return <animated.circle  className={"node-shape"} {...mappedProps} />
    }else{
        return <animated.circle  className={"node-shape"} {...mappedProps} {...(animatedValues) as AnimatedProps<BaseCircleDOMProps>} />
    }
}




// export const AnimatedCircle = withAnimation(BaseCircle)