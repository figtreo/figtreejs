// Normalization of SVG path commands
// 1. parse path to array of commands - parse-svg-path
// 2. make all commands absolute - abs-svg-path
// 3. convert all commands to Curves. normalize-svg-path //cubic bezier curves with 2 control points and the end point
// 4. split path into n number of curves

// curve splitting by https://pomax.github.io/bezierinfo/#introduction

import abs from 'abs-svg-path'
import normalize from 'normalize-svg-path'
import parse from 'parse-svg-path'
class point{
    x:number
    y:number
    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }
}

const NUMBER_OF_POINTS=6; // this should be more than needed by layouts 
type curveArray = [string, number, number, number, number, number, number];
export function normalizePath(path:string):string{ //TODO this might remove the fill on cartoons.
    const parsedPath = parse(path)
    const absPath = abs(parsedPath)
    const normalizedPath = normalize(absPath) // normalized path is [M, x,y ] [C, x1,y1, x2,y2, x,y]....

    let newPath = `${normalizedPath[0][0]} ${normalizedPath[0][1]} ${normalizedPath[0][2]} `
    let curves = normalizedPath.filter((d:any[])=>d[0]==="C").map((curve:curveArray)=>{return [new point(curve[1], curve[2]),new point(curve[3], curve[4]),new point(curve[5], curve[6])]})

    if(curves.length>NUMBER_OF_POINTS){
        throw new Error(`Path must have no more than ${NUMBER_OF_POINTS} nodes (excluding start point) detected ${curves.length} nodes update layout or path.helpers` )
    }
    if(curves.length==0){
        throw new Error('Path must have at least 1 node (excluding start point) update layout or path.helpers' )
    }

    while(curves.length<NUMBER_OF_POINTS){
        const toSplit = curves.pop();
        const {left,right} = splitCubicB(toSplit!,0.5);
        curves.push(left);
        curves.push(right.reverse());
    }

    for(let i = 0; i<curves.length; i++){
        const curve = curves[i];
        newPath+=`C${curve[0].x},${curve[0].y} ${curve[1].x},${curve[1].y} ${curve[2].x},${curve[2].y} `
    }
    return newPath;
}

function splitCubicB(curve:point[],t:number):{left:point[],right:point[]}{
const left:point[]=[]
const right:point[]=[]

function getCurve(points:point[],t:number){
    if(points.length==1){
        left.push(points[0])
        right.push(points[0])
    }else{
        const newPoints = Array(points.length-1)
        for(let i =0; i<newPoints.length; i++){
            if(i==0){
                left.push(points[0])
            }
            if(i==newPoints.length-1){
                right.push(points[i+1])
            }
            newPoints[i]=new point((1-t)*points[i].x+t*points[i+1].x,(1-t)*points[i].y+t*points[i+1].y)
        }
        getCurve(newPoints,t)
    }
}
    getCurve(curve,t);
    return {left,right}
}


