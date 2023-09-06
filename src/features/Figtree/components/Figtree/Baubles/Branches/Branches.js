import React,{useMemo} from "react"
import RectangularBranchPath from "./Shapes/RectangularBranchPath";
import CoalescentBranch from "./Shapes/CoalescentBranchPath";
import {mapAttrsToProps} from "../../../../utils/baubleHelpers";
import {useLayout, useTree} from "../../../../hooks";

function BranchesHOC(PathComponent) {
    return function Branches(props){
        const tree = useTree();
        const vertices = useLayout();
        const {attrs, filter} = props;
        const attrMapper = useMemo(() => mapAttrsToProps(attrs), [attrs]);
        function getPosition(v){
            const parent = tree.getParent(v.id);
            return {
                x0: vertices[parent].x,
                y0: vertices[parent].y,
                x1: v.x,
                y1: v.y
            }
            
        };

        return (<g className={"branch-layer"}>
            {[...Object.values(vertices)].filter(hasParent(tree)).filter(v=>filter(tree.getNode(v.id))).map(e => {
                return (<PathComponent  key={`branch-${e.id}`} {...getPosition(e)}
                                       attrs={attrMapper(e)}
                                       edge={e}/>)
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

const Branches={Rectangular:RectangularBranches,
    Coalescent:CoalescentBranches};
export default Branches;