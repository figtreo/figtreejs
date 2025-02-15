import React from "react";

import RectangularAxisBars from "./RectangularAxisBars";

export default function AxisBars(props: any) {

    const {layoutClass} = props; 
    if(layoutClass === "Polar"){
        return null //<PolarAxisBars {...props}/>
    }else if(layoutClass === "Rectangular"){
        return <RectangularAxisBars {...props}/>
    }else{
        return null;
    }
    
}
