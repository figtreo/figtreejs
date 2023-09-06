import { NormalizedTree } from "../../../Tree/normalizedTree";
import { getHeight, postorderGenerator } from "../../../Tree/treeFunctions";
import { TreeState } from "../../../Tree/treeSlice";

export interface Vertices {
        [id:string]:{
            id:string
            x:number,
            y:number
        }
    }

interface layoutFunction {
    (tree:NormalizedTree):Vertices
}
//TODO cache
function rectangularLayout (tree:NormalizedTree):Vertices {
    
    let currentY=0;
    const vertices:Vertices = {};
    for(const node of tree.getPostorderNodes()) {

        if(node.children.length>0) {
            const children = node.children.map((childId) => vertices[childId]);
            const y = 
            vertices[node.id] = {
                x:node.divergence!, //TODO add height or function to get height
                y:children.reduce((acc,child) => acc + child.y,0)/children.length,
                id:node.id
            }
        }else{
            vertices[node.id] = {
                x:node.divergence!, //TODO add height or function to get height
                y:currentY,
                id:node.id
            }
        }
        currentY++;
    }
    return vertices;
}

export const layoutFunctions:{[key:string]:layoutFunction} = {
    "rectangular":rectangularLayout,
}