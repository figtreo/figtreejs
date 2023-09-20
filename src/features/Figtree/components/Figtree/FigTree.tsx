import React from 'react';
import { LayoutContext, TreeContext } from '../../Context/context';
import Branches from './Baubles/Branches/Branches';
import withConditionalInteractionProvider from '../HOC/withConditionalInteractionProvider';
import { NodeRef, NormalizedTree } from '../../../Tree/normalizedTree';

import { AbstractLayout } from './Layouts/LayoutInterface';

interface layoutOptions{

    rootLength: number,
    rootAngle: number,
    angleRange: number,
    tipSpace: (tip1: NodeRef, tip2: NodeRef) => number, //Todo make arguements nodeRefs
    curvature: number,
    showRoot: boolean,
    spread: number
    pointOfInterest: { x: number; y: number; }|null ,
    fishEye: number;
}


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

function FigTree(props:{width:number,height:number,layout:typeof AbstractLayout,tree:NormalizedTree,margins:Margins,children:React.ReactNode,opts:layoutOptions}){
    const {width,height,margins,tree,layout} = props;
    
    const {rootAngle,rootLength,angleRange,curvature,showRoot,spread,pointOfInterest,fishEye} = props.opts; //useAppSelector(selectLayout) // TODO move this to the app not lib.
   
    const w = width - margins.left - margins.right;
    const h = height - margins.top - margins.bottom;
    const point = pointOfInterest?pointOfInterest: {x:(margins.left+w)/2,y:(margins.top+height)/2};

    const vertices = layout.layout(tree,{showRoot,width:w,height:h,rootLength,rootAngle,angleRange,curvature,spread,tipSpace:(tip1:NodeRef,tip2:NodeRef)=>1,fishEye,pointOfInterest:point});
        
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


FigTree.defaultProps= {
    width: undefined, /** Width of component */
    height: undefined,
    layout: "rectangular",
    children: [Branches],
    pos:{x:10,y:10},
};

