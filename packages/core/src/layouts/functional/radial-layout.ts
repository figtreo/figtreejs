import type { ImmutableTree, NodeRef } from "../../evo";
import { pseudoTipIterator, psuedoRootPreOrderIterator } from "../../evo";
import type { NodeLabelType } from "../types";
import { notNull } from "../../utils/maybe";
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

/**
 * The radial (unrooted) layout
 * @param tree
 * @param options  {spread: number} - increases this increases the space between tips
 * @returns (node)=>FunctionalVertex
 */

export function radialLayout(
  tree: ImmutableTree,
  options: { spread?: number; root?: NodeRef; startAngle?: number } = {},
): (node: NodeRef) => FunctionalVertex {
  const {
    spread = 1,
    root = tree.getRoot(),
    startAngle = (2.5 * Math.PI) / 2,
  } = options;

  console.log("radial layout with spread", spread);
  const map = new Map<NodeRef, FunctionalVertex>();

  const fakeThroughRoot = tree.isRoot(root) && tree.getChildCount(root) == 2;

  const dataStack: data[] = [
    {
      angleStart: startAngle,
      angleEnd: startAngle + 2 * Math.PI,
      xpos: 0,
      ypos: 0,
      level: 0,
      number: root.number,
    },
  ]; // TODO start tree.

  for (const node of psuedoRootPreOrderIterator(tree, root)) {
    const data = dataStack.pop();
    notNull(data, `Internal Error, hit the end of the data stack unexpectedly`);
    const { angleStart, angleEnd, xpos, ypos, level } = data;

    const branchAngle = (angleEnd + angleStart) / 2.0;

    const length = node.pseudoLength !== undefined ? node.pseudoLength : 0;

    const directionX = Math.cos(branchAngle);
    const directionY = Math.sin(branchAngle);
    const x = xpos + length * directionX;
    const y = ypos + length * directionY;

    const leftLabel = node.pseudoChildren.length > 0;
    let dx, dy;
    if (!leftLabel) {
      dx = Math.cos(branchAngle);
      dy = Math.sin(branchAngle);
    } else {
      dx = Math.cos(branchAngle);
      dy = Math.sin(branchAngle);
    }

    // we want to give the impression we are traversing from the root.
    const directionalUpdate = tree.isRoot(tree.getNode(node.number))
      ? 0
      : node.pseudoParent === undefined ||
          node.pseudoParent.number !== tree.getParent(node).number
        ? -Math.PI
        : 0;
    const nTheta = normalizeAngle(branchAngle - directionalUpdate);

    const vertex = {
      x,
      y,
      layoutClass: layoutClass.Radial,
      theta: nTheta,
      nodeLabel: {
        dxFactor: dx,
        dyFactor: dy,
        alignmentBaseline: "middle",
        textAnchor:
          nTheta > Math.PI / 2 && nTheta < (3 * Math.PI) / 2 ? "end" : " start",
        rotation: textSafeDegrees(nTheta) * 2, // why is this magic 2 needed?
      } as NodeLabelType,
    };

    if (node.pseudoChildren.length > 0) {
      const childLeafs: number[] = [];
      let totalLeafs = 0;
      for (let i = 0; i < node.pseudoChildren.length; i++) {
        const leafCount = [
          ...pseudoTipIterator(tree, node.pseudoChildren[i], node.pseudoParent),
        ].length;
        childLeafs[i] = leafCount;
        totalLeafs += leafCount;
      }

      let span = angleEnd - angleStart;
      let updatedAngleStart = angleStart;

      // We don't want to adjust our path when we hit a degree 2 node or the root
      // if we start at the root has 2 children. In that case we want the roo
      // to sit on the middle of branch (even though it is really encoded as two branches)

      if (node.pseudoChildren.length > 1) {
        // span *= 1.0 + ((safeOpts.spread * Math.PI / 180) / 10.0);
        console.log(fakeThroughRoot);
        if (!fakeThroughRoot || !tree.isRoot(tree.getNode(node.number))) {
          // this bumps the start angle so branches don't make a straight line.
          // we want to inheret the open space from out parent, but also we want
          // between 0 and 0.1 PI seem to be OK.
          // this shoots for numbers between 0 and 100
          span *= 1.0 + (spread / 1000) * Math.PI;
          updatedAngleStart = branchAngle - span / 2.0;
        }
      }
      console.log("here");
      let a2 = updatedAngleStart;
      for (let i = node.pseudoChildren.length - 1; i > -1; i--) {
        // i think we need to go in reverse order here
        const a1 = a2;
        a2 = a1 + (span * childLeafs[i]) / totalLeafs;
        dataStack.push({
          angleStart: a1,
          angleEnd: a2,
          xpos: x,
          ypos: y,
          level: level + 1,
          number: node.pseudoChildren[i].number,
        });
      }
    }
    map.set(tree.getNode(node.number), vertex);
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
  } else if (d > 0 && d < 90) {
    return d / 2;
  } else if (d < 360 && d > 270) {
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
