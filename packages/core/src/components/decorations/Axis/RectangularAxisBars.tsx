import { useContext } from "react";
import { ScaleContext } from "../../../Context/scaleContext";
import type { AxisBarsProps } from "./Axis.types";
import { defaultAxisBarsProps } from "./Axis.types";
import { BaseRectangle } from "../../Baubles";

/**
 * This component adds vertical bars to the backgound of a figure. It is used a child of an Axis component and gets
 * it's size and position attributes from it's parent.
 */

export default function AxisBars(props: AxisBarsProps) {
  const {
    attrs,
    evenFill = defaultAxisBarsProps.evenFill,
    oddFill = defaultAxisBarsProps.oddFill,
    tickValues,
    scale,
    axisY,
  } = props;

  const figureScale = useContext(ScaleContext);

  return (
    <g className={"axisBars"} key="axisBars">
      {tickValues
        .filter((_t: number, i: number, all: number[]) => i < all.length - 1)
        .map((t: number, i: number) => {
          const start = figureScale({ x: scale(t), y: axisY });
          const end = figureScale({ x: scale(t), y: -0.05 });

          const secondStart = figureScale({
            x: scale(tickValues[i + 1]),
            y: 0,
          });

          const fill = i % 2 === 0 ? evenFill : oddFill;
          return (
            <BaseRectangle
              key={`recBar-${i}`}
              x={start.x}
              width={secondStart.x - start.x} // to deal with negative scales
              y={end.y}
              height={start.y - end.y}
              fill={fill}
              {...{ rx: 2, ry: 2, ...attrs }}
              animated={false} // animated can come from context in the shape not needed here
            />
          );
        }, [])}
    </g>
  );
}
