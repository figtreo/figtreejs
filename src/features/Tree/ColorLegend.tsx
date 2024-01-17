import { ContinuousLegend, DiscreteLegend } from "@figtreejs/core";
import { getColorScale, useAppSelector } from "../../app/hooks";
import { colorScale, selectColorableAttributes } from "../Settings/panels/colorScales/colourSlice";


// const attributes = useAppSelector(selectColorableAttributes)
// //get scale data for scales with legends
//     const colorScales = useAppSelector(state=>state.colorScales.byId)
//     const activatedLegends = attributes.filter(attribute=>colorScales[attribute].legend.activated).map(attribute=>colorScales[attribute])

function ColorLegend(props:{colorScale:colorScale}){
    

    const scale =  useAppSelector( (state)=>getColorScale(state,props.colorScale.attribute));
    const {columns,title,width,height,x,y} = props.colorScale.legend;
    if(props.colorScale.type==="discrete"){
        return <DiscreteLegend scale={scale} 
        swatchSize={10} 
        columns={columns?columns:1}
        format={(s:string)=>s}
        pos={{x,y}}
        width={width}
        height={height}
        title={title?title:""}/>
    }else if(props.colorScale.type==="continuous"){
            return null
    }

}

export function Legends(props:{}){
    const attributes = useAppSelector(selectColorableAttributes)
    const colorScales = useAppSelector(state=>state.colorScales.byId)
    const activatedLegends = attributes.filter(attribute=>colorScales[attribute].legend.activated).map(attribute=>colorScales[attribute])

    return (
        <g>
            {activatedLegends.map((legend,i)=><ColorLegend key={i} colorScale={legend} x={i*110} y={10}/>)}
        </g>
    )

}