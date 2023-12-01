import {animated} from "@react-spring/web";
import React from "react";
import withAnimation from "../../../HOC/withAnimation";


const BaseCircle = React.memo<CircleProps>( props=> {
 
   const {attrs,interactions,tooltip} = props;

    return (
    	<animated.circle {...tooltip}  className={"node-shape"} {...attrs} cx={attrs.x} cy={attrs.y} {...interactions}/>
    	);
},sameAttributes);

export const Circle =withAnimation(BaseCircle);


export function sameAttributes(prev:{[key:string]:any},curr:{[key:string]:any}){
	for(const [key,val] of Object.entries(prev.attrs)){
		if(curr.attrs[key]!==val){
			return false
		}
	}
	if("x" in prev){
		return prev.x===curr.x && prev.y===curr.y;
	}
	return true;
}
//TODO specify tooltip and interactions
export interface CircleProps{
	attrs:{
		r:number,
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