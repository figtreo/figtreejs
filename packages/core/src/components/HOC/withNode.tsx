import React, { ReactElement } from "react";
import { useFigtreeStore, useVertex } from "../../store";
/** an HOC that capture the layout logic around a node
 * 
 */

const withNode = (WrappedComponent: React.ComponentType<any>) => {
    function NodedComponent(props:any){
        
        const {node,shapeProps,...rest} = props
        const x = useFigtreeStore(state=>state.scaleX);
        const y = useFigtreeStore(state=>state.scaleY);
        const v = useVertex(node);

        return <WrappedComponent {...rest} {...shapeProps(node)} x={x(v.x)} y={y(v.y)} id={node.number}/>
    } 
    return NodedComponent;
}
export default withNode;

