import { maxIndex } from "d3-array";
import type {
  CircleAttrs,
  HighlightRectAttrs,
  PathAttrs,
  RectAttrs,
  TextAttrs,
} from "../components";
import type { BaubleSpec } from "../components/baubles/bauble";
import {
  BaubleTarget,
  CladeShapes,
  NodeShapes,
} from "../components/baubles/bauble";
import type { ImmutableTree, NodeRef } from "../evo";
import { tipIterator } from "../evo";
import type {
  InternalBranchOptions,
  InternalCladeOptions,
  InternalLabelOptions,
  InternalNodeOptions,
} from "./makers";
import { mapAttrsToProps, mapInteractionsToProps } from "./utils";
import type { Clade } from "../components/hoc/with-clades";
import { notNull } from "../utils/maybe";

export type InternalBaubleOptions =
  | InternalNodeOptions
  | InternalBranchOptions
  | InternalLabelOptions
  | InternalCladeOptions; // TODO fix redundancy and keep types happy
export function setupBaubles(
  options: InternalBaubleOptions,
  tree: ImmutableTree,
): BaubleSpec {
  const filterer = "filter" in options ? options.filter : () => true;

  notNull(filterer, "Issue with filter option when making baubles");

  const nodes: NodeRef[] =
    "nodes" in options ? options.nodes : tree.getNodes().filter(filterer);

  const interactionMapper = mapInteractionsToProps(options.interactions ?? {});

  if (options.target === BaubleTarget.Node) {
    if (options.shape === NodeShapes.Circle) {
      const attrMapper = mapAttrsToProps(options.attrs); //fill is none unless we are told otherwise
      const attrs = nodes.reduce((acc: Record<string, CircleAttrs>, n) => {
        const nodeAttrs = attrMapper(n);
        const nodeInteractions = interactionMapper(n);
        acc[n._id] = { ...nodeAttrs, ...nodeInteractions };
        return acc;
      }, {});

      return {
        nodes,
        attrs,
        id: options.id,
        target: options.target,
        shape: options.shape,
      };
    } else {
      const attrMapper = mapAttrsToProps(options.attrs); //fill is none unless we are told otherwise
      const attrs = nodes.reduce((acc: Record<string, RectAttrs>, n) => {
        const nodeAttrs = attrMapper(n);
        const nodeInteractions = interactionMapper(n);
        acc[n._id] = { ...nodeAttrs, ...nodeInteractions };
        return acc;
      }, {});
      return {
        nodes,
        attrs,
        id: options.id,
        target: options.target,
        shape: options.shape,
      };
    }
  } else if (options.target === BaubleTarget.Branch) {
    const branches = nodes
      .filter((n) => !tree.isRoot(n))
      .map((node) => ({ node, parent: tree.getParent(node) }));
    const attrMapper = mapAttrsToProps({ fill: "none", ...options.attrs }); //fill is none unless we are told otherwise
    const interactionMapper = mapInteractionsToProps(
      options.interactions ?? {},
    );
    const attrs = nodes.reduce((acc: Record<string, PathAttrs>, n) => {
      const nodeAttrs = attrMapper(n);
      const nodeInteractions = interactionMapper(n);
      acc[n._id] = { ...nodeAttrs, ...nodeInteractions };
      return acc;
    }, {});

    return {
      branches,
      attrs,
      id: options.id,
      curvature: options.curvature,
      target: options.target,
    };
  } else if (options.target === BaubleTarget.NodeLabel) {
    const attrMapper = mapAttrsToProps(options.attrs);
    const textMapper = mapAttrsToProps({ text: options.text });
    const interactionMapper = mapInteractionsToProps(
      options.interactions ?? {},
    );
    const attrs = nodes.reduce((acc: Record<string, TextAttrs>, n) => {
      const nodeAttrs = attrMapper(n);
      const nodeInteractions = interactionMapper(n);
      const text = textMapper(n);
      acc[n._id] = { ...nodeAttrs, ...nodeInteractions, ...text };
      return acc;
    }, {});

    return {
      nodes,
      attrs,
      id: options.id,
      target: options.target,
      aligned: options.aligned ?? false,
    };
  } else if (options.target === BaubleTarget.BranchLabel) {
    const sineRoot = nodes.filter((n) => !tree.isRoot(n));
    const branches = sineRoot
      // .filter((n) => !tree.isRoot(n))
      .map((node) => ({ node, parent: tree.getParent(node) }));
    const attrMapper = mapAttrsToProps(options.attrs); //fill is none unless we are told otherwise
    const interactionMapper = mapInteractionsToProps(
      options.interactions ?? {},
    );
    const textMapper = mapAttrsToProps({ text: options.text });
    const attrs = sineRoot.reduce((acc: Record<string, TextAttrs>, n) => {
      const nodeAttrs = attrMapper(n);
      const nodeInteractions = interactionMapper(n);
      const text = textMapper(n);
      acc[n._id] = { ...nodeAttrs, ...nodeInteractions, ...text };
      return acc;
    }, {});

    return {
      branches,
      attrs,
      id: options.id,
      target: options.target,
    };
  } else {
    // if(options.target===BaubleTarget.Clade){
    const clades: Clade[] = nodes.map((n) => {
      const tips = [...tipIterator(tree, n)];
      const leftMost = tips[0];
      const rightMost = tips[tips.length - 1];
      const mostDiverged = tips[maxIndex(tips, (d) => tree.getDivergence(d))];
      return {
        root: n,
        leftMost,
        rightMost,
        mostDiverged,
      };
    });

    if (options.shape === CladeShapes.Highlight) {
      const attrMapper = mapAttrsToProps(options.attrs); //fill is none unless we are told otherwise
      const attrs = nodes.reduce(
        (acc: Record<string, HighlightRectAttrs>, n) => {
          const nodeAttrs = attrMapper(n);
          const nodeInteractions = interactionMapper(n);
          acc[n._id] = { ...nodeAttrs, ...nodeInteractions };
          return acc;
        },
        {},
      );
      return {
        clades,
        attrs,
        id: options.id,
        target: options.target,
        shape: options.shape,
      };
    } else {
      const attrMapper = mapAttrsToProps(options.attrs); //fill is none unless we are told otherwise
      const attrs = nodes.reduce((acc: Record<string, PathAttrs>, n) => {
        const nodeAttrs = attrMapper(n);
        const nodeInteractions = interactionMapper(n);
        acc[n._id] = { ...nodeAttrs, ...nodeInteractions };
        return acc;
      }, {});
      return {
        clades,
        attrs,
        id: options.id,
        target: options.target,
        shape: options.shape,
      };
    }
  }

  throw new Error("not implemented the rest");
}
