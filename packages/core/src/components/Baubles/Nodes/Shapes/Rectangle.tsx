import React, {useContext,useMemo} from "react"
import {sameAttributes} from "./Circle";
import { Vertex } from "../../../../Layouts/LayoutInterface";
import { degrees, textSafeDegrees } from "../../../../Layouts/polarLayout";
import { animated } from "@react-spring/web";
import withAnimation from "../../../HOC/withAnimation";
import { useAnimation } from "../../../../hooks";
const BaseRect = React.memo<RectangleProps>( (props)=>{
    
	const {attrs,interactions,tooltip,theta,...rest} = props;
	
	return (
        <animated.rect {...tooltip}   className={"node-shape"} {...attrs}  {...interactions} />
    );

	
	
	
	

},sameAttributes);


const Rectangle =withAnimation(BaseRect);

export interface RectangleProps{
	attrs:{

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