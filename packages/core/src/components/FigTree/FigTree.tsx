import type { FigtreeProps } from "./Figtree.types";
import { defaultInternalLayoutOptions, rectangularLayout } from "../../Layouts";

import { ImmutableTree } from "../../Evo/Tree";
import { getScale } from "../../store/store";
import { extent } from "d3-array";
import { unNullify } from "../../utils";
import { Bauble } from "../Baubles/Bauble";

import { ScaleContext } from "../../Context/scaleContext";
import { layoutContext } from "../../Context/layoutContext";
import { animatedContext } from "../../Context/aminatedContext";
import { setupBaubles } from "../../BaubleMakers/setUpBaubles";
import { Branches } from "../../BaubleMakers/Makers";
import { DimensionContext } from "../../Context/dimensionContext";
/**
 * The FigTree component
 * This takes a tree and layout options. It calls the layout and handles state for this figure.
 * It also passes it's scales to it's children props as well as the edges to the branches and the nodes to the nodes.
 */
//TODO extract these from state to props?
//TODO this is different than defualt
const defaultTree = ImmutableTree.fromNewick("((A:1,B:1):1,C:2);"); //TODO don't expose the need to pass a tree in here.

export const defaultOpts = {
  opts: defaultInternalLayoutOptions,
  width: 100,
  height: 100,
  layout: rectangularLayout,
  margins: { top: 10, right: 10, bottom: 10, left: 10 },
  tree: defaultTree,
  baubles: [
    Branches({
      filter: () => true,
      attrs: { stroke: "black", strokeWidth: 1 },
    }),
  ],
  animated: false,
};

//TODO animated not provided to user for each bauble

function FigTree(props: FigtreeProps) {
  const {
    width = defaultOpts.width,
    height = defaultOpts.width,
    margins = defaultOpts.margins,
    tree = defaultOpts.tree,
    layout = defaultOpts.layout,
    animated = defaultOpts.animated,
    baubles = defaultOpts.baubles,
    // margins = defaultOpts.margins
  } = props;

  const opts = props.opts ? props.opts : defaultOpts.opts;

  const {
    rootAngle = defaultOpts.opts.rootAngle,
    angleRange = defaultOpts.opts.angleRange,
    fishEye = defaultOpts.opts.fishEye,
    pollard = defaultOpts.opts.pollard,
    minRadius = defaultOpts.opts.minRadius,
    invert = defaultOpts.opts.invert,
  } = opts;
  //todo this requires opts to not be undefined even though all the values are optional.
  let canvasWidth;
  let canvasHeight;
  let { x, y } = props;

  if (x !== undefined && y !== undefined) {
    // if x and y are provide then these give the top left corner and width and height represent the whole area.
    canvasWidth = width;
    canvasHeight = height;
  } else {
    canvasWidth = width - margins.left - margins.right;
    canvasHeight = height - margins.top - margins.bottom;
    x = margins.left;
    y = margins.top;
  }

  const layoutMap = layout(tree, opts);
  const { layoutClass } = layoutMap(tree.getRoot());
  const domainX = extent(tree.getNodes().map((n) => layoutMap(n).x)).map((d) =>
    unNullify(d, `Error finding x extent from layout`),
  ) as [number, number];
  const domainY = extent(tree.getNodes().map((n) => layoutMap(n).y)).map((d) =>
    unNullify(d, `Error finding y extent from layout`),
  ) as [number, number];

  const dimensions = {
    canvasWidth,
    canvasHeight,
    domainX,
    domainY,
    layoutClass,
    invert,
    pollard,
    minRadius,
    fishEye,
    rootAngle,
    angleRange,
  };
  const scale = getScale(dimensions);

  const baubleSpecs = baubles.map((d) => setupBaubles(d, tree));

  return (
    <g>
      {/* <defs>
                        <clipPath id="clip">
                            <rect x={-margins.left} y={-margins.top} width={width} height={height} /> 
                        </clipPath>
                    </defs>                      */}
      {/*<rect x="0" y="0" width="100%" height="100%" fill="none" pointerEvents={"visible"} onClick={()=>nodeDispatch({type:"clearSelection"})}/>*/}
      {/* <g transform={`translate(${margins.left},${margins.top})`} clipPath={'url(#clip)'} > */}
      <g transform={`translate(${x},${y})`}>
        <ScaleContext.Provider value={scale}>
          <DimensionContext.Provider value={dimensions}>
            <layoutContext.Provider value={layoutMap}>
              <animatedContext.Provider value={animated}>
                {baubleSpecs.map((specs, i) => (
                  <Bauble key={specs.id ?? i} {...specs} />
                ))}
              </animatedContext.Provider>
            </layoutContext.Provider>
          </DimensionContext.Provider>
        </ScaleContext.Provider>
      </g>
    </g>
  );
}

export default FigTree;
