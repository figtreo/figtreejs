import { AbstractLayout } from "../../Layouts";
import { Tree } from "../../Tree";
import { Margins, layoutOptions } from "../FigTree/Figtree.types";

export interface TanglegramProps {
    totalWidth:number,
    totalHeight:number,
    margins:Margins,
    gap:number|number[],
    layout:typeof AbstractLayout | typeof AbstractLayout[],
    trees:Tree[],
    baubles:React.ReactNode,
    opts:layoutOptions|layoutOptions[],
    animated:boolean,
    
}