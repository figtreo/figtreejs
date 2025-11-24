import { useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector, useAppDispatch, getColorScale } from "../../app/hooks"

import {
  selectAppearance,
  selectLineWidth,
} from "../settings/panels/appearance/appearanceSlice"
import {
  selectLayout,
  setPointOfInterest,
} from "../settings/panels/layout/layoutSlice"
import { selectLabelState } from "../settings/panels/label/labelSlice";

import {
  FigTree,
  Branches,
  HighlightClades,
  postOrderIterator,
  tipIterator,
  ImmutableTree,
  rectangularLayout,
  polarLayout,
  layoutClass,
  radialLayout,
  CartoonClades,
  type NodeRef,
  BaseAnnotationType,
} from "@figtreejs/core"

import {
  selectSelectionMode,
  selectSelectionRoot,
  setSelectionRoot,
} from "../header/header-slice"

import {
  CARTOON_ANNOTATION,
  COLOUR_ANNOTATION,
  HILIGHT_ANNOTATION,
} from "../../app/constants"
import { selectTree } from "../../app/hooks"
import { ActionCreators } from "redux-undo"
import { addScaleFromAnnotation } from "../settings/panels/colorScales/colourSlice"
import { selectTitle } from "../settings/panels/title/titleSlice"
import { saveSvg } from "../../app/utils"
import { selectTanglegram } from "../settings/panels/tanglegram/tangleSlice"
import { setTree } from "./tree-slice"
import { max } from "d3-array"
import {  createLabelsComponent } from "./labels/create-label";
import { BranchLabels } from "@figtreejs/core";
import { NodeLabels } from "@figtreejs/core";
import { selectShapeState } from "../settings/panels/shapes/shapeSlice";
import { createNodeComponent } from "./createNodes";

const margins = { top: 80, bottom: 80, left: 50, right: 100 }
//todo make zoom and expansion based on number of tips
const zoomFactor = 5

