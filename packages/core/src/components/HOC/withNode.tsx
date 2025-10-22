import React from "react";
import { withNodeProps } from "./types";
/** an HOC that capture the layout logic around a node
 * 
 */

const withNode = (WrappedComponent: React.ComponentType<object>) => {
    function NodedComponent(props:withNodeProps){

        const {node,shapeProps,scale,layout,...rest} = props
        if(!layout) throw new Error("layout is required")!
        const v = scale(layout(node));
        return <WrappedComponent {...rest} {...shapeProps(node)} x={v.x} y={v.y} id={node.number}/>
    } 
    return NodedComponent;
}
export default withNode;

