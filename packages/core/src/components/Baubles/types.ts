import { SpringValue } from "@react-spring/web";
import type { NodeRef } from "../../Evo";


// **Types for animated shapes that can accept either animated values or primitives */
export type numerical = number|SpringValue<number>
export type stringy = string|SpringValue<string>



/** Helper functions for unspringing types so we only have to define possible types once */
export type DeSpring<T> = T extends SpringValue<infer U>?U:T;
export type StripSprings<T> = { [K in keyof T]: DeSpring<T[K]> };

/** Types of interactions that are accepted on rendered objects.
 * These wrap functions provided by the users
 */
export type InternalInteractionType = {
        onClick?:()=>void
        OnMouseOver?:()=>void
        onEnter?:()=>void
        onExit?:()=>void
    }

export type InteractionType = {
        onClick?:(n:NodeRef)=>void
        OnMouseOver?:(n:NodeRef)=>void
        onEnter?:(n:NodeRef)=>void
        onExit?:(n:NodeRef)=>void
    }


/** Attributes as they enter rendered possibly animated svg elements */
export type BaseAttrs = Record<string, numerical | stringy>;
export type BasePos = Record<string, numerical | stringy>;
/** Attribute as they are passed internally to possibly animated svg elements */
export type Attrs = Record<string, number | string>;
export type AttrsRecord<A extends object> = Record<string,A>;
/** Attributes provided by the user. They will be applied to elements prior to rendering */
export type UserAttrs = Record<string, number | string|((n:NodeRef)=>number|string)>;

/** Strip x/y/d/attrs of their possible spring values 
 * This is used to infer the input types to animated values 
*/
export type StripProps<P> = {
  [K in keyof P]:
    K extends "attrs" ? StripSprings<P[K]> :
    K extends "pos" ? StripSprings<P[K]> :
    P[K];
};


export type XYAttrs = {x:numerical,y:numerical} & BaseAttrs
/** Wide type for all svg base baubles */
export type BaseBaubleProps<A extends BaseAttrs>= {
    interactions?: InternalInteractionType;
    attrs:A
  }

export type BaseXYProps<A extends BaseAttrs>= {
    interactions?: InternalInteractionType;
    x: numerical;
    y: numerical;
    attrs:A
  }


/** props for baubles that need x,y for positioning */
export type XYShape<A extends Attrs> ={
    interactions?: InternalInteractionType;
    attrs:A &{x:number,y:number};
    animated?:boolean
}
export type XYBaseShape<A extends BaseAttrs> ={
    interactions?: InternalInteractionType;
    attrs:A &{x:numerical,y:numerical};
    animated?:boolean
}
/** props for Baubles that need d for positioning */
export type DShape<A extends Attrs> ={
    interactions?: InternalInteractionType;
    d:string;
    attrs:A;
    animated?:boolean
}


export type AttrAndInteractionApplier<A extends Attrs> =
  (n: NodeRef) => { attrs: A; interactions?: Record<string,()=>void> };

  // possibly redundant
export type Fn = (n: NodeRef) => number | string;
// resolves functions -> return type, leaves literals as-is
export const isSpringNumber = (v: numerical): v is SpringValue<number> =>  v instanceof SpringValue
type NodeFn<T> = (n: NodeRef) => T;
/** A helper function map Attrs accepted by Baubles to those supplied by the user */
export type LiftToUser<A extends Attrs> = {
  [K in keyof A]: A[K] | NodeFn<A[K]>;
};
