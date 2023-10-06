import React from "react";
import { useLayout } from "../../../hooks";
import { AxisBarsProps } from "./Axis.types";
import PolarAxisBars from "./PolarAxisBars";
import RectangularAxisBars from "./RectangularAxisBars";

export default function AxisBars(props: AxisBarsProps) {

    const {type} = useLayout(); 
 
    if(type === "Polar"){
        return <PolarAxisBars {...props}/>
    }else{
        return <RectangularAxisBars {...props}/>
    }
    
}
