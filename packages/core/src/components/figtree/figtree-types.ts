import type { InternalBaubleOptions } from "../../bauble-makers/set-up-baubles";
import type { ImmutableTree, NodeRef, Tree } from "../../evo/tree";
import type { FunctionalVertex, layoutClass } from "../../layouts/types";
import type { layoutType, scaleType } from "../../store/store";
import type { AxisProps } from "../decorations";

export interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export type fishEyeOptions = { x: number; y: number; scale: number };

export interface dimensionType extends layoutOptions {
  canvasWidth: number;
  canvasHeight: number;
  domainX: [number, number];
  domainY: [number, number];
  layoutClass: layoutClass;
  invert: boolean;
  pollard: number;
  minRadius: number;
  fishEye: fishEyeOptions;
  rootAngle: number;
  angleRange: number;
}

export interface layoutOptions {
  rootLength?: number;
  rootAngle?: number;
  angleRange?: number;
  showRoot?: boolean;
  spread?: number;
  fishEye?: fishEyeOptions;
  pollard: number;
  invert?: boolean;
  minRadius?: number;
  padding?: number;
}

type layoutFunction = (
  tree: ImmutableTree,
  options?: layoutOptions,
) => (node: NodeRef) => FunctionalVertex;

//TODO sort this out with dimensions
export type BaubleTypes = {
  tree: Tree;
  scale: scaleType;
  layout: layoutType;
  dimensions: dimensionType;
  animated?: boolean;
};
// type Bauble= React.FC<BaubleTypes>

export interface FigtreeProps {
  width: number;
  height: number;
  layout: layoutFunction;
  tree: ImmutableTree;
  margins?: Margins;
  baubles?: InternalBaubleOptions[];
  opts?: layoutOptions;
  animated?: boolean;
  x?: number;
  y?: number;
  axis?: AxisProps;
}
