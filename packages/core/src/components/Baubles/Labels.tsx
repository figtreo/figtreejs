import { NodeRef } from "../../Evo"
import { withBranches } from "../HOC/withBranches"
import { withNodeLabel } from "../HOC/withNode"
import { withNodes } from "../HOC/withNodes"
import { BaubleTarget } from "./Bauble"
import { BaseLabel } from "./Shapes"
import { LabelAttrs } from "./Shapes/Label"
import { AttrsRecord } from "./types"


export const  BranchLabels=withBranches<LabelAttrs>(withNodeLabel<LabelAttrs>(BaseLabel))
export const NodeLabels=withNodes<LabelAttrs>(withNodeLabel<LabelAttrs>(BaseLabel))

export type NodeLabelProps = {
    id?:string,
    nodes:NodeRef[],
    attrs:AttrsRecord<LabelAttrs>

}
export type NodeLabelSpec = NodeLabelProps &{target:BaubleTarget.NodeLabel, id:string}


export type BranchLabelProps = {
    id?:string,
    branches:{node:NodeRef,parent:NodeRef}[],
    attrs:AttrsRecord<LabelAttrs>

}
export type BranchLabelSpec = BranchLabelProps & {target:BaubleTarget.BranchLabel, id:string}


