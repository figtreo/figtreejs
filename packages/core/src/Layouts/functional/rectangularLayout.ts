import {  mean } from "d3-array";
import { ImmutableTree, NodeRef, postOrderIterator} from "../../";

export enum layoutClass{
    Rectangular = "Rectangular",
    Polar = "Polar",
    Radial = "Radial"
}

export interface simpleVertex { x:number, y: number,theta?:number,r?:number } 
export interface FunctionalVertex extends simpleVertex {
    layoutClass:layoutClass
    nodeLabel:{
        alignmentBaseline:string,
        textAnchor:string,
        dxFactor:number,
        dyFactor:number,
        rotation:number
    }
}



export function baseLayout(lc:layoutClass){
    
    function layout (tree:ImmutableTree):(node:NodeRef)=>FunctionalVertex { 
        const map = new Map<NodeRef,FunctionalVertex>();
        
            let currentY = 0;
            for( const node of postOrderIterator(tree)){
    
            let protoVertex:{x:number,y:number};
            const x = tree.getDivergence(node)!;
            const leftLabel = tree.getChildCount(node) > 0;
            const labelBelow = (tree.getChildCount(node) > 0 && (tree.getParent(node) === undefined || tree.getChild(tree.getParent(node)!, 0) !== node));
    
    
            if(tree.isExternal(node)){

                protoVertex = {x,y:currentY}
                currentY++;
                
            }else{
                
                const kidPositions = tree.getChildren(node).map(child=>map.get(child)!)
                const y= mean(kidPositions,d=>d.y)!;
                protoVertex = {x,y};
            }
            const vertex = {...protoVertex,
                layoutClass:lc,
                nodeLabel:{
                    alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle", // todo calc on the fly
                    textAnchor:leftLabel?"end":"start",
                    dxFactor: leftLabel?-1:1,
                    dyFactor:leftLabel ? (labelBelow ? -1 : 1) : 0,
                    rotation:0}
                }
                map.set(node,vertex);
            }

        return function(node:NodeRef):FunctionalVertex{
            if(map.has(node))return map.get(node)!;
            else{
                console.log(node);
                throw new Error("Node not found in layout -  has the tree changed")
            }
        }


    }
    return layout
}



export const rectangularLayout =baseLayout(layoutClass.Rectangular);
export const polarLayout = baseLayout(layoutClass.Polar);