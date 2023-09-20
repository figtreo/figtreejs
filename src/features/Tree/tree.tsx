import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNodeCount,parseNewick, selectTree} from './treeSlice';

import { Branches, FigTree } from '../Figtree';
import { selectLineWidth, selectStroke} from '../settings/panels/appearance/appearanceSlice';
import { selectLayout } from '../settings/panels/layout/layoutSlice';
import { NormalizedTree } from './normalizedTree';
import { Tips } from './tips';
import { InternalNodes } from './nodes';
import { RectangularLayout } from '../Figtree/components/Figtree/Layouts/rectangularLayout';
import { PolarLayout } from '../Figtree/components/Figtree/Layouts/polarLayout';
import { RadialLayout } from '../Figtree/components/Figtree/Layouts/radialLayout';

const margins = {top:10,bottom:10,left:10,right:10};
//todo make zoom and expansion based on number of tips
const zoomFactor = 5;

function scrollReducer(state:{top:number,left:number}, action:"scroll") {
  switch (action) {
    case "scroll":
      default:
        throw new Error("unknown action in tree component");
  }

}
export function Tree({panelRef}:any){

  // resizing work

 // a little magic here to make the panel resize and pass the size to the tree
    //min width and height for svg
    const minWidth = 400;
    const minHeight = 400;
    const padding = 10; //svg a little smaller 

    
    const [isResizing, setIsResizing] = useState(true);

    const [treeSize, setTreeSize] = useState({baseWidth:minWidth,baseHeight:minHeight});
    const [scrolled, setScrolled] = useState({top:0.5,left:0.5});

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
                    {baseHeight:height,baseWidth:width}
                );
            }
        },
        [isResizing,panelRef]
    );

    

    useEffect(() => {
        window.addEventListener("resize", resize);
        window.addEventListener("resize", startResizing);
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("resize", stopResizing);
        };
    }, [resize, startResizing, stopResizing]);


 useEffect(() => {
  const height = Math.max(minHeight,panelRef.current.getBoundingClientRect().height-padding)
                const width = Math.max(minWidth,panelRef.current.getBoundingClientRect().width-padding)
                setTreeSize(
                    {baseHeight:height,baseWidth:width}
                );
       
    }, [panelRef]);


    const dispatch = useAppDispatch();
    const tree = new NormalizedTree(useAppSelector(selectTree))
    const nodes = useAppSelector(selectNodeCount);

    const lineWidth = useAppSelector(selectLineWidth);
    const branchColour = useAppSelector(selectStroke);

    const {expansion,zoom,layout,rootAngle,rootLength,angleRange,showRoot,spread,curvature,fishEye}= useAppSelector(selectLayout);

    const layoutOpts = {
      rootAngle,rootLength,angleRange,showRoot,spread,curvature,fishEye
    }
   
    const treeLayout = layout==="rectangular"?RectangularLayout:layout==="circular"?PolarLayout:RadialLayout;
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


    const zoomed = [treeSize.baseWidth*zoom*zoomFactor,treeSize.baseHeight*zoom*zoomFactor]

    const height = treeSize.baseHeight+(treeSize.baseHeight*expansion*zoomFactor)+zoomed[1]*2;
    const width = treeSize.baseWidth+zoomed[0]*2

//TODO fix zooming to always respect the center of the svg as displayed.
    const  handleScroll =    useCallback(()=> {

       const maxLeftScroll = width-panelRef.current.getBoundingClientRect().width;
        const maxTopScroll = height-panelRef.current.getBoundingClientRect().height;


        setScrolled({top:panelRef.current.scrollTop/maxTopScroll,left:panelRef.current.scrollLeft/maxLeftScroll})}
      ,[width,height,panelRef])

    useEffect(() => {
      let panel:any;
      if(panelRef.current){
        panelRef.current.addEventListener('scroll',handleScroll)
        panel = panelRef.current;
      }
      return ()=>{panel.removeEventListener('scroll',handleScroll)}
    })

    useEffect(() => {
      if(panelRef.current){ // set scroll to middle of svg when left and top is 0.5
        panelRef.current.scrollLeft = (width-panelRef.current.getBoundingClientRect().width)*scrolled.left; //if changed set to scrollLeft/(panelRef.current.getBoundingClientRect().width)
        panelRef.current.scrollTop = (height-panelRef.current.getBoundingClientRect().height)*scrolled.top;
      }
    },[zoom,expansion])



// TODO animate svg changes
    if(nodes>0){
      return(


        <svg width={width} height={height} > 
        <FigTree   width={width} height={height} tree={tree} layout={treeLayout} margins={margins} opts={layoutOpts}>
           <Branches attrs={{strokeWidth:lineWidth,stroke:branchColour}} />
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

