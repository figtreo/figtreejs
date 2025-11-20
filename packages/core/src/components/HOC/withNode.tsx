import React, { useContext } from "react";
import type { NodeRef } from "../../Evo";
import { ScaleContext } from "../../Context/scaleContext";
import { layoutContext } from "../../Context/layoutContext";
import { animatedContext } from "../../Context/aminatedContext";
import { DimensionContext } from "../../Context/dimensionContext";
import { layoutClass } from "../../Layouts";
import { defaultNodeLabelData } from "../../store/store";
import type { PolarVertex } from "../../Layouts/types";
import { textSafeDegrees } from "../../store/polarScale";
import { unNullify } from "../../utils";

//The goal here is now to take a shape components that accepts Attrs: number | string , x/y
// and return a component that takes a node / layout/ scale and attrs:number|string | function

type Injected = {
  x: number;
  y: number;
  animated: boolean;
};

/**
 *  This HOC takes a shape (possibly animated) that requires x,y values and calculated attributes and
 * calculates those values from a node.
 *
 */

export function withNode<T extends object>(
  WrappedComponent: React.FC<T & Injected>,
) {
  type ExposedProps = T & { node: NodeRef };

  const NodedComponent: React.FC<ExposedProps> = (props) => {
    const scale = useContext(ScaleContext);
    const layout = useContext(layoutContext);
    const animated = useContext(animatedContext);

    const { node, ...rest } = props;
    const v = scale(layout(node));

    return (
      <WrappedComponent {...(rest as T)} x={v.x} y={v.y} animated={animated} />
    );
  };

  NodedComponent.displayName = `withNode(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return NodedComponent;
}

/**
 * An HOC that determines the x,y, rotation alignment base and text anchor of a label
 * if a parent is passed in then the component renders a branch label
 */
export type LabelInjection = {
  x: number;
  y: number;
  animated: boolean;
  alignmentBaseline: React.ComponentProps<"text">["alignmentBaseline"];
  rotation: number;
  textAnchor: React.ComponentProps<"text">["textAnchor"];
  d?: string;
};
export function withNodeLabel<T extends object>(
  WrappedComponent: React.FC<T & LabelInjection>,
) {
  // parent for branch
  type ExposedProps = T & {
    node: NodeRef;
    parent?: NodeRef;
    aligned?: boolean;
    gap?: number;
  };

  const NodedComponent: React.FC<ExposedProps> = (props) => {
    const scale = useContext(ScaleContext);
    const layout = useContext(layoutContext);
    const animated = useContext(animatedContext);
    const { domainX, layoutClass: layoutType } = useContext(DimensionContext);

    const { node, parent, aligned, gap = 6, ...rest } = props;
    const v = layout(node);
    const scaledV = scale(v);

    if (parent === undefined) {
      // node label
      const nodeLabel = scaledV.nodeLabel ?? defaultNodeLabelData;
      const dx = nodeLabel.dxFactor * gap;
      const dy = nodeLabel.dyFactor * gap;

      const scaledMax = scale({ x: domainX[1], y: v.y });

      const xpos = (aligned ? scaledMax.x : scaledV.x) + dx;
      const ypos =
        (aligned && layoutType === layoutClass.Polar
          ? scaledMax.y
          : scaledV.y) + dy;
      const { alignmentBaseline, rotation, textAnchor } = nodeLabel;

      const d = aligned
        ? `M${scaledV.x} ${scaledV.y}L${xpos} ${ypos}`
        : `M${scaledV.x} ${scaledV.y}L${scaledV.x} ${scaledV.y}`;
      return (
        <WrappedComponent
          alignmentBaseline={alignmentBaseline}
          rotation={rotation}
          textAnchor={textAnchor}
          d={d}
          x={xpos}
          y={ypos}
          {...(rest as T)}
          animated={animated}
        />
      );
    } else {
      const parentVertex = layout(parent);
      const scaledPv = scale(parentVertex);
      // todo fix this so we don't need all the casting etc.
      const theta =
        layoutType === layoutClass.Polar
          ? unNullify(
              (scaledV as PolarVertex).theta,
              "The layout is polar but theta was not calculated for this node",
            )
          : 0;
      const rotation =
        layoutType === layoutClass.Polar ? textSafeDegrees(theta) : 0;
      const step = scale({ x: parentVertex.x, y: v.y });
      const { dx, dy } =
        layoutType === layoutClass.Polar
          ? getPolarBranchDs(theta, gap)
          : { dx: 0, dy: -1 * gap };
      const x =
        (layoutType === layoutClass.Polar
          ? (scaledV.x + step.x) / 2
          : (scaledV.x + scaledPv.x) / 2) + dx;
      const y =
        (layoutType === layoutClass.Polar
          ? (scaledV.y + step.y) / 2
          : layoutType === layoutClass.Radial
            ? (scaledV.y + scaledPv.y) / 2
            : v.y) + dy;

      return (
        <WrappedComponent
          alignmentBaseline={"baseline"}
          rotation={rotation}
          textAnchor={"middle"}
          x={x}
          y={y}
          {...(rest as T)}
          animated={animated}
        />
      );
    }
  };

  NodedComponent.displayName = `withNodeLabel(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return NodedComponent;
}

function getPolarBranchDs(theta: number, gap: number) {
  //branch lable dx dy;
  let branchDx, branchDy;
  if (theta > 0 && theta < Math.PI / 2) {
    //good
    branchDx = Math.sin(Math.PI / 2 - theta) * gap;
    branchDy = -Math.cos(Math.PI / 2 - theta) * gap;
  } else if (theta > Math.PI / 2 && theta < Math.PI) {
    //good
    branchDx = -Math.cos(Math.PI / 2 - (Math.PI - theta)) * gap;
    branchDy = -Math.sin(Math.PI / 2 - (Math.PI - theta)) * gap;
  } else if (theta > Math.PI && theta < (3 * Math.PI) / 2) {
    // good
    branchDx = Math.cos(Math.PI / 2 - (theta - Math.PI)) * gap;
    branchDy = -Math.sin(Math.PI / 2 - (theta - Math.PI)) * gap;
  } else {
    branchDx = -Math.cos(Math.PI / 2 - (2 * Math.PI - theta)) * gap;
    branchDy = -Math.sin(Math.PI / 2 - (2 * Math.PI - theta)) * gap;
  }
  return { dx: branchDx, dy: branchDy };
}
