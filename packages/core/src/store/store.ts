import { extent, min } from 'd3-array'
import {  NodeRef } from '../Evo/Tree'
import { FunctionalVertex,layoutClass } from '../Layouts/functional/rectangularLayout'
import { polarScaleMaker } from './polarScale'
import { ScaleLinear, scaleLinear } from 'd3-scale'

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
    rootAngle = 0,
    pollard = 0,
    fishEye = { x: 0, y: 0 , scale:0},

}: {
    domainX: number[],
    domainY: number[],
    canvasWidth: number,
    canvasHeight: number,
    layoutClass: layoutClass,
    invert?: boolean,
    minRadius?: number,
    angleRange?: number,
    rootAngle?: number,
    rootLength?:number,
    pollard:number,
    fishEye?: { x: number, y: number,scale:number },
}) {


    switch (layoutClass) {
        case "Rectangular":
            const minX = domainX[1] *pollard;
            let xScale = scaleLinear().domain([minX,domainX[1]]).range([0, canvasWidth]); // 0 to account for any root length
            let yScale = scaleLinear().domain(domainY).range([0, canvasHeight]);

            let calcY = (n:number) => yScale(n);
           if(fishEye.scale>0){
            const y = yScale.invert(fishEye.y);
            const transform = fishEyeTransform(fishEye.scale, y)
            const newYScale = yScale.copy().domain(yScale.domain().map(transform));
            calcY = (y:number)=> newYScale(transform(y))
        }

            if(invert){
                xScale.range([canvasWidth,0]);
            }
            return function (vertex: { x: number, y: number }) {
                return { ...vertex, x: xScale(vertex.x), y: calcY(vertex.y) }
            }
        case "Polar":
            return polarScaleMaker(domainX[1], domainY[1], canvasWidth, canvasHeight, invert, minRadius, angleRange, rootAngle,pollard)
        case "Radial":

                //TODO need to update so x and y scales are equal otherwise horizontal branches will have a different scale than vertical branches

                    // const ratio = (domainX[1]-domainX[0])/(domainY[1]-domainY[0]);
                    const domain = extent(domainX.concat(domainY)) as [number,number];

                    const maxRange = min([canvasWidth,canvasHeight])!;
                    // const scaler = Math.min(canvasWidth,canvasHeight*ratio)
                    // const width = scaler;
                    // const height = scaler/ratio;
                    // center in window
                    const xShift = (canvasWidth-maxRange)/2;
                    const yShift = (canvasHeight-maxRange)/2;

                    const xRange = [xShift,maxRange+xShift];
                    const yRange = [yShift,maxRange+yShift];
                    
                     yScale = scaleLinear().domain(domain).range(yRange);
                     xScale = scaleLinear().domain(domain).range(xRange);
            return function (vertex: { x: number, y: number }) {
                return { ...vertex,x: xScale(vertex.x), y: yScale(vertex.y) }
            }
        default:
            throw new Error("Not implemented in calcX")
    }
}

// Figtree cc Andrew Rambaut
export const fishEyeTransform = (fishEye: number, pointOfInterestY: number) => (y: number) => { // point of interest is in layout scale.

    if (fishEye === 0.0) {
        return y;
    }

    const scale = 1.0 / (fishEye ); 
    const dist = pointOfInterestY - y;
    const min = 1.0 - (pointOfInterestY / (scale + pointOfInterestY));
    const max = 1.0 - ((pointOfInterestY - 1.0) / (scale - (pointOfInterestY - 1.0)));

    const c = 1.0 - (dist < 0 ? (dist / (scale - dist)) : (dist / (scale + dist)));

    return (c - min) / (max - min);
}