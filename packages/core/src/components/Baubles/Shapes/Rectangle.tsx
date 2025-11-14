
import { animated, AnimatedProps, useSpring } from "@react-spring/web";




/** Find where to put a position so the center is the provided location
 * used below for centered rectangles. Nodes provide the x,y of the center.
 */
function centerNumber(
  pos: number  ,
  size: number  
): number  {
  // plain numbers
  return pos - size / 2;
}

/**
 * Rectangle attributes for styling and rendering a rectangle.
 * These will be stripped and trickle up to the user
 */
// update ref to work with animated expectations no old refs
type BaseRectangleDOMProps = Omit< React.ComponentProps<'rect'>, 'ref'> & {ref?: React.Ref<SVGRectElement>} & {width:number,height:number};
export type RectProps = BaseRectangleDOMProps & {animated:boolean,x:number,y:number}  // need these to match injected exactly for type inference
export const animatableRectKeys = [
  'rx',
  'ry',
  'x',
  'y',
  'width',
  'height',
  'stroke',
  'strokeWidth',
] as const;

type AnimKey = typeof animatableRectKeys[number];

// attribute get spread here interactions come in 
//TODO make this a generalized function
function pickAnimatable(
  props: Record<string, unknown>
): Partial<Record<AnimKey, number | string>> {
  const out: Partial<Record<AnimKey, number | string>> = {};
  for (const k of animatableRectKeys) {
    const v = props[k];
    // Keep 0; only exclude null/undefined
    if (v != null && (typeof v === 'number' || typeof v === 'string')) {
      out[k] = v as number | string;
    }
  }
  return out;
}


/** A Rectangle centered on the provided x,y */
export const CenteredRectangle = function(props:RectProps){
        const {x,y,width,height,...rest} = props
        const xCentered = centerNumber((x), width);
        const yCentered = centerNumber((y), height);
        const newAttrs = {...rest,x:xCentered,y:yCentered,width,height}
    return (
        <BaseRectangle  {...newAttrs} />
        );
};
/**
 * A rectangle rendered as expected in an svg
 */
export const BaseRectangle = function(props:RectProps){
const { animated:a,...attrs} = props;
 const aAttrs = pickAnimatable(attrs)
    // Keep hooks count constant
    const animatedValues = useSpring({
        ...aAttrs,
      config: { duration: 500 },
    });
  if(!a){
    return <animated.rect  className={"node-shape"} {...attrs} />
  }
    return (
        <animated.rect  className={"node-shape"} {...attrs} {...(animatedValues) as AnimatedProps<BaseRectangleDOMProps> } />
        );
};






