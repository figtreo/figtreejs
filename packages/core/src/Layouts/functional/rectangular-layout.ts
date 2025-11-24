import { mean } from "d3-array";
import type { ImmutableTree, NodeRef } from "../../evo";
import { postOrderIterator } from "../../evo";
import type { NodeLabelType, FunctionalVertex } from "../types";
import { layoutClass } from "../types";
import { unNullify } from "../../utils";

export function baseLayout(lc: layoutClass) {
  function layout(tree: ImmutableTree): (node: NodeRef) => FunctionalVertex {
    const map = new Map<NodeRef, FunctionalVertex>();

    let currentY = 0;
    for (const node of postOrderIterator(tree)) {
      let protoVertex: { x: number; y: number };
      const x = tree.getDivergence(node);
      const leftLabel = tree.getChildCount(node) > 0;
      const hasParent = !tree.isRoot(node);
      const labelBelow =
        tree.getChildCount(node) > 0 &&
        (!hasParent || tree.getChild(tree.getParent(node), 0) !== node);

      if (tree.isExternal(node)) {
        protoVertex = { x, y: currentY };
        currentY++;
      } else {
        const kidPositions = tree
          .getChildren(node)
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
      }
      const vertex = {
        ...protoVertex,
        layoutClass: lc,
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
  return layout;
}

export const rectangularLayout = baseLayout(layoutClass.Rectangular);
export const polarLayout = baseLayout(layoutClass.Polar);
