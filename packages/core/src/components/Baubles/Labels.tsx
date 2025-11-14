import type { NodeRef } from "../../Evo";
import { withBranches } from "../HOC/withBranches";
import { withNodeLabel } from "../HOC/withNode";
import { withNodes } from "../HOC/withNodes";
import type { BaubleTarget } from "./Bauble";
import { BaseLabel } from "./Shapes";
import type { TextAttrs } from "./Shapes/Label";
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
