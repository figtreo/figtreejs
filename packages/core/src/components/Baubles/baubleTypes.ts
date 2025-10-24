import { SpringValue } from "@react-spring/web"
import { NodeRef } from "../../Evo"

// Animatable attributes
export type numericAttr = number | SpringValue<number>
export type stringAttr = string | SpringValue<string>
export type attrType = numericAttr | stringAttr
//Animatable schema
export type BaseAttrs = Record<string, attrType|undefined>
//Interactions
export type BaseInteraction = (n?:NodeRef)=>void
export type Interaction = Record<string,()=> void>

// Props for the base wrapped components
export interface AnimatableBaubleProps<A extends BaseAttrs=BaseAttrs>{
    attrs:A;
    x?:numericAttr;
    y?:numericAttr;
    d?:stringAttr;
    animated?:boolean;
    interactions?:Interaction;
    id:number;
}
// unwrap springValue but keep structure - from copilot for passing props up from animated component
type UnwrapSpring<T> = T extends SpringValue<infer U> ? U : T; // remove springVale

export type UnwrappedAnimatableProps<T> =
    T extends SpringValue<infer U> ? UnwrappedAnimatableProps<U> :
    T extends object ? { [K in keyof T]: UnwrappedAnimatableProps<T[K]> } :
    UnwrapSpring<T>

// --- public “plain” props the animation HOC exposes
export interface PlainProps<A extends BaseAttrs=BaseAttrs> {
    attrs:UnwrappedAnimatableProps<A>,
    x?:number;
    y?:number;
    d?:string;
    animated?:boolean;
    interactions:Interaction;
    id:number;
}

// Plain types for mapper code
export type plainAttr = number | string
export type plainAttrRecord = Record<string,plainAttr|undefined>
export type plainAttrGetter = (n:NodeRef) => plainAttr


// Node applier must return UNWRAPPED attrs that match PlainProps<A>['attrs']
export type AttrAndInteractionApplier<APlain> =
  (n: NodeRef) => { attrs: APlain; interactions: Interaction };

