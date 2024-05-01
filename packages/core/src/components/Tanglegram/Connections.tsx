import React from "react";
import { Vertices } from "../../Layouts";
import { Tree } from "../../Evo/Tree";
import { useAttributeMappers } from "../../hooks";
import { Branch } from "../Baubles/Branches/Branch";
import { BranchProps } from "../Baubles";

interface ConnectionsProps extends BranchProps {
    vertices: Vertices[];
    trees: Tree[];
    figurePositions: {start:number,end:number}[];
}



export function  Connections(props: ConnectionsProps){
    const {vertices,figurePositions,trees,attrs,interactions} = props;
    const shapeProps = useAttributeMappers({attrs,interactions}); 
    //TODO not obvious why in an object
    //TODO use taxon and not node numbers
    const lines = [];
    for(let i = 0; i<trees.length-1;i++){
        const thisTree = trees[i];
        const thisVertices = vertices[i];
        const nextVertices = vertices[i+1];
        const thisFigurePosition = figurePositions[i];
        const nextFigurePosition = figurePositions[i+1];
        for(const externalNode of thisTree.getExternalNodes()){
           if(thisVertices.vertices[externalNode.number] && nextVertices.vertices[externalNode.number]){
            const v = thisVertices.vertices[externalNode.number];    
            const thisVertex = thisVertices.vertices[externalNode.number];
                const nextVertex = nextVertices.vertices[externalNode.number];
                const thisX = thisFigurePosition.start+thisVertex.x;
                const thisY = thisVertex.y;
                const nextX = nextFigurePosition.start+nextVertex.x;
                const nextY = nextVertex.y;
                const path = `M${thisX},${thisY}L${thisFigurePosition.end},${thisY}L${nextFigurePosition.start},${nextY}L${nextX},${nextY}`
                lines.push(<Branch key={externalNode.number} {...shapeProps(v)} d={path} id={v.number}/>)

           }
        }
    }
    return(
        <g className="connectionLayer">
            {lines}
        </g>
    )


}

