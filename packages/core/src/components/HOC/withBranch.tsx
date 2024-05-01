import React from "react";
import { useFigtreeStore, useVertex } from "../../store/store";
import { normalizePath } from "../../path.helpers";
import { layoutClass } from "../../Layouts/functional/rectangularLayout";

const withBranch = (WrappedComponent: React.ComponentType<any>) => {
    function BranchedComponent(props:any){
        
        const {parent,node,shapeProps,curvature=0,...rest} = props
        const scale = useFigtreeStore(state=>state.scale);
  
        const animated = useFigtreeStore(state=>state.animated);

        const parentVertex = useVertex(parent);
        const nodeVertex = useVertex(node);
        const vP = scale(parentVertex);
        const {layoutClass} = nodeVertex;
        console.log(layoutClass)
        const vN =  scale(nodeVertex);
        
        // need to get the step here for polar

        const step = scale({x:parentVertex.x,y:nodeVertex.y})
        
        const points = [vP,vN,step];

        const d = animated?normalizePath(pathGenerator(points,curvature,layoutClass)):pathGenerator(points,curvature,layoutClass);

        return <WrappedComponent {...rest} {...shapeProps(node)} d={d} id={node.number}/>
    } 
    return BranchedComponent;
}
export default withBranch;


function pathGenerator(points: { x: number, y: number,r?:number,theta?:number }[], curvature:number,layoutClass:layoutClass): string {

    switch (layoutClass) {
        case "Rectangular": {
            return rectangularBranchPath(points,curvature);
        }
        case "Polar": {
            return polarBranchPath(points);
        } default: {
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
    console.log("polar")
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