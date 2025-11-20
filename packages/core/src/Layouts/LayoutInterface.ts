import type { layoutOptions } from "../Components/FigTree/Figtree.types";
//TODO make tree

// TODO caching

//
export interface Label {
  x: number;
  y: number;
  alignmentBaseline: string;
  textAnchor: string;
  rotation: number;
  alignedPos?: { x: number; y: number };
}
export interface Vertex {
  number: number;
  x: number;
  y: number;
  hidden: boolean | undefined;
  labelHidden: boolean | undefined;
  level: number;
  branch?: {
    d: string;
    label: Label;
  };
  theta?: number; //angle
  r?: number; //radius
  nodeLabel: Label;
}

export interface ArbitraryVertex {
  hidden: boolean;
  labelHidden: boolean;
  number: number;
  x: number;
  y: number;
  level: number;
  theta?: number; //angle
  pathPoints: { x: number; y: number }[];
  nodeLabel: {
    dx: number;
    dy: number;
    alignmentBaseline: string;
    textAnchor: string;
    rotation?: number;
  };
}

//ids match node ids
export interface Vertices {
  type: "Rectangular" | "Polar" | "Radial";
  vertices: Vertex[];
  origin?: { x: number; y: number }; // used by polar layout to denote the position of the root (or stem) which can change
  theta?: [number, number]; // used by polar layout to denote the range of angles
  axisLength?: number; // provided by layouts that support axis
}

export interface ArbitraryVertices {
  vertices: ArbitraryVertex[];
  extent: { x: [number, number]; y: [number, number] };
}

export interface internalLayoutOptions extends layoutOptions {
  // all layout options plus width and height of drawable area
  width?: number;
  height?: number;
}

export interface CartoonData {
  cartooned: boolean;
  collapseFactor: number;
}

export const defaultInternalLayoutOptions = {
  width: 1000,
  height: 1000,
  rootLength: 0,
  rootAngle: 0,
  angleRange: 2 * Math.PI - 0.3,
  tipSpace: () => 1,
  curvature: 0,
  showRoot: false,
  spread: 1,
  fishEye: { x: 0, y: 0, scale: 0 },
  cartoonedNodes: new Map(),
  pollard: 0,
  padding: 20,
  invert: false,
  minRadius: 0,
};
