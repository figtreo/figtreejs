/**
 * This function takes options from the user about the branches they would like in the figure
 * and reformats it for consumption by the figure. 
 * 
 */

import { filter } from "d3-array";
import { BaubleTarget } from "../components/Baubles/Bauble";
import { BranchSpec } from "../components/Baubles/Branches";
import { PathAttrs } from "../components/Baubles/Shapes/Branch";
import { ImmutableTree, NodeRef } from "../Evo";
import { Fn, InteractionType, InternalInteractionType } from "../components/Baubles/types";

type ExposedAttrs<A> = {
  [K in keyof A]: A[K] | ((n:NodeRef) => A[K]);
};

type BranchAttrs = ExposedAttrs<PathAttrs>


type BranchBaseOptions ={
    id?:string
    attrs:BranchAttrs,
    interactions?:InteractionType
    curvature?:number
}

type filterOption = {
    filter:(n:NodeRef)=>boolean
} 
type nodeOptions = {
    nodes:NodeRef[];
}
export type InternalBranchOptions = BranchOptions & {target:BaubleTarget.Branch}
type BranchOptions  = (BranchBaseOptions & filterOption) | (BranchBaseOptions & nodeOptions)
/**
 * This function takes options from the user about the branches they would like in the figure
 * and passes it to the figure. It is a nice functional API.
 * 
 */

export function Branches(options:BranchOptions):InternalBranchOptions{
    return {...options,target:BaubleTarget.Branch}
}

export function setupBranchBauble(options:InternalBranchOptions,tree:ImmutableTree):BranchSpec{
    let nodes:NodeRef[]
    if('filter' in options){
        nodes = tree.getNodes().filter(options.filter)
    }else{
        nodes = options.nodes
    }
    const branches = nodes.map(node=>({node,parent:tree.getParent(node)}))
    const attrMapper = mapAttrsToProps(options.attrs)
    const interactionMapper = mapInteractionsToProps(options.interactions??{})
    const attrs = nodes.reduce((acc:Record<string,PathAttrs>,n)=>{
        const nodeAttrs =  attrMapper(n);
        const nodeInteractions = interactionMapper(n)
        acc[n._id] ={...nodeAttrs,...nodeInteractions}
        return acc
    },{})

    return({
        branches,
        attrs,
        id:options.id,
        curvature:options.curvature,
        target:options.target
    })


}

function isFn<T>(val: unknown): val is (n: NodeRef) => T {
  return typeof val === "function";
}

function mapAttrsToProps<A extends Record<string, unknown>>(
  attrs: ExposedAttrs<A>
): (n: NodeRef) => A {
  return function (node: NodeRef) {
    const props = {} as A;
    for (const k in attrs) {
      const v = attrs[k];
      if (isFn(v)) {
        props[k as keyof A] = v(node) as A[typeof k];
      } else {
        props[k as keyof A] = v as A[typeof k];
      }
    }
    return props;
  };
}

function mapInteractionsToProps(interactions:InteractionType):(n:NodeRef)=>InternalInteractionType{
    return function(node:NodeRef){
        const props:InternalInteractionType ={}
        for(const k in interactions){
            const possibleInteraction = interactions[k as keyof InteractionType]
            if(possibleInteraction!==undefined){
                props[k as keyof InteractionType]= ()=>possibleInteraction(node)
            }
        }
        return props
    }
}