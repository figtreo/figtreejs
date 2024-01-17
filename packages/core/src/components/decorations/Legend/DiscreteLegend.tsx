import React, {useContext,useCallback} from "react"




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

export default function DiscreteLegend(props:{scale:any,pos:{x:number,y:number},width:number,height:number,swatchSize:number,format:(s:string)=>string,columns:number,title:string} ){
    // const dispatch = useInteractionsDispatch();
    // const onHover=useCallback((value)=>()=>dispatch({type:"hover",payload:{dataType:DataType.DISCRETE,key:annotation,value:value}}))
    // const onUnHover = useCallback(()=>dispatch({type:"unhover",payload:{}}));
    // TODO safari doesn't like the legend with two columns maybe move out of svg but need to scale and position so behaves the same
    const {scale,pos,width,height,swatchSize,format,columns}=props;


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

// text is too big and this should not be clipped should be out side of clipped g

    return(
        <g transform={`translate(${pos.x},${pos.y})`}>
            <text textAnchor="start" x={0} y={0} className="legend-title">{props.title}</text>
            <g transform={`translate(0,20)`}>
                {swatchPositions.map((d,i)=>(
                    <g key={i} transform={`translate(${d.x},${d.y})`}>
                        <rect width={swatchSize} height={swatchSize} fill={d.color}/>
                        <text textAnchor="start" dominantBaseline={'center'} x={swatchSize+5} y={swatchSize} >{format(d.text)}</text>
                    </g>
                ))}
            </g>
        </g>
    )

}


