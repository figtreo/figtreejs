import { extent, max, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertex, ArbitraryVertices, layoutOptions,Vertices} from "./LayoutInterface";
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree";
import { RectangularLayout } from "./rectangularLayout";
import path from "path";


export class PolarLayout extends AbstractLayout {

    static getArbitraryLayout(tree: NormalizedTree, {rootLength = 0, tipSpace = (tip1: NodeRef, tip2: NodeRef) => 1,showRoot=true}): ArbitraryVertices {
        const rectangularLayout = RectangularLayout.getArbitraryLayout(tree,{rootLength,tipSpace});
        //remove root path if needed
        if(!showRoot){
            rectangularLayout.byId[tree.root!.id].pathPoints = [];
        }
        return rectangularLayout;
    }

    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, opts: layoutOptions):Vertices {

        const maxRadius = min([opts.width,opts.height])!/2;

        // These scales adjust the x and y values from arbitrary layout to polar coordinates with r within the svg and theta between 0 and 2pi

        const rScale = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([0, maxRadius ]);
    
            const startAngle = opts.rootAngle+(2*3.14 - opts.angleRange)/2; //2pi - angle range  is what we ignore and we want to center this on the root angle
            const endAngle = startAngle+opts.angleRange;
            const thetaScale = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([startAngle,endAngle]); // rotated to match figtree orientation
        console.log([startAngle,endAngle])

        const polarVertices = [];
        
        for(const id of arbitraryLayout.allIds){
            const vertex = arbitraryLayout.byId[id];
            const r = rScale(vertex.x);
            const theta = thetaScale(vertex.y);
            const [x,y] = polarToCartesian(r,theta);// convert back to cartesian for x and y (will need to be scaled for svg coordinates)
            const level = vertex.level;

            //this ends up converting points that have been converted previously. maybe just pass 
            // parent id as source and fetch when needed?
            let pathPoints:{x:number,y:number,r:number,theta:number}[] = [];
            // ingores root which might have an empty path;
            if(vertex.pathPoints.length==2){
            const [tip,parent] = vertex.pathPoints;
            const stepPointR = rScale(parent.x);
            const stepPointTheta = thetaScale(tip.y);
            const [stepPointX,stepPointY]  = polarToCartesian(stepPointR,stepPointTheta);

            

            pathPoints = vertex.pathPoints.map((point)=>{
                const r = rScale(point.x);
                const theta = thetaScale(point.y);
                const [x,y] = polarToCartesian(r,theta);
                return ({x,y,r,theta});
            })

            //add step point so we can scale it later


            
            pathPoints.push({x:stepPointX,y:stepPointY,r:stepPointR,theta:stepPointTheta});
        }
            polarVertices.push({id:vertex.id,r,theta,x,y,pathPoints,level})
        };
        
    // update so centered on svg
        const smallRange = [this.padding,maxRadius*2-this.padding];
        const shiftFactor = Math.abs(opts.width-opts.height)/2;
        let heightRange, widthRange;
        if(opts.width>opts.height){
            heightRange = smallRange;
            widthRange = [this.padding+shiftFactor,maxRadius*2-this.padding+shiftFactor];
        }else{
            widthRange = smallRange;
            heightRange = [this.padding+shiftFactor,maxRadius*2-this.padding+shiftFactor];
        }

        const x = scaleLinear().domain(extent(polarVertices,(d)=>d.x) as [number, number]).range(widthRange);
        const y = scaleLinear().domain(extent(polarVertices,(d)=>d.y) as [number, number]).range(heightRange);
        
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
        return scaledVertices;
    }
   



        


    static pathGenerator(points: { x: number, y: number,r:number,theta:number }[], opts: layoutOptions): string {
        const positions = points.length;

        switch (positions) {
            case 3: {

                const [target,source,step] = points;

                const arcBit = source.theta===target.theta ||source.r===0?"":`A${source.r},${source.r} 0 0 ${source.theta<target.theta ?1:0} ${step.x},${step.y}`; // the end point of the arc is wrong
                return `M${source.x},${source.y} ${arcBit} L${target.x},${target.y}`;

            } case 0: {
               return "";
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

