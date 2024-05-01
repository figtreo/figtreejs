import { useSpring } from "@react-spring/web";
import React from "react";
import { useFigtreeStore } from "../../store";

/**
 * This is a HOC that wraps a bauble and applies a string to it's visible attributes if the animation is true.
 * @param WrappedComponent 
 * @returns 
 */
const withAnimation = (WrappedComponent: React.ComponentType<any>) => {
    function AnimatedComponent(props: any) {
        const animation = useFigtreeStore(state=>state.animated);
        let {attrs,d=null,x=null,y=null,...rest}=props; // d is the data for the path
        let animatableProperties;

        if(attrs.width && attrs.height){
            //adjust rect to be centered on x,y
            x = x-attrs.width/2;
            y = y-attrs.height/2;
        }

        if(animation){
         animatableProperties = useSpring({...attrs,d,x,y, config: { duration: 500 }}); //TODO adjust animation config.
        }
         else{
             animatableProperties = {...attrs,x,y,d}
         }
         return (<WrappedComponent {...rest} attrs={animatableProperties} />)
    
    }

    return AnimatedComponent;
}

export default withAnimation;