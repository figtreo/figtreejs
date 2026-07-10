import { mean } from "d3-array";
import { postOrderIterator } from "../../evo";
import type { ImmutableTree, NodeRef } from "../../evo";
import type { AnnotationValue } from "../../evo";
import { unNullify } from "../../utils";
import type { FunctionalVertex, NodeLabelType } from "../types";
import { layoutClass } from "../types";

type Sorter = (a: AnnotationValue, b: AnnotationValue) => number;
type Collapser = (annotation: AnnotationValue) => boolean;

// An iterator over the nodes of the tree.
// We iterate by group and then by post order
// all transition branches are last.

export function explodedLayout(
  tree: ImmutableTree,
  options: {
    explodeBy: string;
    interGroupGap?: number;
    intraGroupGap?: number;
    orderBy?: Sorter;
    collapse?: Collapser;
  },
): (node: NodeRef) => FunctionalVertex {
  const {
    explodeBy,
    interGroupGap = 5,
    intraGroupGap = 2,
    orderBy = (a, b) => (a > b ? -1 : 1),
    collapse = () => false,
  } = options;

  const map = new Map<NodeRef, FunctionalVertex>();
  const postOrderNodes = [...postOrderIterator(tree)];
  const sortedNodes = [...tree.getNodes()].sort((a: NodeRef, b: NodeRef) => {
    const aGroup = tree.getAnnotation(a, explodeBy);
    const bGroup = tree.getAnnotation(a, explodeBy);
    if (aGroup === bGroup) {
      return postOrderNodes.indexOf(a) - postOrderNodes.indexOf(b);
    } else {
      return orderBy(aGroup, bGroup);
    }
  });

  let currentY = 0;
  let currentGroup = tree.getAnnotation(sortedNodes[0], explodeBy);
  let newIntraGroupNext = false;
  let firstNode = true;
  for (const node of sortedNodes) {
    let protoVertex: { x: number; y: number };
    const x = tree.getDivergence(node);
    const leftLabel = tree.getChildCount(node) > 0;
    const hasParent = !tree.isRoot(node);
    const labelBelow =
      tree.getChildCount(node) > 0 &&
      (!hasParent || tree.getChild(tree.getParent(node), 0) !== node);

    const nodeGroup = tree.getAnnotation(node, explodeBy);
    if (
      tree.isExternal(node) ||
      tree
        .getChildren(node)
        .filter((d) => tree.getAnnotation(d, explodeBy) === nodeGroup)
        .length === 0
    ) {
      // This will update the first node position but I think that's OK
      // in the scale

      if (nodeGroup !== currentGroup) {
        //This the the first time in the new group
        currentY += interGroupGap;
        //Reset this flag
        newIntraGroupNext = false;
      } else if (newIntraGroupNext) {
        //It's a tip in a new circulation
        currentY += intraGroupGap;
        newIntraGroupNext = false;
      } else {
        //Just the same circuclation
        currentY += collapse(nodeGroup) || firstNode ? 0 : 1;
      }
      currentGroup = nodeGroup;
      firstNode = false;
      protoVertex = { x, y: currentY };
    } else {
      const kidPositions = tree
        .getChildren(node)
        .filter((d) => tree.getAnnotation(d, explodeBy) === nodeGroup)
        .map((child) =>
          unNullify(
            map.get(child),
            `Internal Error: child not yet found in layout`,
          ),
        );
      const y = unNullify(
        mean(kidPositions, (d) => d.y),
        `Error taking the mean of child positions`,
      );
      protoVertex = { x, y };
      // look ahead for new grouping
      if (!tree.isRoot(node)) {
        const parentGroup = tree.getAnnotation(tree.getParent(node), explodeBy);
        if (parentGroup !== nodeGroup) {
          newIntraGroupNext = true;
        }
      }
    }
    const vertex = {
      ...protoVertex,
      layoutClass: layoutClass.Rectangular,
      nodeLabel: {
        alignmentBaseline: leftLabel
          ? labelBelow
            ? "bottom"
            : "hanging"
          : "middle", // todo calc on the fly
        textAnchor: leftLabel ? "end" : "start",
        dxFactor: leftLabel ? -1 : 1,
        dyFactor: leftLabel ? (labelBelow ? -1 : 1) : 0,
        rotation: 0,
      } as NodeLabelType,
    };
    map.set(node, vertex);
  }

  return function (node: NodeRef): FunctionalVertex {
    if (map.has(node)) {
      return map.get(node) as FunctionalVertex; // check above so
    } else {
      console.log(node);
      throw new Error("Node not found in layout -  has the tree changed");
    }
  };
}
