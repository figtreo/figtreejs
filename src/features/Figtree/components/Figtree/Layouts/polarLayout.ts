import { extent, max, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertex, ArbitraryVertices, layoutOptions,Vertices} from "./LayoutInterface";
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree";
import { RectangularLayout } from "./rectangularLayout";
import path from "path";


export class PolarLayout extends AbstractLayout {

    static getArbitraryLayout(tree: NormalizedTree, {rootLengthProportion = 0, tipSpace = (tip1: NodeRef, tip2: NodeRef) => 1}): ArbitraryVertices {
        return RectangularLayout.getArbitraryLayout(tree,{rootLengthProportion,tipSpace});
    }

    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, opts: layoutOptions):Vertices {

        const maxRadius = min([opts.width,opts.height])!/2;

        // These scales adjust the x and y values from arbitrary layout to polar coordinates with r within the svg and theta between 0 and 2pi

        const rScale = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([0, maxRadius ]);
    
        const thetaScale = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([0,2*Math.PI]);
    

        const polarVertices = [];
        
        for(const id of arbitraryLayout.allIds){
            const vertex = arbitraryLayout.byId[id];
            const r = rScale(vertex.x);
            const theta = thetaScale(vertex.y);
            const [x,y] = polarToCartesian(r,theta);// convert back to cartesian for x and y (will need to be scaled for svg coordinates)
            const level = vertex.level;

            //this ends up converting points that have been converted previously. maybe just pass 
            // parent id as source and fetch when needed?
            const [tip,parent] = vertex.pathPoints;
            const stepPointR = rScale(parent.x);
            const stepPointTheta = thetaScale(tip.y);
            const [stepPointX,stepPointY]  = polarToCartesian(stepPointR,stepPointTheta);

            const pathPoints:{x:number,y:number,r:number,theta:number}[] = vertex.pathPoints.map((point)=>{
                const r = rScale(point.x);
                const theta = thetaScale(point.y);
                const [x,y] = polarToCartesian(r,theta);
                return ({x,y,r,theta});
            })

            //add step point so we can scale it later
            
            pathPoints.push({x:stepPointX,y:stepPointY,r:stepPointR,theta:stepPointTheta});
            polarVertices.push({id:vertex.id,r,theta,x,y,pathPoints,level})
        };
        console.log(polarVertices);
        
    
        const x = scaleLinear().domain(extent(polarVertices,(d)=>d.x) as [number, number]).range([this.padding,maxRadius*2-this.padding]);
        const y = scaleLinear().domain(extent(polarVertices,(d)=>d.y) as [number, number]).range([this.padding,maxRadius*2-this.padding]);
        
        const scaledVertices: Vertices = {
            byId: {},
            allIds: []
        };
        for (const vertex of polarVertices) {

            scaledVertices.byId[vertex.id] = {
                id: vertex.id,
                x: x(vertex.x),
                y: y(vertex.y),
                level: vertex.level,
                r:vertex.r,
                theta:vertex.theta,
                d: this.pathGenerator(vertex.pathPoints.map(d=>({...d,x:x(d.x),y:y(d.y)})), opts)
            };
            scaledVertices.allIds.push(vertex.id);
        }
        console.log(scaledVertices);
        return scaledVertices;
    }
   



        


    static pathGenerator(points: { x: number, y: number,r:number,theta:number }[], opts: layoutOptions): string {
        const positions = points.length;

        switch (positions) {
            case 3: {

                const [target,source,step] = points;

                const arcBit = source.theta===target.theta ||source.r===0?"":`A${source.r},${source.r} 0 0 ${source.theta<target.theta ?1:0} ${step.x},${step.y}`; // the end point of the arc is wrong
                return `M${source.x},${source.y} ${arcBit} L${target.x},${target.y}`;

            } case 3: {
                console.log("cartoon implemented")
                throw new Error("path generator not implemented for this number of points")
            } default: {
                throw new Error("path generator not implemented for this number of points")
            }
        }
    }
    // cartoonGenerator(tree: NormalizedTree, vertices: Vertices): string {
    //     throw new Error("Method not implemented.")
    // }

}





export function polarToCartesian(r:number,theta:number){
    return [r*Math.cos(theta),r*Math.sin(theta)];
}

