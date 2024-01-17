import { extent,  maxIndex,  mean,  min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertices, defaultInternalLayoutOptions, internalLayoutOptions,Vertices} from "./LayoutInterface";
import { RectangularLayout, fishEyeTransform } from "./rectangularLayout";
import { Tree } from "..";


export class PolarLayout extends AbstractLayout {

    static getArbitraryLayout(tree: Tree, opts:internalLayoutOptions): ArbitraryVertices {
        const safeOpts = { ...defaultInternalLayoutOptions, ...opts,pollard:0 };
        const rectangularVerticies = RectangularLayout.getArbitraryLayout(tree,safeOpts);
        //remove root path if needed
        if(!safeOpts.showRoot){
            rectangularVerticies.byId[tree.root!.id].pathPoints = [];
        }
        return rectangularVerticies;
    }

    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats:{tipCount:number,rootId:string}, opts: internalLayoutOptions):Vertices {
        const safeOpts = { ...defaultInternalLayoutOptions, ...opts };

        // Do fisheye thing assuming we are using the rectangular layout

        const padding = safeOpts.padding;
        const y_og = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([padding, opts.height - padding]);
        const pointOfInterestY = y_og.invert(safeOpts.pointOfInterest.y)

        const transform = fishEyeTransform(safeOpts.fishEye,pointOfInterestY); //fish eye does  wierd things here when too big 10 m
            

        const maxRadius = min([opts.width,opts.height])!/2;

        const angleRange = normalizeAngle(safeOpts.angleRange);
        // These scales adjust the x and y values from arbitrary layout to polar coordinates with r within the svg and theta between 0 and 2pi

        const rScale = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([0, maxRadius ]);

    
            const startAngle = safeOpts.rootAngle+(2*3.14 - angleRange)/2; //2pi - angle range  is what we ignore and we want to center this on the root angle
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
            if(vertex.pathPoints.length>0 && !vertex.hidden){ 
            const [tip,parent] = vertex.pathPoints.slice(-2);

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
        

        // Once we have the polar coordinates we will convert back to cartesian coordinates
        // But we need to adjust the aspect ratio to fit the circle

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
            allIds: [],
            type: "Polar",
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

            const scalePathPoints = vertex.pathPoints.map(d=>({...d,x:x(d.x),y:y(d.y)}));

            scaledVertices.byId[vertex.id] = {
                hidden:arbitraryLayout.byId[vertex.id].hidden,
                labelHidden:arbitraryLayout.byId[vertex.id].labelHidden,
                id: vertex.id,
                x: xpos,
                y: ypos,
                level: vertex.level,
                r:vertex.r,
                theta:normalizedTheta,
                nodeLabel: {
                    x: xpos+dx,//+vertex.nodeLabel.dx,
                    y: ypos+dy,//+vertex.nodeLabel.dy,
                    alignmentBaseline: "middle",
                    textAnchor: normalizedTheta>Math.PI/2 && normalizedTheta<3*Math.PI/2?"end":"start",
                    rotation:textSafeDegrees(vertex.theta),
                    alignedPos:{x:x(alignedX)+dx,y:y(alignedY)+dy}
                },
                branch:scalePathPoints.length>0 && ! arbitraryLayout.byId[vertex.id].hidden?{
                    d: this.pathGenerator(scalePathPoints, opts), //transformes x and y
                    label:{
                        x: vertex.pathPoints.length>0? mean([xpos,x(vertex.pathPoints[2].x)])!+branchDx:xpos, // no path on root sometimes put this at the position  // want mean of step and final point
                        y: vertex.pathPoints.length>0?mean([ypos,y(vertex.pathPoints[2].y)])!+branchDy:ypos,
                        alignmentBaseline: "bottom",
                        textAnchor:"middle",
                        rotation:textSafeDegrees(vertex.theta)
                    }}:undefined,
                
            };
            if(vertex.id===treeStats.rootId){
                if(scalePathPoints.length>0){
                    scaledVertices.origin = {x:scalePathPoints[1].x,y:scalePathPoints[1].y}
            }else{
                scaledVertices.origin = {x:xpos,y:ypos}
            }
        }
            scaledVertices.allIds.push(vertex.id);

        }      
        const furthestNode = scaledVertices.byId[scaledVertices.allIds[maxIndex(scaledVertices.allIds.map(id=>scaledVertices.byId[id].r))]];
        scaledVertices.axisLength= distance (scaledVertices.origin!, furthestNode)

        scaledVertices.theta = [normlizedStart,normlizedEnd];
        return scaledVertices;
    }
   



    static pathGenerator(points: { x: number, y: number,r:number,theta:number }[], opts: internalLayoutOptions): string {
        const positions = points.length;
        switch (positions) {
            case 3: {

                const [target,source,step] = points;


                const arcBit = source.theta===target.theta ||source.r===0?"":`A${source.r},${source.r} 0 0 ${source.theta<target.theta ?1:0} ${step.x},${step.y}`; 
                return `M${source.x},${source.y} ${arcBit} L${target.x},${target.y}`;

            } case 0: {
               return "";
            } case 5: {
                const initial = this.pathGenerator(points.slice(-3), opts); //[top,bottom,target,source,step]
                const arcBit =  points[0].theta===points[1].theta||points[0].r===0?"": `A${points[0].r},${points[0].r} 0 0 ${points[0].theta<points[1].theta ?1:0} ${points[1].x},${points[1].y}`; 
                const curvyBit = `M${points[2].x},${points[2].y}L${points[0].x},${points[0].y} ${arcBit} Z`
                return `${initial}${curvyBit}`
            }default: {
                throw new Error(`Error in polar path generator. not expecting ${positions} points`)
        }
    }
}

}





export function polarToCartesian(r:number,theta:number){
    return [r*Math.cos(theta),r*Math.sin(theta)];
}

export function normalizeAngle(theta:number){
    while(theta>2*Math.PI ){
    theta-=2*Math.PI
    }
    return theta;
}

export function degrees(theta:number){
    return normalizeAngle(theta)*180/Math.PI;
}

//this function converts radians to degrees and adjusts degrees 
// so the text is not fliped
export function textSafeDegrees(radians:number){
    const d =  degrees(radians)

    if(d>90 && d<270){
        return d-180;
    }else{
        return d
    }
}

function distance(point1:{x:number,y:number}, point2:{x:number,y:number}):number{
    return Math.sqrt((point1.x-point2.x)**2+(point1.y-point2.y)**2)
}
