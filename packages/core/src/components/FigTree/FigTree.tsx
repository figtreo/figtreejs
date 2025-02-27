import React from 'react';
import { FigtreeProps } from './Figtree.types';
import { defaultInternalLayoutOptions, rectangularLayout } from '../../Layouts';
import { Branches } from '../Baubles';
import { ImmutableTree } from '../../Evo/Tree';
import { getScale } from '../../store/store';
import { extent } from 'd3-array';


/**
 * The FigTree component
 * This takes a tree and layout options. It calls the layout and handles state for this figure.
 * It also passes it's scales to it's children props as well as the edges to the branches and the nodes to the nodes.
 */
//TODO extract these from state to props?
//TODO this is different than defualt 
const defaultTree = ImmutableTree.fromNewick("((A:1,B:1):1,C:2);"); //TODO don't expose the need to pass a tree in here.

export const defaultOpts:FigtreeProps = {
    opts:defaultInternalLayoutOptions,
    width:100,
    height:100,
    layout:rectangularLayout,
    margins:{top:10,right:10,bottom:10,left:10},
    tree:defaultTree,
    children:[<Branches tree={defaultTree} filter={(n)=>true} attrs={{fill:'none',stroke:"black",strokeWidth:1}} interactions={{}}/>],
    animated:false,

}


function FigTree(props:FigtreeProps){



    const {width =defaultOpts.width,
        height =defaultOpts.width,
        margins = defaultOpts.margins,
        tree = defaultOpts.tree,
        layout = defaultOpts.layout,
        animated=defaultOpts.animated,
    } = props;
    
    const opts = props.opts?props.opts:defaultOpts.opts;
    const {rootAngle = defaultOpts.opts.rootAngle,
        rootLength = defaultOpts.opts.rootLength,
        angleRange = defaultOpts.opts.angleRange,
        showRoot = defaultOpts.opts.showRoot,
        spread = defaultOpts.opts.spread,
        fishEye = defaultOpts.opts.fishEye,
        pollard = defaultOpts.opts.pollard,
        minRadius = defaultOpts.opts.minRadius,
        invert = defaultOpts.opts.invert
    } = opts; 
 //todo this requires opts to not be undefined even though all the values are optional.

    const canvasWidth = width - margins.left - margins.right;
    const canvasHeight = height - margins.top - margins.bottom;
        
    const layoutMap = layout(tree,opts);
    const {layoutClass} = layoutMap(tree.getRoot())!;
    const [minX,maxX] = extent(tree.getNodes().map(n=>layoutMap(n)!.x));
    const [minY,maxY] = extent(tree.getNodes().map(n=>layoutMap(n)!.y));


    const dimensions = {canvasWidth,canvasHeight,domainX:[minX!,maxX!],domainY:[minY!,maxY!],layoutClass,invert,pollard,minRadius,fishEye};
    const scale = getScale(dimensions);
    let rawChildren = (props.children?props.children:defaultOpts.children) as React.ReactElement|React.ReactElement[];

    if(!Array.isArray(rawChildren)){
        rawChildren = [rawChildren];
    }
    const children = rawChildren.map((child,i)=>React.cloneElement(child,{key:i,tree:tree,layout:layoutMap,animated,scale,dimensions,layoutClass}));

    return (
                <g>
                    {/* <defs>
                        <clipPath id="clip">
                            <rect x={-margins.left} y={-margins.top} width={width} height={height} /> 
                        </clipPath>
                    </defs>                      */}
                    {/*<rect x="0" y="0" width="100%" height="100%" fill="none" pointerEvents={"visible"} onClick={()=>nodeDispatch({type:"clearSelection"})}/>*/}
                    {/* <g transform={`translate(${margins.left},${margins.top})`} clipPath={'url(#clip)'} > */}
                    <g transform={`translate(${margins.left},${margins.top})`} >
                        {children}
                    </g>
                </g>

            )
}

export default FigTree; // ; withConditionalInteractionProvider(FigTree);


// export default FigTree;


