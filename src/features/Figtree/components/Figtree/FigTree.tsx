import React,{useMemo,useReducer} from 'react';
import {scaleLinear} from "d3-scale";
import { Vertices, layoutFunctions } from './layoutFunctions';

import { LayoutContext, ScaleContext, TreeContext } from '../../Context/context';
import { extent } from 'd3-array';
import Branches from './Baubles/Branches/Branches';
import { TreeState } from '../../../Tree/treeSlice';
import withConditionalInteractionProvider from '../HOC/withConditionalInteractionProvider';
import { NormalizedTree } from '../../../Tree/normalizedTree';
import { useAppSelector } from '../../../../app/hooks';
import { selectLayout } from '../../../settings/panels/layout/layoutSlice';

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
    
    const {rootAngle,rootLength,angleRange} = useAppSelector(selectLayout)
   
    const layout = layoutFunctions[props.layout]

    const w = width - margins.left - margins.right;
    const h = height - margins.top - margins.bottom;
    const vertices = layout(tree,w,h,rootLength,rootAngle,angleRange);
        
    //context gives us a nicer api where the data don't need to be passed to the subcomponents of the figure and the subcomponents can be added by user with JSX
    return (
                <TreeContext.Provider value={tree}>
                    <LayoutContext.Provider value={vertices}>
                       
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

