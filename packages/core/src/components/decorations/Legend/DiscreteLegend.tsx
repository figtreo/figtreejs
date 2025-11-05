import { ScaleOrdinal } from "d3-scale"
import React from "react"




/**
 * ContinuousLegend
 *
 * A color legend that accept continuous and sequential color scales. It is modeled after the color legends
 * at https://observablehq.com/@d3/color-legend
 *
 * @param props
 * @param scale
 * @param pos
 * @param width
 * @param height
 * @param title
 * @return {(number|*)[]|*}
 * @constructor
 */

interface DiscreteLegendProps{
    scale: ScaleOrdinal<string,string>,
    pos:{x:number,y:number},
    width:number,
    height:number
    swatchSize:number,
    format:(s:string)=>string,
    fontSize:number,
    columns:number,
    title:string
}

export function DiscreteLegend(props:DiscreteLegendProps ){
    // const dispatch = useInteractionsDispatch();
    // const onHover=useCallback((value)=>()=>dispatch({type:"hover",payload:{dataType:DataType.DISCRETE,key:annotation,value:value}}))
    // const onUnHover = useCallback(()=>dispatch({type:"unhover",payload:{}}));
    // TODO safari doesn't like the legend with two columns maybe move out of svg but need to scale and position so behaves the same
    const {scale,pos,width,height,swatchSize,format,columns,fontSize}=props;


    const numEntries = scale.domain().length
    const maxEntriesPerColumn = Math.ceil(numEntries/columns)
    const columnStarts = []
    const xGap = width/columns
    const yGap = height/maxEntriesPerColumn
    for(let i = 0; i < columns; i++){
        columnStarts.push(i*xGap)
    }
    const rowStarts = []
    for(let i = 0; i < maxEntriesPerColumn; i++){
        rowStarts.push(i*yGap)
    }
    const swatchPositions = []
    for(let i = 0; i < numEntries; i++){
        swatchPositions.push({x:columnStarts[i%columns],y:rowStarts[i%maxEntriesPerColumn],text:scale.domain()[i],color:scale(scale.domain()[i])})
    }

// add a font size option with title being bigger than swatch text
// add swatch size option too.

    return(
        <g transform={`translate(${pos.x},${pos.y})`}>
            <text textAnchor="start" x={0} y={0} className="legend-title" fontSize={`${fontSize+4}px`}>{props.title}</text>
            <g transform={`translate(0,20)`}>
                {swatchPositions.map((d,i)=>(
                    <g key={i} transform={`translate(${d.x},${d.y})`}>
                        <rect width={swatchSize} height={swatchSize} fill={d.color} />
                        <text textAnchor="start"  dominantBaseline={'middle'} x={swatchSize+5} dy={swatchSize/2} fontSize={`${fontSize}px`}>{format(d.text)}</text>
                    </g>
                ))}
            </g>
        </g>
    )

}


