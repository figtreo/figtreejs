import React from "react";
import { BaseBaubleProps } from "../";
export declare const Circle: (props: any) => React.JSX.Element;
export declare function sameAttributes(prev: {
    [key: string]: any;
}, curr: {
    [key: string]: any;
}): boolean;
export interface CircleProps extends BaseBaubleProps {
    attrs: {
        r: number;
        fill: string;
        strokeWidth: number;
        stroke: string;
        x: number;
        y: number;
    };
}
