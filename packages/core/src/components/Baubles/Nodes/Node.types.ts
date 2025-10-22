import { BaubleProps } from "..";
import { ImmutableTree} from "../../../Evo";



export  type NodeProps = BaubleProps &{
    tree:ImmutableTree,
}



//TODO make a CIRCLENODEPROPS ... 
export interface NodeLabelProps extends BaubleProps{
    aligned:boolean
}

export enum NodeShape{ Circle, Rectangle}