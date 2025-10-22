import {useCallback} from "react";
import {applyInteractions, mapAttrsToProps,attributeSetter,interaction} from "../baubleHelpers";
import { NodeRef } from "../Evo";

/*
This function takes props which define the attributes of an element and provide information about how to update
those attributes
// This might be a step too far. Maybe we can just use bauble helpers
*/

export type ShapeProps = {attrs:{[key:string]:string|number},interactions:{[key:string]:interaction}}
export type ShapePropGetter = (node:NodeRef)=>ShapeProps

export function useAttributeMappers(props:{attrs:{[key:string]:attributeSetter},interactions:{[key:string]:interaction}}):ShapePropGetter{
    const { attrs, interactions} = props;
    // const {state,dispatch} =useInteractions();
    //This memorizes the functions so they are not made each time - maybe overkill.
    const baseAttrMapper = useCallback(mapAttrsToProps((attrs?attrs:{})), [attrs]);
    const baseInteractionMapper = useCallback(applyInteractions((interactions?interactions:{})), [interactions]);
    // const tooltipMapper = useCallback(mapAttrsToProps((tooltip?tooltip:{})),[tooltip]);

    function attrMapper(node:NodeRef) {
        const attrs = baseAttrMapper(node);
        return attrs;
    }
    //interactions are separate because they are functions that do not get called immediately
    function interactionMapper(node:NodeRef) {
        const interactions = baseInteractionMapper(node);
        return interactions;
    }
    return function shapeProps(node:NodeRef):ShapeProps {
        return {attrs: attrMapper(node),interactions: interactionMapper(node)}//,tooltip:tooltipMapper(dataEntry)}
    }

}
