import { NodeRef } from "../../Evo";
import { ShapePropGetter } from "../../hooks";
import {layout,scale} from "../../store/store";

export interface withNodeProps{
    node:NodeRef,
    scale:scale
    layout: layout,
    shapeProps:ShapePropGetter

}