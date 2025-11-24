import type { NodeSpec } from "./nodes";
import { Nodes } from "./nodes";
import type { BranchLabelSpec, NodeLabelSpec } from "./labels";
import { BranchLabels, NodeLabels } from "./labels";
import type { BranchSpec } from "./branches";
import { Branches } from "./branches";
import type { CladeSpec } from "./clades";
import { Clades } from "./clades";

/**
 * The main bauble which decides which baubles to renders base on the incoming specification
 */
export function Bauble(props: BaubleSpec) {
  // const{id} = props
  switch (
    props.target // switch before destructure so destructure is type aware
  ) {
    case BaubleTarget.Node: {
      return <Nodes {...props} />;
    }
    case BaubleTarget.Branch: {
      return <Branches {...props} />;
    }
    case BaubleTarget.NodeLabel: {
      return <NodeLabels {...props} />;
    }

    case BaubleTarget.BranchLabel: {
      return <BranchLabels {...props} />;
    }

    case BaubleTarget.Clade: {
      return <Clades {...props} />;
    }
  }
}

export enum BaubleTarget {
  Node,
  Branch,
  NodeLabel,
  BranchLabel,
  Clade,
  Axis,
}

export enum NodeShapes {
  Circle,
  Rectangle,
}
export enum CladeShapes {
  Cartoon,
  Highlight,
}

export type BaubleSpec =
  | NodeSpec
  | BranchSpec
  | NodeLabelSpec
  | BranchLabelSpec
  | CladeSpec;
