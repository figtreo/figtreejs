import { NodeRef } from "../../../Evo";
import { Interaction } from "../../Baubles/baubleTypes";
import { AttrAndInteractionApplier, Attrs, Fn, ResolvedAttrs, UserAttrs } from "../types";



function isFn(x: unknown): x is Fn {
  return typeof x === "function";
}

function mapAttrsToProps
<U extends UserAttrs,>
(attrs:U):
(n:NodeRef)=>ResolvedAttrs<U>
{
    return function (node:NodeRef) { 
        const props= {} as  Record<keyof U, number | string>;
        for (const key in attrs) {
            const k = key as keyof U;
            const v = attrs[k];
            props[k] = isFn(v) ? v(node) : v as number|string;
            
        }
        return props as ResolvedAttrs<U>;;
}
}


function applyInteractions(interactions:Record<string,(n:NodeRef)=>void>):(n:NodeRef)=>Record<string,()=>void> {
    return function (node:NodeRef) {
        const props:Interaction = {};
        for (const [key, value] of Object.entries(interactions)) {
                props[key] = () => value(node) // wraps base interaction
        }
        return props;
    }
}


export function useAttributeMappers
<U extends UserAttrs>(
  attrs: U,
  interactions?:Record<string,(n:NodeRef)=>void>
): AttrAndInteractionApplier<ResolvedAttrs<U>>
{

    // const { attrs, interactions} = props;

    //This memorizes the functions so they are not made each time - maybe overkill.
    // const baseAttrMapper = useCallback(mapAttrsToProps((attrs?attrs:{})), [attrs]);
    // const baseInteractionMapper = useCallback(applyInteractions((interactions?interactions:{})), [interactions]);
    // const tooltipMapper = useCallback(mapAttrsToProps((tooltip?tooltip:{})),[tooltip]);

    const baseAttrMapper = mapAttrsToProps((attrs));

    const baseInteractionMapper = interactions?applyInteractions((interactions)):(n:NodeRef)=>undefined

    return function shapeProps(node:NodeRef) {
        return {attrs: baseAttrMapper(node),
            interactions: baseInteractionMapper(node)}
    }

}
