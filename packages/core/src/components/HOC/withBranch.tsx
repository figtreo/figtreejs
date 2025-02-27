import React from "react";
import {  useVertexFactory } from "../../store/store";
import { normalizePath } from "../../path.helpers";
import { layoutClass } from "../../Layouts/functional/rectangularLayout";

const withBranch = (WrappedComponent: React.ComponentType<any>) => {
    function BranchedComponent(props:any){
        
        const {parent,node,shapeProps,curvature=0,scale,layout,tree,...rest} = props
        const useVertex = useVertexFactory(layout);

        let parentVertex;
        const nodeVertex = useVertex(node);
        
        if(parent===undefined){
            if(tree.isRoot(node)){ // node has length so we'll show the root line
                
                parentVertex = {x:0,y:nodeVertex.y};
            }else{
                throw new Error(" Trying to make a branch for a node where parent is undefined and the node is not the root node")
            }
        }else{
             parentVertex = useVertex(parent);
        }

        const vP = scale(parentVertex);
        const {layoutClass} = nodeVertex;

        const vN =  scale(nodeVertex);
        
        // need to get the step here for polar

        const step = scale({x:parentVertex!.x,y:nodeVertex.y})
        
        const points = [vP,vN,step];

        const d = normalizePath(pathGenerator(points,curvature,layoutClass)); //normalized so we can use react spring to animate
        return <WrappedComponent {...rest} {...shapeProps(node)} d={d} id={node.number}/>
    } 
    return BranchedComponent;
}
export default withBranch;


function pathGenerator(points: { x: number, y: number,r?:number,theta?:number }[], curvature:number,layout:layoutClass): string {

    switch (layout) {
        case layoutClass.Rectangular: {
            return rectangularBranchPath(points,curvature);
        }
        case layoutClass.Polar: {
            return polarBranchPath(points);
        } case layoutClass.Radial:{
            return radialBranchPath(points);
        }default: {
            throw new Error(`path generator not implemented for this ${layoutClass} of points`)
        }
    }
}

//TODO remove switch statement on number of positions that was for cartooned nodes that will be handled elsewhere
function rectangularBranchPath(points: { x: number, y: number,r?:number,theta?:number }[], curvature:number):string{
    const positions = points.length;

    switch (positions) {
        case 0: {
            return '';
        }
        case 3: {
            const [parent,child,step] = points; //parent is parent and gets pushed to end of array
            if (curvature === 0) { // no curve
                var x1 = parent.x + 0.001;// tiny adjustment for faded line (can't have y or x dimension not change at all
                return `M${x1},${parent.y}L${parent.x},${child.y}L${child.x},${child.y + 0.001}`;
            } else if (curvature < 1) {
                // curve
                return `M${parent.x},${parent.y}C${parent.x},${child.y}, ${parent.x + Math.abs(curvature * (parent.x - child.x))},${child.y} ${child.x},${child.y}`;


            } else { //(curvature == 1)
                return `M${parent.x},${parent.y}L${(parent.x + child.x) / 2},${(parent.y + child.y) / 2}L${child.x},${child.y}`;

            }
        } default: {
            throw new Error(`path rectangular generator not implemented for this ${positions} of points`)
        }
    }
}

function polarBranchPath(points: { x: number, y: number,r?:number,theta?:number }[]):string{
    const positions = points.length;
    switch (positions) {
        case 3: {
            const [parent,child,step] = points;
            const arcBit = parent.theta===child.theta ||parent.r===0?"":`A${parent.r},${parent.r} 0 0 ${parent.theta!<child.theta! ?1:0} ${step.x},${step.y}`; 
            return `M${parent.x},${parent.y} ${arcBit} L${child.x},${child.y}`;

        } case 0: {
           return "";
        } default: {
            throw new Error(`Error in polar path generator. not expecting ${positions} points`)
    }

    }
}

function radialBranchPath(points: { x: number, y: number,r?:number,theta?:number }[]):string{
    const positions = points.length;

    switch (positions) {
        case 0: {
            return '';
        }
        case 3: {
            const [parent,child,step] = points; //parent is parent and gets pushed to end of array
                return `M${parent.x},${parent.y}L${(parent.x + child.x) / 2},${(parent.y + child.y) / 2}L${child.x},${child.y}`;
            
        } default: {
            throw new Error(`path rectangular generator not implemented for this ${positions} of points`)
        }
    }
    
}