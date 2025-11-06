import React from 'react'
import { withAnimation } from "../HOC/withAnimation";


import { useAttributeMappers } from "./helpers";
import type { LiftToUser } from "./types";
import type { Attrs, UserAttrs } from './types';
import type { NodeRef} from '../../Evo';
import { preOrderIterator } from '../../Evo';

import type { BaubleTypes } from '../FigTree/Figtree.types';
import { BasePath } from './Shapes';
import type { BranchedProps} from '../HOC';
import { withBranch } from '../HOC';



/**
 * User options for designating and styling branches in a figure
 */

export type BranchOptionsType<A extends UserAttrs=UserAttrs> = {
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>,
        curvature?:number,
        animated?:boolean
}

// The props accepted by the branch Bauble 
type BranchPropTypes = Omit< BaubleTypes, "dimensions"|"animated"> & {animated?:boolean} // don't need dimensions here and animation is optional

/**
 * A factory generator that returns a component factory to the user.
 * The factory accepts the options above and returns a Bauble to be rendered by the figure.
 */
function makeBranches<
     A extends Attrs,
    >(ShapeComponent:React.FC<BranchedProps<A>>)
    :(initial: BranchOptionsType<LiftToUser<A>>) => React.FC<BranchPropTypes>  {
    
        return (initial)=>{

        const Branches: React.FC<BranchPropTypes> = ({ tree, scale, layout,animated=false }) => {
                const {
                    filter = () => true,
                    keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                    attrs,
                    interactions,
                    curvature,
                    // ...rest // all shape-specific extras E
                } = initial;

                const applyAttrInteractions = useAttributeMappers<A>(attrs,interactions);
                // pass x and y position here so can be animated with react-spring in useAnimation hook
                return (
                    <g className={"branch-layer"}>
                        {[...preOrderIterator(tree)]
                        .filter(n=>filter(n))
                        .map((node) => (
                         <ShapeComponent 
                            key={keyBy(node)} 
                            parent={tree.getParent(node)}
                            node={node}  
                            applyAttrInteractions={applyAttrInteractions} 
                            curvature={curvature}
                            scale={scale} 
                            layout={layout} 
                            animated={animated}
                            /> 
                        ))}
                    </g>
                )
            }
        return Branches;
    }
}

/**
 * Add a branch Bauble to the figure.
 * The type of branch (polar, rectangular, radial) will be determined by the figure layout.
*/
export const Branches = makeBranches(withBranch(withAnimation(BasePath)));

