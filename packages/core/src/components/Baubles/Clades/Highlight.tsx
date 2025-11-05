import React from 'react'

import { layoutClass } from "../../../Layouts";
import {arc as arcgen} from "d3-shape"
import { InternalCladePropType } from './makeClade';
import { Attrs } from '../types';
import { BasePath, BaseRectangle} from '../Shapes';
const arc = arcgen();
//TODO add padding
// const padding = 10;
/**
 * A highlight around a clade of interest. 
 * For Polar layouts this will be a shaded arc.
 * In a rectangular figure this will be a rectangle around the clade
 */
export function Highlight<A extends Attrs>(props:InternalCladePropType<A>){
           const {clade,applyAttrInteractions,scale,layout,...rest} = props
           const {root,leftMost,rightMost,mostDiverged} = clade
        const v = scale(layout(root));
        const {attrs,interactions} = applyAttrInteractions(root)
        const lmv = scale(layout(leftMost)) // left most child v (top of highlight)
        const rmv = scale(layout(rightMost)) // right most child v (top of highlight)
        const mdv = scale(layout(mostDiverged)) // right most child v (top of highlight)
        const {layoutClass:layoutType} = layout(root);
        if(layoutType ===layoutClass.Rectangular){

           
            const width = mdv.x - v.x;
            const height = Math.abs(lmv.y-rmv.y)

            return (<BaseRectangle 
                interactions = {interactions} 
                attrs={{...attrs,width,height}}
                x={v.x}
                y={Math.min(lmv.y,rmv.y)} 
                {...rest}
                />)
        }else if(layoutType ===layoutClass.Polar){
                const origin = scale({x:0,y:0});
                const transform =  `translate(${origin.x},${origin.y})` 
                // const scaleR = scaleLinear().domain([0,scaleContext.maxR!]).range([0,verticies.axisLength!])
                const minR =  v.r!; //padding?
                const maxR = mdv.r!;
                //TODO check this
                const maxTheta=lmv.theta!;
                const minTheta = rmv.theta!;
                const shape = arc( {
                    innerRadius:minR, 
                    outerRadius:maxR+5,
                    startAngle: minTheta +Math.PI/2,
                    endAngle: maxTheta + Math.PI/2
                }
            )!
        
                return <BasePath d={shape} attrs={attrs} transform={transform} interactions={interactions} {...rest}/> //transform={transform}
            
        }else{
            return null
        }



}