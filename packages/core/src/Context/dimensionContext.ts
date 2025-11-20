import { createContext } from "react";
import type { dimensionType } from "../Components/FigTree/Figtree.types";
import { layoutClass } from "../Layouts";

const defaultDimension: dimensionType = {
  canvasWidth: 0,
  canvasHeight: 0,
  domainX: [0, 1],
  domainY: [0, 1],
  layoutClass: layoutClass.Rectangular,
  invert: false,
  pollard: 0,
  minRadius: 0,
  fishEye: {
    x: 0,
    y: 0,
    scale: 0,
  },
  rootAngle: 0,
  angleRange: 0,
};
export const DimensionContext = createContext(defaultDimension);
