import { ScaleContinuousNumeric, scaleLinear } from "d3-scale";
import React, { useContext } from "react";
import { AxisOrientation } from "./Axis.types";

export const AxisContext = React.createContext<{ tickValues: number[], gap: number, scale: ScaleContinuousNumeric<number, number>, direction: AxisOrientation }>({ tickValues: [0], gap: 5, scale: scaleLinear(), direction: "horizontal" });

export const useAxisContext = () => {
    return useContext(AxisContext);
}