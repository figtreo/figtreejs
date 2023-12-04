import React, { useMemo, useRef } from "react"
import { useAnimation, useAttributeMappers, useLayout, useTree } from "../../../hooks";

import { Vertex } from "../../../Layouts/LayoutInterface";
import { NodeRef } from "../../../Tree/Tree.types";
import { normalizePath } from "../../../path.helpers";
import { BranchProps } from "./Branches.types";
import { Branch } from "./Branch";
//TODO very similar to Nodes

//todo pull out defaults
export default function Branches(props:BranchProps) {

    const  {filter= (n:NodeRef) => true, 
    attrs= { stroke: "black", strokeWidth: 2,fill:"none" },interactions,
    ...rest} = props;
    const animated = useAnimation();
    const vertices =useLayout();
    const tree = useTree();
    const shapeProps = useAttributeMappers({attrs,interactions}); //TODO not obvious why in an object
    return (
        <g className={"branch-layer"}>
            {vertices.allIds.filter(a=>!vertices.byId[a].hidden).sort((a,b)=>(vertices.byId[a].x-vertices.byId[b].x)).filter((vid:string)=>vertices.byId[vid].branch).reduce<React.ReactNode[]>( (all, id) => {
                if (filter(tree.getNode(id))) {//filter needs to us tree api
                
                    const v = vertices.byId[id];
                    const d = animated?normalizePath(v.branch!.d):v.branch!.d;
                    // const d = normalizePath(v.branch!.d);

                    const element = <Branch key={id} {...rest}  node={tree.getNode(v.id)}   vertex={v}   {...shapeProps(v)} d={d}/> 
                    // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                        all.push(element)
                }
                return all
            }, [])
            }
        </g>
    )
}



