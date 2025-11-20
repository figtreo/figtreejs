import PolarAxis from "./PolarAxis";
import RectangularAxis from "./RectangularAxis";
import type { AxisProps } from "./Axis.types";
import { layoutClass } from "../../../Layouts";
import { useContext } from "react";
import { DimensionContext } from "../../../Context/dimensionContext";

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
