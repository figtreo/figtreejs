import type { Tree, NodeRef } from "../tree-types";
import type { TreeTraversal } from "./traversal-types";
export class PreOrderTraversalCache implements TreeTraversal {
  _forwardCache: Map<NodeRef, NodeRef>;
  _reverseCache: Map<NodeRef, NodeRef>;
  constructor() {
    this._forwardCache = new Map();
    this._reverseCache = new Map();
  }

  *traverse(tree: Tree, node?: NodeRef): Generator<NodeRef> {
    const traverse = function* (node: NodeRef): Generator<NodeRef> {
      const childCount = tree.getChildCount(node);

      if (childCount > 0) {
        for (let i = 0; i < childCount; i++) {
          const child = tree.getChild(node, i);
          yield* traverse(child);
        }
      }
      yield node;
    };
    if (node === undefined) {
      node = tree.getRoot();
    }
    yield* traverse(node);
  }

  //Check we've been to next otherwise we need to update again.
  getNext(tree: Tree, node: NodeRef): NodeRef | undefined {
    const n = this._forwardCache.get(node);
    if (n !== undefined) {
      if (this._forwardCache.get(n) !== undefined) {
        return n; //if this node hasn't changed nor the next
      }
    }

    if (tree.isRoot(node)) {
      //start over
      return undefined;
    }
    const parent = tree.getParent(node);
    if (tree.hasRightSibling(node)) {
      const rs = tree.getRightSibling(node);
      this._forwardCache.set(node, rs);
      this._reverseCache.set(rs, node);
    } else {
      this._forwardCache.set(node, parent);
      this._reverseCache.set(parent, node);
    }

    return this._forwardCache.get(node);
  }
  getPrevious(tree: Tree, node: NodeRef): NodeRef | undefined {
    const n = this._reverseCache.get(node);
    if (n !== undefined) {
      if (this._reverseCache.get(n) !== undefined) {
        return n; //if this node hasn't changed nor the next
      }
    }
    if (node === this.traverse(tree).next().value) {
      return undefined;
    }
    if (tree.isInternal(node)) {
      const childCount = tree.getChildCount(node) - 1;
      const lastChild = tree.getChild(node, childCount);
      this._reverseCache.set(node, lastChild);
      this._forwardCache.set(lastChild, node);
    } else {
      if (tree.hasLeftSibling(node)) {
        const ls = tree.getLeftSibling(node);
        this._reverseCache.set(node, ls);
        this._forwardCache.set(ls, node);
      } else {
        let n = node;
        while (!tree.hasLeftSibling(n)) {
          // aunt = tree.getLeftSibling(n);
          n = tree.getParent(n);
        }
        const aunt = tree.getLeftSibling(n);
        this._reverseCache.set(node, aunt);
        this._forwardCache.set(aunt, node);
        // look for parent's left sibling if none try again until root
        // if at and no ls error we are at first tip and should have caught this above.
      }
    }
    return this._reverseCache.get(node);
  }
}
