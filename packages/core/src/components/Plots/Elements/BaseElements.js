import React, {useContext,useMemo} from "react"
import {useSpring,animated} from "@react-spring/web";
import {sameAttributes} from "../../Baubles/Nodes/Shapes/Circle";
//TODO animate path d with did
function WithElemental(AnimatedComponent){
    return React.memo(function WithElemental(props){
        const {attrs,interactions,tooltip,...rest} = props;
        const visibleProperties= useSpring(attrs);
        return (
            <AnimatedComponent {...tooltip}  {...visibleProperties} {...interactions} {...rest}/>
        );
    }, sameAttributes)
}

const Path = WithElemental(animated.path);
const Circle = WithElemental(animated.circle);
const Rect= WithElemental(animated.rect);

//TODO set up default props and memoization

export default {path:Path,circle:Circle,rect:Rect};
