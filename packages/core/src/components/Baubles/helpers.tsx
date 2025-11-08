import type { NodeRef } from "../../Evo";
import type { AttrAndInteractionApplier, Attrs, Fn, LiftToUser } from "./types";


export function isFn(x: unknown): x is Fn {
  return typeof x === "function";
}

function mapAttrsToProps
<A extends Attrs,>
(attrs:LiftToUser<A>):
(n:NodeRef)=>A
{
    return function (node:NodeRef) { 
        const props= {} as  Record<keyof A, number | string>;
        for (const key in attrs) {
            const k = key as keyof A;
            const v = attrs[k];
            props[k] = isFn(v) ? (v as Fn)(node) : v;
            
        }
        return props as A;
}
}


function applyInteractions(interactions:Record<string,(n:NodeRef)=>void>):(n:NodeRef)=>Record<string,()=>void> {
    return function (node:NodeRef) {
        const props:Record<string,()=>void> = {};
        for (const [key, value] of Object.entries(interactions)) {
                props[key] = () => { value(node); } // wraps base interaction
        }
        return props;
    }
}

/** A function that takes user provided attrs and interactions and returns a function
 * that takes a node and returns the interaction and Attrs in the form expected by baubles
 */
export function useAttributeMappers<A extends Attrs>(
  attrs: LiftToUser<A>,
  interactions?: Record<string,(n:NodeRef)=>void>
): AttrAndInteractionApplier<A>
{

    // const { attrs, interactions} = props;

    //This memorizes the functions so they are not made each time - maybe overkill.
    // const baseAttrMapper = useCallback(mapAttrsToProps((attrs?attrs:{})), [attrs]);
    // const baseInteractionMapper = useCallback(applyInteractions((interactions?interactions:{})), [interactions]);
    // const tooltipMapper = useCallback(mapAttrsToProps((tooltip?tooltip:{})),[tooltip]);

    const baseAttrMapper = mapAttrsToProps((attrs));

    const baseInteractionMapper = interactions?applyInteractions((interactions)):()=>undefined

    return function shapeProps(node:NodeRef) {
        return {attrs: baseAttrMapper(node),
            interactions: baseInteractionMapper(node)}
    }

}
