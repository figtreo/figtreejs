import { ImmutableTree,NodeRef } from "../../Evo/Tree";
import { FunctionalVertex } from "../../Layouts/functional/rectangularLayout";

export interface Margins{
    top:number,
    bottom:number,
    left:number,
    right:number,
}

export interface layoutOptions{

    rootLength?: number,
    rootAngle?: number,
    angleRange?: number,
    showRoot?: boolean,
    spread?: number
    fishEye?: { x: number; y: number; scale:number; };
    pollard:number,
    invert?:boolean,
    minRadius?:number,
    padding?:number
}

type layoutFunction=(tree:ImmutableTree,options?:any)=>(node:NodeRef)=>FunctionalVertex;

export interface FigtreeProps {
    width:number,
    height:number,
    layout:layoutFunction,
    tree:ImmutableTree,
    margins:Margins,
    children:React.ReactNode,
    opts:layoutOptions
    animated:boolean,
}