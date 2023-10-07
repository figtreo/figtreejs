import React, {useContext,useMemo} from "react"
import {sameAttributes} from "./Circle";
import { a } from "@react-spring/web";
import { Vertex } from "../../../../Layouts/LayoutInterface";
import { degrees, textSafeDegrees } from "../../../../Layouts/polarLayout";
const Rectangle = React.memo<RectangleProps>( (props)=>{
    const {attrs,interactions,tooltip,x,y,theta,...rest} = props;
    const centeredX = x-attrs.width/2;  
    const centeredY= y-attrs.height/2;
	const rotate =theta?`rotate(${degrees(theta)} ${x} ${y})`:undefined;	 //todo may textSafeDegrees?
    return (
        <rect {...tooltip}   className={"node-shape"} {...attrs}  {...rest} {...interactions} x={centeredX} y={centeredY} transform={rotate} />
    );
},sameAttributes);


export interface RectangleProps{
	attrs:{
        height:number
		width:number,
		fill:string,
		strokeWidth:number,
		stroke:string,
		[key:string]:any
	}
	theta?:number,
	x:number,
	y:number,
	interactions?:any,
	tooltip?:any,
	vertex:Vertex,
}

export default Rectangle;