export function Tree({ panelRef }: any) {
  const dispatch = useAppDispatch()
  const selectionRoot = useAppSelector(selectSelectionRoot)
  const selectionMode = useAppSelector(selectSelectionMode)
  const title = useAppSelector(selectTitle)
  const { activated: tangle } = useAppSelector(selectTanglegram)

  const {
    expansion,
    zoom,
    layout,
    rootAngle,
    rootLength,
    angleRange,
    showRoot,
    spread,
    curvature,
    fishEye,
    pointOfInterest,
    animate,
    pollard,
    minR,
    invert,
  } = useAppSelector(selectLayout)

  let tree = useAppSelector(selectTree);
  // if root length then we'll add it to the tree here
  if(rootLength>0){
    const maxDivergence = max(tree.getExternalNodes(),n=>tree.getDivergence(n));
    tree = tree.setLength(tree.getRoot(),rootLength*maxDivergence!);
  }

  //selection Box work //https://codesandbox.io/s/billowing-lake-rzhid4?file=/src/App.tsx
  const svgRef = useRef<SVGSVGElement>(null)
  // //https://codesandbox.io/s/react-area-selection-hook-slggxd?file=/src/area-selection.ts
  // const selection = useAreaSelection({ container: panelRef }) // maybe move this to library so it's possible to select data in little figs
  // const [brushedNodeIds, setBrushedNodeIds] = useState<string[]>([])

  // //todo only fire on selection release
  //todo include taxa and nodes

  //get selection

  // todo only run this on mouseup after selection
  // TODO note that this counts a branch as selected if it's box is crossed not its path.
//   useEffect(() => {
//     if (svgRef.current && selection) {
//       const branches = select(svgRef.current)
//         .select("g")
//         .selectAll(".branch-layer")
//         .selectAll("path")
//         .select(function () {
//           const el = this as Element
//           const a = el.getBoundingClientRect()
//           const b = selection
//           const selected = !(
//             a.y + a.height < b.y ||
//             a.y > b.y + b.height ||
//             a.x + a.width < b.x ||
//             a.x > b.x + b.width
//           )
//           return selected ? this : null
//         })

//       // // .attr("id")
//       // .attr("stroke", "blue")

//       const taxa = select(svgRef.current)
//         .select("g")
//         .selectAll(".node-label-layer")
//         .selectAll(".node-label")
//         .select(function () {
//           const el = this as Element
//           const a = el.getBoundingClientRect()
//           const b = selection
//           const selected = !(
//             a.y + a.height < b.y ||
//             a.y > b.y + b.height ||
//             a.x + a.width < b.x ||
//             a.x > b.x + b.width
//           )
//           return selected ? this : null
//         })
//       const out: Set<string> = new Set()
//       branches.each(function () {
//         const id = select(this).attr("node-id")
//         out.add(id)
//         //todo tree get tmrca of nodes.
//       })
// // TODO broken since nodes don't keep id in svg anymore
//       taxa.each(function () {
//         const id = select(this).attr("node-id")
//         out.add(id)
//         //todo tree get tmrca of nodes.
//       })

//       setBrushedNodeIds([...out])
//     }
//   }, [selection, svgRef])

  // resizing work

  // a little magic here to make the panel resize and pass the size to the tree
  //min width and height for svg
  const minWidth = 400
  const minHeight = 400
  const padding = 10 //svg a little smaller

  const [isResizing, setIsResizing] = useState(true)

  const [treeSize, setTreeSize] = useState({
    baseWidth: minWidth,
    baseHeight: minHeight,
  })
  const [scrolled, setScrolled] = useState({ top: 0.5, left: 0.5 })

  const startResizing = useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    () => {
      if (isResizing && panelRef.current != null) {
        const height = Math.max(
          minHeight,
          panelRef.current.getBoundingClientRect().height - padding,
        )
        const width = Math.max(
          minWidth,
          panelRef.current.getBoundingClientRect().width - padding,
        )
        setTreeSize({ baseHeight: height, baseWidth: width })
      }
    },
    [isResizing, panelRef],
  )

  // const getSelectedRoot = () => {
  //   if (brushedNodeIds.length === 0) {
  //     dispatch(setSelectionRoot(undefined))
  //   } else {
  //     const nodes = brushedNodeIds
  //       .map((id) => tree.getNode(parseInt(id)))
  //       .filter((n) => n !== undefined)
  //     if (nodes.length === 1) {
  //       dispatch(setSelectionRoot(nodes[0].number))
  //       return
  //     }
  //     if (nodes.length > 0) {
  //       const mrca = tree.getMRCA(nodes)
  //       if (mrca === undefined) {
  //         throw new Error("Could not find mrca")
  //       }
  //       dispatch(setSelectionRoot(mrca.number))
  //     }
  //   }
  // }
  // const clearSelectionRoot = () => {
  //   dispatch(setSelectionRoot(undefined))
  // }
  // useEffect(() => {
  //   window.addEventListener("mouseup", getSelectedRoot)
  //   // window.addEventListener('mousedown',clearSelectionRoot)
  //   return () => {
  //     window.removeEventListener("mouseup", getSelectedRoot)
  //     // window.removeEventListener('mousedown',clearSelectionRoot) //TODO maybe not on window? also add command to not clear
  //   }
  // }, [brushedNodeIds])


  useEffect(() => {
    window.addEventListener("resize", resize)
    window.addEventListener("resize", startResizing)
    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("resize", stopResizing)
    }
  }, [resize, startResizing, stopResizing])

  useEffect(() => {
    const height = Math.max(
      minHeight,
      panelRef.current.getBoundingClientRect().height - padding,
    )
    const width = Math.max(
      minWidth,
      panelRef.current.getBoundingClientRect().width - padding,
    )
    setTreeSize({ baseHeight: height, baseWidth: width })
  }, [panelRef])

  const lineWidth = useAppSelector(selectLineWidth)
  const branchSettings = useAppSelector(selectAppearance)

  const branchFiller = (n: NodeRef): string => {

    return tree.getAnnotation(n, COLOUR_ANNOTATION,'none') as string;
    // const cartoon = tree.getAnnotation(n, CARTOON_ANNOTATION,'none');
    // return cartoon!=='none' && custom !== 'none' ? (custom as string) : "none"
  }



  //TODO mover to branch componet like tips
  const branchColorScale = useAppSelector((state) =>
    getColorScale(state, branchSettings.colourBy),
  )

  function branchColourur(n: NodeRef): string {
    if (branchSettings.colourBy === "User selection") {
      return  !tree.hasAnnotation(n,COLOUR_ANNOTATION) ? branchSettings.colour : tree.getAnnotation(n, COLOUR_ANNOTATION) as string
    } else {
      if(!tree.hasAnnotation(n,branchSettings.colourBy)){
        return branchSettings.colour
      }
      return branchColorScale(
        tree.getAnnotation(n, branchSettings.colourBy),
      ) as string
    }
  }

  let treeLayout;
  
    switch (layout) {
      case layoutClass.Rectangular:
        treeLayout =  rectangularLayout;
        break;
      case layoutClass.Polar:
        treeLayout =  polarLayout;
        break;
      case layoutClass.Radial:
        treeLayout = radialLayout;
        break;
      default:
        throw new Error(`layout Option ${layout} Not implemented!`)
    }
  
   
  //
  const handlePaste = (event: any) => {
    const tree = ImmutableTree.fromString(event.clipboardData.getData("text"), {
      parseAnnotations: true,
    })
    dispatch(
      setTree(
        tree
      ),
    )
    for (const annotation of tree.getAnnotationKeys()) {
      const data = tree.getAnnotationSummary(annotation)
      const type = tree.getAnnotationType(annotation)
      if (
        type === BaseAnnotationType.DISCRETE ||
        type === BaseAnnotationType.NUMERICAL
      ) {
        dispatch(addScaleFromAnnotation(data))
      }
    }
  }
  useEffect(() => {
    window.addEventListener("paste", handlePaste)
    return () => {
      window.removeEventListener("paste", handlePaste)
    }
  })

  //Keyboard shortcuts here
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "d" && event.metaKey) {
      event.preventDefault()
      dispatch(setTree(tree.orderNodesByDensity(true)));
    }
    if (event.key === "u" && event.metaKey) {
      dispatch(setTree(tree.orderNodesByDensity(false)));
    }
    if (event.key === "z" && event.metaKey) {
      dispatch(ActionCreators.undo())
    }
    if (event.key === "y" && event.metaKey) {
      event.preventDefault()
      dispatch(ActionCreators.redo())
    }
    if (event.key === "s" && event.metaKey) {
      if (svgRef.current && title) {
        const name = title.text.length > 0 ? title.text : "tree"
        saveSvg(svgRef.current, `${name}.svg`)
      }
      event.preventDefault()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })

  const zoomed = [
    treeSize.baseWidth * zoom * zoomFactor,
    treeSize.baseHeight * zoom * zoomFactor,
  ]

  const height =
    treeSize.baseHeight +
    treeSize.baseHeight * expansion * zoomFactor +
    zoomed[1] * 2
  const width = treeSize.baseWidth + zoomed[0] * 2

  const handleScroll = useCallback(() => {
    let left = 0
    let top = 0
    if (width <= panelRef.current.getBoundingClientRect().width) {
      left = 0.5
    } else {
      const maxLeftScroll =
        width - panelRef.current.getBoundingClientRect().width
      left = panelRef.current.scrollLeft / maxLeftScroll
    }

    if (height <= panelRef.current.getBoundingClientRect().height) {
      top = 0.5
    } else {
      const maxTopScroll =
        height - panelRef.current.getBoundingClientRect().height
      top = panelRef.current.scrollTop / maxTopScroll
    }
    setScrolled({ top, left })
  }, [width, height, panelRef])

  useEffect(() => {
    let panel: any
    if (panelRef.current) {
      panelRef.current.addEventListener("scroll", handleScroll)
      panel = panelRef.current
    }
    return () => {
      panel.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    if (panelRef.current) {
      // set scroll to middle of svg when left and top is 0.5
      panelRef.current.scrollLeft =
        (width - panelRef.current.getBoundingClientRect().width) * scrolled.left //if changed set to scrollLeft/(panelRef.current.getBoundingClientRect().width)
      panelRef.current.scrollTop =
        (height - panelRef.current.getBoundingClientRect().height) *
        scrolled.top
    }
  }, [width, height])

  const handlePointOfInterest = useCallback(
    (e: any) => {
      if (svgRef.current !== null && e.metaKey) {
        let point = svgRef.current.createSVGPoint()
        point.x = e.clientX
        point.y = e.clientY
        const ctm = svgRef.current.getScreenCTM()
        if (ctm !== null) {
          point = point.matrixTransform(ctm.inverse())
          dispatch(setPointOfInterest({ x: point.x, y: point.y }))
        }
      }
    },
    [svgRef, dispatch],
  )

  useEffect(() => {
    let svg: any

    if (svgRef.current) {
      svg = svgRef.current
      svgRef.current.addEventListener("mousemove", handlePointOfInterest)
    }
    return () => svg?.removeEventListener("mousemove", handlePointOfInterest)
  })

  const selectedNodes = new Set()
  const selectedTaxa = new Set()
  if (selectionRoot) {
    switch (selectionMode) {
      case "Node":
        selectedNodes.add(selectionRoot)
        break
      case "Taxa":
        for (const node of tipIterator(tree, tree.getNode(selectionRoot))) {
          selectedTaxa.add(node.number)
        }
        break
      case "Clade":
        for (const node of postOrderIterator(
          tree,
          tree.getNode(selectionRoot),
        )) {
          selectedNodes.add(node.number)
        }
        break
    }
  }


   const bLabelSettings = useAppSelector(selectLabelState('branch'));
   const bLabelFill = useAppSelector( (state)=>getColorScale(state,bLabelSettings.colourBy));

   const nodeLabelSettings = useAppSelector(selectLabelState('node'));
   const nodeLabelFill = useAppSelector( (state)=>getColorScale(state,bLabelSettings.colourBy));
   
   const tipLabelSettings = useAppSelector(selectLabelState('tip'));
   const tipLabelFill = useAppSelector( (state)=>getColorScale(state,bLabelSettings.colourBy));

  const nodeSettings =  useAppSelector(selectShapeState("node"));
  const nodeFillScale = useAppSelector( (state)=>getColorScale(state,nodeSettings.colourBy));


  const tipSettings =  useAppSelector(selectShapeState("tip"));
  const tipFillScale = useAppSelector( (state)=>getColorScale(state,tipSettings.colourBy));

  const tipBackgroundSettings =  useAppSelector(selectShapeState("tipBackground"));
  const tipBackgroundFillScale = useAppSelector( (state)=>getColorScale(state,tipBackgroundSettings.colourBy));







  // --- No hooks below here!!!! ------------ //

  // if (tree.getCurrentIndex() > -1) {
  if (tree.getNodeCount() > 1) {


    const layoutOpts = {
      rootAngle,
      rootLength,
      angleRange,
      showRoot,
      spread,
      fishEye :{...pointOfInterest,scale:fishEye},
      
      pollard,
      padding: 50,
      minRadius: minR,
      invert,
    }

    const dontShow = new Set();
    const highlightedNodes =  tree
      .getInternalNodes()
      .filter((n) => tree.hasAnnotation(n, HILIGHT_ANNOTATION) )
    const cartoonNodes = tree
      .getInternalNodes()
      .filter((n) => tree.hasAnnotation(n, CARTOON_ANNOTATION))
    // hide these branches/nodes
      for(const n of cartoonNodes){
        for(const node of postOrderIterator(tree,n)){
                if(node!==n){
                  dontShow.add(node)
                }
            }
      }

      const highlights = HighlightClades({nodes:highlightedNodes,attrs:{
              fill: (n: NodeRef) =>
                tree.getAnnotation(n, HILIGHT_ANNOTATION) as string,
              opacity: 0.4,
            }})
      const cartoons = CartoonClades({nodes:cartoonNodes,attrs:{ fill: branchFiller,
              strokeWidth: lineWidth,
              stroke: branchColourur,
            }})
    

      const figureElements = [
      // <AxisElement key={0} />,
      // ...ornaments,
      // <Legends key={ornaments.length + 1} />,
      highlights,
      cartoons,
      Branches({attrs:{
          fill: "none",
          strokeWidth: lineWidth + 4,
          stroke: "#959ABF",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        },
        filter:(n: NodeRef) => selectedNodes.has(n.number),
        curvature:curvature}),
      // highlight selected branches
       Branches({attrs:{
          fill: branchFiller,
          strokeWidth: lineWidth,
          stroke: branchColourur,
          cursor:'pointer'
          },
          interactions:{
            onClick:(n)=>dispatch(setSelectionRoot(n.number))
          },
          filter:(n:NodeRef)=>!dontShow.has(n),
          curvature:curvature}),
        // useBranchLabelComponent({filter:(n:NodeRef)=>!dontShow.has(n),tree}),// tODO
        // TipsBackground({filter:(n:NodeRef)=>!dontShow.has(n),tree}),// tODO
        
      //   TipLabels({
      //     tree,
      //       filter:(n:NodeRef)=>!dontShow.has(n),
      //       attrs:{
      //       filter: (n: NodeRef) =>
      //         selectedTaxa.has(n.number)  ? "url(#solid)" : null,
      //     }
      //   }),
      // Tips({
      //   tree,
      //   filter:(n:NodeRef)=>!dontShow.has(n)
      // }),
      // InternalNodes({
      //      filter:(n:NodeRef)=>!dontShow.has(n)
      // }),
      // NodeLabels({ // todo
      //   filter:(n:NodeRef)=>!dontShow.has(n), tree
      // })
    ]


    // add optional Baubles
    //BranchLabels 
   
    // order is from the ground up 
    if(bLabelSettings.activated){
      //add it
      const bLabels = createLabelsComponent({tree,settings:bLabelSettings,fillColorScale:bLabelFill,factory:BranchLabels})
      figureElements.push(bLabels)
    }
    if(tipLabelSettings.activated){
      //add it
      const tipLabels = createLabelsComponent({tree,settings:tipLabelSettings,fillColorScale:tipLabelFill,factory:NodeLabels,filter:n=>tree.isExternal(n)})
      figureElements.push(tipLabels)
    }
    if(nodeLabelSettings.activated){
      //add it
      const nodeLabels = createLabelsComponent({tree,settings:nodeLabelSettings,fillColorScale:nodeLabelFill,factory:NodeLabels,filter:n=>!tree.isExternal(n)})
      figureElements.push(nodeLabels)
    }
    if(tipBackgroundSettings.activated){
      const nodeShape = createNodeComponent({tree,settings:tipBackgroundSettings,fillColorScale:tipBackgroundFillScale,filter:n=>tree.isExternal(n)})
      figureElements.push(nodeShape)
    }

    if(nodeSettings.activated){
      const nodeShape = createNodeComponent({tree,settings:nodeSettings,fillColorScale:nodeFillScale,filter:n=>!tree.isExternal(n)})
      figureElements.push(nodeShape)
    }    
    if(tipSettings.activated){
      const nodeShape = createNodeComponent({tree,settings:tipSettings,fillColorScale:tipFillScale,filter:n=>tree.isExternal(n)})
      figureElements.push(nodeShape)
    }    



    return (
      <div>
        <svg
          id={"treeContainer"}
          width={width}
          height={height}
          ref={svgRef}
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          }}
        >
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood floodColor="#959ABF" result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width={width} height={height} onClick={()=>dispatch(setSelectionRoot(undefined))} fill={'none'} pointerEvents={"visible"}/>
          {title.activated && (
            <text
              fontSize={title.fontSize}
              fill={title.color}
              fontWeight={title.fontWeight}
              x={margins.left + title.x}
              y={margins.top + title.y}
            >
              {title.text}
            </text>
          )}

          {tangle && false ? null : (
            // <Tanglegram trees={[...tree.getTrees()]} layout={RectangularLayout} opts={layoutOpts} gap={20} totalWidth={width} totalHeight={height} margins={margins} animated={animate}>
            //   {figureElements}
            //   </Tanglegram>
            <FigTree
              animated={animate}
              width={width}
              height={height}
              tree={tree}
              layout={treeLayout}
              margins={margins}
              opts={layoutOpts}
              baubles={figureElements}
            />
              
          )}
        </svg>
      </div>
    )
  } else {
    return (
      <div>
        <p>Try this newick string</p>
        <p>
          {" "}
          ((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);
        </p>
      </div>
    )
  }
}
