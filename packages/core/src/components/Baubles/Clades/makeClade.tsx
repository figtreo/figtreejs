import React from "react";
import { NodeRef, tipIterator, Tree } from "../../../Evo";
import { layout, scale } from "../../../store/store";
import { maxIndex } from "d3-array";
import { Highlight } from "./Highlight";
import { Cartoon } from "./Cartoon";
import { AttrAndInteractionApplier, Attrs, UserAttrs } from "../types";
import { useAttributeMappers } from "../helpers";
import { LiftToUser } from "../types";
import { BaubleTypes } from "../../FigTree/Figtree.types";



/**
 * The options exposed to the user for defining and styling 
 * clade shapes
 */
export type CladeOptionsType<A extends UserAttrs> = {
        nodes:NodeRef[],
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>
}


/**
 * The props accepted by a Clade component.
 * The component will render a clade shape from these components
 */
export type InternalCladePropType <A extends Attrs>={
    clade:Clade,
    applyAttrInteractions:AttrAndInteractionApplier<A>;
    scale:scale;
    layout:layout;
}

/**
 * A data type holding summary information about a clade (
 * all tips descending from a given node (the root)).
 * 
 */
export type Clade={
    root:NodeRef,
    leftMost:NodeRef,
    rightMost:NodeRef
    mostDiverged:NodeRef,
}
/**
 * A factory generator that exposes a clade factory which takes @link CladeOptionsType and 
 * returns a Bauble to be added to the figure
 */
function makeClade<
A extends Attrs
>(Clade:React.FC<InternalCladePropType<A> >): // TODO make this Cartooned props
(initial:CladeOptionsType<LiftToUser<A>>) => React.FC<BaubleTypes>{
    return (initial) =>{
        
        const Clades:React.FC<BaubleTypes> = ({scale,layout,tree}) =>{
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
/**
 *  A highlight around a clade of interest. 
 * ForPolar layouts this will be a shaded arc.
 * In a rectangular figure this will be a rectangle around the clade.
 */
export const CladeHighlight = makeClade(Highlight)

/**
 * A cartoon drawing of a clade in the tree. 
 * It will not yet render for radial layouts
 */
export const CladeCartoon = makeClade(Cartoon)