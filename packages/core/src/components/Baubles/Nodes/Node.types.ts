import { BaubleProps, attrType } from "..";
import { ImmutableTree} from "../../../Evo";


export  type NodeProps = BaubleProps & {
    tree:ImmutableTree,
    attrs:{
        stroke?:attrType,
        strokeWidth?:attrType,
        fill:attrType,
        width?:attrType,
        height?:attrType,
        r?:attrType,
        opacity?:attrType
    }
}



//TODO make a CIRCLENODEPROPS ... 
export interface NodeLabelProps extends BaubleProps{
    attrs:{
        fontFamily?:attrType,
        fontSize?:attrType,
        fontWeight?:attrType,
    },
    aligned:boolean
}

export enum NodeShape{ Circle, Rectangle}