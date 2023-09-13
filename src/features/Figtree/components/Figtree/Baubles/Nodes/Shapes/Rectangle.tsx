import React, {useContext,useMemo} from "react"
import {sameAttributes} from "./Circle";
import { a } from "@react-spring/web";
import { Vertex } from "../../../Layouts/LayoutInterface";
const Rectangle = React.memo<RectangleProps>( (props)=>{
    const {attrs,interactions,tooltip,x,y,vertex,...rest} = props;
    const centeredX = x-attrs.width/2;  
    const centeredY= y-attrs.height/2;

	const rotate = vertex.theta?`rotate(${vertex.theta*180/Math.PI} ${x} ${y})`:"";	
    return (
        <rect {...tooltip}   className={"node-shape"} {...attrs}  {...rest} {...interactions} x={centeredX} y={centeredY} transform={rotate} />
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
	tooltip?:any,
	vertex:Vertex,
}

export default Rectangle;