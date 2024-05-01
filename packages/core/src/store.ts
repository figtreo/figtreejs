import {create}  from 'zustand'
import { FunctionalVertex, layoutClass } from './Layouts'
import { ImmutableTree, NodeRef, Tree } from './Evo/Tree'

//todo remove props that are just the getting passed to children and use render props instead

export type dimensionState = {canvasWidth:number,canvasHeight:number,domain:[number,number]}
interface FigtreeState {
    tree:Tree,
    layout:(node:NodeRef,tree?:Tree)=>FunctionalVertex,
    scaleX:(x:number)=>number,
    scaleY:(y:number)=>number,
    animated:boolean,
    dimensions:dimensionState,
    setTree:(tree:Tree)=>void,
    setLayout:(layout:(node:NodeRef,tree?:Tree)=>FunctionalVertex)=>void,
    setXScale: (maxX:number,canvasWidth:number,layoutClass:layoutClass)=>void,
    setYScale: (maxX:number,canvasWidth:number,layoutClass:layoutClass)=>void,
    setAnimated:(animated:boolean)=>void
}



export const useFigtreeStore = create<FigtreeState>()((set) => ({
    scaleX:x=>x ,
    scaleY:y=>y,
    animated:false,
    tree:new ImmutableTree(),
    layout:()=>{throw new Error("Not implemented")},
    dimensions:{canvasWidth:0,canvasHeight:0,domain:[0,0]},


    setXScale: (maxX,canvasWidth,layoutClass)=>set(()=> ({scaleX:calcX(maxX,canvasWidth,layoutClass)})),
    setYScale: (maxY,figureHeight,layoutClass)=>set(()=>({scaleY:calcY(maxY,figureHeight,layoutClass)})),
    setAnimated:(animated)=>set(()=>({animated})),
    setTree:(tree)=>set(()=>({tree:tree})),
    setLayout:(layout)=>set(()=>({layout})),
    setDimensions:(canvasWidth:number,canvasHeight:number,domain:[number,number])=>set(()=>({dimensions:{canvasWidth,canvasHeight,domain}})) //TODO cache these
}))
//Todo cache these
function calcX(maxX:number,canvasWidth:number,layoutClass:layoutClass){
    switch(layoutClass){
        case "Rectangular":
            return (d:number)=>d/maxX*canvasWidth
        default:
            throw new Error("Not implemented in calcX")
    }
}

function calcY(maxY:number,figureHeight:number,layoutClass:layoutClass){
    switch(layoutClass){
        case "Rectangular":
            return (d:number)=>d/maxY*figureHeight
            default:
                throw new Error("Not implemented in calcY")
    }
}