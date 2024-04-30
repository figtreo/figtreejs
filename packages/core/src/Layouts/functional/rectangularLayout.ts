import { max, mean } from "d3-array";
import { NodeRef, Tree } from "../../Evo/Tree";
import { PreOrderTraversalCache } from "../../Evo/Tree/Traversals/PreOrderTraversal";

type Vertex = {
    x:number,
    y:number,
    maxY:number,
    maxX:number
}


export function rectangularLayout(tree:Tree,node:NodeRef,traversal:PreOrderTraversalCache = new PreOrderTraversalCache()):Vertex{
    if( traversal.cache.has(node))return traversal.cache.get(node)!
        const x = tree.getDivergence(node)!;
        const predecessor = traversal.getPrevious(tree,node)
        if(tree.isExternal(node)){
            if(predecessor){
                const currentY = rectangularLayout(tree,predecessor!,traversal).maxY; // here recursion happens 
                const vertex = {x,y:currentY+1,maxY:currentY+1,maxX:x}
                traversal.cache.set(node,vertex)
            }else{
                //at first node
                const vertex = {x,y:0,maxY:0,maxX:x}
                    traversal.cache.set(node,vertex)
               
                            }
        }else{
            const kidPositions = tree.getChildren(node).map(child=>rectangularLayout(tree,child,traversal))
            const y= mean(kidPositions,d=>d.y)!;
            const maxY = max(kidPositions,d=>d.maxY)!;
            const maxX = max(kidPositions,d=>d.maxX)!;
            const vertex = {x,y,maxY,maxX}
            traversal.cache.set(node,vertex)

        }
        return traversal.cache.get(node);
    }


