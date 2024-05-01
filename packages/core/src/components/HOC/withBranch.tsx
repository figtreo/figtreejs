import React from "react";
import { useFigtreeStore } from "../../store";
import { normalizePath } from "../../path.helpers";
const withBranch = (WrappedComponent: React.ComponentType<any>) => {
    function BranchedComponent(props:any){
        
        const {parent,node,shapeProps,curvature=0,...rest} = props
        const layout = useFigtreeStore(state=>state.layout);
        const x = useFigtreeStore(state=>state.scaleX);
        const y = useFigtreeStore(state=>state.scaleY);
        const animated = useFigtreeStore(state=>state.animated);
        const vP = layout(parent);
        const nP = layout(node);
        const points = [{x:x(vP.x),y:y(vP.y)},{x:x(nP.x),y:y(nP.y)}]

        const d = animated?normalizePath(pathGenerator(points,curvature)):pathGenerator(points,curvature);

        return <WrappedComponent {...rest} {...shapeProps(node)} d={d} id={node.number}/>
    } 
    return BranchedComponent;
}
export default withBranch;


function pathGenerator(points: { x: number, y: number }[], curvature:number): string {
    const positions = points.length;

    switch (positions) {
        case 0: {
            return '';
        }
        case 2: {
            const [parent,child] = points; //parent is parent and gets pushed to end of array
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
            throw new Error(`path generator not implemented for this ${positions} of points`)
        }
    }
}