import { AbstractLayout, CartoonData, Vertices } from "../../Layouts/LayoutInterface";
import { Tree,NodeRef } from "../../Evo/Tree/Tree.types";

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
    tipSpace?: (tip1: NodeRef, tip2: NodeRef) => number, //Todo make arguements nodeRefs
    curvature?: number,
    showRoot?: boolean,
    spread?: number
    pointOfInterest?: { x: number; y: number; },
    fishEye?: number;
    cartoonedNodes:{[key:string]:CartoonData}
    pollard?:number,
    padding:number,
    invert?:boolean,
    minRadius?:number

}

export interface FigtreeProps {
    width:number,
    height:number,
    layout:typeof AbstractLayout,
    tree:Tree,
    margins:Margins,
    children:React.ReactNode,
    opts:layoutOptions
    animated:boolean,
    tipSpace?: (tip1: NodeRef, tip2: NodeRef) => number,
    vertices?:Vertices
}