import React, { ReactElement } from "react";
import { useFigtreeStore, useVertex } from "../../store/store";
/** an HOC that capture the layout logic around a node
 * 
 */

const withNode = (WrappedComponent: React.ComponentType<any>) => {
    function NodedComponent(props:any){
        
        const {node,shapeProps,...rest} = props
        const scale = useFigtreeStore(state=>state.scale);
        const v = scale(useVertex(node));

        return <WrappedComponent {...rest} {...shapeProps(node)} x={v.x} y={v.y} id={node.number}/>
    } 
    return NodedComponent;
}
export default withNode;

