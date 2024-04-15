import React from 'react';
import { LayoutContext, TreeContext,AnimationContext,ScaleContext, scaleContextType } from '../../Context/context';
import { NodeRef } from '../../Evo/Tree/Tree.types';
import { RectangularLayout } from '../../Layouts/rectangularLayout';
import { FigtreeProps } from './Figtree.types';
import { NormalizedTree } from '../../Evo/Tree/normalizedTree';
import {Branches, PolarLayout, defaultInternalLayoutOptions} from '../../index';
import { extent, max } from 'd3-array';
import { miniSerializeError } from '@reduxjs/toolkit';



/**
 * The FigTree component
 * This takes a tree and layout options. It calls the layout and handles state for this figure.
 * It also passes it's scales to it's children props as well as the edges to the branches and the nodes to the nodes.
 */
//TODO extract these from state to props?
//TODO this is different than defualt 
export const defaultOpts:FigtreeProps = {
    opts:defaultInternalLayoutOptions,
    width:100,
    height:100,
    layout:RectangularLayout,
    margins:{top:10,right:10,bottom:10,left:10},
    tree:NormalizedTree.fromNewick("((A:1,B:1):1,C:2);"),
    children:[<Branches filter={(n)=>true} attrs={{fill:'none',stroke:"black",strokeWidth:1}} interactions={{}}/>],
    animated:false,
    tipSpace:(n:NodeRef,n2:NodeRef)=>1,
   
}

function FigTree(props:FigtreeProps){


    const {width =defaultOpts.width,
        height =defaultOpts.width,
        margins = defaultOpts.margins,
        tree = defaultOpts.tree,
        layout = defaultOpts.layout,
        animated=defaultOpts.animated,
    } = props;
    let {vertices} = props;
    
    const {rootAngle = defaultOpts.opts.rootAngle,
        rootLength = defaultOpts.opts.rootLength,
        angleRange = defaultOpts.opts.angleRange,
        curvature = defaultOpts.opts.curvature,
        showRoot = defaultOpts.opts.showRoot,
        spread = defaultOpts.opts.spread,
        pointOfInterest = defaultOpts.opts.pointOfInterest,
        fishEye = defaultOpts.opts.fishEye,
        cartoonedNodes: nodeDecorations = defaultOpts.opts.cartoonedNodes,
        pollard = defaultOpts.opts.pollard,
        padding = defaultOpts.opts.padding,
        tipSpace = defaultOpts.opts.tipSpace,
        minRadius = defaultOpts.opts.minRadius,
        invert = defaultOpts.opts.invert
    } = props.opts; //todo this requires opts to not be undefined even though all the values are optional.

    const w = width - margins.left - margins.right;
    const h = height - margins.top - margins.bottom;
    const point = pointOfInterest?pointOfInterest: {x:(margins.left+w)/2,y:(margins.top+height)/2};
    //handle defaults once not here and in layout methods
    if(!vertices){
        vertices = layout.layout(tree,{showRoot,width:w,height:h,rootLength,rootAngle,angleRange,curvature,spread,pollard,padding,tipSpace,fishEye,pointOfInterest:point,cartoonedNodes: nodeDecorations,invert,minRadius});
    }
        
    const children = props.children?props.children:defaultOpts.children;
    const maxD = tree.getHeight(tree.root!)+rootLength!;
    // console.log(maxD)
    // console.log(maxD*pollard!)
    const scaleContext:scaleContextType = {width:w,height:h,domain:[pollard!*maxD,maxD],padding,maxR : max(vertices.allIds,d=>vertices!.byId[d].r),theta :extent(vertices.allIds,d=>vertices!.byId[d].theta!) as [number,number]};

    //context gives us a nicer api where the data don't need to be passed to the subcomponents of the figure and the subcomponents can be added by user with JSX
    //todo check clip path is working where expected.
    return (
                <TreeContext.Provider value={tree}>
                    <LayoutContext.Provider value={vertices}>
                        <AnimationContext.Provider value={animated}>
                            <ScaleContext.Provider value={scaleContext}>
                                <defs>
                                <clipPath id="clip">
                                    <rect x={-margins.left} y={-margins.top} width={width} height={height} /> 
                                </clipPath>
                                </defs>

                       
                        {/*<rect x="0" y="0" width="100%" height="100%" fill="none" pointerEvents={"visible"} onClick={()=>nodeDispatch({type:"clearSelection"})}/>*/}
                        <g transform={`translate(${margins.left},${margins.top})`} clipPath={'url(#clip)'} >
                            {children}
                        </g>
                            </ScaleContext.Provider>
                        </AnimationContext.Provider>
                    </LayoutContext.Provider>
                </TreeContext.Provider>
            )
}

export default FigTree; // ; withConditionalInteractionProvider(FigTree);
// export default FigTree;


