import React from 'react'


import PolarAxis from './PolarAxis';
import RectangularAxis from './RectangularAxis';
import { AxisProps } from './Axis.types';

//TODO do things to scale and allow date as origin not maxD.


export default function Axis(props: AxisProps) {

    const {type} = props; 
    if(type === "Polar"){
        return null; //<PolarAxis {...props}/>
    }else if (type === "Rectangular"){
        return <RectangularAxis {...props}/>
    }else{
        console.warn(`Axis not supported for ${type}`);
        return null;
    }
    
}
