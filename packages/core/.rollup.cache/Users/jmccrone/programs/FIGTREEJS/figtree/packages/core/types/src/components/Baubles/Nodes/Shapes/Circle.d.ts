import React from "react";
export declare const Circle: (props: any) => React.JSX.Element;
export declare function sameAttributes(prev: {
    [key: string]: any;
}, curr: {
    [key: string]: any;
}): boolean;
export interface CircleProps {
    attrs: {
        r: number;
        fill: string;
        strokeWidth: number;
        stroke: string;
        [key: string]: any;
    };
    x: number;
    y: number;
    interactions?: any;
    tooltip?: any;
}
