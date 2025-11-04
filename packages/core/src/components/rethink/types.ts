import { SpringValue } from "@react-spring/web";
import { NodeRef } from "../../Evo";
import { Interaction } from "../Baubles/baubleTypes";

export type numerical = number|SpringValue<number>
export type stringy = string|SpringValue<string>


/** Convert SpringValue<T> -> T, leave everything else unchanged */
// Helper functions for unspringing types so we only have to define possible types once

export type DeSpring<T> = T extends SpringValue<infer U>?U:T;
export type StripSprings<T> = { [K in keyof T]: DeSpring<T[K]> };


export type Interactions = {
        onClick?:()=>void
        OnMouseOver?:()=>void
        onEnter?:()=>void
        onExit?:()=>void
    }




export type BaseAttrs = Record<string, numerical | stringy>;
export type Attrs = Record<string, number | string>;
export type UserAttrs = Record<string, number | string|((n:NodeRef)=>number|string)>;

/** Strip x/y/d/attrs value types while preserving required/optional-ness */
// infer prop types here
export type StripProps<P> = {
  [K in keyof P]:
    K extends "attrs" ? StripSprings<P[K]> :
    K extends "x" | "y" | "d" ? DeSpring<P[K]> :
    P[K];
};


export type BaseBaubleProps= {
    interactions?: Interactions;
    x?: numerical;
    y?: numerical;
    d?: stringy;
    animated?:boolean
  }

export type BaubleProps = StripProps<BaseBaubleProps>

export type XYShape<A extends Attrs> = Omit<BaubleProps ,"x"|"y"|"d"> 
 & { x: number; y: number; d?: never; attrs:A};

export type DShape<A extends Attrs> = Omit<BaubleProps ,"x"|"y"|"d"> 
 & { x?: never; y?: never; d: string; attrs:A};



export type AttrAndInteractionApplier<A extends Attrs> =
  (n: NodeRef) => { attrs: A; interactions?: Interaction };

export type Fn = (n: NodeRef) => number | string;
// resolves functions -> return type, leaves literals as-is
export type ResolvedAttrs<U extends UserAttrs> = {
  [K in keyof U]: U[K] extends (n: NodeRef) => number | string
    ? ReturnType<U[K]>
    : Exclude<U[K], Fn> // need to exclude since U[k] type is still possibly all userAttrs
};

