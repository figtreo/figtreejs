

import RectangularAxisBars from "./RectangularAxisBars";
import PolarAxisBars from "./PolarAxisBars";
import type { AxisBarsProps } from "./Axis.types";
import { layoutClass } from "../../../Layouts";

export default function AxisBars(props: AxisBarsProps) {

    const {layoutClass:layoutType} = props; 
    if(layoutType === layoutClass.Polar){
        return <PolarAxisBars {...props}/>
    }else if(layoutType === layoutClass.Rectangular){
        return <RectangularAxisBars {...props}/>
    }else{
        return null;
    }
    
}
