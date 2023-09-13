import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNodeCount,parseNewick, selectTree, Node} from './treeSlice';

import styles from './tree.module.css';
import { Branches, FigTree, Nodes } from '../Figtree';
import { selectLineWidth, selectStroke} from '../settings/panels/appearance/appearanceSlice';
import { selectLayout } from '../settings/panels/layout/layoutSlice';
import { NormalizedTree } from './normalizedTree';
import { Tips } from './tips';
import { InternalNodes } from './nodes';
import { PolarBranchPath, RectangularBranchPath } from '../Figtree/components/Figtree/Baubles/Branches/Shapes/pathGenerators';
import { RectangularLayout } from '../Figtree/components/Figtree/Layouts/rectangularLayout';
import { PolarLayout } from '../Figtree/components/Figtree/Layouts/polarLayout';
const margins = {top:10,bottom:10,left:10,right:10};
export function Tree({panelRef}:any){

  // resizing work

 // a little magic here to make the panel resize and pass the size to the tree
    //min width and height for svg
    const minWidth = 400;
    const minHeight = 400;
    const padding = 10; //svg a little smaller 

    
    const [isResizing, setIsResizing] = useState(true);

    const [treeSize, setTreeSize] = useState({width:minWidth,baseHeight:minHeight});

    const startResizing = useCallback((mouseDownEvent: any) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: any) => {
            if (isResizing && panelRef.current != null) {
                
                const height = Math.max(minHeight,panelRef.current.getBoundingClientRect().height-padding)
                const width = Math.max(minWidth,panelRef.current.getBoundingClientRect().width-padding)
                setTreeSize(
                    {baseHeight:height,width:width}
                );
            }
        },
        [isResizing]
    );

    

    useEffect(() => {
        window.addEventListener("resize", resize);
        window.addEventListener("resize", startResizing);
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("resize", stopResizing);
        };
    }, [resize, stopResizing]);


 useEffect(() => {
  const height = Math.max(minHeight,panelRef.current.getBoundingClientRect().height-padding)
                const width = Math.max(minWidth,panelRef.current.getBoundingClientRect().width-padding)
                setTreeSize(
                    {baseHeight:height,width:width}
                );
       
    }, []);


    const dispatch = useAppDispatch();
    const tree = new NormalizedTree(useAppSelector(selectTree))
    const nodes = useAppSelector(selectNodeCount);

    const lineWidth = useAppSelector(selectLineWidth);
    const branchColour = useAppSelector(selectStroke);

    const {expansion,curvature,layout}= useAppSelector(selectLayout);
   
    const treeLayout = layout==="rectangular"?RectangularLayout:PolarLayout;
    //
    useEffect(() => {
      const handlePaste = (event: any) => {
        dispatch(parseNewick(event.clipboardData.getData('text')));
      }
      window.addEventListener('paste', handlePaste)
      return () => {
        window.removeEventListener('paste', handlePaste)
      };
    })

    const height = treeSize.baseHeight+(treeSize.baseHeight*expansion*5);


//TODO allow to specify a generic Branches with attrs etc. that gets populated by Figtree.

// TODO animate svg changes
    if(nodes>0){
      return(
        <svg width={treeSize.width} height={height} > 
        <FigTree   width={treeSize.width-margins.left-margins.right} height={height-margins.bottom-margins.top} tree={tree} layout={treeLayout} margins={margins}>
           <Branches curvature={curvature} attrs={{strokeWidth:lineWidth,stroke:branchColour}} />
            <Tips tree={tree}/>
            <InternalNodes tree={tree}/>
        </FigTree>
        </svg>
      )
    }else{
      return (
        <div>
        <p>Paste newick string</p>
        <p> ((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);</p>
      </div>
      )
    }


}

