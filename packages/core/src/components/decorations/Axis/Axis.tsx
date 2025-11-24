import PolarAxis from "./polar-axis";
import RectangularAxis from "./rectangular-axis";
import type { AxisProps } from "./axis-types";
import { layoutClass } from "../../../layouts";
import { useContext } from "react";
import { DimensionContext } from "../../../context/dimension-context";

//TODO do things to scale and allow date as origin not maxD.

export default function Axis(props: AxisProps) {
  const dimensions = useContext(DimensionContext);
  const { layoutClass: layoutType } = dimensions;
  if (layoutType === layoutClass.Polar) {
    return <PolarAxis {...props} />;
  } else if (layoutType === layoutClass.Rectangular) {
    return <RectangularAxis {...props} />;
  } else {
    console.warn(`Axis not supported for ${layoutType}`);
    return null;
  }
}
