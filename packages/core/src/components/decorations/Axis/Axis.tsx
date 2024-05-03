import React from 'react'


import PolarAxis from './PolarAxis';
import RectangularAxis from './RectangularAxis';
import { AxisProps } from './Axis.types';
import { useFigtreeStore } from '../../../store/store';

//TODO do things to scale and allow date as origin not maxD.


export default function Axis(props: AxisProps) {

    const {layoutClass} = useFigtreeStore(state=>state.dimensions); 
    if(layoutClass === "Polar"){
        return null; //<PolarAxis {...props}/>
    }else if (layoutClass === "Rectangular"){
        return <RectangularAxis {...props}/>
    }else{
        console.warn(`Axis not supported for ${layoutClass}`);
        return null;
    }
    
}
