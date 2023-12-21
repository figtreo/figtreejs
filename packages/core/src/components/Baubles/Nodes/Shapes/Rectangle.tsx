import React, {useContext,useMemo} from "react"
import {sameAttributes} from "./Circle";
import { Vertex } from "../../../../Layouts/LayoutInterface";
import { animated } from "@react-spring/web";
import withAnimation from "../../../HOC/withAnimation";
import { BaseShapeProps } from "..";
const BaseRect = React.memo<RectangleProps>( (props)=>{
    
	const {attrs,interactions,id} = props;
	return (
        <animated.rect  node-id={id} className={"node-shape"} {...attrs} {...interactions} />
    );

},sameAttributes);


const Rectangle =withAnimation(BaseRect);

export interface RectangleProps extends BaseShapeProps{
	attrs:{
		fill:string,
		strokeWidth:number,
		stroke:string,
	}
}

export default Rectangle;