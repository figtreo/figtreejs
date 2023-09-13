import React, {useCallback, useContext} from "react";
import { link} from "d3-shape";
import{useSpring,animated} from "@react-spring/web";
import withLinearGradient from "../../../../HOC/WithLinearGradient";
import {areEqualShallow} from "../../../../../utils/utilities";
import { bumpRectangular,bumpRadial } from "./curve";
// potentially pass in mapper not attrs so we can cache and make more efficient.
// extract to use branch path generator. 



const RectangularBranchPath = React.memo((props)=>{
    let {edge,curvature,attrs,...rest} = props;
    // let path =useSpring({d:branchPathGenerator({x0,y0,x1,y1})});
    const linker = link(bumpRectangular(curvature))
    .x((d) => d.x )
    .y((d) =>  d.y )
    let path ={d:linker(edge)};
    return(<animated.path {...attrs}  {...path} {...rest} fill={"none"} />)
}
);



//TODO update
function sameProps(prev,curr){
    const primitiveKeys=["x0","y0","x1","y1"];
    for(const key of primitiveKeys){
        if(prev[key]!==curr[key]){
            return false
        }
    }
    return areEqualShallow(prev.attrs,curr.attrs);
}

export default RectangularBranchPath;
