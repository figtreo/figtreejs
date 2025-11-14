


import { BaubleTarget, CladeShapes } from './Bauble';

import { Attrs, InternalInteractionType } from './types';
import { NodeRef } from '../../Evo';
import { Cartoons } from './Clades/Cartoon';
import { Highlights } from './Clades/Highlight';
import { Clade } from '../HOC/withClades';




// Accessor for Node Shapes


export function Clades(props:CladeProps){
    const {shape,...rest} = props
    switch(shape){
        case CladeShapes.Cartoon:
            return <Cartoons {...(rest as Omit<CartoonCladeProps, 'shape'>)} />
        case CladeShapes.Highlight:
            return <Highlights {...(rest as Omit<HighlighCladeProps, 'shape'>)} />
    }
}



type CartoonCladeProps ={
        shape:CladeShapes.Cartoon
        clades:Clade[],
        attrs:{[key:string]:Attrs },
        interactions?:{[key:string]:InternalInteractionType}, // keyed by node id // check type
        // shape:NodeShapes,
        keyBy?:(n:NodeRef)=>string
    }
type HighlighCladeProps=  {
        shape:CladeShapes.Highlight
        clades:Clade[],
        attrs:{[key:string]:Attrs },
        interactions?:{[key:string]:InternalInteractionType}, // keyed by node id // check type
        // shape:NodeShapes,
        keyBy?:(n:NodeRef)=>string
    }
    
export type CladeProps = CartoonCladeProps | HighlighCladeProps

export type CladeSpec = CladeProps &{target:BaubleTarget.Clade,id:string}