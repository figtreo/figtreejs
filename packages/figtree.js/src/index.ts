import {rectangularLayout } from "@figtreejs/core";
import branchLabelRender from "./BranchLabelRender";
import branchesRender from "./BranchesRender";
import figtreeRender from "./FigtreeRender";
import { CircleNodeRender,RectNodeRender,NodeLabelRender } from "./NodeRenders";
import AxisRender from "./AxisRender";
// import tanglegramRender from "./TanglegramRender";

export const ft ={
    figtree: figtreeRender,
    Branches:branchesRender,
    BranchLabels:branchLabelRender,
    CircleNodes:CircleNodeRender,
    RectNodes:RectNodeRender,
    // CoalNodes:CoalNodeRender,
    NodeLabels:NodeLabelRender,
    Axis:AxisRender,
    // tanglegram:tanglegramRender,
    rectangularLayout:rectangularLayout,
    // polarLayout:PolarLayout,
    // radialLayout:RadialLayout
}

//TODO mimic plot api have d3 return svg //how to handle animations?
export {ImmutableTree,Tree,PreOrderTraversalCache} from "@figtreejs/core";