import type { NodeRef } from "../../evo";
import { withBranches } from "../hoc/with-branches";
import { withNodeLabel } from "../hoc/with-node";
import { withNodes } from "../hoc/with-nodes";
import type { BaubleTarget } from "./bauble";
import { BaseLabel } from "./shapes";
import type { TextAttrs } from "./shapes/label";
import type { AttrsRecord } from "./types";

export const BranchLabels = withBranches<TextAttrs>(
  withNodeLabel<TextAttrs>(BaseLabel),
);
export const NodeLabels = withNodes<TextAttrs>(
  withNodeLabel<TextAttrs>(BaseLabel),
);

export type NodeLabelProps = {
  id?: string;
  nodes: NodeRef[];
  attrs: AttrsRecord<TextAttrs>;
  aligned: boolean;
};
export type NodeLabelSpec = NodeLabelProps & {
  target: BaubleTarget.NodeLabel;
  id?: string;
};

export type BranchLabelProps = {
  id?: string;
  branches: { node: NodeRef; parent: NodeRef }[];
  attrs: AttrsRecord<TextAttrs>;
};
export type BranchLabelSpec = BranchLabelProps & {
  target: BaubleTarget.BranchLabel;
  id?: string;
};

export type LabelSpec = BranchLabelSpec | NodeLabelSpec;
