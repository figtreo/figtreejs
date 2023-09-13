import React,{useMemo} from "react"
import RectangularBranchPath from "./Shapes/RectangularBranchPath";
import CoalescentBranch from "./Shapes/CoalescentBranchPath";
import {mapAttrsToProps} from "../../../../utils/baubleHelpers";
import {useLayout, useTree} from "../../../../hooks";
import PolarBranchPath from "./Shapes/CircularBranchPath";

function BranchesHOC(PathComponent) {
    return function Branches(props){
        const tree = useTree();
        const vertices = useLayout();
        const {attrs, filter,curvature} = props;
        const attrMapper = useMemo(() => mapAttrsToProps(attrs), [attrs]);
        function getEdge(v){
            const parent = tree.getParent(v.id);
            return {
                source: vertices[parent],
                target: v
            }
            
        };

        return (<g className={"branch-layer"}>
            {[...Object.values(vertices)].filter(hasParent(tree)).filter(v=>filter(tree.getNode(v.id))).map(v => {
                return (<PathComponent  key={`branch-${v.id}`} edge={getEdge(v)}
                                       attrs={attrMapper(v)}
                                       vertex={v}
                                       curvature={curvature}/>)
            })
            }
        </g>)
    }
}

const hasParent = (tree) =>(vertex)=>{
   return tree.getNode(vertex.id).parent?true:false;
}

const RectangularBranches=BranchesHOC(RectangularBranchPath);
RectangularBranches.defaultProps={
    filter:e=>true
};

const CoalescentBranches = BranchesHOC(CoalescentBranch);

const PolarBranches = BranchesHOC(PolarBranchPath);

PolarBranches.defaultProps={
    filter:e=>true
};

const Branches={Rectangular:RectangularBranches,
    Coalescent:CoalescentBranches,
    Polar:PolarBranches};
export default Branches;