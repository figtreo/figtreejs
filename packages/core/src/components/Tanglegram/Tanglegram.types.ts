import { AbstractLayout } from "../../Layouts";
import { NodeRef, Tree } from "../../Evo/Tree";
import { attrType } from "../Baubles";
import { Margins, layoutOptions } from "../FigTree/Figtree.types";

export interface TanglegramProps {
    totalWidth:number,
    totalHeight:number,
    margins:Margins,
    gap:number|number[],
    layout:typeof AbstractLayout | typeof AbstractLayout[],
    trees:Tree[],
    baubles:React.ReactNode[],
    opts:layoutOptions|layoutOptions[],
    animated:boolean,
    connections:{ attrs:{
        fill:attrType,
        stroke:attrType,
        strokeWidth:attrType,
        strokeLinecap?:attrType,
        strokeLinejoin?:attrType
    },
    interactions?: {
        OnClick?: (n: NodeRef) => void;
        OnMouseOver?: (n: NodeRef) => void;
        OnEnter?: (n: NodeRef) => void;
        OnExit?: (n: NodeRef) => void;
    };}
    
}