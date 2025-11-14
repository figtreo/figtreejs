import { withBranch } from "../HOC";
import {  BranchProps, withBranches } from "../HOC/withBranches";
import { BaubleTarget } from "./Bauble";
import { BasePath } from "./Shapes";
import { PathAttrs } from "./Shapes/Branch";

export type BranchSpec = BranchProps<PathAttrs> &{target:BaubleTarget.Branch, id?:string}

export const Branches = withBranches<PathAttrs>(withBranch(BasePath))