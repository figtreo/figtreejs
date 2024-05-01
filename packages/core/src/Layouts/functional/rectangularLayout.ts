import { max, mean,min } from "d3-array";
import { ImmutableTree, NodeRef, Tree } from "../../Evo/Tree";
import { PreOrderTraversalCache } from "../../Evo/Tree/Traversals/PreOrderTraversal";

export type layoutClass = "Rectangular" | "Polar" |"Radial"

export type FunctionalVertex = {
    x:number,
    y:number,
    maxY:number,
    maxX:number,
    minY:number,
    layoutClass:layoutClass
    nodeLabel:{
        alignmentBaseline:string,
        textAnchor:string,
        dx:number,
        dy:number,
        rotation:number
    }
}


    const layoutClass = "Rectangular" as layoutClass;
    const traversal = new PreOrderTraversalCache();

export function rectangularLayout  (tree:ImmutableTree,node?:NodeRef):Map<NodeRef,FunctionalVertex>{
    if(node === undefined){
        node = tree.getRoot();
    }
    if( traversal.cache.has(node))return traversal.cache.get(node)!
        let descendentMap = new Map<NodeRef,FunctionalVertex>();

        let protoVertex:{x:number,y:number,maxX:number,maxY:number,minY:number};
        const x = tree.getDivergence(node)!;
        const predecessor = traversal.getPrevious(tree,node)
        const leftLabel = tree.getChildCount(node) > 0;
        const labelBelow = (tree.getChildCount(node) > 0 && (tree.getParent(node) === undefined || tree.getChild(tree.getParent(node)!, 0) !== node));


        if(tree.isExternal(node)){
            if(predecessor){
                const predMap = rectangularLayout(tree,predecessor!);
                const currentY = predMap.get(predecessor!)!.maxY; // here recursion happens 
                protoVertex = {x,y:currentY+1,maxY:currentY+1,maxX:x, minY:currentY+1}
            }else{
                //at first node
                protoVertex = {x,y:0,maxY:0,maxX:x,minY:0}
            }
        }else{
            
            const kidMaps = tree.getChildren(node).map(child=>rectangularLayout(tree,child)) // here recursion happens 
            descendentMap = kidMaps.reduce((acc,curr)=>{return new Map([...acc,...curr])},descendentMap) //caching the results of the recursion
            const kidPositions = tree.getChildren(node).map(child=>descendentMap.get(child)!)
            const y= mean(kidPositions,d=>d.y)!;
            const maxY = max(kidPositions,d=>d.maxY)!;
            const maxX = max(kidPositions,d=>d.maxX)!;
            const minY = min(kidPositions,d=>d.minY)!;
            protoVertex = {x,y,maxY,maxX,minY}
        }
        const vertex = {...protoVertex,
            layoutClass,
            nodeLabel:{
                alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle",
                textAnchor:leftLabel?"end":"start",
                dx:leftLabel?-6:12,
                dy:leftLabel ? (labelBelow ? -8 : 8) : 0,
                rotation:0}
            }
        descendentMap.set(node,vertex)            
        traversal.cache.set(node,descendentMap)
        return traversal.cache.get(node);
}

