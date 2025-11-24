// export function layout (tree:ImmutableTree,node?:NodeRef):Map<NodeRef,FunctionalVertex>{

import type { ImmutableTree, NodeRef } from "../../evo";
import { preOrderIterator, tipIterator } from "../../evo";
import type { NodeLabelType } from "../types";
import { notNull } from "../../utils";
import type { FunctionalVertex } from "../types";
import { layoutClass } from "../types";

//       //todo set some map for fixing the traversal of the tree.
//       const vertexMap = new Map();
type data = {
  angleStart: number;
  angleEnd: number;
  xpos: number;
  ypos: number;
  level: number;
  number: number;
};

export function radialLayout(
  tree: ImmutableTree,
  options: { spread?: number } = {},
): (node: NodeRef) => FunctionalVertex {
  const { spread = 1 } = options;
  console.log("radial layout with spread", spread);
  const map = new Map<NodeRef, FunctionalVertex>();

  const dataStack: data[] = [
    {
      angleStart: 0,
      angleEnd: 2 * Math.PI,
      xpos: 0,
      ypos: 0,
      level: 0,
      number: tree.getRoot().number,
    },
  ]; // TODO start tree.
  for (const node of preOrderIterator(tree)) {
    const data = dataStack.pop();
    notNull(data, `Internal Error, hit the end of the data stack unexpectedly`);
    const { angleStart, angleEnd, xpos, ypos, level } = data;

    const branchAngle = (angleStart + angleEnd) / 2.0;

    const length = !tree.isRoot(node) ? tree.getLength(node) : 0;

    const directionX = Math.cos(branchAngle);
    const directionY = Math.sin(branchAngle);
    const x = xpos + length * directionX;
    const y = ypos + length * directionY;

    const leftLabel = tree.getChildCount(node) > 0;
    let dx, dy;
    if (!leftLabel) {
      dx = Math.cos(branchAngle);
      dy = Math.sin(branchAngle);
    } else {
      dx = Math.cos(branchAngle);
      dy = Math.sin(branchAngle);
    }
    const vertex = {
      x,
      y,
      layoutClass: layoutClass.Radial,
      theta: branchAngle,
      nodeLabel: {
        dxFactor: dx,
        dyFactor: dy,
        alignmentBaseline: "middle",
        textAnchor:
          normalizeAngle(branchAngle) > Math.PI / 2 &&
          normalizeAngle(branchAngle) < (3 * Math.PI) / 2
            ? "end"
            : "start",
        rotation: 0, // textSafeDegrees(normalizeAngle(branchAngle))
      } as NodeLabelType,
    };

    if (tree.getChildCount(node) > 0) {
      const childLeafs: number[] = [];
      let totalLeafs = 0;
      for (let i = 0; i < tree.getChildCount(node); i++) {
        const leafCount = [...tipIterator(tree, tree.getChild(node, i))].length;
        childLeafs[i] = leafCount;
        totalLeafs += leafCount;
      }

      let span = angleEnd - angleStart;
      let updatedAngleStart = angleStart;

      if (tree.getRoot() !== node) {
        // span *= 1.0 + ((safeOpts.spread * Math.PI / 180) / 10.0);
        span *= 1.0 + (spread * Math.PI) / 180 / 10.0;
        updatedAngleStart = branchAngle - span / 2.0;
      }

      let a2 = updatedAngleStart;

      for (let i = tree.getChildCount(node) - 1; i > -1; i--) {
        // i think we need to go in reverse order here
        const a1 = a2;
        a2 = a1 + (span * childLeafs[i]) / totalLeafs;
        dataStack.push({
          angleStart: a1,
          angleEnd: a2,
          xpos: x,
          ypos: y,
          level: level + 1,
          number: tree.getChild(node, i).number,
        });
      }
    }
    map.set(node, vertex);
  }

  return function (node: NodeRef): FunctionalVertex {
    if (map.has(node)) {
      return map.get(node) as FunctionalVertex; // must be here since we check it above
    } else {
      throw new Error("Node not found in layout -  has the tree changed");
    }
  };
}

//this function converts radians to degrees and adjusts degrees
// so the text is not fliped
export function textSafeDegrees(radians: number) {
  const d = degrees(radians);
  //trial and error  - must be a better way
  if (d > 90 && d < 270) {
    return (d - 180) / 2;
  } else if (d > 0 && d < 88) {
    return d / 2;
  } else if (d < 360 && d > 272) {
    return (360 + d) / 2;
  } else {
    return d;
  }
}
export function normalizeAngle(theta: number) {
  while (theta > 2 * Math.PI) {
    theta -= 2 * Math.PI;
  }
  return theta;
}

export function degrees(theta: number) {
  return (normalizeAngle(theta) * 180) / Math.PI;
}
