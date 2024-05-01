import React from "react";
import { CircleNodeProps, RectangleNodeProps } from "@figtreejs/core";
import { Nodes } from "@figtreejs/core";




export  function CircleNodeRender(options:CircleNodeProps){
    return React.createElement(Nodes.Circle, options)
}
export  function RectNodeRender(options:RectangleNodeProps){
    return React.createElement(Nodes.Rectangle, options)
}
// export function CoalNodeRender(options:CoalescentNodeProps){
//     return React.createElement(Nodes.Coalescent, options)

// }
export function NodeLabelRender(options:any){
    return React.createElement(Nodes.Label, options)
}
7