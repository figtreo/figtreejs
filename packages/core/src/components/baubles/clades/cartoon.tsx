import { layoutClass } from "../../../layouts";

import { normalizePath } from "../../../path.helpers";
import { BasePath } from "../shapes";
import type { PolarVertex } from "../../../layouts/types";
import type { PathProps } from "../shapes/branch";
import { useContext } from "react";
import { ScaleContext } from "../../../context/scale-context";
import { layoutContext } from "../../../context/layout-context";
import { animatedContext } from "../../../context/aminated-context";
import type { Clade } from "../../hoc/with-clades";
import { withClades } from "../../hoc/with-clades";

//TODO add padding
// const padding = 10;
//TODO make normalization part of an hoc or d animation.

/**
 * A cartoon drawing of a clade in the tree.
 * It will not yet render for radial layouts
 */
type Injected = {
  d: string;
  animated: boolean;
};
export type CladeProps = Omit<PathProps, keyof Injected> & { clade: Clade };
function Cartoon(props: CladeProps) {
  const { clade, ...rest } = props;
  const scale = useContext(ScaleContext);
  const layout = useContext(layoutContext);
  const animated = useContext(animatedContext);
  const { root, leftMost, rightMost, mostDiverged } = clade;
  const v = scale(layout(root));

  const { x, y } = v;
  const lmv = scale(layout(leftMost)); // left most child v (top of highlight)
  const rmv = scale(layout(rightMost)); // right most child v (top of highlight)
  const mdv = scale(layout(mostDiverged)); // right most child v (top of highlight)
  const { layoutClass: layoutType } = layout(root);
  let d: string;
  if (layoutType === layoutClass.Rectangular) {
    const maxX = mdv.x;
    const maxY = rmv.y;

    const minY = lmv.y;

    d = `M${x},${y}L${maxX},${maxY}L${maxX},${minY}Z`;
  } else if (layoutType === layoutClass.Polar) {
    //todo maybe swap lmv and rmv
    // if we are here scale has returns a polarVertex
    const top = lmv as PolarVertex;
    const bottom = rmv as PolarVertex;

    const arcBit =
      top.theta === bottom.theta || top.r === 0
        ? ""
        : `A${top.r},${top.r} 0 0 ${top.theta < bottom.theta ? 1 : 0} ${bottom.x},${bottom.y}`;
    d = `M${x},${y}L${top.x},${top.y} ${arcBit} Z`;
  } else {
    return null;
  }

  const normalized = normalizePath(d);

  return <BasePath d={normalized} {...rest} animated={animated} />;
}

export const Cartoons = withClades(Cartoon);
