import { Axis, AxisProps,AxisBarsProps, AxisBars } from "@figtreejs/core";
import React from "react";



interface AxisOptions extends AxisProps{
    svg:SVGElement,
    bars?:AxisBarsProps
}

export default function AxisRender(options?:AxisOptions){
    if(!options || !options.bars){
        return React.createElement(Axis, options)
    }else{
        return React.createElement(Axis, options,React.createElement(AxisBars,options.bars!))
    }
}