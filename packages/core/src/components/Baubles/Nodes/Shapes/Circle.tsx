import {animated} from "@react-spring/web";
import React from "react";
import withAnimation from "../../../HOC/withAnimation";
import { BaseShapeProps } from "../";
import { NodeProps } from "../Node.types";


const BaseCircle = React.memo<CircleProps>( props=> {
 
   const {attrs,interactions,id} = props;

    return (
    	<animated.circle  node-id={id} className={"node-shape"} {...attrs} {...interactions} cx={attrs.x} cy={attrs.y} />
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
export interface CircleProps extends BaseShapeProps{
	attrs:{
		r:number,
		fill:string,
		strokeWidth:number,
		stroke:string,
		x:number,
		y:number
	}
}

export interface CircleNodeProps extends NodeProps{
	attrs:{
		r:number,
		fill:string,
		strokeWidth:number,
		stroke:string,
	}
}