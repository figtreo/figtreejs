import React, {useContext,useMemo} from "react"
import {sameAttributes} from "./Circle";
import { a } from "@react-spring/web";
const Rectangle = React.memo<RectangleProps>( (props)=>{
    const {attrs,interactions,tooltip,x,y,...rest} = props;
    const centeredX = x-attrs.width/2;  
    const centeredY= y-attrs.height/2;
    return (
        <rect {...tooltip}  className={"node-shape"} {...attrs}  {...rest} {...interactions} x={centeredX} y={centeredY}/>
    );
},sameAttributes);


interface RectangleProps{
	attrs:{
        height:number
		width:number,
		fill:string,
		strokeWidth:number,
		stroke:string,
		[key:string]:any
	}
	x:number,
	y:number,
	interactions?:any,
	tooltip?:any
}

export default Rectangle;