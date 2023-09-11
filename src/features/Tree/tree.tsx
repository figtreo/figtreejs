import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNodeCount,parseNewick, selectTree, Node} from './treeSlice';

import styles from './tree.module.css';
import { Branches, FigTree, Nodes } from '../Figtree';
import { selectLineWidth, selectStroke} from '../settings/panels/appearance/appearanceSlice';
import { selectLayout } from '../settings/panels/layout/layoutSlice';
import { NormalizedTree } from './normalizedTree';
import { Tips } from './tips';
import { InternalNodes } from './nodes';
const margins = {top:10,bottom:10,left:10,right:10};
export function Tree(){

    const dispatch = useAppDispatch();
    const tree = new NormalizedTree(useAppSelector(selectTree))
    const nodes = useAppSelector(selectNodeCount);

    const lineWidth = useAppSelector(selectLineWidth);
    const branchColour = useAppSelector(selectStroke);

    const expansion = useAppSelector(selectLayout).expansion;
   


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

    const height = 400+(400*expansion);



// TODO animate svg changes
    if(nodes>0){
      return(
        <svg width={600} height={height}> 
        <FigTree   width={600-margins.left-margins.right} height={height-margins.bottom-margins.top} tree={tree} layout={"rectangular"} margins={margins}>
            <Branches.Rectangular attrs={{strokeWidth:lineWidth,stroke:branchColour}} />
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

