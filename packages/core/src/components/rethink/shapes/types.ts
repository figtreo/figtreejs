import { SpringValue } from "@react-spring/web";

export type numerical = number|SpringValue<number>
export type stringy = string|SpringValue<string>


/** Convert SpringValue<T> -> T, leave everything else unchanged */
// Helper functions for unspringing types so we only have to define possible types once

type DeSpring<T> = T extends SpringValue<infer U>?U:T;
export type StripSprings<T> = { [K in keyof T]: DeSpring<T[K]> };


export type Interactions = {
        onClick?:()=>void
        OnMouseOver?:()=>void
        onEnter?:()=>void
        onExit?:()=>void
    }

export type BaseBaubleProps = {
    x?:numerical
    y?:numerical
    d?:stringy
    interactions?:Interactions
}

// types to constrain baseprops

// omit so that we can add them back as required

/** Require x & y, forbid d */
type XY_NoD = Omit<BaseBaubleProps, "x" | "y" | "d"> & {
  x: numerical;
  y: numerical;
  d?: never;
};

/** Require d, forbid x & y */
type D_NoXY = Omit<BaseBaubleProps, "x" | "y" | "d"> & {
  d: stringy;
  x?: never;
  y?: never;
};

type XYD = Omit<BaseBaubleProps, "x" | "y" | "d"> & {
  x: numerical; y: numerical; d: stringy;
};




// export type BaubleProps = {
//     x:number
//     y:number
//     interactions?:Interactions
//     animated?:boolean
// }
export type BaubleProps = StripSprings<BaseBaubleProps> &{
    animated?:boolean
}

export type WithTestId<T> = T & { 'data-testid'?: string };