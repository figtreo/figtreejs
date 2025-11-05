import {  min } from 'd3-array'
import type {  NodeRef } from '../Evo/Tree'
import type { FunctionalVertex,layoutClass,simpleVertex} from '../Layouts/functional/rectangularLayout'
import { polarScaleMaker } from './polarScale'
import type { ScaleLinear} from 'd3-scale';
import { scaleLinear } from 'd3-scale'

//todo remove props that are just the getting passed to children and use render props instead

export type layout = (n:NodeRef)=>FunctionalVertex
// TODO remove this as unneeded
export const useVertexFactory =(layout:layout)=> (node:NodeRef):FunctionalVertex=>{
    const v = layout(node);
    if(v === undefined){
        throw new Error(`Node ${node} not found in layout`)
    }
    return v;
}

//Todo cache these
export type scaleOptions =  {
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
}


// scale adds x and y to whatever comes in.
type scaleInterface <T extends simpleVertex> = (obj: T) => T & { x: number; y: number };
export type scale = scaleInterface<simpleVertex> // TODO use generics to clean up!

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

}:scaleOptions):scale{

    let xScale:ScaleLinear<number,number>;
    let yScale:ScaleLinear<number,number>; 

    switch (layoutClass) {
        case "Rectangular": {
            const minX = domainX[1] *pollard;
             xScale = scaleLinear().domain([minX,domainX[1]]).range([0, canvasWidth]); // 0 to account for any root length
             yScale = scaleLinear().domain(domainY).range([0, canvasHeight]);

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
        }
        case "Polar":
            return polarScaleMaker(domainX[1], domainY[1], canvasWidth, canvasHeight, invert, minRadius, angleRange, rootAngle,pollard)
        case "Radial":{

                //TODO need to update so x and y scales are equal otherwise horizontal branches will have a different scale than vertical branches
// scale x and y to 0 1 
// then scale to standard witdth height.
                    const normalizeX = scaleLinear().domain(domainX).range([0,1]);
                    const normalizeY = scaleLinear().domain(domainY).range([0,1]);
                    const maxRange = min([canvasWidth,canvasHeight])!;
                    // const scaler = Math.min(canvasWidth,canvasHeight*ratio)
                    // const width = scaler;
                    // const height = scaler/ratio;
                    // center in window
                    const xShift = (canvasWidth-maxRange)/2;
                    const yShift = (canvasHeight-maxRange)/2;

                    const xRange = [xShift,maxRange+xShift];
                    const yRange = [yShift,maxRange+yShift];
                    
                     yScale = scaleLinear().domain([0,1]).range(yRange);
                     xScale = scaleLinear().domain([0,1]).range(xRange);
            return function (vertex: { x: number, y: number }) {
                return { ...vertex,x: xScale(normalizeX(vertex.x)), y: yScale(normalizeY(vertex.y)) }
            }
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