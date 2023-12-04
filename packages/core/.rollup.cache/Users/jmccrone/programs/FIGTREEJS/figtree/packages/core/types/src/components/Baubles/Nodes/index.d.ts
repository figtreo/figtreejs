import { NodeRef } from '../../../Tree';
export { default as Nodes } from './Nodes';
export * from "./Shapes";
export interface BaseBaubleProps {
    id: string;
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
