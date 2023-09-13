import { scaleLinear } from "d3-scale";
import { NormalizedTree } from "../../../Tree/normalizedTree";
import { BaseLayout, Vertices } from "./layoutFunctions";
import { rectangularInitialLayout } from "./rectangularLayout";
import { extent, max, min } from "d3-array";

const padding=20;

function scalePolarLayout(baseLayout:BaseLayout,width:number,height:number,angleRange:number,rootAngle:number){
    // padding
    //x is divergence
    //y is height
    const center = [width/2,height/2];
    const maxRadius = min([width,height])!/2;
    const rScale = scaleLinear()
        .domain(baseLayout.extent.x)
        .range([0, maxRadius - padding]);

    const thetaScale = scaleLinear()
        .domain(baseLayout.extent.y)
        .range([0,angleRange]);

    const polarVertices = Object.values(baseLayout.vertices).map((vertex)=>{
        const r = rScale(vertex.x);
        const theta = thetaScale(vertex.y)+rootAngle;
        const [x,y] = polarToCartesian(r,theta);
        return {id:vertex.id,x,y,r,theta};
    })

    const yScale = scaleLinear().domain(extent(polarVertices,(d)=>d.y) as [number, number]).range([0,height]);
    const xScale = scaleLinear().domain(extent(polarVertices,(d)=>d.x) as [number, number]).range([0,width]);
    
    const scaledVertices = {} as Vertices;
    for(const vertex of polarVertices){
        scaledVertices[vertex.id] = {
            id:vertex.id,
            x:xScale(vertex.x),
            y:yScale(vertex.y),
            r:vertex.r,
            theta:vertex.theta
        }
    }



        return scaledVertices;    

}

export function polarToCartesian(r:number,theta:number){
    return [r*Math.cos(theta),r*Math.sin(theta)];
}

export function polarLayout(tree:NormalizedTree,width:number,height:number,rootLength:number,rootAngle:number,angleRange:number):Vertices {
    const baseLayout = rectangularInitialLayout(tree,rootLength);

    return scalePolarLayout(baseLayout,width,height,angleRange,rootAngle);
}