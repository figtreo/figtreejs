import React from 'react'
import type { NodeRef } from '../../Evo';
import type { layoutType, scaleType } from '../../store/store';
import type { AttrAndInteractionApplier, Attrs, DShape} from '../Baubles/types';
import { layoutClass } from '../../Layouts';
import { normalizePath } from '../../path.helpers';
import type { PolarVertex, simpleVertex } from '../../Layouts/functional/rectangularLayout';



//The goal here is now to take a shape components that accepts Attrs: number | string , x/y
// and return a component that takes a node / layout/ scale and attrs:number|string | function



export type BranchedProps<A extends Attrs> ={
    node:NodeRef,
    parent?:NodeRef,
    applyAttrInteractions:AttrAndInteractionApplier<A>;
    scale:scaleType;
    layout:layoutType;
    curvature?:number,
    animated?:boolean

}

/**
 *  This HOC takes a shape (possibly animated) that requires d values and calculated attributes and 
 * calculates those values from a node and its parent.
 *
 */
export function withBranch<
  A extends Attrs,
//   E extends object = {}
    >
    (
    WrappedComponent: React.FC<DShape<A> >
    ):React.FC<BranchedProps<A>> {
        // we will now calculate the x,y, attrs, and interactions
    function BranchedComponent(props:BranchedProps<A>){
        const {node,parent,applyAttrInteractions,scale,layout,curvature=0,animated=false} = props
       
        const v = layout(node);
        const {layoutClass} = v;
        const p = parent?layout(parent):{x:v.x,y:v.y} // straight line
        const step = {x:p.x,y:v.y}
        const points = [p,v,step].map(vertex=>scale(vertex))
        const d=normalizePath(pathGenerator(points,curvature,layoutClass))

        const {attrs,interactions} = applyAttrInteractions(node)
        return <WrappedComponent  attrs={{fill:'none',...attrs}} interactions={interactions} d={d} animated={animated} />
    } 
    return BranchedComponent;
}


function pathGenerator(points: simpleVertex[]|PolarVertex[], curvature:number,layout:layoutClass): string {

    switch (layout) {
        case layoutClass.Rectangular: {
            return rectangularBranchPath(points,curvature);
        }
        case layoutClass.Polar: {
            return polarBranchPath(points as PolarVertex[]);
        } case layoutClass.Radial:{
            return radialBranchPath(points);
        }default: {
            throw new Error(`path generator not implemented for the ${layout as string} of points`)
        }
    }
}

//TODO remove switch statement on number of positions that was for cartooned nodes that will be handled elsewhere
function rectangularBranchPath(points:simpleVertex[], curvature:number):string{
    const positions = points.length;

    switch (positions) {
        case 0: {
            return '';
        }
        case 3: {
            const [parent,child] = points; //parent is parent and gets pushed to end of array
            if (curvature === 0) { // no curve
                const x1 = parent.x + 0.001;// tiny adjustment for faded line (can't have y or x dimension not change at all
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

function polarBranchPath(points: PolarVertex[]):string{
    const positions = points.length;
    switch (positions) {
        case 3: {
            const [parent,child,step] = points;
            const arcBit = parent.theta===child.theta ||parent.r===0?"":`A${parent.r},${parent.r} 0 0 ${parent.theta<child.theta ?1:0} ${step.x},${step.y}`; 
            return `M${parent.x},${parent.y} ${arcBit} L${child.x},${child.y}`;

        } case 0: {
           return "";
        } default: {
            throw new Error(`Error in polar path generator. not expecting ${positions} points`)
    }

    }
}

function radialBranchPath(points: simpleVertex[]):string{
    const positions = points.length;

    switch (positions) {
        case 0: {
            return '';
        }
        case 3: {
            const [parent,child] = points; //parent is parent and gets pushed to end of array
                return `M${parent.x},${parent.y}L${(parent.x + child.x) / 2},${(parent.y + child.y) / 2}L${child.x},${child.y}`;
            
        } default: {
            throw new Error(`path rectangular generator not implemented for this ${positions} of points`)
        }
    }
    
}