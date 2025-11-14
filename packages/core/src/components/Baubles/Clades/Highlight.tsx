import { layoutClass } from "../../../Layouts";
import {arc as arcgen} from "d3-shape"
import { Clade, withClades } from "../../HOC/withClades";

import { BasePath, BaseRectangle} from '../Shapes';
import type { PolarVertex, simplePolarVertex } from "../../../Layouts/functional/rectangularLayout";
import { notNull } from "../../../utils";
import { ScaleContext } from "../../../Context/scaleContext";
import { layoutContext } from "../../../Context/layoutContext";
import { animatedContext } from "../../../Context/aminatedContext";
import { useContext } from "react";
import { RectProps } from "../Shapes/Rectangle";
import { PathProps } from "../Shapes/Branch";
const arc = arcgen();
//TODO add padding
// const padding = 10;
/**
 * A highlight around a clade of interest. 
 * For Polar layouts this will be a shaded arc.
 * In a rectangular figure this will be a rectangle around the clade
 */

type BaseHighlightAttrs ={
    d?:string,
    x?:number,
    y?:number,
    width?:number,
    height?:number,
    transform?:string,
    stroke?:string,
    stokeWidth?:number,
    fill?:string,
    animated:boolean
}

type Injected  ={
    d?:string,
    x?:number,
    y?:number,
    width?:number,
    height?:number,
    transform?:string,
    animated:boolean
}
type HighlightAttrs = Omit<BaseHighlightAttrs,keyof Injected>

function Highlight(props:HighlightAttrs & {clade:Clade}){
           const {clade,...rest} = props
        const scale = useContext(ScaleContext);
        const layout = useContext(layoutContext);
        const animated = useContext(animatedContext);
        
        const {root,leftMost,rightMost,mostDiverged} = clade
        const v = scale(layout(root));
        const lmv = scale(layout(leftMost)) // left most child v (top of highlight)
        const rmv = scale(layout(rightMost)) // right most child v (top of highlight)
        const mdv = scale(layout(mostDiverged)) // right most child v (top of highlight)
        const {layoutClass:layoutType} = layout(root);
        if(layoutType ===layoutClass.Rectangular){

            const width = mdv.x - v.x;
            const height = Math.abs(lmv.y-rmv.y)
            return (<BaseRectangle 
                width={width}
                height={height}
                x={v.x}
                y={Math.min(lmv.y,rmv.y)} 
                {...rest}
                animated={animated}
                />)
        }else if(layoutType ===layoutClass.Polar){
            // if we are here then scale returned a polar vertex
                const origin = scale({x:0,y:0}) as simplePolarVertex; 
                const transform =  `translate(${origin.x},${origin.y})` 
                const minR =  (v as PolarVertex).r; //padding?
                const maxR = (mdv as PolarVertex).r;
                const maxTheta=(lmv as PolarVertex).theta;
                const minTheta = (rmv as PolarVertex).theta;
                const shape = arc( {
                    innerRadius:minR, 
                    outerRadius:maxR+5,
                    startAngle: minTheta +Math.PI/2,
                    endAngle: maxTheta + Math.PI/2
                }
            )
            notNull(shape,`Error making arc shape for Clade Highlight`)
        
                return <BasePath d={shape} transform={transform}  {...rest} animated={animated}/> //transform={transform}
            
        }else{
            return null
        }
}

export const Highlights = withClades(Highlight)