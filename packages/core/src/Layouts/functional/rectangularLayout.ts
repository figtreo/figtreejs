import { max, mean,min } from "d3-array";
import { NodeRef, Tree } from "../../Evo/Tree";
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


export function rectangularLayout (traversal? :PreOrderTraversalCache){ //this is not doing what we think. 
    const layoutClass = "Rectangular";
    return function layout(node:NodeRef,tree?:Tree,):FunctionalVertex{
        if(traversal === undefined) console.log("No traversal")
        traversal = traversal || new PreOrderTraversalCache();
        if( traversal.cache.has(node))return traversal.cache.get(node)!
        if(tree === undefined) throw new Error("Tree is undefined and I don't remember this node!")
            console.log(`Layouting node ${node.number}`)

            let protoVertex:{x:number,y:number,maxX:number,maxY:number,minY:number};
            const x = tree.getDivergence(node)!;
            const predecessor = traversal.getPrevious(tree,node)
            const leftLabel = tree.getChildCount(node) > 0;
            const labelBelow = (tree.getChildCount(node) > 0 && (tree.getParent(node) === undefined || tree.getChild(tree.getParent(node)!, 0) !== node));


            if(tree.isExternal(node)){
                if(predecessor){
                    const currentY = layout(predecessor!,tree).maxY; // here recursion happens 
                    protoVertex = {x,y:currentY+1,maxY:currentY+1,maxX:x, minY:currentY+1}
                }else{
                    //at first node
                    protoVertex = {x,y:0,maxY:0,maxX:x,minY:0}
                }
            }else{
                const kidPositions = tree.getChildren(node).map(child=>layout(child,tree))
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
            traversal.cache.set(node,vertex)

            return traversal.cache.get(node);
        }

}
