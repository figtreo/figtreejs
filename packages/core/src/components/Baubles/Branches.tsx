import { withBranch } from "../HOC";
import type { BranchProps } from "../HOC/withBranches";
import { withBranches } from "../HOC/withBranches";
import type { BaubleTarget } from "./Bauble";
import { BasePath } from "./Shapes";
import type { PathAttrs } from "./Shapes/Branch";

export type BranchSpec = BranchProps<PathAttrs> & {
  target: BaubleTarget.Branch;
  id?: string;
};

export const Branches = withBranches<PathAttrs>(withBranch(BasePath));
