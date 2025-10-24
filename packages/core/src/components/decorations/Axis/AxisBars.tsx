import React from "react";

import RectangularAxisBars from "./RectangularAxisBars";
import PolarAxisBars from "./PolarAxisBars";
import { AxisBarsProps } from "./Axis.types";

export default function AxisBars(props: AxisBarsProps) {

    const {layoutClass} = props; 
    if(layoutClass === "Polar"){
        return <PolarAxisBars {...props}/>
    }else if(layoutClass === "Rectangular"){
        return <RectangularAxisBars {...props}/>
    }else{
        return null;
    }
    
}
