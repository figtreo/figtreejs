
import { Nodes, NodeSpec} from "./Nodes"
import { BranchLabels, BranchLabelSpec, NodeLabels, NodeLabelSpec } from "./Labels"
import { Branches, BranchSpec } from "./Branches"
import {  CladeSpec } from "./Clades"
import { Cartoons } from "./Clades/Cartoon"
import { Highlights } from "./Clades/Highlight"
/**
 * 
 */
export function Bauble(props:BaubleSpec){
    // const{id} = props
    switch(props.target){ // switch before destructure so destructure is type aware
        case BaubleTarget.Node:{
            const {target,...rest} = props
          return <Nodes {...rest} />
        }
        case BaubleTarget.Branch:{
            const {target,...rest} = props ;
            return <Branches  {...(rest)} />
        }
        case BaubleTarget.NodeLabel:{
            const {target,...rest} = props ;
            return <NodeLabels   {...rest} />
        }

        case BaubleTarget.BranchLabel:{
             const {target,...rest} = props ;
            return <BranchLabels   {...rest} />
        }
            
        case BaubleTarget.Clade:{
             const {shape,target,...rest} = props
                return shape === CladeShapes.Cartoon ? (
                <Cartoons  {...rest} />
                ) : (
                <Highlights   {...rest} />
                );
            }
    }
    }



export enum BaubleTarget {
Node,
Branch,
NodeLabel,
BranchLabel,
Clade
}


export enum NodeShapes {
    Circle,
    Rectangle,
}
export enum CladeShapes {
    Cartoon,
    Highlight
}



export type BaubleSpec = NodeSpec | BranchSpec | NodeLabelSpec | BranchLabelSpec |CladeSpec
