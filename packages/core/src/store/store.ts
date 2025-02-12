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
export function getScale({
    domainX,
    domainY,
    canvasWidth,
    canvasHeight,
    layoutClass,
    invert = false,
    minRadius = 0,
    angleRange = 2 * Math.PI,
    rootAngle = 0
}: {
    domainX: number[],
    domainY: number[],
    canvasWidth: number,
    canvasHeight: number,
    layoutClass: layoutClass,
    invert?: boolean,
    minRadius?: number,
    angleRange?: number,
    rootAngle?: number
}) {
    let xScale = scaleLinear().domain(domainX).range([0, canvasWidth]);
    let yScale = scaleLinear().domain(domainY).range([0, canvasHeight]);

    switch (layoutClass) {
        case "Rectangular":
            return function (vertex: { x: number, y: number }) {
                return { ...vertex, x: xScale(vertex.x), y: yScale(vertex.y) }
            }
        case "Polar":
            return polarScaleMaker(domainX[1], domainY[1], canvasWidth, canvasHeight, invert, minRadius, angleRange, rootAngle)
        case "Radial":
            return function (vertex: { x: number, y: number }) {
                return { ...vertex,x: xScale(vertex.x), y: yScale(vertex.y) }
            }
        default:
            throw new Error("Not implemented in calcX")
    }
}

