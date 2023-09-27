import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { useAnimation } from "../../../hooks";
import { useSpring ,animated} from "@react-spring/web";
import { interpolatePath } from 'd3-interpolate-path'


//TODO use gester for hover etc. 
export function Branch(props:any){
    const animation = useAnimation()
    const {attrs,id,d}=props;

    
    
    
    // useEffect(() => {
    //   /**
    //    * assign the latest render value of d to the ref
    //    * However, assigning a value to ref doesn't re-render the app
    //    * So, prevCountRef.current in the return statement displays the
    //    * last value in the ref at the time of render i.e., the previous state value.
    //    */
    //   prevDRef.current = d;

    // }, [d]); //run this code when the value of count changes

    // const interpolator = prevDRef.current? interpolatePath(prevDRef.current!, d):(value:number)=>d 

    let visibleProperties;
    if(animation){
     visibleProperties = useSpring({...attrs,d, config: { duration: 500 }});
    }
     else{
         visibleProperties = {...attrs,d}
     }
     

    return (
    <animated.path key={`branch-${id}`} {...visibleProperties} fill={"none"} />)
    // <animated.path key={`branch-${vertex.id}`} {...attrs}  {...animatedAttrs} d={d} strokeWidth={pathX.x} fill={"none"} />)
    

}