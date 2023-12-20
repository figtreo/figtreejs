import { BaubleProps, attrType } from "..";


export interface NodeProps extends BaubleProps{
    attrs:{
        stroke?:attrType,
        strokeWidth?:attrType,
        fill:attrType,
        width?:attrType,
        height?:attrType,
        r?:attrType
    }
}
export interface NodeLabelProps extends BaubleProps{
    attrs:{
        fontFamily?:attrType,
        fontSize?:attrType,
        fontWeight?:attrType,
    },
    aligned:boolean
}

export enum NodeShape{ Circle, Rectangle}