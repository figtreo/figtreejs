import React from 'react';
import { FigtreeProps } from './Figtree.types';
import { defaultInternalLayoutOptions, rectangularLayout } from '../../Layouts';
import { Branches } from '../Baubles';
import { useFigtreeStore } from '../../store/store';
import { ImmutableTree } from '../../Evo/Tree';



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
    layout:rectangularLayout,
    margins:{top:10,right:10,bottom:10,left:10},
    tree:ImmutableTree.fromNewick("((A:1,B:1):1,C:2);"),
    children:[<Branches filter={(n)=>true} attrs={{fill:'none',stroke:"black",strokeWidth:1}} interactions={{}}/>],
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
    
    const {rootAngle = defaultOpts.opts.rootAngle,
        rootLength = defaultOpts.opts.rootLength,
        angleRange = defaultOpts.opts.angleRange,
        showRoot = defaultOpts.opts.showRoot,
        spread = defaultOpts.opts.spread,
        pointOfInterest = defaultOpts.opts.pointOfInterest,
        fishEye = defaultOpts.opts.fishEye,
        pollard = defaultOpts.opts.pollard,
        minRadius = defaultOpts.opts.minRadius,
        invert = defaultOpts.opts.invert
    } = props.opts; //todo this requires opts to not be undefined even though all the values are optional.

    const setScale = useFigtreeStore((state)=>state.setScale);
    const setAnimated = useFigtreeStore((state)=>state.setAnimated);
    const setTree = useFigtreeStore((state)=>state.setTree);
    const setLayout = useFigtreeStore((state)=>state.setLayout);
    const setDimensions = useFigtreeStore((state)=>state.setDimensions);
    
    const canvasWidth = width - margins.left - margins.right;
    const canvasHeight = height - margins.top - margins.bottom;

    const point = pointOfInterest?pointOfInterest: {x:(margins.left+canvasWidth)/2,y:(margins.top+height)/2};

        
    const children = props.children?props.children:defaultOpts.children;
   
    const layoutMap = layout(tree);
    const {maxX,maxY,layoutClass} = layoutMap.get(tree.getRoot())!;
    //TODO hook to get scales
    setScale(maxX,maxY,canvasWidth,canvasHeight,layoutClass);
    setAnimated(animated);
    setTree(tree);
    setLayout(layoutMap);
    setDimensions(canvasWidth,canvasHeight,[0,maxX])
    


    
    //state gives us a nicer api where the data don't need to be passed to the subcomponents of the figure and the subcomponents can be added by user with JSX
    //todo check clip path is working where expected.
    return (
                <g>
                                <defs>
                                <clipPath id="clip">
                                    <rect x={-margins.left} y={-margins.top} width={width} height={height} /> 
                                </clipPath>
                                </defs>

                       
                        {/*<rect x="0" y="0" width="100%" height="100%" fill="none" pointerEvents={"visible"} onClick={()=>nodeDispatch({type:"clearSelection"})}/>*/}
                        <g transform={`translate(${margins.left},${margins.top})`} clipPath={'url(#clip)'} >
                            {children}
                        </g>
                </g>

            )
}

export default FigTree; // ; withConditionalInteractionProvider(FigTree);


// export default FigTree;


