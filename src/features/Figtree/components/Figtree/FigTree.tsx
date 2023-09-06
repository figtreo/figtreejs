import React,{useMemo,useReducer} from 'react';
import {scaleLinear} from "d3-scale";
import { Vertices, layoutFunctions } from './layoutFunctions';

import { LayoutContext, ScaleContext, TreeContext } from '../../Context/context';
import { extent } from 'd3-array';
import Branches from './Baubles/Branches/Branches';
import { TreeState } from '../../../Tree/treeSlice';
import withConditionalInteractionProvider from '../HOC/withConditionalInteractionProvider';
import { NormalizedTree } from '../../../Tree/normalizedTree';
/**
 * The FigTree component
 * This takes a tree and layout options. It calls the layout and handles state for this figure.
 * It also passes it's scales to it's children props as well as the edges to the branches and the nodes to the nodes.
 */
//TODO extract these from state to props?
interface Margins{
    top:number,
    bottom:number,
    left:number,
    right:number,
}

function FigTree(props:{width:number,height:number,layout:"rectangular"|"circular"|"equalAngle",tree:NormalizedTree,margins:Margins,children:React.ReactNode}){
    const {width,height,margins,tree} = props;
   
    const layout = layoutFunctions[props.layout]
    const vertices = layout(tree)
        
    const xdomain = extent(Object.values(vertices),d=>d.x);
    const ydomain =  extent(Object.values(vertices),d=>d.y);
    if(xdomain[0]===undefined || xdomain[1]===undefined || ydomain[0]===undefined || ydomain[1]===undefined){
        throw new Error("undefined domain");
    }

    const scales=useMemo(()=>{return setUpScales(width,height,margins,xdomain,ydomain)},[width,height,margins,xdomain,ydomain]);

    const scaledVertices:{[key:string]:{id:string,x:number,y:number}}= {};
    for(const [key,value] of Object.entries(vertices)){
        scaledVertices[key] = {id:value.id,x:scales.x(value.x),y:scales.y(value.y)};
    }
    //context gives us a nicer api where the data don't need to based to the subcomponents of the figure
    return (
                <TreeContext.Provider value={tree}>
                    <LayoutContext.Provider value={scaledVertices}>
                       
                        {/*<rect x="0" y="0" width="100%" height="100%" fill="none" pointerEvents={"visible"} onClick={()=>nodeDispatch({type:"clearSelection"})}/>*/}
                        <g transform={`translate(${margins.left},${margins.top})`}>
                            {props.children}
                        </g>
                    </LayoutContext.Provider>
                </TreeContext.Provider>
            )
}

export default withConditionalInteractionProvider(FigTree);
// export default FigTree;

function setUpScales(width:number,height:number,margins:Margins,xdomain:[number,number],ydomain:[number,number]){


    // padding
    ydomain[0]-=1;
    ydomain[1]+=1;

    const x = scaleLinear()
        .domain(xdomain)
        .range([0, width - margins.left -margins.right]);

    const y = scaleLinear()
        .domain(ydomain)
        .range([0,height - margins.top-margins.bottom]);
    return {x,y};
}

FigTree.defaultProps= {
    width: undefined, /** Width of component */
    height: undefined,
    layout: "rectangular",
    children: [Branches],
    pos:{x:10,y:10},
};

