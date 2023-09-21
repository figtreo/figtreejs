import { extent,  mean,  min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertices, internalLayoutOptions,Vertices} from "./LayoutInterface";
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree";
import { RectangularLayout, fishEyeTransform } from "./rectangularLayout";

//TODO extract tip dx dy as constants
//TODO normalize once
//TODO update margins for layouts
export class PolarLayout extends AbstractLayout {

    static getArbitraryLayout(tree: NormalizedTree, {rootLength = 0, tipSpace = (tip1: NodeRef, tip2: NodeRef) => 1,showRoot=true}): ArbitraryVertices {
        const rectangularLayout = RectangularLayout.getArbitraryLayout(tree,{rootLength,tipSpace});
        //remove root path if needed
        if(!showRoot){
            rectangularLayout.byId[tree.root!.id].pathPoints = [];
        }
        return rectangularLayout;
    }

    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats:{tipCount:number}, opts: internalLayoutOptions):Vertices {

        // Do fisheye thing assuming we are using the rectangular layout

        const y_og = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([this.padding, opts.height - this.padding]);
        const pointOfInterestY = y_og.invert(opts.pointOfInterest.y)

        const transform = fishEyeTransform(opts.fishEye/treeStats.tipCount,treeStats.tipCount,pointOfInterestY); //fish eye does  wierd things here when too big 10 m
            

        const maxRadius = min([opts.width,opts.height])!/2;

        const angleRange = normalizeAngle(opts.angleRange);
        // These scales adjust the x and y values from arbitrary layout to polar coordinates with r within the svg and theta between 0 and 2pi

        const rScale = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([0, maxRadius ]);

    
            const startAngle = opts.rootAngle+(2*3.14 - angleRange)/2; //2pi - angle range  is what we ignore and we want to center this on the root angle
            const endAngle = startAngle+angleRange;
            const thetaScale = scaleLinear()
            .domain(arbitraryLayout.extent.y.map(transform))
            .range([startAngle,endAngle]); // rotated to match figtree orientation
       

        const polarVertices = [];
        
        for(const id of arbitraryLayout.allIds){
            const vertex = arbitraryLayout.byId[id];
            const r = rScale(vertex.x);
            const theta =  thetaScale(transform(vertex.y));
            const [x,y] = polarToCartesian(r,theta);// convert back to cartesian for x and y (will need to be scaled for svg coordinates)
            const level = vertex.level;

            //this ends up converting points that have been converted previously. maybe just pass 
            // parent id as source and fetch when needed?
            let pathPoints:{x:number,y:number,r:number,theta:number}[] = [];
            // ingores root which might have an empty path;
            if(vertex.pathPoints.length===2){
            const [tip,parent] = vertex.pathPoints;
            const stepPointR = rScale(parent.x);
            const stepPointTheta = thetaScale(transform(tip.y));
            const [stepPointX,stepPointY]  = polarToCartesian(stepPointR,stepPointTheta);


            pathPoints = vertex.pathPoints.map((point)=>{
                const r = rScale(point.x);
                const theta = thetaScale(transform(point.y));
                const [x,y] = polarToCartesian(r,theta);
                return ({x,y,r,theta});
            })

            //add step point so we can scale it later 


            
            pathPoints.push({x:stepPointX,y:stepPointY,r:stepPointR,theta:stepPointTheta});
        }
            polarVertices.push({id:vertex.id,r,theta,x,y,pathPoints,level,nodeLabel:vertex.nodeLabel})
        };
        

        // center (0,0) polartoCartesian(maxRadius,startAngle) is top left of svg
        const extremes = [[0,0],polarToCartesian(maxRadius,startAngle),polarToCartesian(maxRadius,endAngle)]; 

        // Also need every pi/2 point we pass through.
        //assumes range is <=2pi
        const normlizedStart = normalizeAngle(startAngle);
        const normlizedEnd = normalizeAngle(normlizedStart+angleRange); 

        if(normlizedEnd>normlizedStart){
            for (const theta of [Math.PI/2,Math.PI,3*Math.PI/2].filter(d=>d>normlizedStart && d<normlizedEnd)){
                const [x,y] = polarToCartesian(maxRadius,theta);
                extremes.push([x,y]);
            }
        }else{//we've crossed 0

            for (const theta of [0,Math.PI/2,Math.PI,3*Math.PI/2].filter(d=>d>normlizedStart || d<normlizedEnd)){
                const [x,y] = polarToCartesian(maxRadius,theta);
                extremes.push([x,y]);
            }

        }



        


        const xDomain = extent(extremes,(d)=>d[0]) as [number, number];
        const yDomain = extent(extremes,(d)=>d[1]) as [number, number];

        const ratio = (xDomain[1]-xDomain[0])/(yDomain[1]-yDomain[0]);

        const scaler = Math.min(opts.width,opts.height*ratio)
        const width = scaler;
        const height = scaler/ratio;

        const xShift = (opts.width-width)/2;
        const yShift = (opts.height-height)/2;



        const yRange = [yShift,opts.height-yShift];
        const xRange = [xShift,opts.width-xShift];
        


        const x = scaleLinear().domain(xDomain).range(xRange);
        const y = scaleLinear().domain(yDomain).range(yRange);

    
        
        const scaledVertices: Vertices = {
            byId: {},
            allIds: []
        };
        for (const vertex of polarVertices) {
            const xpos = x(vertex.x);
            const ypos = y(vertex.y);

            //hypothenuse is 12 (tip label gap) or -6 node label gap
            let dx,dy;
           if(vertex.nodeLabel.dx===12){
                dx = Math.cos(vertex.theta)*12;
                dy = Math.sin(vertex.theta)*12;
            }else{
                dx = Math.cos(vertex.theta)*6;
                dy = Math.sin(vertex.theta)*6;
            }

            //branch lable dx dy;
            let branchDx,branchDy;
            const normalizedTheta = normalizeAngle(vertex.theta);
            if(normalizedTheta>0 && normalizedTheta<Math.PI/2){//good
                branchDx = Math.sin((Math.PI/2) -normalizedTheta)*6;
                branchDy = -Math.cos((Math.PI/2) -normalizedTheta)*6;
            }else if(normalizedTheta>Math.PI/2 && normalizedTheta<Math.PI){ //good
                branchDx = -Math.cos((Math.PI/2) - (Math.PI-normalizedTheta))*6;
                branchDy = -Math.sin((Math.PI/2) - (Math.PI-normalizedTheta))*6;
            }else if (normalizedTheta>Math.PI && normalizedTheta<3*Math.PI/2){ // good
                branchDx = Math.cos((Math.PI/2) - (normalizedTheta-Math.PI))*6;
                branchDy = -Math.sin((Math.PI/2) - (normalizedTheta-Math.PI))*6;
            }else{
                branchDx = -Math.cos((Math.PI/2) - (2*Math.PI-normalizedTheta))*6;
                branchDy = -Math.sin((Math.PI/2) - (2*Math.PI-normalizedTheta))*6;
            }


            const [alignedX,alignedY] = polarToCartesian(maxRadius,vertex.theta);

            scaledVertices.byId[vertex.id] = {
                id: vertex.id,
                x: xpos,
                y: ypos,
                level: vertex.level,
                r:vertex.r,
                theta:vertex.theta,
                nodeLabel: {
                    x: xpos+dx,//+vertex.nodeLabel.dx,
                    y: ypos+dy,//+vertex.nodeLabel.dy,
                    alignmentBaseline: "middle",
                    textAnchor: normalizedTheta>Math.PI/2 && normalizedTheta<3*Math.PI/2?"end":"start",
                    rotation:degrees(vertex.theta),
                    alignedPos:{x:x(alignedX)+dx,y:y(alignedY)+dy}
                },
                branch:{
                    d: this.pathGenerator(vertex.pathPoints.map(d=>({...d,x:x(d.x),y:y(d.y)})), opts),
                    label:{
                        x:mean([xpos,x(vertex.pathPoints[2].x)])!+branchDx, // want mean of step and final point
                        y: mean([ypos,y(vertex.pathPoints[2].y)])!+branchDy,
                        alignmentBaseline: "bottom",
                        textAnchor:"middle",
                        rotation:degrees(vertex.theta)

                    }
                }
            };
            scaledVertices.allIds.push(vertex.id);
        }
        return scaledVertices;
    }
   



    static pathGenerator(points: { x: number, y: number,r:number,theta:number }[], opts: internalLayoutOptions): string {
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

function normalizeAngle(theta:number){
    while(theta>2*Math.PI ){
    theta-=2*Math.PI}
    return theta;
}

//this function converts radians to degrees and adjusts degrees 
// so the text is not fliped
export function degrees(radians:number){
    const degrees =  normalizeAngle(radians)*180/Math.PI;

    if(degrees>90 && degrees<270){
        return degrees-180;
    }else{
        return degrees
    }
}