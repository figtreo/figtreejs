import {rectangularLayout, polarLayout } from "@figtreejs/core";
import BranchLabels from "./BranchLabelRender";
import Branches from "./BranchesRender";
import figtree from "./FigtreeRender";
import { CircleNodeRender as CircleNodes ,RectNodeRender as RectNodes,NodeLabelRender as NodeLabels } from "./NodeRenders";
import Axis from "./AxisRender";
// import tanglegramRender from "./TanglegramRender";



// old way of importing
export const ft ={
    figtree,
    Branches,
    BranchLabels,
    CircleNodes,
    RectNodes,
    // CoalNodes:CoalNodeRender,
    NodeLabels,
    Axis,
    // tanglegram:tanglegramRender,
    rectangularLayout,
    polarLayout,
    // radialLayout:RadialLayout
}
export {figtree,Branches,BranchLabels,CircleNodes,RectNodes,NodeLabels,Axis,rectangularLayout,polarLayout} ;
//TODO mimic plot api have d3 return svg //how to handle animations?
export {ImmutableTree} from "@figtreejs/core";

export {NexusImporter} from "@figtreejs/core";
export {postOrderIterator,tipIterator,preOrderIterator} from "@figtreejs/core";