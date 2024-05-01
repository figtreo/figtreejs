import React from "react";
import { AxisBarsProps } from "./Axis.types";
import PolarAxisBars from "./PolarAxisBars";
import RectangularAxisBars from "./RectangularAxisBars";

export default function AxisBars(props: AxisBarsProps) {

    const {type} =props; 
 
    if(type === "Polar"){
        return null //<PolarAxisBars {...props}/>
    }else if(type === "Rectangular"){
        return <RectangularAxisBars {...props}/>
    }else{
        return null;
    }
    
}
