import React from "react";
import { AxisBarsProps } from "./Axis.types";
import PolarAxisBars from "./PolarAxisBars";
import RectangularAxisBars from "./RectangularAxisBars";
import { useFigtreeStore } from "../../../store/store";

export default function AxisBars(props: AxisBarsProps) {

    const {layoutClass} = useFigtreeStore(state=>state.dimensions); 
 console.log("AxisBars",props)
    if(layoutClass === "Polar"){
        return null //<PolarAxisBars {...props}/>
    }else if(layoutClass === "Rectangular"){
        return <RectangularAxisBars {...props}/>
    }else{
        return null;
    }
    
}
