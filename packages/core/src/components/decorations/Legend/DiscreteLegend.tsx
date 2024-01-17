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
    return(
        <foreignObject x={pos.x} y={pos.y} width={width} height={height}>
            <p >{props.title}</p>
            <div style={{display: "flex", alignItems: "center", minHeight: "33px",font: "12px sans-serif"}}>

                
                <div style={{width: "100%", columns: `${columns}`}}>
                    {scale.domain().sort().map((value:string) => {
                        return(
                            <div key={value}  style={{cursor:"pointer",
                                                      breakInside: "avoid",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      paddingBottom: "1px"
                                                        }} 
                                                        // onMouseEnter={onHover(value)}
                                                        //     onMouseLeave={()=>onUnHover()}
                                                        //     onClick={()=>onClick(value)} 
                                                            >
                                <div style={{width: `${swatchSize}px`,
                                  height: `${swatchSize}px`,
                                  margin: "0 0.5em 0 0",
                                  background:`${scale(value)}`,
                                  }}/>
                                  <div style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: `calc(100% - ${swatchSize}px - 0.5em)`}}
                                  >{format(value)}</div>
                            </div>)
                    }
                    )}
                </div>
            </div>
        </foreignObject>
    )

}


