import { NodeRef } from '../../../Evo/Tree';

export {default as Nodes} from './Nodes';

export * from "./Shapes/index"
//TODO separate exposed props from required


// These are the props that the user passes in. 
export interface BaseShapeProps { // props for rendering something
    filter?:(n:NodeRef)=>boolean
    attrs?: {
        [key: string]: number | string | ((n: NodeRef) => number | string);
    };
    interactions?: {
        OnClick?: (n: NodeRef) => void;
        OnMouseOver?: (n: NodeRef) => void;
        OnEnter?: (n: NodeRef) => void;
        OnExit?: (n: NodeRef) => void;
    };
}