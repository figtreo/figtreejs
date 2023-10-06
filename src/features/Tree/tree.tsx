import { useCallback, useEffect, useRef, useState, createContext } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNodeCount, parseNewick, selectTree } from './treeSlice';

import { selectLineWidth, selectStroke } from '../settings/panels/appearance/appearanceSlice';
import { selectLayout, setPointOfInterest } from '../settings/panels/layout/layoutSlice';
import { Tips } from './tips';
import { InternalNodes } from './nodes';

import { TipLabels } from './tipLabel';
import { NodeLabels } from './nodeLabels';
import { BranchLabels } from './branchLabels';

import { FigTree, NormalizedTree, Branches, RectangularLayout, PolarLayout, RadialLayout, NodeRef, Axis } from '@figtreejs/core'
import { useAreaSelection } from '../../app/area-selection';
import { select, selectAll } from "d3-selection"
import { selectHeader, setSelectionMode, setSelectionRoot } from '../Header/headerSlice';
import { selectAxis } from '../settings/panels/axis/axisSlice';
import AxisElement from './AxisElement';

const margins = { top: 10, bottom: 80, left: 50, right: 100 };
//todo make zoom and expansion based on number of tips
const zoomFactor = 5;


export function Tree({ panelRef }: any) {

  const dispatch = useAppDispatch();
  const tree = new NormalizedTree(useAppSelector(selectTree).tree)
  const header = useAppSelector(selectHeader);

  //selection Box work //https://codesandbox.io/s/billowing-lake-rzhid4?file=/src/App.tsx
  const svgRef = useRef<SVGSVGElement>(null);;
  //https://codesandbox.io/s/react-area-selection-hook-slggxd?file=/src/area-selection.ts
  const selection = useAreaSelection({ container: panelRef }); // maybe move this to library so it's possible to select data in little figs
  const [brushedNodeIds, setBrushedNodeIds] = useState<string[]>([]);

  //todo only fire on selection release
  //todo include taxa and nodes

  //get selection 




  // todo only run this on mouseup after selection
  // TODO note that this counts a branch as selected if it's box is crossed not its path.
  useEffect(() => {
    if (svgRef.current && selection) {
      const branches = select(svgRef.current)
        .select('g')
        .selectAll(".branch-layer")
        .selectAll("path")
        .select(function (d, i, n) {
          const el = this as Element;
          const a = el.getBoundingClientRect()
          const b = selection
          const selected = !(
            a.y + a.height < b.y ||
            a.y > b.y + b.height ||
            a.x + a.width < b.x ||
            a.x > b.x + b.width
          )
          return selected ? this : null
        })

      // // .attr("id")
      // .attr("stroke", "blue")

      const taxa = select(svgRef.current)
        .select('g')
        .selectAll(".node-label-layer")
        .selectAll(".node-label")
        .select(function (d, i, n) {
          const el = this as Element;
          const a = el.getBoundingClientRect()
          const b = selection
          const selected = !(
            a.y + a.height < b.y ||
            a.y > b.y + b.height ||
            a.x + a.width < b.x ||
            a.x > b.x + b.width
          )
          return selected ? this : null
        })
      const out: Set<string> = new Set();
      branches.each(function (d, i, b) {
        const id = select(this).attr("node-id")
        out.add(id);
        //todo tree get tmrca of nodes.
      })

      taxa.each(function (d, i, b) {
        const id = select(this).attr("node-id")
        out.add(id);
        //todo tree get tmrca of nodes.
      })

      setBrushedNodeIds([...out]);
    }
  }, [selection, svgRef])

  // resizing work

  // a little magic here to make the panel resize and pass the size to the tree
  //min width and height for svg
  const minWidth = 400;
  const minHeight = 400;
  const padding = 10; //svg a little smaller 


  const [isResizing, setIsResizing] = useState(true);

  const [treeSize, setTreeSize] = useState({ baseWidth: minWidth, baseHeight: minHeight });
  const [scrolled, setScrolled] = useState({ top: 0.5, left: 0.5 });

  const startResizing = useCallback((mouseDownEvent: any) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: any) => {
      if (isResizing && panelRef.current != null) {

        const height = Math.max(minHeight, panelRef.current.getBoundingClientRect().height - padding)
        const width = Math.max(minWidth, panelRef.current.getBoundingClientRect().width - padding)
        setTreeSize(
          { baseHeight: height, baseWidth: width }
        );
      }
    },
    [isResizing, panelRef]
  );

  const getSelectedRoot = () => {
    if (brushedNodeIds.length === 0) {
      dispatch(setSelectionRoot(undefined))
    } else {
      const nodes = brushedNodeIds.map(id => tree.getNode(id));
      if (nodes.length === 1) {
        dispatch(setSelectionRoot(nodes[0].id))
        return;
      }
      const mrca = tree.getMRCA(nodes);
      if (mrca === undefined) {
        throw new Error("Could not find mrca")
      }
      dispatch(setSelectionRoot(mrca.id))
    }
  }
  const clearSelectionRoot = () => {
    dispatch(setSelectionRoot(undefined));
  }
  useEffect(() => {
    window.addEventListener('mouseup', getSelectedRoot)
    // window.addEventListener('mousedown',clearSelectionRoot)
    return () => {
      window.removeEventListener('mouseup', getSelectedRoot)
      // window.removeEventListener('mousedown',clearSelectionRoot) //TODO maybe not on window? also add command to not clear
    }
  }, [brushedNodeIds])

  useEffect(() => {

  })

  useEffect(() => {
    window.addEventListener("resize", resize);
    window.addEventListener("resize", startResizing);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", stopResizing);
    };
  }, [resize, startResizing, stopResizing]);


  useEffect(() => {
    const height = Math.max(minHeight, panelRef.current.getBoundingClientRect().height - padding)
    const width = Math.max(minWidth, panelRef.current.getBoundingClientRect().width - padding)
    setTreeSize(
      { baseHeight: height, baseWidth: width }
    );

  }, [panelRef]);



  const nodes = useAppSelector(selectNodeCount);

  const lineWidth = useAppSelector(selectLineWidth);
  const branchColour = useAppSelector(selectStroke);

  const { expansion, zoom, layout, rootAngle, rootLength, angleRange, showRoot, spread, curvature, fishEye, pointOfInterest,animate } = useAppSelector(selectLayout);

  const layoutOpts = {
    rootAngle, rootLength, angleRange, showRoot, spread, curvature, fishEye, pointOfInterest, nodeDecorations: header.SelectNodeDecorations
  }


  const treeLayout = layout === "rectangular" ? RectangularLayout : layout === "circular" ? PolarLayout : RadialLayout;
  //
  const handlePaste = (event: any) => {
    dispatch(parseNewick(event.clipboardData.getData('text')));
  }
  useEffect(() => {

    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    };
  })


  const zoomed = [treeSize.baseWidth * zoom * zoomFactor, treeSize.baseHeight * zoom * zoomFactor]

  const height = treeSize.baseHeight + (treeSize.baseHeight * expansion * zoomFactor) + zoomed[1] * 2;
  const width = treeSize.baseWidth + zoomed[0] * 2

  const handleScroll = useCallback(() => {
    let left = 0;
    let top = 0;
    if (width <= panelRef.current.getBoundingClientRect().width) {
      left = 0.5;
    } else {
      const maxLeftScroll = width - panelRef.current.getBoundingClientRect().width;
      left = panelRef.current.scrollLeft / maxLeftScroll
    }

    if (height <= panelRef.current.getBoundingClientRect().height) {
      top = 0.5;
    } else {
      const maxTopScroll = height - panelRef.current.getBoundingClientRect().height;
      top = panelRef.current.scrollTop / maxTopScroll
    }
    setScrolled({ top, left })
  }
    , [width, height, panelRef])

  useEffect(() => {
    let panel: any;
    if (panelRef.current) {
      panelRef.current.addEventListener('scroll', handleScroll)
      panel = panelRef.current;
    }
    return () => { panel.removeEventListener('scroll', handleScroll) }
  })

  useEffect(() => {

    if (panelRef.current) { // set scroll to middle of svg when left and top is 0.5
      panelRef.current.scrollLeft = (width - panelRef.current.getBoundingClientRect().width) * scrolled.left; //if changed set to scrollLeft/(panelRef.current.getBoundingClientRect().width)
      panelRef.current.scrollTop = (height - panelRef.current.getBoundingClientRect().height) * scrolled.top;
    }
  })

  const handlePointOfInterest = useCallback((e: any) => {
    if (svgRef.current !== null && e.metaKey) {
      let point = svgRef.current.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      const ctm = svgRef.current.getScreenCTM();
      if (ctm !== null) {
        point = point.matrixTransform(ctm.inverse());
        dispatch(setPointOfInterest({ x: point.x, y: point.y }))
      }
    }

  }, [svgRef, dispatch])


  useEffect(() => {
    let svg: any;

    if (svgRef.current) {
      svg = svgRef.current;
      svgRef.current.addEventListener('mousemove', handlePointOfInterest)
    }
    return () => svg?.removeEventListener('mousemove', handlePointOfInterest)

  })


  const selectedNodes = new Set();
  const selectedTaxa = new Set();
  if (header.SelectionRoot) {
    switch (header.SelectionMode) {
      case 'Node':
        selectedNodes.add(header.SelectionRoot);
        break;
      case 'Taxa':
        for (const node of tree.getTips(tree.getNode(header.SelectionRoot))) {
          selectedTaxa.add(node.id);
        }
        break;
      case 'Clade':
        for (const node of tree.getPostorderNodes(tree.getNode(header.SelectionRoot))) {
          selectedNodes.add(node.id);
        }
        break;
    }
  }

  if (nodes > 0) {
    return (
      <div>



        <svg id={"treeContainer"} width={width} height={height} ref={svgRef}>
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood flood-color="#959ABF" result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <FigTree animated={animate} width={width} height={height} tree={tree} layout={treeLayout} margins={margins} opts={layoutOpts}>
            <AxisElement />
            <Branches attrs={{ strokeWidth: lineWidth + 4, stroke: "#959ABF", strokeLinecap: "round", strokeLinejoin: "round" }} filter={(n: NodeRef) => selectedNodes.has(n.id)} />
            <Branches attrs={{ strokeWidth: lineWidth, stroke: branchColour }} filter={(n: NodeRef) => true} />
            <BranchLabels tree={tree} />
            <Tips tree={tree} />
            <TipLabels tree={tree} attrs={{ filter: (n: NodeRef) => selectedTaxa.has(n.id) ? 'url(#solid)' : null }} />
            <InternalNodes tree={tree} />
            <NodeLabels tree={tree} />
          </FigTree>
        </svg>

      </div>

    )
  } else {
    return (
      <div>
        <p>Paste newick string</p>
        <p> ((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);</p>
      </div>
    )
  }


}

