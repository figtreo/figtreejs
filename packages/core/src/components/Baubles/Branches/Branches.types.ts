import { BaubleProps, attrType } from "..";
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