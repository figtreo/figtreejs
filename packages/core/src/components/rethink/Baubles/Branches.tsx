import React from 'react'
import { NodeRef, preOrderIterator, Tree } from "../../../Evo";
import { layout, scale } from "../../../store/store";
import { withAnimation } from "../HOC/withAnimation";
import withBranch, { BranchedProps } from "../HOC/withBranch";
import { BasePath } from "../Shapes/Branch";
import { Attrs,  UserAttrs } from "../types";
import { LiftToUser, useAttributeMappers } from "./helpers";


export type BranchHOCProps<A extends UserAttrs> = {
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>
        curvature?:number,
        tree:Tree,
        scale:scale,
        layout:layout
}


export type BranchProps<A extends UserAttrs> = {
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>,
        curvature?:number,
        animated?:boolean
}


type RemainingProps<U extends UserAttrs> =
  Omit<BranchHOCProps<U>, keyof BranchProps<U>>;

function makeBranches<
     AResolved extends Attrs,
    >(ShapeComponent:React.FC<BranchedProps<AResolved>>)
    :(initial: BranchProps<LiftToUser<AResolved>>) => React.FC<RemainingProps<AResolved>>  {
    
        return (initial)=>{

        const Branches: React.FC<RemainingProps<AResolved>> = ({ tree, scale, layout }) => {
                const {
                    filter = () => true,
                    keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                    attrs,
                    interactions,
                    curvature,
                    // ...rest // all shape-specific extras E
                } = initial;

                const applyAttrInteractions = useAttributeMappers<AResolved>(attrs,interactions);
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
                            /> 
                        ))}
                    </g>
                )
            }
        return Branches;
    }
}
export const Branches = makeBranches(withBranch(withAnimation(BasePath)));
