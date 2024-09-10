import {create}  from 'zustand'
import { ImmutableTree, NodeRef, Tree } from '../Evo/Tree'
import { FunctionalVertex,layoutClass } from '../Layouts/functional/rectangularLayout'
import { polarScaleMaker } from './polarScale'

//todo remove props that are just the getting passed to children and use render props instead

export type dimensionState = {canvasWidth:number,canvasHeight:number,domain:[number,number],layoutClass:layoutClass}
interface FigtreeState {
    tree:Tree,
    layout:(node:NodeRef)=>FunctionalVertex,
    scale:(v:{x:number,y:number})=>{x:number,y:number,r?:number,theta?:number},    
    animated:boolean,
    dimensions:dimensionState,
    setTree:(tree:Tree)=>void,
    setLayout:(layout:(node:NodeRef)=>FunctionalVertex)=>void,
    setScale: (maxX:number,maxY:number,canvasWidth:number,canvasHeight:number,layoutClass:layoutClass)=>void,
    setAnimated:(animated:boolean)=>void
    setDimensions:(canvasWidth:number,canvasHeight:number,domain:[number,number],type:layoutClass)=>void
}

export const useVertex = (node:NodeRef):FunctionalVertex=>{
    const layout = useFigtreeStore(state=>state.layout);
    const v = layout(node);
    if(v === undefined){
        throw new Error(`Node ${node} not found in layout`)
    }
    return v!;
}

export const useFigtreeStore = create<FigtreeState>()((set) => ({
    scale:(v:{x:number,y:number})=>v,
    animated:false,
    tree:new ImmutableTree(),
    layout: (node:NodeRef)=>{throw new Error("Layout not set")},
    dimensions:{canvasWidth:0,canvasHeight:0,domain:[0,0],layoutClass:layoutClass.Rectangular},

    setScale: (maxX,maxY,canvasWidth,canvasHeight,layoutClass)=>set(()=> ({scale:getScale(maxX,maxY,canvasWidth,canvasHeight,layoutClass)})),
    setAnimated:(animated)=>set(()=>({animated})),
    setTree:(tree)=>set(()=>({tree:tree})),
    setLayout:(layout)=>set(()=>({layout})),
    setDimensions:(canvasWidth:number,canvasHeight:number,domain:[number,number],layoutClass)=>set(()=>({dimensions:{canvasWidth,canvasHeight,domain,layoutClass}})) //TODO cache these
}))
//Todo cache these
function getScale(maxX:number,maxY:number,canvasWidth:number,canvasHeight:number,layoutClass:layoutClass,invert:boolean=false,minRadius:number=0,angleRange:number=2*Math.PI,rootAngle:number=0){
    switch(layoutClass){
        case "Rectangular":
            const xScale = (d:number)=>d/maxX*canvasWidth
            const yScale = (d:number)=>d/maxY*canvasHeight
            return function(vertex:{x:number,y:number}){
                return {x:xScale(vertex.x),y:yScale(vertex.y)}
            }
        case "Polar":
            return polarScaleMaker(maxX,maxY,canvasWidth,canvasHeight,invert,minRadius,angleRange,rootAngle)

        default:
            throw new Error("Not implemented in calcX")
    }
}

