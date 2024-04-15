import { BaubleProps, attrType } from "..";
import { NodeRef } from "../../../Evo/Tree/Tree.types";

export interface BranchProps extends BaubleProps{
    attrs:{
        fill:attrType,
        stroke:attrType,
        strokeWidth:attrType,
        strokeLinecap?:attrType,
        strokeLinejoin?:attrType
    },
}