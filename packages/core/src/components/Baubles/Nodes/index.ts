import { NodeRef } from '../../../Tree';

export {default as Nodes} from './Nodes';
export * from "./Shapes"
//TODO separate exposed props from required


export interface ShapeProps{
    attrs: {
        [key: string]: number | string | ((n: NodeRef) => number | string);
    };
    interactions?: {
        OnClick?: (n: NodeRef) => void;
        OnMouseOver?: (n: NodeRef) => void;
        OnEnter?: (n: NodeRef) => void;
        OnExit?: (n: NodeRef) => void;
    };
}

export interface BaseShapeProps extends ShapeProps {
    id:string
}