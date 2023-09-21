import React, { useMemo } from "react"
import { animated } from "@react-spring/web";
import { mapAttrsToProps } from "../../../../utils/baubleHelpers";
import { useLayout, useTree } from "../../../../hooks";
import { BranchPathGenerator, RectangularBranchPath } from "./Shapes/pathGenerators";

import { NodeRef } from "../../../../../Tree/normalizedTree";
import { Vertex } from "../../Layouts/LayoutInterface";

interface BranchProps {
    curvature?: number,
    attrs?: { [key: string]: any },
    filter: (x: any) => boolean,
    pathGenerator: BranchPathGenerator,
    [key: string]: any
}
const defaultProps = {
    curvature: 0.5,
     filter: () => true, 
     pathGenerator: RectangularBranchPath, 
     attrs: { stroke: "black", strokeWidth: 2 }
}

interface attrGetter {
    (v: Vertex): any
}
//todo pull out defaults
export default function Branches({
    curvature= 0.5,
     filter= (n:NodeRef) => true, 
     attrs= { stroke: "black", strokeWidth: 2 }
}) {
    const tree = useTree();
    const vertices = useLayout();
    const attrMapper: attrGetter = useMemo(() => mapAttrsToProps(attrs), [attrs]);
    

    return (
        <g className={"branch-layer"}>
            {
            vertices.allIds.filter(id => vertices.byId[id].branch).filter(id => filter(tree.getNode(id))).map(id => {
                const v = vertices.byId[id];
                return (<animated.path key={`branch-${id}`} {...attrMapper(v)}  d={v.branch!.d}  fill={"none"} />)
            })
            }
        </g>
    )
}

