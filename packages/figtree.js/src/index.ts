import { RadialLayout, PolarLayout,RectangularLayout } from "@figtreejs/core";
import branchLabelRender from "./BranchLabelRender";
import branchesRender from "./BranchesRender";
import figtreeRender from "./FigtreeRender";
import { CircleNodeRender,RectNodeRender,CoalNodeRender,NodeLabelRender } from "./NodeRenders";
import AxisRender from "./AxisRender";

export const ft ={
    figtree: figtreeRender,
    Branches:branchesRender,
    BranchLabels:branchLabelRender,
    CircleNodes:CircleNodeRender,
    RectNodes:RectNodeRender,
    CoalNodes:CoalNodeRender,
    NodeLabels:NodeLabelRender,
    Axis:AxisRender,
    rectangularLayout:RectangularLayout,
    polarLayout:PolarLayout,
    radialLayout:RadialLayout
}


export {NormalizedTree} from "@figtreejs/core";