import { NodeRef } from "../../Evo";
import { AttrAndInteractionApplier, BaseAttrs, BaseInteraction, Interaction, plainAttr, plainAttrGetter, plainAttrRecord, UnwrappedAnimatableProps } from "./baubleTypes";


/**
 * This function takes in an attributes object keyed by attributes that will be applied to the bauble.
 * It returns a function that takes a node and returns the attributes for that dom element.
 *
 * This is needed to allow specifying the attribute as function. 
 * 
 */
function mapAttrsToProps(attrs:{[key:string]:plainAttr|plainAttrGetter|undefined}):(n:NodeRef)=> plainAttrRecord {
    return function (node:NodeRef) { // all attrs held in this function and fulled out at render
        const props:{[key:string]:number|string} = {};
        for (const [key, value] of Object.entries(attrs)) {
            if (value===undefined) continue;
            if (typeof value === "function") {
                props[key] = value(node)
            } else {
                props[key] = value;
            }
        }
        return props;
    }
}

/**
 * This function does the same as mapping attrs to props but for interactions. the only difference is it can't
 * accept primitives as the values
 */

function applyInteractions(interactions:{[key:string]:BaseInteraction}): (n:NodeRef)=>Interaction {
    return function (node:NodeRef) {
        const props:Interaction = {};
        for (const [key, value] of Object.entries(interactions)) {
                props[key] = () => value(node) // wraps base interaction
        }
        return props;
    }
}

/*
this function takes attrs and interactions provided by the users and returns a function that 
computes how these attr and interactions should be calcualated for a node
*/


export function useAttributeMappers<A extends BaseAttrs>(props:{attrs:{[key:string]:plainAttr|plainAttrGetter|undefined},interactions:{[key:string]:BaseInteraction}}):AttrAndInteractionApplier<UnwrappedAnimatableProps<A>>{
    const { attrs, interactions} = props;

    //This memorizes the functions so they are not made each time - maybe overkill.
    // const baseAttrMapper = useCallback(mapAttrsToProps((attrs?attrs:{})), [attrs]);
    // const baseInteractionMapper = useCallback(applyInteractions((interactions?interactions:{})), [interactions]);
    // const tooltipMapper = useCallback(mapAttrsToProps((tooltip?tooltip:{})),[tooltip]);

    const baseAttrMapper = mapAttrsToProps((attrs));
    const baseInteractionMapper = applyInteractions((interactions?interactions:{}));

    return function shapeProps(node:NodeRef) {
        return {attrs: baseAttrMapper(node) as UnwrappedAnimatableProps<A>,
            interactions: baseInteractionMapper(node)}
    }

}
