import { scaleLinear } from "d3-scale";
import { NormalizedTree } from "../../../Tree/normalizedTree";
import { getHeight, postorderGenerator } from "../../../Tree/treeFunctions";
import { TreeState } from "../../../Tree/treeSlice";
import { rectangularLayout } from "./rectangularLayout";
import { polarLayout } from "./polarLayout";

export interface BaseLayout {
        vertices:{[id:string]:Vertex},
        extent:{
            x:[number,number],
            y:[number,number],
        }
    }

export interface Vertices {
        [id:string]:Vertex
    }

    export interface Vertex{
            id:string,
           x:number,
           y:number,
           r?:number
           theta?:number
    }

interface layoutFunction {
    (tree:NormalizedTree,width:number,height:number,rootLength:number,rootAngle:number,angleRange:number):Vertices
}





export const layoutFunctions:{[key:string]:layoutFunction} = {
    "rectangular":rectangularLayout,
    "circular":polarLayout
}

