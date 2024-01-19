import React from 'react';
import { TanglegramProps } from "./Tanglegram.types";
import { FigTree } from '../FigTree';
import { Connections } from './Connections';

export default function Tanglegram(props:TanglegramProps){
    const {trees,layout,opts,gap,baubles,totalWidth,totalHeight,margins,animated,connections} = props;
    if(Array.isArray(layout) && layout.length!==trees.length){
        throw new Error("If layout is an array it must be the same length as trees")
    }
    if(Array.isArray(opts) && opts.length!==trees.length){
        throw new Error("If opts is an array it must be the same length as trees")
    }
    if(Array.isArray(gap) && gap.length!==trees.length-1){
        throw new Error("If gap is an array it must have a length one less than trees")
    }
    const widths = trees.map((tree,index)=>((totalWidth-margins.left-margins.right)/trees.length)-getGap(gap,index));
    const figureMargins={top:0,left:0,right:0,bottom:0} // TODO execpt figure margins

    const height=totalHeight-margins.top-margins.bottom-figureMargins.top-figureMargins.bottom;
    
    const vertices = trees.map((tree,index)=>getLayout(layout,index).layout(tree,{height,width:widths[index],...getOptions(opts,index),invert:trees.length===2&&index===1}));
    const figureStarts = trees.map((tree,index)=>(totalWidth-margins.left-margins.right)*index/trees.length)
    const figureEnds = figureStarts.map((start,index)=>(start+widths[index]));
    const figurePositions=vertices.map((v,index)=>({start:figureStarts[index],end:figureEnds[index]})) 
    
    return (
    
    <g transform={`translate(${margins.left},${margins.top})`} >
        <Connections filter={()=>true} trees={trees} figurePositions={figurePositions} vertices={vertices}  {...connections}/>
        {trees.map((tree,index)=>{
            return (
            <g transform={`translate(${(totalWidth-margins.left-margins.right)*index/trees.length},${0})`}>
                <FigTree margins={figureMargins} animated={animated} tree={tree} layout={getLayout(layout,index)} opts={getOptions(opts,index)} width={widths[index]} height={height} vertices={vertices[index]} key={index}>
                    {baubles}
                </FigTree>
            </g>
            )
        })}
        </g>
    )

}

function getOptions(opts:TanglegramProps['opts'],index:number){
    if(Array.isArray(opts)){
        return opts[index];
    }
    return opts;
}
function getLayout(layout:TanglegramProps['layout'],index:number){
    if(Array.isArray(layout)){
        return layout[index];
    }
    return layout;
}
function getGap(gap:TanglegramProps['gap'],index:number){
    if(Array.isArray(gap)){
        return gap[index];
    }
    return gap;
}