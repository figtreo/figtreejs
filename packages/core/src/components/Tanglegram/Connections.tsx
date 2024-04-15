import React from "react";
import { Vertices } from "../../Layouts";
import { Tree } from "../../Evo/Tree";
import { BranchProps } from "../../../dist";
import { useAttributeMappers } from "../../hooks";
import { Branch } from "../Baubles/Branches/Branch";

interface ConnectionsProps extends BranchProps {
    vertices: Vertices[];
    trees: Tree[];
    figurePositions: {start:number,end:number}[];
}



export function  Connections(props: ConnectionsProps){
    const {vertices,figurePositions,trees,attrs,interactions} = props;
    const shapeProps = useAttributeMappers({attrs,interactions}); //TODO not obvious why in an object

    const lines = [];
    for(let i = 0; i<trees.length-1;i++){
        const thisTree = trees[i];
        const thisVertices = vertices[i];
        const nextVertices = vertices[i+1];
        const thisFigurePosition = figurePositions[i];
        const nextFigurePosition = figurePositions[i+1];
        for(const externalNode of thisTree.externalNodes){
           if(thisVertices.byId[externalNode.id] && nextVertices.byId[externalNode.id]){
            const v = thisVertices.byId[externalNode.id];    
            const thisVertex = thisVertices.byId[externalNode.id];
                const nextVertex = nextVertices.byId[externalNode.id];
                const thisX = thisFigurePosition.start+thisVertex.x;
                const thisY = thisVertex.y;
                const nextX = nextFigurePosition.start+nextVertex.x;
                const nextY = nextVertex.y;
                const path = `M${thisX},${thisY}L${thisFigurePosition.end},${thisY}L${nextFigurePosition.start},${nextY}L${nextX},${nextY}`
                lines.push(<Branch key={externalNode.id} {...shapeProps(v)} d={path} id={v.id}/>)

           }
        }
    }
    return(
        <g className="connectionLayer">
            {lines}
        </g>
    )


}

