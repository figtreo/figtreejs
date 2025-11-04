import React from "react";
import { AttrAndInteractionApplier, Attrs, ResolvedAttrs, UserAttrs } from "../types";
import { NodeRef, tipIterator, Tree } from "../../../Evo";
import { layout, scale } from "../../../store/store";
import { LiftToUser, useAttributeMappers } from '../Baubles/helpers';
import { maxIndex } from "d3-array";
import { Highlight } from "./Highlight";
import { Cartoon } from "./Cartoon";
export type InternalCartoonProps <A extends UserAttrs> = CartoonProps<A> & 
{
    layout:layout,
    scale:scale,
    tree:Tree
}


export type CartoonProps<A extends UserAttrs> = {
        nodes:NodeRef[],
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>
        animated?:boolean
}

type RemainingProps<U extends UserAttrs> =
  Omit<InternalCartoonProps<U>, keyof CartoonProps<U>>;

//Clades are defined by tmrca leftmost child, rightmost child.
//Each clade level decoration will need to handel what they do with that.
// highlight or collapse

export type CladeProps <A extends Attrs>={
    clade:Clade,
    applyAttrInteractions:AttrAndInteractionApplier<A>;
    scale:scale;
    layout:layout;
}


export type Clade={
    root:NodeRef,
    leftMost:NodeRef,
    rightMost:NodeRef
    mostDiverged:NodeRef,
}

function makeClade<
A extends Attrs
>(Clade:React.FC<CladeProps<A> >): // TODO make this Cartooned props
(initial:CartoonProps<LiftToUser<A>>) => React.FC<RemainingProps<A>>{
    return (initial) =>{
        
        const Clades:React.FC<RemainingProps<A>> = ({scale,layout,tree}) =>{
                    const {
                           nodes,
                            keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                            attrs,
                            interactions
                        } = initial;
                    const applyAttrInteractions = useAttributeMappers<A>(attrs,interactions);
                    // construct clade
                    
                    const clades =nodes.map(node=>{
                        const tips = [...tipIterator(tree,node)]

                        const leftMost = tips[0]
                        const rightMost = tips[tips.length-1]
                        const mostDiverged = tips[maxIndex(tips,d=>tree.getDivergence(d))]
                        return {
                            root:node,leftMost,rightMost,mostDiverged
                        }
                    })

                    return(
                        <g className={'cartoon-layer'}>
                        {clades.map((clade)=>(
                            <Clade
                            clade={clade}
                            key={keyBy(clade.root)}
                            applyAttrInteractions={applyAttrInteractions}
                            scale={scale} 
                            layout={layout} 
                           />
                        ))}
                        </g>
                    )
                }
        return Clades;
    }
}

export const CladeHighlight = makeClade(Highlight)
export const CladeCartoon = makeClade(Cartoon)