import React, { useMemo } from "react"
import { animated } from "@react-spring/web";
import { mapAttrsToProps } from "../../../../utils/baubleHelpers";
import { useLayout, useTree } from "../../../../hooks";
import { BranchPathGenerator, RectangularBranchPath } from "./Shapes/pathGenerators";
import { type } from "os";
import { PassThrough } from "stream";
import { Path } from "typescript";
import { Vertex } from "../../layoutFunctions";

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
     filter= (n:any) => true, 
     pathGenerator= RectangularBranchPath, 
     attrs= { stroke: "black", strokeWidth: 2 }
}) {
    const tree = useTree();
    const vertices = useLayout();
    const attrMapper: attrGetter = useMemo(() => mapAttrsToProps(attrs), [attrs]);
    function getEdge(v: Vertex) {
        const parent = tree.getParent(v.id);
        return {
            source: vertices[parent!],
            target: v
        }
    }


    return (
        <g className={"branch-layer"}>
            {[...Object.values(vertices)].filter(v => tree.getParent(v.id)).filter(v => filter(tree.getNode(v.id))).map(v => {

                const edge = getEdge(v)

                const path = { d: pathGenerator(edge, curvature) }

                return (<animated.path key={`branch-${v.id}`} {...attrMapper(v)}  {...path}  fill={"none"} />)
            })
            }
        </g>
    )
}

