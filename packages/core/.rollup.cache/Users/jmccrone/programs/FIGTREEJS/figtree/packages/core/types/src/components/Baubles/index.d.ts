import { NodeRef } from '../../Tree';
export * from './Nodes';
export * from './Branches';
export type attrType = number | string | ((n: NodeRef) => number | string);
export interface BaubleProps {
    filter: (n: NodeRef) => boolean;
    attrs: {
        [key: string]: attrType;
    };
    interactions?: {
        OnClick?: (n: NodeRef) => void;
        OnMouseOver?: (n: NodeRef) => void;
        OnEnter?: (n: NodeRef) => void;
        OnExit?: (n: NodeRef) => void;
    };
}
