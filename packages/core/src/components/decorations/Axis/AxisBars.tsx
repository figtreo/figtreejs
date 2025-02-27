import React from "react";

import RectangularAxisBars from "./RectangularAxisBars";
import PolarAxisBars from "./PolarAxisBars";

export default function AxisBars(props: any) {

    const {layoutClass} = props; 
    if(layoutClass === "Polar"){
        return <PolarAxisBars {...props}/>
    }else if(layoutClass === "Rectangular"){
        return <RectangularAxisBars {...props}/>
    }else{
        return null;
    }
    
}
