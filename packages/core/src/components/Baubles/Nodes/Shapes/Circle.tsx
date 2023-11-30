import {useSpring,animated} from "@react-spring/web";
import React from "react";
import { useAnimation } from "../../../../hooks";

export const AnimatedCircle = React.memo<CircleProps>( props=> {
 
   const {attrs,interactions,tooltip,x:cx,y:cy} = props;

   const animation = useAnimation();
   let visibleProperties;
   
   if(animation){
	visibleProperties = useSpring({...attrs,cx,cy, config: { duration: 500 }});
   }
	else{
		visibleProperties = {...attrs,cx,cy}
	}
    return (
    	<animated.circle {...tooltip}  className={"node-shape"} {...visibleProperties}  {...interactions}/>
    	);
},sameAttributes);


export const Circle = React.memo<CircleProps>( (props)=>{
	const {attrs,interactions,tooltip,x:cx,y:cy} = props;
	return (
		<circle {...tooltip}  className={"node-shape"} {...attrs} cx={cx} cy={cy} {...interactions}/>
	);
},sameAttributes);



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