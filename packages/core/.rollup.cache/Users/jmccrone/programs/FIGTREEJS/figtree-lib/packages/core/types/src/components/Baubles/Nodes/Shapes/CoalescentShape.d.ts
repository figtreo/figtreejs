import React from "react";
import { Vertex } from "../../../../Layouts/LayoutInterface";
export declare const FadedPath: (props: any) => React.JSX.Element;
declare function CoalescentShape(props: CoalescentProps): React.JSX.Element;
declare namespace CoalescentShape {
    var defaultProps: {
        attrs: {
            fill: string;
            strokeWidth: number;
            stroke: string;
        };
        startWidth: number;
        FadeEndpoint: string;
        curveSlope: string;
    };
}
export default CoalescentShape;
export interface CoalescentProps {
    attrs: {
        fill: string;
        strokeWidth: number;
        stoke: string;
        [key: string]: any;
    };
    startWidth: number;
    FadeEndpoint: string;
    curveSlope: "min" | "max" | number;
    vertex: Vertex;
    interactions?: any;
}
/**
 * A helper function that takes a source and target object (with x, and y positions each) It calculates a symmetric
 * coalescent shape between source, the target and the reflection of the taget about a horizontal line through the source.
 * @param source -
 * @param target -  the target object {x:,y:}
 * @param slope - a number that deterimines how quickly the curve reaches the max/min height
 * @param startWidth - The starting width of the shape
 * @return string
 */
export declare function coalescentPath(source: point, topTarget: point, bottomTarget: point, slope?: number, startWidth?: number): string;
type point = {
    x: number;
    y: number;
};
/**
 * This function takes a source vertex and target vertices. It calculates the target
 * for vertex and passes data on to the coalescent path function.
 * @param vertex
 * @param targets
 * @param scales
 * @param slope
 * @return string
 */
export declare function makeCoalescent(vertex: Vertex, targets: Vertex[], slope?: number, startWidth?: number): string;
/**
 * A helper function that takes the source and target vertices
 * and calculates the slope so that the curve flattens and at
 * at the closest vertex (in the x direction).

 * @param targets
 */
export declare function calcSlope(targets: Vertex[], option: "min" | "max" | number): number;
