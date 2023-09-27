import { NodeRef } from "../../../Tree/Tree.types";
export interface BranchProps {
    filter: (node: NodeRef) => boolean;
    attrs: {
        [key: string]: string | number | ((node: NodeRef) => string | number);
    };
}
