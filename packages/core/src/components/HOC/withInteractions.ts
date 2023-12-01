const withInteraction = (WrappedComponent: React.ComponentType<any>) => {
    function AnimatedComponent(props: any) {
        const animation = useAnimation()
        const {attrs,d=null}=props; // d is the data for the path
    
        let visibleProperties;
        if(animation){
         visibleProperties = useSpring({...attrs,d, config: { duration: 500 }});
        }
         else{
             visibleProperties = {...attrs,d}
         }
         
         return (<WrappedComponent {...props} {...visibleProperties} />)
    
    }

    return AnimatedComponent;
}