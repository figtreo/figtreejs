import { Immutable } from "immer";
import { BaubleProps, attrType } from "..";
import { NodeRef } from "../../../Evo/Tree/Tree.types";
import { ImmutableTree } from "../../../Evo";

export interface BranchProps extends BaubleProps{
    tree:ImmutableTree,
    attrs:{
        fill:attrType,
        stroke:attrType,
        strokeWidth:attrType,
        strokeLinecap?:attrType,
        strokeLinejoin?:attrType
    },
    curvature?:number,
}