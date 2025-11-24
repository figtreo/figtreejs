/**
 * These function help access tree data while
 * handling missing data.
 *
 * They cannot be private functions on the method because
 * those can't be called by immer proxies.
 */

import type { Maybe, Undefinable } from "@figtreejs/maybe/maybe";
import { MaybeType, Nothing, Some } from "@figtreejs/maybe/maybe";
import type { Annotation, NodeRef } from "../tree-types";
import type { ImmutableTree, nodeIndex, Node } from "./immutable-tree";
import type { Taxon } from "../taxa";
import {
  maybeGetNameFromIndex,
  maybeGetTaxonByName,
} from "../taxa/helper-functions";

/**
 *
 * A private getting for retrieving a NodeRef from a number
 */
export function maybeGetNodeFromNumber(
  tree: ImmutableTree,
  i: number,
): Maybe<NodeRef> {
  const n = tree._data.nodes.allNodes[i] as Undefinable<NodeRef>;
  if (n === undefined) {
    return Nothing();
  } else {
    return Some(n);
  }
}

export function maybeGetNode(
  tree: ImmutableTree,
  i: nodeIndex,
): Maybe<NodeRef> {
  if (typeof i === "number") {
    return maybeGetNodeFromNumber(tree, i);
  } else if (i instanceof Object) {
    return maybeGetNodeByTaxon(tree, i);
  } else if (typeof i === "string") {
    const taxon = maybeGetTaxonByName(tree.taxonSet._data, i);
    if (taxon.type === MaybeType.Some) {
      return maybeGetNodeByTaxon(tree, taxon.value);
    } else {
      return maybeGetNodeByLabel(tree, i);
    }
  }
  return Nothing();
}

export function maybeGetNodeByTaxon(
  tree: ImmutableTree,
  taxon: Taxon,
): Maybe<NodeRef> {
  const n = tree._data.nodes.byTaxon[taxon.number] as Undefinable<number>;
  if (n === undefined) {
    return Nothing();
  } else {
    return maybeGetNode(tree, n);
  }
}

// export function maybeGetTaxonByName(tree:ImmutableTree, name:string):Maybe<Taxon>{
//       const t =  tree.taxonSet.getTaxonByName(name)
//       if(t===undefined){
//         return Nothing()
//       }else{
//         return Some(t)
//       }
//   }

export function maybeGetNodeByLabel(
  tree: ImmutableTree,
  label: string,
): Maybe<NodeRef> {
  const index = tree._data.nodes.byLabel[label] as Undefinable<number>;
  if (index === undefined) {
    return Nothing();
  }
  return maybeGetNodeFromNumber(tree, index);
}

export function maybeGetAnnotation(
  tree: ImmutableTree,
  node: NodeRef,
  name: string,
): Maybe<Annotation> {
  const a = (tree.getNode(node.number) as Node).annotations[
    name
  ] as Undefinable<Annotation>;
  if (a === undefined) {
    return Nothing();
  } else {
    return Some(a);
  }
}

export function maybeGetTaxonFromNode(
  tree: ImmutableTree,
  node: NodeRef,
): Maybe<Taxon> {
  const taxaIndex = tree._data.nodeToTaxon[node.number] as Undefinable<number>;
  if (taxaIndex === undefined) {
    return Nothing();
  }
  return maybeGetTaxon(tree, taxaIndex);
}

export function maybeGetTaxon(
  tree: ImmutableTree,
  id: number | NodeRef | string,
): Maybe<Taxon> {
  if (typeof id === "number") {
    return maybeGetTaxonByName(
      tree.taxonSet._data,
      maybeGetNameFromIndex(tree.taxonSet._data, id),
    );
  } else if (typeof id === "string") {
    return maybeGetTaxonByName(tree.taxonSet._data, id);
  } else {
    return maybeGetTaxonFromNode(tree, id);
  }
}

export function maybeGetParent(
  tree: ImmutableTree,
  node: NodeRef,
): Maybe<NodeRef> {
  const n = tree._data.nodes.allNodes[node.number] as Undefinable<Node>;
  if (n === undefined) return Nothing();
  const parentId = n.parent;
  return parentId === undefined ? Nothing() : maybeGetNode(tree, parentId);
}
