import React, {useCallback, useContext} from "react";
import {curveStepBefore, line} from "d3-shape";
import{useSpring,animated} from "@react-spring/web";
import withLinearGradient from "../../../../HOC/WithLinearGradient";
import {areEqualShallow} from "../../../../../utils/utilities";

// potentiall pass in mapper not attrs so we can cache and make more efficient.
function branchPathGenerator({x0,y0,x1,y1}) {
        const branchLine = line()
            .x((v) => v.x)
            .y((v) => v.y)
            .curve(curveStepBefore);
        return (
            branchLine(
                [{x:x0+0.001, y: y0}, //tiny adjustment for faded line (can't have y or x dimension not change at all
                    {x: x1, y: y1+0.001}
                ]))
        // return (output)
}
const RectangularBranchPath = React.memo((props)=>{
    let {x0,y0,x1,y1,attrs,...rest} = props;
    // let path =useSpring({d:branchPathGenerator({x0,y0,x1,y1})});
    let path ={d:branchPathGenerator({x0,y0,x1,y1})};
    return(<animated.path {...attrs}  {...path} {...rest} fill={"none"} />)
}
,sameProps);
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
