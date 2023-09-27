import React from "react";
import { Vertex } from "../../../../Layouts/LayoutInterface";
declare const Rectangle: React.NamedExoticComponent<RectangleProps>;
export interface RectangleProps {
    attrs: {
        height: number;
        width: number;
        fill: string;
        strokeWidth: number;
        stroke: string;
        [key: string]: any;
    };
    x: number;
    y: number;
    interactions?: any;
    tooltip?: any;
    vertex: Vertex;
}
export default Rectangle;
