import { NodeRef } from '../../Evo/Tree';
import { BaseShapeProps, ShapeProps } from './Nodes';

export * from './Nodes';
export * from './Branches'

export type attrType = number | string | ((n: NodeRef) => number | string)
export interface BaubleProps extends ShapeProps{
    filter:(n:NodeRef)=>boolean,
}