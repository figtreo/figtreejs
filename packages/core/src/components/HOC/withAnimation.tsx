import { useSpring } from "@react-spring/web";
import React from "react";

/**
 * This is a HOC that wraps a bauble and applies a string to it's visible attributes if the animation is true.
 * @param WrappedComponent 
 * @returns 
 */
const withAnimation = (WrappedComponent: React.ComponentType<any>) => {
    function AnimatedComponent(props: any) {
        const animation = props.animated;
        const { attrs, d, x: _x = null, y: _y = null, ...rest } = props;
        let x = _x, y = _y; // d is the data for the path

        if(attrs.width && attrs.height){
            //adjust rect to be centered on x,y
            x = x-attrs.width/2;
            y = y-attrs.height/2;
        }

        //need to run both so the number of hooks doesn't change
        const animatedProperties = useSpring({...attrs,d,x,y, config: { duration: 500 }}); //TODO adjust animation config.
        const nonAnimated = {...attrs,x,y,d}
         return (<WrappedComponent {...rest} attrs={(animation?animatedProperties:nonAnimated)} />)
    
    }

    return AnimatedComponent;
}

export default withAnimation;