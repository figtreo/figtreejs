import React from "react";
export declare const AnimatedCircle: React.NamedExoticComponent<CircleProps>;
export declare const Circle: React.NamedExoticComponent<CircleProps>;
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
