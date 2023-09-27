import React from "react";
import { CircleProps } from "@figtreejs/core";
import { RectangleProps } from "@figtreejs/core";
import { CoalescentProps } from "@figtreejs/core";
import { Nodes } from "@figtreejs/core";




export  function CircleNodeRender(options:CircleProps){
    return React.createElement(Nodes.Circle, options)
}
export  function RectNodeRender(options:RectangleProps){
    return React.createElement(Nodes.Rectangle, options)
}
export function CoalNodeRender(options:CoalescentProps){
    return React.createElement(Nodes.Coalescent, options)

}
export function NodeLabelRender(options:any){
    return React.createElement(Nodes.Label, options)
}