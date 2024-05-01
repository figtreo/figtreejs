import { Tree,NodeRef } from "../../Evo/Tree/Tree.types";
import { FunctionalVertex } from "../../Layouts";
import { ImmutableTree } from "../../Evo/Tree";

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
    pointOfInterest?: { x: number; y: number; },
    fishEye?: number;
    pollard?:number,
    invert?:boolean,
    minRadius?:number,
    padding?:number
}

type layout=(node:NodeRef,tree?:Tree)=>FunctionalVertex;

export interface FigtreeProps {
    width:number,
    height:number,
    layout:layout,
    tree:Tree,
    margins:Margins,
    children:React.ReactNode,
    opts:layoutOptions
    animated:boolean,
}