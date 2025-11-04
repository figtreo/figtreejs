import { ImmutableTree,NodeRef } from "../../Evo/Tree";
import { FunctionalVertex, layoutClass } from "../../Layouts/functional/rectangularLayout";

export interface Margins{
    top:number,
    bottom:number,
    left:number,
    right:number,
}
export type fishEyeOptions = { x: number; y: number; scale:number; };

export interface dimensionType extends layoutOptions{
    canvasWidth:number,
    canvasHeight:number,
    domainX:[number,number],
    domainY:[number,number],
    layoutClass:layoutClass,
    invert:boolean,
    pollard:number,
    minRadius:number,
    fishEye:fishEyeOptions,
    rootAngle:number,
    angleRange:number
}



export interface layoutOptions{

    rootLength?: number,
    rootAngle?: number,
    angleRange?: number,
    showRoot?: boolean,
    spread?: number
    fishEye?: fishEyeOptions,
    pollard:number,
    invert?:boolean,
    minRadius?:number,
    padding?:number
}

type layoutFunction=(tree:ImmutableTree,options?:layoutOptions)=>(node:NodeRef)=>FunctionalVertex;

export interface FigtreeProps {
    width:number,
    height:number,
    layout:layoutFunction,
    tree:ImmutableTree,
    margins?:Margins,
    baubles?:any[]
    opts?:layoutOptions
    animated?:boolean,
    x?:number,
    y?:number
}