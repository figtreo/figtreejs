
import { NodeRef } from "../../../Tree/Tree.types";
import {useAttributeMappers, useLayout, useTree} from "../../../hooks";

import React from "react";
import Label from "./Shapes/Label";
import { AnimatedCircle, Circle } from "./Shapes/Circle";
import Rectangle from "./Shapes/Rectangle";
import CoalescentShape from "./Shapes/CoalescentShape";


function NodesHOC(ShapeComponent:React.ComponentType<any>) {
    return function Nodes(props:any) {
        const vertices =useLayout();
        const tree = useTree();
        const {filter=(n:NodeRef)=>true,
            ...rest} = props;
        const shapeProps = useAttributeMappers(props);
        return (
            <g className={"node-layer"}>
                {vertices.allIds.sort((a,b)=>(vertices.byId[a].x-vertices.byId[b].x)).reduce<React.ReactNode[]>( (all, id) => {
                    if (filter(tree.getNode(id))) {//filter needs to us tree api
                        const v = vertices.byId[id];
                        const element = <ShapeComponent key={id} {...rest}  node={tree.getNode(v.id)}  theta={v.theta} x={v.x} y={v.y} {...shapeProps(v)}/> 
                        // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                            all.push(element)
                    }
                    return all
                }, [])
                }
            </g>
        )
    }
}

function NodeLabels(props:any){
    const vertices =useLayout();
    const tree = useTree();
    const {filter=(n:NodeRef)=>true,
        aligned=false,
        ...rest} = props;
    const shapeProps = useAttributeMappers(props);
    return (
        <g className={"node-label-layer"}>
            {vertices.allIds.sort((a,b)=>(vertices.byId[a].x-vertices.byId[b].x)).reduce<React.ReactNode[]>( (all, id) => {
                if (filter(tree.getNode(id))) {//filter needs to us tree api
                    const v = vertices.byId[id];
                    const {alignmentBaseline,textAnchor,rotation} = v.nodeLabel;
                    const {x,y} = aligned &&  v.nodeLabel.alignedPos ? v.nodeLabel.alignedPos:v.nodeLabel;
                    const d =        
                    aligned &&  v.nodeLabel.alignedPos ?`M${v.x} ${v.y}L${x} ${y}`:`M${v.x} ${v.y}L${v.x} ${v.y}`
                    const element = <Label key={id} {...rest}  node={tree.getNode(v.id)}  d={d} alignmentBaseline={alignmentBaseline} textAnchor={textAnchor} rotation={rotation}   x={x} y={y} {...shapeProps(v)}/> 
                    // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                        all.push(element)
                }
                return all
            }, [])
            }
        </g>
    )
}



const CircleNodes = NodesHOC(Circle);
// CircleNodes.defaultProps={
//     filter:(v)=>true,
//     attrs:{r:2},
//     selectedAttrs:{},
//     hoveredAttrs:{},
//     tooltip:{},
//     label:()=>false,
//     sortFactor:1,
// };
const AnimatedCircleNodes = NodesHOC(AnimatedCircle);
// AnimatedCircleNodes.defaultProps={
//     filter:(v)=>true,
//     attrs:{r:2},
//     selectedAttrs:{},
//     hoveredAttrs:{},
//     tooltip:{},
//     label:()=>false,
//     sortFactor:1,
// };

const RectangularNodes = NodesHOC(Rectangle);
// Rectangle.defualtProps={
//     filter:(v)=>true,
//     attrs:{width:10,height:5},
//     selectedAttrs:{},
//     hoveredAttrs:{},
//     tooltip:{},
//     sortFactor:1,
// }


const CoalescentNodes=NodesHOC(CoalescentShape);
// CoalescentNodes.defualtProps={
//     attrs: {
//         fill: "steelblue",
//         strokeWidth: 1,
//         stroke: 'black'
//     },
//     tooltip:{},
//     filter:(v)=>true,
//     sortFactor:1,
// };



const Nodes={Circle:AnimatedCircleNodes,Coalescent:CoalescentNodes,AnimatedCircleNodes:AnimatedCircleNodes,Rectangle:RectangularNodes,Label:NodeLabels};
export default Nodes;





