import React, {useContext,useMemo} from "react"
import {useSpring,animated} from "@react-spring/web";

export const AnimatedCircle = React.memo<CircleProps>( (props)=> {

   const {attrs,interactions,tooltip,x:cx,y:cy} = props;
    const visibleProperties= useSpring({...attrs});
    return (
    	<animated.circle {...tooltip}  className={"node-shape"} {...visibleProperties} cx={cx} cy={cy} {...interactions}/>
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
interface CircleProps{
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