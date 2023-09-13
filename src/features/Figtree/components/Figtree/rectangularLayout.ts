import { scaleLinear } from "d3-scale";
import { NormalizedTree } from "../../../Tree/normalizedTree";
import { BaseLayout, Vertices } from "./layoutFunctions";


const padding=20;

function scaleRectangularLayout(baseLayout:BaseLayout,width:number,height:number){
    // padding

    const x = scaleLinear()
        .domain(baseLayout.extent.x)
        .range([0, width - padding]);

    const y = scaleLinear()
        .domain(baseLayout.extent.y)
        .range([0,height - padding]);

     const scaledVertices:{[key:string]:{id:string,x:number,y:number}}= {};
        for(const [key,value] of Object.entries(baseLayout.vertices)){
            scaledVertices[key] = {id:value.id,x:x(value.x),y:y(value.y)};
        }   
        return scaledVertices;    

}
export function rectangularLayout(tree:NormalizedTree,width:number,height:number,rootLength:number):Vertices {
    const baseLayout = rectangularInitialLayout(tree,rootLength);

    return scaleRectangularLayout(baseLayout,width,height);
}


//This can be memorized for to avoid recalculating the layout on resizes
export function rectangularInitialLayout (tree:NormalizedTree,rootLength:number):BaseLayout {
    
    let currentY=0;
    const vertices: BaseLayout = {vertices:{},extent:{x:[0,0],y:[0,0]}};
    let maxY=0;
    let maxX=0;
    for(const node of tree.getPostorderNodes()) {
        maxY=currentY;
        if(node.children.length>0) {
            const children = node.children.map((childId) => vertices.vertices[childId]);
            const y = 
            vertices.vertices[node.id] = {
                x:node.divergence! + rootLength, //TODO add height or function to get height
                y:children.reduce((acc,child) => acc + child.y,0)/children.length,
                id:node.id
            }
        }else{
            const x = node.divergence!+rootLength
            vertices.vertices[node.id] = {
                x, //TODO add height or function to get height
                y:currentY,
                id:node.id
            }

            if(x>maxX) maxX=x;
        }

        currentY++;
    }
    vertices.extent = {x:[0,maxX],y:[0,maxY]}
    return vertices;
}
