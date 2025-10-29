import { SpringValue } from "@react-spring/web";

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


export type WithTestId<T> = T & { 'data-testid'?: string };