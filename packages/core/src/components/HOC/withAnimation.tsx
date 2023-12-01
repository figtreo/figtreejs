import { useSpring } from "@react-spring/web";
import { useAnimation } from "../../hooks";
import React, { ReactElement } from "react";

/**
 * This is a HOC that wraps a bauble and applies a string to it's visible attributes if the animation is true.
 * @param WrappedComponent 
 * @returns 
 */
//TODO just move x,y,d,width,height to attrs 
const withAnimation = (WrappedComponent: React.ComponentType<any>) => {
    function AnimatedComponent(props: any) {
        const animation = useAnimation()
        let {attrs,d=null,x=null,y=null}=props; // d is the data for the path
        let visibleProperties;

        if(attrs.width && attrs.height){
            //adjust rect to be centered on x,y
            x = x-attrs.width/2;
            y = y-attrs.height/2;
        }

        if(animation){
         visibleProperties = useSpring({...attrs,d,x,y, config: { duration: 500 }});
        }
         else{
             visibleProperties = {...attrs,x,y,d}
         }
         console.log(visibleProperties)
         return (<WrappedComponent {...props} attrs={visibleProperties} />)
    
    }

    return AnimatedComponent;
}

export default withAnimation;