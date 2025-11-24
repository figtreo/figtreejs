export interface simpleVertex {
  x: number;
  y: number;
}
export interface simplePolarVertex extends simpleVertex {
  theta: number;
  r: number;
}

export interface FunctionalVertex extends simpleVertex {
  layoutClass: layoutClass;
  nodeLabel?: NodeLabelType;
}

export interface PolarVertex extends simplePolarVertex {
  layoutClass: layoutClass.Polar;
  nodeLabel?: NodeLabelType;
}

export enum layoutClass {
  Rectangular = "Rectangular",
  Polar = "Polar",
  Radial = "Radial",
}

export type NodeLabelType = {
  alignmentBaseline: React.SVGAttributes<SVGTextElement>["alignmentBaseline"];
  textAnchor: React.SVGAttributes<SVGTextElement>["textAnchor"];
  dxFactor: number;
  dyFactor: number;
  rotation: number;
};
