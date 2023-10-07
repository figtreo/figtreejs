import React from 'react'

import { useLayout, useScale } from "../../../hooks";

import PolarAxis from './PolarAxis';
import RectangularAxis from './RectangularAxis';
import { AxisProps } from './Axis.types';

//TODO do things to scale and allow date as origin not maxD.


export default function Axis(props: AxisProps) {

    const {type} = useLayout(); 
 
    if(type === "Polar"){
        return <PolarAxis {...props}/>
    }else if (type === "Rectangular"){
        return <RectangularAxis {...props}/>
    }else{
        console.warn(`Axis not supported for ${type}`);
        return null;
    }
    
}
