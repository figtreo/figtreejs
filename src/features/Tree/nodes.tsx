import { useAppSelector } from "../../app/hooks";
import { selectShapeState } from "../Settings/panels/shapes/shapeSlice";
import {  Nodes, NodeRef } from "@figtreejs/core";
import { selectHeader } from "../Header/headerSlice";
import { tree } from "../../app/store";
import { COLOUR_ANNOTATION } from "../../app/constants";

export function InternalNodes() {
    const settings = useAppSelector(selectShapeState("node"));
    const filter = (n: NodeRef) => tree.getChildCount(n) > 0;
    const header = useAppSelector(selectHeader)

    // check if sizing by an attribute or by a constant
    const radius = settings.maxSize / 2;
    const fill = settings.colourBy === "User selection" ? (n: NodeRef) => {

        const custom = tree.getAnnotation(n,COLOUR_ANNOTATION);
         return custom===undefined?settings.colour:custom;
      } : settings.colour;;
    
    const stroke = settings.outlineColour;;
    const strokeWidth = settings.outlineWidth;

    if (settings.activated) {
        if (settings.shape === "Circle") {
            return (
                <Nodes.Circle filter={filter} attrs={{ r: radius, fill, stroke, strokeWidth }} />
            )
        } else if (settings.shape === "Rectangle") {
            return (
                <Nodes.Rectangle filter={filter} attrs={{ width: settings.maxSize, height: settings.maxSize, fill, stroke, strokeWidth }} />
            )
        } else if (settings.shape === "Swoosh") {
            return (
                <Nodes.Coalescent filter={filter} attrs={{ width: settings.maxSize, height: settings.maxSize, fill, stroke, strokeWidth }} />
            )
        }
        else {
            throw new Error("Invalid node shape")
        }
    } else {
        return <g></g>;
    }



}