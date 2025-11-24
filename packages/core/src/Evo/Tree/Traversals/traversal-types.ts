import type { NodeRef, Tree } from "../tree-types";

export interface TreeTraversal {
  getNext(tree: Tree, node: NodeRef): NodeRef | undefined;
  getPrevious(tree: Tree, node: NodeRef): NodeRef | undefined;
}
