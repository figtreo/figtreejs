import {create, }  from 'zustand'
import {  NodeRef } from '../Evo/Tree'
import { FunctionalVertex,layoutClass } from '../Layouts/functional/rectangularLayout'
import { polarScaleMaker } from './polarScale'
import { scaleLinear } from 'd3-scale'

//todo remove props that are just the getting passed to children and use render props instead


export const useVertexFactory =(layout:(n:NodeRef)=>FunctionalVertex)=> (node:NodeRef):FunctionalVertex=>{
    const v = layout(node);
    if(v === undefined){
        throw new Error(`Node ${node} not found in layout`)
    }
    return v!;
}

//Todo cache these
export function getScale(maxX:number,maxY:number,canvasWidth:number,canvasHeight:number,layoutClass:layoutClass,invert:boolean=false,minRadius:number=0,angleRange:number=2*Math.PI,rootAngle:number=0){
    
    const xScale = scaleLinear().domain([0,maxX]).range([0,canvasWidth]);
    const yScale = scaleLinear().domain([0,maxY]).range([0,canvasHeight]);
    
    switch(layoutClass){
        case "Rectangular":
            return function(vertex:{x:number,y:number}){
                return {x:xScale(vertex.x),y:yScale(vertex.y)}
            } 
        case "Polar":
            return polarScaleMaker(maxX,maxY,canvasWidth,canvasHeight,invert,minRadius,angleRange,rootAngle)
        case "Radial":
            return function(vertex:{x:number,y:number}){
                return {x:xScale(vertex.x),y:yScale(vertex.y)}
            }         
            default:
            throw new Error("Not implemented in calcX")
    }
}

