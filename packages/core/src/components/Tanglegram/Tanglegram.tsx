import React from 'react';
import { TanglegramProps } from "./Tanglegram.types";
import { FigTree } from '../FigTree';

export default function Tanglegram(props:TanglegramProps){
    const {trees,layout,opts,gap,children,totalWidth,totalHeight,margins,animated} = props;
    if(Array.isArray(layout) && layout.length!==trees.length){
        throw new Error("If layout is an array it must be the same length as trees")
    }
    if(Array.isArray(opts) && opts.length!==trees.length){
        throw new Error("If opts is an array it must be the same length as trees")
    }
    if(Array.isArray(gap) && gap.length!==trees.length-1){
        throw new Error("If gap is an array it must have a length one less than trees")
    }
    const widths = trees.map((tree,index)=>(totalWidth-margins.left-margins.right)-getGap(gap,index));
    const height=totalHeight-margins.top-margins.bottom;
    

    const vertices = trees.map((tree,index)=>getLayout(layout,index).layout(tree,{height,width:widths[index],...getOptions(opts,index)}));
// lines between trees will need to adjust for the gap etc.
    const figureMargins={top:0,left:0,right:0,bottom:0}
    return (
        <g transform={`translate(${margins.left},${margins.top})`} >
            
        {trees.map((tree,index)=>{
            return <FigTree margins={figureMargins} animated={animated} tree={tree} layout={getLayout(layout,index)} opts={getOptions(opts,index)} width={widths[index]} height={height} vertices={vertices[index]} key={index}>
                {children}
                </FigTree>
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