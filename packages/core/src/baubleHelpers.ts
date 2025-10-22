import { NodeRef } from "./Evo";

export type propGetter = (node:NodeRef)=>string|number
export type attributeSetter = string | number | propGetter
export type attributeGetter = (node:NodeRef)=>{[key:string]:number|string}
/**
 * This function takes in an attributes object keyed by attributes that will be applied to the bauble.
 * It returns a function that takes a vertex or edge and returns the attributes for that dom element.
 *
 * This is needed to allow specifying the attribute as function. 
 * the input of the function should be a node from a tree not the vertex
 * 
 * @param attrs - values can be primitives or functions. if primitive it will apply the attribute to all baubles
 * @return {function(*=): {}}
 */
export function mapAttrsToProps(attrs:{[key:string]:attributeSetter}):attributeGetter {
    return function (node:NodeRef) { // all attrs held in this function and fulled out at render
        const props:{[key:string]:number|string} = {};
        for (const [key, value] of Object.entries(attrs)) {
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
 * @param {*} fs 
 * @returns 
 */
export type interactionSetter = ((node:NodeRef)=>void) // cached function 
export type InteractionGetter = (node:NodeRef)=>{[key:string]:interaction}
export type interaction = ()=>void
export function applyInteractions(interactions:{[key:string]:interactionSetter}): InteractionGetter {
    return function (node:NodeRef) {
        const props:{[key:string]:any} = {};
        for (const [key, value] of Object.entries(interactions)) {
                props[key] = () => value(node)
        }
        return props;
    }

}