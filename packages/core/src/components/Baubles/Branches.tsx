import { withBranch } from "../hoc";
import type { BranchProps } from "../hoc/with-branches";
import { withBranches } from "../hoc/with-branches";
import type { BaubleTarget } from "./bauble";
import { BasePath } from "./shapes";
import type { PathAttrs } from "./shapes/branch";

export type BranchSpec = BranchProps<PathAttrs> & {
  target: BaubleTarget.Branch;
  id?: string;
};

export const Branches = withBranches<PathAttrs>(withBranch(BasePath));
