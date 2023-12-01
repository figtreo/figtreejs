import React from "react";
import { Vertex } from "../../../../Layouts/LayoutInterface";
declare const Rectangle: (props: any) => React.JSX.Element;
export interface RectangleProps {
    attrs: {
        fill: string;
        strokeWidth: number;
        stroke: string;
        [key: string]: any;
    };
    theta?: number;
    x: number;
    y: number;
    interactions?: any;
    tooltip?: any;
    vertex: Vertex;
}
export default Rectangle;
