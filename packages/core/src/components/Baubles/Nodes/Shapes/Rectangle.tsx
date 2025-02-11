import React, {useContext,useMemo} from "react"
import { animated } from "@react-spring/web";
import withAnimation from "../../../HOC/withAnimation";
import { BaseShapeProps, NodeProps } from "..";
import withNode from "../../../HOC/withNode";
const BaseRect = function(props:any){
    
	const {attrs,interactions,id} = props;
	return (
        <animated.rect  node-id={id} className={"node-shape"} {...attrs} {...interactions} />
    );

};


const Rectangle = withNode(withAnimation(BaseRect));

export interface RectangleProps extends BaseShapeProps{
	attrs:{
		fill:string,
		strokeWidth:number,
		stroke:string,
		width:number,
		height:number
	}
}
export interface RectangleNodeProps extends NodeProps{
	attrs:{
		fill:string,
		strokeWidth:number,
		stroke:string,
	}
}
export default Rectangle;