import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNodeCount,parseNewick, selectTree, Node} from './treeSlice';

import styles from './tree.module.css';
import { Branches, FigTree, Nodes } from '../Figtree';
import { selectLineWidth } from '../settings/appearance/appearanceSlice';
import { selectLayout } from '../settings/layout/layoutSlice';
import { NormalizedTree } from './normalizedTree';
const margins = {top:10,bottom:10,left:10,right:10};
export function Tree(){

    const dispatch = useAppDispatch();
    const tree = new NormalizedTree(useAppSelector(selectTree))
    const nodes = useAppSelector(selectNodeCount);

    const lineWidth = useAppSelector(selectLineWidth);

    const expansion = useAppSelector(selectLayout).expansion;
   
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

    if(nodes>0){
      return(
        <svg width={600} height={height}>
        <FigTree   width={600-margins.left-margins.right} height={height-margins.bottom-margins.top} tree={tree} layout={"rectangular"} margins={margins}>
              <Nodes.Circle filter={(n:Node)=>tree.getChildCount(n)===0} attrs={{r:5,fill:"black"}} hoveredAttrs={{r:10,fill:'#ae7e56',strokeWidth:2}} selectedAttrs={{fill:"#c0625e"}}/>
              {/* <Nodes.Coalescent /> */}
            <Branches.Rectangular attrs={{strokeWidth:lineWidth,stroke:"black"}} />
        </FigTree>
        </svg>
      )
    }else{
      return (
        <div>
        <p>Paste newick string</p>
      </div>
      )
    }


}

