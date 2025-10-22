import { NodeRef } from '../../Evo/Tree';
import { ShapeProps } from '../../hooks';


export * from './Nodes';
export * from './Branches'

export type attrType = number | string | ((n: NodeRef) => number | string)
export interface BaubleProps extends ShapeProps{
    filter:(n:NodeRef)=>boolean,
    keyBy?: (n: NodeRef) => string,
}