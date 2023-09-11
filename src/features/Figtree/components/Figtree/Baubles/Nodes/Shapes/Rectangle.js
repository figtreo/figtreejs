import React, {useContext,useMemo} from "react"
import {sameAttributes} from "./Circle";
import { a } from "@react-spring/web";
const Rectangle = React.memo( (props)=>{
    const {attrs,interactions,tooltip,x,y,...rest} = props;
    const centeredX = x-attrs.width/2;  
    const centeredY= y-attrs.height/2;
    
    console.group('Rectangle');
    console.log('x', x);
    console.log('y', y);
    console.log(props);
    console.groupEnd();
    return (
        <rect {...tooltip}  className={"node-shape"} {...attrs}  {...rest} {...interactions} x={centeredX} y={centeredY}/>
    );
},sameAttributes);


export default Rectangle;