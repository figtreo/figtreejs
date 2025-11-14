import type {
  Annotation,
  AnnotationDomain,
  AnnotationSummary,
  AnnotationValue,
  DomainOf,
  MarkovJumpValue,
  NodeRef,
  RawAnnotationValue,
  Tree,
  newickParsingOptions,
} from "../Tree.types";
import { BaseAnnotationType } from "../Tree.types";
import {
  parseNewick,
  parseNexus,
  processAnnotationValue,
  writeAnnotationValue,
} from "../Parsers";
import { immerable, produce } from "immer";
import type { Taxon, TaxonSetInterface } from "../Taxa/Taxon";
import { TaxonSet } from "../Taxa/Taxon";
import { format } from "d3-format";
import { extent } from "d3-array";

import {
  MaybeType,
  type Undefinable,
  UnwrapErr,
  type Maybe,
} from "@figtree/maybe/maybe";
import {
  maybeGetAnnotation,
  maybeGetNode,
  maybeGetNodeByTaxon,
  maybeGetParent,
  maybeGetTaxon,
  maybeGetTaxonFromNode,
} from "./ImmutableTreeHelpers";
import { notNull, unNullify } from "../../../utils";
import { v4 as uuidv4 } from "uuid";

export type nodeIndex = string | number | Taxon;
export type maybeNodeIndex = Maybe<nodeIndex>;

//TODO will need to think about taxonsets and immutability.
export interface Node extends NodeRef {
  number: number;
  taxon: number | undefined;
  label: string | undefined;
  children: number[];
  parent: number | undefined;
  length: number | undefined;
  annotations: { [annotation: string]: Annotation };
  _id: string; // an id so we can mark updates to root when topology changes
}

export interface ImmutableTreeData {
  nodes: {
    allNodes: Node[];
    byTaxon: number[];
    byLabel: {
      [label: string]: number;
    };
  };
  heights: [];
  nodeToTaxon: number[];
  rootNode: number;
  is_rooted: boolean;
  hasLengths: boolean;
  annotations: { [annotation: string]: AnnotationSummary };
}

export class ImmutableTree implements Tree, TaxonSetInterface {
  //TODO remove the TaxonSetInterface implementation.
  [immerable] = true;

  _data: ImmutableTreeData;
  taxonSet: TaxonSet;
  constructor(input: { data?: ImmutableTreeData; taxonSet?: TaxonSet } = {}) {
    const { data: _data, taxonSet } = input;
    let data = _data;
    if (taxonSet) {
      this.taxonSet = taxonSet;
    } else {
      this.taxonSet = new TaxonSet();
    }
    if (data === undefined) {
      data = {
        nodes: {
          allNodes: [
            {
              number: 0,
              children: [],
              parent: undefined,
              label: undefined,
              length: undefined,
              taxon: undefined,
              annotations: {},
              _id: uuidv4(),
            },
          ],
          byTaxon: [],
          byLabel: {},
        },
        nodeToTaxon: [],
        rootNode: 0,
        is_rooted: true,
        annotations: {},
        heights: [],
        hasLengths: false,
      };
    }
    this._data = data;
  }
  lockTaxa(): TaxonSetInterface {
    this.taxonSet.lockTaxa();
    return this;
  }

  addTaxon(taxonOrName: string | Taxon): this {
    this.taxonSet.addTaxon(taxonOrName);
    return this;
  }

  getTaxonCount(): number {
    return this.taxonSet.getTaxonCount();
  }

  getTaxonSet(): TaxonSetInterface {
    return this.taxonSet;
  }
  // Parsers and constructors

  static fromNewick(
    newick: string,
    options: newickParsingOptions = {},
  ): ImmutableTree {
    // const tree = new this()
    return parseNewick(newick, options);
  }
  static fromNexus(
    nexus: string,
    options?: newickParsingOptions,
  ): ImmutableTree {
    const tree = new this();
    return parseNexus(tree, nexus, options);
    // throw new Error("Nexus parsing not implemented")
  }
  static fromString(
    string: string,
    options?: newickParsingOptions,
  ): ImmutableTree {
    if (string.toLowerCase().includes("#nexus")) {
      return this.fromNexus(string, options);
    } else {
      return this.fromNewick(string, options);
    }
  }

  static fromTree(tree: ImmutableTree, rootNode: NodeRef): ImmutableTree {
    // make a new tree.
    let newTree = new this();

    const traverseAndCopy = (tree: ImmutableTree, node: NodeRef): NodeRef => {
      const children = [];
      let newNode: NodeRef;
      for (const child of tree.getChildren(node)) {
        children.push(traverseAndCopy(tree, child));
      }

      if (node !== rootNode) {
        newTree = this._addNodeWithMetadata(tree, node, newTree);
        newNode = newTree.getNode(newTree.getNodeCount() - 1);
      } else {
        // already have the node
        newNode = newTree.getRoot();
        // add metadata
        this._copyNodeMetadata(tree, node, newTree, newNode);
      }
      for (const child of children) {
        newTree = newTree.addChild(newNode, child);
      }
      return newNode;
    };

    traverseAndCopy(tree, rootNode);
    newTree = newTree.deleteLength(newTree.getRoot()); //

    return newTree;
  }

  static _addNodeWithMetadata(
    tree: ImmutableTree,
    node: NodeRef,
    newTree: ImmutableTree,
  ): ImmutableTree {
    const added = newTree.addNodes(1);
    const newNode = added.nodes[0];
    newTree = added.tree;
    newTree = this._copyNodeMetadata(tree, node, newTree, newNode);
    return newTree;
  }

  static _copyNodeMetadata(
    tree: ImmutableTree,
    node: NodeRef,
    newTree: ImmutableTree,
    newNode: NodeRef,
  ): ImmutableTree {
    if (tree.hasTaxon(node)) {
      const taxon = tree.getTaxonFromNode(node);
      newTree = newTree.addTaxon(taxon);
      console.log("Current taxa:", newTree.taxonSet);
      newTree = newTree.setTaxon(newNode, taxon);
    }

    if (tree.hasLabel(node)) {
      const label = tree.getLabel(node);
      newTree = newTree.setLabel(newNode, label);
    }
    for (const key of tree.getAnnotationKeys()) {
      if (tree.hasAnnotation(node, key)) {
        // access directly to get the full type
        const annotation = tree.getFullNodeAnnotation(node, key);

        if (annotation.type === BaseAnnotationType.MARKOV_JUMPS) {
          const value = annotation.value.map((j) => [
            Number(j.time),
            j.from,
            j.to,
          ]) as [[number, string, string]]; // todo infer type from above
          newTree = newTree.annotateNode(newNode, key, value) as ImmutableTree; // TODO make tree interface genaric and return the same type of tree
        } else {
          newTree = newTree.annotateNode(
            newNode,
            key,
            annotation.value,
          ) as ImmutableTree;
        }
      }
    }

    if (tree.hasBranchLength(node)) {
      const length = tree.getLength(node);
      newTree = newTree.setLength(newNode, length);
    }

    return newTree;
  }
  // ------------------ Getters ----------------------

  isRooted(): boolean {
    return this._data.is_rooted;
  }
  getAnnotationType(name: string): BaseAnnotationType {
    if (
      (this._data.annotations[name] as Undefinable<AnnotationSummary>) ===
      undefined
    ) {
      throw new Error(`No annotation found with name: ${name}`);
    }
    return this._data.annotations[name].type;
  }

  getAnnotationKeys(): string[] {
    return Object.keys(this._data.annotations);
  }

  getRoot(): NodeRef {
    return this._data.nodes.allNodes[this._data.rootNode];
  }
  getNodeCount(): number {
    return this._data.nodes.allNodes.length;
  }
  getInternalNodeCount(): number {
    return this._data.nodes.allNodes.filter((n) => n.children.length > 0)
      .length;
  }
  getExternalNodeCount(): number {
    return this._data.nodes.allNodes.filter((n) => n.children.length == 0)
      .length;
  }
  getInternalNodes(): NodeRef[] {
    return this._data.nodes.allNodes.filter((n) => n.children.length > 0);
  }
  getExternalNodes(): NodeRef[] {
    return this._data.nodes.allNodes.filter((n) => n.children.length == 0);
  }
  getNodes(): NodeRef[] {
    return this._data.nodes.allNodes;
  }

  getNode(i: nodeIndex): NodeRef {
    const node = maybeGetNode(this, i);
    switch (node.type) {
      case MaybeType.Some:
        return node.value;
      case MaybeType.Nothing:
        throw new Error(`No node found`);
    }
  }

  getNodeByTaxon(taxon: Taxon): NodeRef {
    const n = maybeGetNodeByTaxon(this, taxon);
    switch (n.type) {
      case MaybeType.Nothing:
        throw new Error(`No node found for Taxon ${taxon.name}`);
      case MaybeType.Some:
        return n.value;
    }
  }

  getTaxonByName(name: string): Taxon {
    return this.taxonSet.getTaxonByName(name);
  }

  getNodeByLabel(label: string): NodeRef {
    return this.getNode(this._data.nodes.byLabel[label]);
  }

  hasTaxon(node: NodeRef): boolean {
    const t = maybeGetTaxonFromNode(this, node);

    switch (t.type) {
      case MaybeType.Some:
        return true;
      case MaybeType.Nothing:
        return false;
    }
  }

  getTaxonFromNode(node: NodeRef): Taxon {
    const t = maybeGetTaxonFromNode(this, node);
    switch (t.type) {
      case MaybeType.Some:
        return t.value;
      case MaybeType.Nothing:
        throw new Error(`Node taxon found for the provided node`);
    }
  }
  //TODO overload as above.

  getTaxon(id: number | NodeRef | string): Taxon {
    const t = maybeGetTaxon(this, id);
    switch (t.type) {
      case MaybeType.Some:
        return t.value;
      case MaybeType.Nothing:
        throw new Error(`Node taxon found that matched the provided id`);
    }
  }

  hasNodeHeights(): boolean {
    throw new Error("hasNodeHeights not implemented.");
  }
  //todo cache
  getHeight(node: NodeRef): number {
    let maxDiv = -1;
    for (const t of tipIterator(this)) {
      const d = this.getDivergence(t);
      if (d > maxDiv) {
        maxDiv = d;
      }
    }
    return maxDiv - this.getDivergence(node);
  }
  hasBranchLength(node: NodeRef): boolean {
    const n = this.getNode(node.number) as Node;
    return n.length !== undefined;
  }

  getLength(node: NodeRef): number {
    const thisNode = this.getNode(node.number);
    const length = (thisNode as Node).length;
    if (length === undefined) {
      if (this.hasLengths()) {
        throw new Error(
          `The tree has lengths but, no length was found for node ${node.number}`,
        );
      }
      console.warn(
        `The tree does not have branchlengths so a length of 1 is used as default`,
      );
      return 1.0;
    }
    return length;
  }
  hasLengths(): boolean {
    return this._data.hasLengths;
  }

  _toString(
    node: NodeRef,
    options?: {
      blFormat: (value: number) => string;
      includeAnnotations: boolean;
    },
  ): string {
    if (options === undefined) {
      options = { blFormat: format("0.2"), includeAnnotations: false };
    }
    return (
      (this.getChildCount(node) > 0
        ? `(${this.getChildren(node)
            .map((child) => this._toString(child, options))
            .join(",")})${this.hasLabel(node) ? "#" + this.getLabel(node) : ""}`
        : this.hasTaxon(node)
          ? this.getTaxonFromNode(node).name
          : "") +
      (options.includeAnnotations ? this._writeAnnotations(node) : "") +
      (this.hasBranchLength(node)
        ? `:${options.blFormat(this.getLength(node))}`
        : "")
    );
  }

  _writeAnnotations(node: NodeRef): string {
    const annotations = this._data.nodes.allNodes[node.number].annotations;
    if (Object.keys(annotations).length === 0) {
      return "";
    }
    let annotationString = "[&";
    let i = 0;
    for (const [key, annotation] of Object.entries(annotations)) {
      if (i > 0) {
        annotationString += ", "; // add a comma before the next annotation
      }
      annotationString += `${key}=${writeAnnotationValue(annotation)}`;
      i += 1;
    }
    annotationString += "]";
    return annotationString;
  }

  toNewick(
    node?: NodeRef,
    options?: {
      blFormat: (value: number) => string;
      includeAnnotations: boolean;
    },
  ): string {
    if (options === undefined) {
      options = { blFormat: format("0.2"), includeAnnotations: false };
    }
    if (node === undefined) {
      node = this.getRoot();
    }
    return this._toString(node, options) + ";";
  }

  getMRCA(node1: NodeRef | NodeRef[], node2?: NodeRef): NodeRef {
    if (Array.isArray(node1)) {
      const nodes = node1;
      if (nodes.length === 0) {
        throw new Error("No nodes provided to get MRCA");
      }
      let mrca = nodes[0];
      for (let i = 1; i < nodes.length; i++) {
        mrca = this.getMRCA(mrca, nodes[i]);
        if (this.isRoot(mrca)) {
          return mrca;
        }
      }
      return mrca;
    } else {
      if (node2 === undefined) {
        throw new Error(
          `No second node provided. A node must be provided if the first value is not an array`,
        );
      }
      const path1 = [...this.getPathToRoot(node1)];
      let mrca = null;

      for (const ancestor of this.getPathToRoot(node2)) {
        if (path1.includes(ancestor)) {
          mrca = ancestor;
          break;
        }
      }
      if (mrca === null) {
        throw new Error("No MRCA found");
      }
      return mrca;
    }
  }

  getPath(node1: NodeRef, node2: NodeRef): NodeRef[] {
    const path = [];
    const mrca = this.getMRCA(node1, node2);
    for (let node of [node1, node2]) {
      while (node != mrca) {
        path.push(node);
        const parent = this.getParent(node);
        node = parent;
      }
    }
    return path;
  }

  getPathLength(node1: NodeRef, node2: NodeRef): number {
    let sum = 0;
    const mrca = this.getMRCA(node1, node2);
    for (let node of [node1, node2]) {
      while (node != mrca) {
        const length = this.getLength(node);
        sum += length;
        const parent = this.getParent(node);
        node = parent;
      }
    }

    return sum;
  }

  *getPathToRoot(node: NodeRef): Generator<NodeRef> {
    let n: NodeRef = node;
    while (!this.isRoot(n)) {
      yield n;
      n = this.getParent(n);
    }
    yield n; // yield root
  }

  getNextSibling(node: NodeRef): NodeRef {
    if (!this.hasLeftSibling(node) && !this.hasRightSibling(node)) {
      throw new Error(`Node ${node.number} has no sibling`);
    }
    const parent = this.getParent(node);
    const index = (parent as Node).children.map((c) => c).indexOf(node.number);
    return this.getChild(parent, (index + 1) % this.getChildCount(parent));
  }

  hasRightSibling(node: NodeRef): boolean {
    const parent = maybeGetParent(this, node);
    switch (parent.type) {
      case MaybeType.Nothing:
        return false;
      case MaybeType.Some:
        return (
          (parent.value as Node).children.map((c) => c).indexOf(node.number) <
          this.getChildCount(parent.value) - 1
        );
    }
  }
  getRightSibling(node: NodeRef): NodeRef {
    if (!this.hasRightSibling(node)) {
      throw new Error(`node ${node.number} does not have a right sibling`);
    }
    const parent = this.getParent(node);
    const index = (parent as Node).children.map((c) => c).indexOf(node.number);
    return this.getChild(parent, index + 1);
  }
  hasLeftSibling(node: NodeRef): boolean {
    const parent = maybeGetParent(this, node);
    switch (parent.type) {
      case MaybeType.Nothing:
        return false;
      case MaybeType.Some:
        return (
          this.getChildCount(parent.value) > 1 &&
          (parent.value as Node).children.map((c) => c).indexOf(node.number) > 0
        );
    }
  }

  getLeftSibling(node: NodeRef): NodeRef {
    if (!this.hasLeftSibling(node)) {
      throw new Error(`node ${node.number} does not have a left sibling`);
    }
    const parent = this.getParent(node);
    const index = (parent as Node).children.map((c) => c).indexOf(node.number);
    return this.getChild(parent, index - 1);
  }

  getDivergence(node: NodeRef): number {
    let divergence = 0;
    for (const n of this.getPathToRoot(node)) {
      if (this.isRoot(n)) {
        // the root does not need a length but may have one
        if (this.hasBranchLength(n)) {
          divergence += this.getLength(n);
        }
      } else {
        divergence += this.getLength(n);
      }
    }
    return divergence;
  }

  getChildCount(node: NodeRef): number {
    if (!this._data.nodes.allNodes[node.number]) {
      throw new Error(`Node ${node.number} not found`);
    }
    return this._data.nodes.allNodes[node.number].children.length;
  }
  getChild(node: NodeRef, index: number): NodeRef {
    return this._data.nodes.allNodes[
      this._data.nodes.allNodes[node.number].children[index]
    ];
  }

  getParent(node: NodeRef): NodeRef {
    const parent = maybeGetParent(this, node);
    switch (parent.type) {
      case MaybeType.Some:
        return parent.value;
      case MaybeType.Nothing:
        throw new Error(`No parent for node ${node.number}`);
    }
  }
  getChildren(node: NodeRef): NodeRef[] {
    return this._data.nodes.allNodes[node.number].children.map((n) =>
      this.getNode(n),
    );
  }

  hasLabel(node: NodeRef): boolean {
    return this._data.nodes.allNodes[node.number].label !== undefined;
  }
  getLabel(node: NodeRef): string {
    const l = this._data.nodes.allNodes[node.number].label;
    if (l === undefined) {
      throw new Error(`no label for node ${node.number}`);
    }
    return l;
  }

  isExternal(node: NodeRef): boolean {
    return (this.getNode(node.number) as Node).children.length === 0;
  }
  isInternal(node: NodeRef): boolean {
    return (this.getNode(node.number) as Node).children.length > 0;
  }
  isRoot(node: NodeRef) {
    return this._data.rootNode === node.number;
  }

  addNodes(n: number = 1): { tree: ImmutableTree; nodes: NodeRef[] } {
    const newNodes: NodeRef[] = [];

    return {
      tree: produce(this, (draft) => {
        const number = draft._data.nodes.allNodes.length;
        for (let i = 0; i < n; i++) {
          const newNode: Node = {
            number: number + i,
            children: [],
            parent: undefined,
            label: undefined,
            length: undefined,
            taxon: undefined,
            annotations: {},
            _id: uuidv4(),
          };
          newNodes.push(newNode);
          draft._data.nodes.allNodes.push(newNode);
        }
      }),
      nodes: newNodes,
    };
  }

  setTaxon(node: NodeRef, taxon: Taxon): this {
    // check we know about this taxon;
    if (taxon !== this.taxonSet.getTaxonByName(taxon.name)) {
      throw new Error(
        `Taxon ${taxon.name} is either not in the taxon set. Has it been copied?`,
      );
    }
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node;
      n.taxon = taxon.number;
      draft._data.nodes.byTaxon[taxon.number] = node.number;
      draft._data.nodeToTaxon[node.number] = taxon.number;
    });
  }

  getAnnotationSummary(name: string): AnnotationSummary {
    if (
      (this._data.annotations[name] as Undefinable<AnnotationSummary>) ===
      undefined
    ) {
      throw new Error(`No annotation with name ${name} found in tree`);
    }
    return this._data.annotations[name];
  }

  getAnnotations(): AnnotationSummary[] {
    return Object.values(this._data.annotations);
  }

  getAnnotation(
    node: NodeRef,
    name: string,
    d?: AnnotationValue,
  ): AnnotationValue {
    const a = maybeGetAnnotation(this, this.getNode(node.number), name);
    if (d === undefined) {
      const { value } = UnwrapErr(
        a,
        `Node ${node.number} is not annotated with ${name}`,
      );
      return value;
    } else {
      switch (a.type) {
        case MaybeType.Some:
          return a.value.value; // value of the maybe = annotation . value of the annotation
        case MaybeType.Nothing:
          return d;
      }
    }
  }

  getFullNodeAnnotation(node: NodeRef, name: string): Annotation {
    const a = maybeGetAnnotation(this, this.getNode(node.number), name);
    return UnwrapErr(a, `Node ${node.number} is not annotated with ${name}`);
  }

  hasAnnotation(node: NodeRef, name: string): boolean {
    const a = maybeGetAnnotation(this, this.getNode(node.number), name);
    switch (a.type) {
      case MaybeType.Some:
        return true;
      case MaybeType.Nothing:
        return false;
    }
  }

  // ---------------- Setters ---------------------

  annotateNode(node: NodeRef, name: string, value: RawAnnotationValue): Tree;
  annotateNode(
    node: NodeRef,
    annotation: Record<string, RawAnnotationValue>,
  ): Tree;
  annotateNode(
    node: NodeRef,
    a: string | Record<string, RawAnnotationValue>,
    b?: RawAnnotationValue,
  ): Tree {
    if (typeof a === "string") {
      const name = a;
      const value = b as RawAnnotationValue;
      const classifiedAnnotation = processAnnotationValue(value);
      const currentSummary = this._data.annotations[
        name
      ] as Undefinable<AnnotationSummary>;
      if (currentSummary !== undefined) {
        if (currentSummary.type !== classifiedAnnotation.type) {
          throw new Error(
            `Tried annotation ${name} was parsed as ${classifiedAnnotation.type} - but is ${currentSummary.type} in tree.`,
          );
        }
      }
      return produce(this, (draft) => {
        const currentDomain = currentSummary
          ? currentSummary.domain
          : undefined;
        const domain = updateDomain(classifiedAnnotation, currentDomain);
        draft._data.nodes.allNodes[node.number].annotations[name] = {
          id: name,
          type: classifiedAnnotation.type,
          value: classifiedAnnotation.value,
        } as Annotation;
        draft._data.annotations[name] = {
          id: name,
          type: classifiedAnnotation.type,
          domain: domain,
        } as AnnotationSummary;
      });
    } else {
      // loop over entries
      let t: Tree = this as Tree;
      for (const [k, v] of Object.entries(a)) {
        t = t.annotateNode(node, k, v);
      }
      return t;
    }
  }

  //TODO handle height and divergence changes still not very happy with how these are handled.

  setHeight(node: NodeRef, height: number): this {
    if (!this.hasLengths()) {
      throw new Error(
        "Can not set the heights of nodes in a tree without branch lengths",
      );
    }
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node;
      if (height < 0) {
        throw new Error("Height must be non-negative");
      }

      const currentHeight = draft.getHeight(node);
      const change = currentHeight - height; // positive change increases length
      // height goes 2 to 3 length should decease  new length = length + (-1) childe lengths must increase

      if (n.length === undefined) {
        if (!draft.isRoot(node)) {
          throw new Error("Cannot set height on a node without length");
        }
      } else {
        n.length = n.length + change;
      }
      // update length of children
      for (const child of draft.getChildren(node)) {
        const childNode = draft.getNode(child.number) as Node;
        const newLength = draft.getLength(childNode) - change;

        childNode.length = newLength;
      }
    });
  }

  setLength(node: NodeRef, length: number): this {
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node;
      n.length = length;
      draft._data.hasLengths = true;
    });
  }
  deleteLength(node: NodeRef): this {
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node;
      n.length = undefined;
    });
  }
  // can only be called once heights are known.
  setDivergence(node: NodeRef, divergence: number): this {
    if (!this.hasLengths()) {
      throw new Error(
        "Can not set the divergences of nodes in a tree without branch lengths",
      );
    }
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node;
      const height = draft.getHeight(node);
      const rootHeight = draft.getHeight(draft.getRoot());
      const currentDivergence = rootHeight - height;
      const change = currentDivergence - divergence; // a negative change increases the length
      const l = draft.getLength(node);
      n.length = l - change;
    });
  }

  setLabel(node: NodeRef, label: string): this {
    if (
      (this._data.nodes.byLabel[label] as Undefinable<number>) !== undefined
    ) {
      throw new Error(`Duplicate node label ${label}`);
    }

    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node;
      n.label = label;
      draft._data.nodes.byLabel[label] = node.number;
    });
  }

  insertNode(n: NodeRef, proportion: number = 0.5): this {
    return produce(this, (draft) => {
      const newNode: Node = {
        number: draft._data.nodes.allNodes.length,
        children: [],
        parent: undefined,
        label: "",
        length: undefined,
        taxon: undefined,
        annotations: {}, // todo copy annotations from root
        _id: uuidv4(),
      };
      draft._data.nodes.allNodes.push(newNode);
      draft._data.nodes.byTaxon.length += 1;
      // insert halfway on first child's branch.

      const node = draft.getNode(n.number) as Node;
      const parentNode = draft.getParent(node) as Node;

      const index = parentNode.children.indexOf(node.number);

      parentNode.children.splice(index, 1, newNode.number);
      newNode.parent = parentNode.number;
      const l = draft.getLength(node);
      const oldLength = l;
      node.length = oldLength * (1 - proportion);
      newNode.length = oldLength * proportion;
      newNode.children = [node.number];

      node.parent = newNode.number;
    });
  }
  unroot(_n: NodeRef): ImmutableTree {
    // eslint-disable-line  @typescript-eslint/no-unused-vars

    throw new Error("unroot not implemented in immutable tree");
  }
  deleteNode(_n: NodeRef): ImmutableTree {
    // eslint-disable-line  @typescript-eslint/no-unused-vars

    throw new Error("deleteNode not implemented in immutable tree");
  }

  deleteClade(_n: NodeRef): ImmutableTree {
    // eslint-disable-line  @typescript-eslint/no-unused-vars

    throw new Error("deleteClade not implemented in immutable tree");
  }

  orderNodesByDensity(down: boolean, node?: NodeRef): this {
    return produce(this, (draft) => {
      if (node === undefined) {
        node = draft._data.nodes.allNodes[draft._data.rootNode];
      }
      const factor = down ? 1 : -1;
      orderNodes(draft._data, node, (_nodeA, countA, _nodeB, countB) => {
        return (countA - countB) * factor;
      });
    });
  }

  rotate(nodeRef: NodeRef, recursive: boolean = false): this {
    return produce(this, (draft) => {
      const node = draft.getNode(nodeRef.number) as Node;
      node.children = node.children.reverse();
      if (recursive) {
        for (const child of node.children.map((n) => draft.getNode(n))) {
          draft.rotate(child, recursive);
        }
      }
    });
  }
  //TODO handle lengthless tree
  reroot(node: NodeRef, proportion: number = 0.5): this {
    return produce(this, (draft) => {
      if (node.number === draft._data.rootNode) {
        // the node is the root - nothing to do
        return;
      }
      const rootNode = draft.getRoot() as Node;
      if (rootNode.children.length !== 2) {
        console.warn(
          "Root node has more than two children and we are rerooting! There be dragons!",
        );
      }
      let rootLength = 0;

      if (rootNode.children.length == 2) {
        // just sum them.
        rootLength = rootNode.children
          .map((n) => draft.getNode(n))
          .map((n) => draft.getLength(n))
          .reduce((acc, l) => l + acc, 0);
      } else {
        // we need the length of the incoming root branch
        const pathToRoot = [...draft.getPathToRoot(node)];

        const rootChild = pathToRoot[pathToRoot.length - 2]; // last one is the root
        notNull(rootChild, `Index error when looking for the root child`);
        if (!rootNode.children.includes(rootChild.number)) {
          throw new Error(
            "Root child not in path to root - likely an internal error",
          );
        }
        rootLength = draft.getLength(rootChild);
      }

      const treeNode = draft.getNode(node.number) as Node;
      if (draft.getParent(node) !== rootNode) {
        // the node is not a child of the existing root so the root is actually changing

        let node0 = treeNode;
        let parent = draft.getParent(treeNode) as Node;

        // was the node the first child in the parent's children?
        const nodeAtTop = draft.getChild(parent, 0).number === node.number;

        const rootChild1 = treeNode;
        const rootChild2 = parent;

        let oldLength = draft.getLength(parent);

        while (!draft.isRoot(parent)) {
          // remove the node that will becoming the parent from the children

          parent.children = parent.children.filter((n) => n !== node0.number);

          if (draft.getParent(parent).number === rootNode.number) {
            // at the root
            if (rootNode.children.length == 2) {
              if (
                !draft.hasLeftSibling(parent) &&
                !draft.hasRightSibling(parent)
              ) {
                throw new Error("no sibling in rerooting");
              }
              const ls = draft.hasLeftSibling(parent)
                ? draft.getLeftSibling(parent)
                : draft.getRightSibling(parent);
              // const ls = draft.getLeftSibling(parent)
              const sibling = ls as Node;
              parent.children.push(sibling.number);
              sibling.parent = parent.number;
              sibling.length = rootLength;
            } else {
              // need to add a new node here.
              const newNode: Node = {
                number: draft._data.nodes.allNodes.length,
                children: [],
                parent: undefined,
                label: "",
                length: undefined,
                taxon: undefined,
                annotations: {},
                _id: uuidv4(),
              };
              draft._data.nodes.allNodes.push(newNode);
              newNode.length = rootLength;
              parent.children.push(newNode.number);
              newNode.parent = parent.number;
              for (const childNumber of rootNode.children) {
                const child = draft.getNode(childNumber) as Node;
                if (child.number !== parent.number) {
                  child.parent = newNode.number;
                  newNode.children.push(child.number);
                }
              }
            }
          } else {
            // swap the parent and parent's parent's length around
            const nan = draft.getParent(parent) as Node; // your mammy's mammy
            const nanLength = draft.getLength(nan);
            nan.length = oldLength;
            oldLength = nanLength;

            //

            // add the new child don't update the parent yet - need for loop.
            // nan.parent = parent.number;
            parent.children.push(nan.number);
          }

          node0 = parent;

          parent = draft.getParent(parent) as Node;
        }

        // Reuse the root node as root...

        // Set the order of the children to be the same as for the original parent of the node.
        // This makes for a more visually consistent rerooting graphically.
        rootChild1.parent = rootNode.number;
        rootChild2.parent = rootNode.number;
        rootNode.children = [rootChild1.number, rootChild2.number];

        if (!nodeAtTop) {
          rootNode.children = rootNode.children.reverse();
        }
        // connect all the children to their parents which we put off above
        this.getInternalNodes().forEach((node) => {
          for (const child of draft.getChildren(node) as Node[]) {
            child.parent = node.number;
          }
        });

        const l = draft.getLength(rootChild1) * proportion;
        rootChild2.length = l;
        notNull(
          rootChild1.length,
          `Expected the root's new child to have a length`,
        );
        rootChild1.length -= l;
      } else {
        // the root is staying the same, just the position of the root changing
        const l = draft.getLength(node) * (1.0 - proportion);
        treeNode.length = l;
        const sibling = draft.getNextSibling(node) as Node;
        sibling.length = rootLength - l;
      }
      // todo reset heights.
      // traverse and get max height;
      // set all heights to max height - divergence
    });
  }
  removeChild(parent: NodeRef, child: NodeRef): this {
    return produce(this, (draft) => {
      draft._data.nodes.allNodes[parent.number].children =
        draft._data.nodes.allNodes[parent.number].children.filter(
          (n) => n !== child.number,
        );
      draft._data.nodes.allNodes[child.number].parent = -1;
    });
  }
  sortChildren(
    node: NodeRef,
    compare: (a: NodeRef, b: NodeRef) => number,
  ): this {
    return produce(this, (draft) => {
      draft._data.nodes.allNodes[node.number].children =
        this._data.nodes.allNodes[node.number].children
          .map((n) => draft.getNode(n))
          .sort(compare)
          .map((n) => n.number);
    });
  }

  addChild(parent: NodeRef, child: NodeRef): this {
    return produce(this, (draft) => {
      const c = draft.getNode(child.number) as Node;
      const p = draft.getNode(parent.number) as Node;
      p.children.push(c.number);
      c.parent = parent.number;
    });
  }

  setRoot(node: NodeRef): this {
    return produce(this, (draft) => {
      draft._data.rootNode = node.number;
    });
  }
}

/**
 * A private recursive function that rotates nodes to give an ordering provided
 * by a function.
 * @param node
 * @param ordering function that takes (a,number of tips form a, b, number of tips from b) and sorts a and be by the output.
 * @param callback an optional callback that is called each rotate
 * @returns {number}
 */
//I don't think this needs to update to the root because it is a preorder traversal or is it postorder anyway it's a traversal that probably works
function orderNodes(
  treeData: ImmutableTreeData,
  node: NodeRef,
  ordering: (
    a: NodeRef,
    numberOfATips: number,
    b: NodeRef,
    numberOfBTips: number,
  ) => number,
): number {
  let count = 0;
  if (treeData.nodes.allNodes[node.number].children.length > 0) {
    // count the number of descendents for each child
    const counts = new Map<number, number>();
    for (const child of treeData.nodes.allNodes[node.number].children.map(
      (n) => treeData.nodes.allNodes[n],
    )) {
      const value = orderNodes(treeData, child, ordering);
      counts.set(child.number, value);
      count += value;
    }
    // sort the children using the provided function
    const reorderedChildren = treeData.nodes.allNodes[node.number].children
      .slice()
      .sort((a, b) => {
        // sort updates the array in place so changed is always false
        return ordering(
          treeData.nodes.allNodes[a],
          unNullify(
            counts.get(a),
            `Internal error when ordering. Counts not defined.`,
          ),
          treeData.nodes.allNodes[b],
          unNullify(
            counts.get(b),
            `Internal error when ordering. Counts not defined.`,
          ),
        );
      });

    const changed = reorderedChildren.reduce(
      (acc: boolean, n: number, i: number) =>
        acc || n !== treeData.nodes.allNodes[node.number].children[i],
      true,
    );
    if (changed) {
      treeData.nodes.allNodes[node.number].children = reorderedChildren;
    }
  } else {
    count = 1;
  }
  return count;
}

export function* preOrderIterator(
  tree: Tree,
  node: NodeRef | undefined = undefined,
): Generator<NodeRef> {
  const traverse = function* (node: NodeRef): Generator<NodeRef> {
    yield tree.getNode(node.number); // get from tree so we keep proxy when used in draft
    const childCount = tree.getChildCount(node);
    if (childCount > 0) {
      for (let i = 0; i < childCount; i++) {
        const child = tree.getChild(node, i);
        yield* traverse(child);
      }
    }
  };
  if (node === undefined) {
    node = tree.getRoot();
  }

  yield* traverse(node);
}

//TODO return the node and edge length of direction
export function* psuedoRootPreOrderIterator(
  tree: Tree,
  node: NodeRef | undefined = undefined,
  sort: (a: NodeRef, b: NodeRef) => number = (a, b) => a.number - b.number,
): Generator<NodeRef> {
  const traverse = function* (
    node: NodeRef,
    visited: number | undefined = undefined,
  ): Generator<NodeRef> {
    yield tree.getNode(node.number); // get from tree so we keep proxy when used in draft
    const branches = [...tree.getChildren(node), tree.getParent(node)].filter(
      (n) => n.number !== visited,
    ); //
    branches.sort(sort);
    for (const branch of branches) {
      yield* traverse(branch, node.number);
    }
  };

  if (node === undefined) {
    node = tree.getRoot();
  }
  yield* traverse(node);
}

export function* psuedoRootPostOrderIterator(
  tree: Tree,
  node: NodeRef | undefined = undefined,
  sort: (a: NodeRef, b: NodeRef) => number = (a, b) => a.number - b.number,
): Generator<NodeRef> {
  const traverse = function* (
    node: NodeRef,
    visited: number | undefined = undefined,
  ): Generator<NodeRef> {
    // get from tree so we keep proxy when used in draft
    const branches = [...tree.getChildren(node), tree.getParent(node)].filter(
      (n) => n.number !== visited,
    );
    branches.sort(sort);
    for (const branch of branches) {
      yield* traverse(branch, node.number);
    }
    yield tree.getNode(node.number);
  };

  if (node === undefined) {
    node = tree.getRoot();
  }
  yield* traverse(node);
}
export function* postOrderIterator(
  tree: Tree,
  node: NodeRef | undefined = undefined,
): Generator<NodeRef> {
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

export function* tipIterator(tree: Tree, node?: NodeRef): Generator<NodeRef> {
  if (node === undefined) {
    node = tree.getRoot();
  }
  const traverse = function* (node: NodeRef): Generator<NodeRef> {
    const childCount = tree.getChildCount(node);
    if (childCount > 0) {
      for (let i = 0; i < childCount; i++) {
        const child = tree.getChild(node, i);
        yield* traverse(child);
      }
    } else {
      yield node;
    }
  };
  yield* traverse(node);
}

export function* pathToRootIterator(
  tree: Tree,
  node: NodeRef,
): Generator<NodeRef> {
  let n: NodeRef = node;
  while (!tree.isRoot(n)) {
    yield n;
    n = tree.getParent(n);
  }
  yield n; // gibe the root at the end
}

function updateDomain(
  annotation: { type: BaseAnnotationType; value: AnnotationValue },
  currentDomain: AnnotationDomain | undefined,
): AnnotationDomain {
  switch (annotation.type) {
    case BaseAnnotationType.BOOLEAN:
      return [true, false];

    case BaseAnnotationType.DISCRETE: {
      const value = annotation.value as string;
      if (currentDomain !== undefined) {
        const curr = currentDomain as DomainOf<BaseAnnotationType.DISCRETE>;
        return [...new Set([...curr, value])].sort();
      } else {
        return [value];
      }
    }
    case BaseAnnotationType.NUMERICAL: {
      const value = annotation.value as number;
      const curr = currentDomain ? (currentDomain as [number, number]) : [];
      return extent([...curr, value]) as [number, number];
    }

    case BaseAnnotationType.DISCRETE_SET: {
      const value = annotation.value as string[];
      const curr = currentDomain ? (currentDomain as string[]) : [];
      return [...new Set([...curr, ...value])].sort();
    }

    case BaseAnnotationType.NUMERICAL_SET: {
      const value = annotation.value as number[];
      const curr = currentDomain ? (currentDomain as [number, number]) : [];
      return extent([...curr, ...value]) as [number, number];
    }

    case BaseAnnotationType.DENSITIES: {
      if (currentDomain !== undefined) {
        const curr = currentDomain as DomainOf<BaseAnnotationType.DENSITIES>;
        return [...new Set([...curr, ...Object.keys(annotation.value)])].sort();
      } else {
        return [...new Set(Object.keys(annotation.value))]
          .sort()
          .filter((d) => d);
      }
    }

    case BaseAnnotationType.MARKOV_JUMPS: {
      const value = (annotation.value as MarkovJumpValue[]).reduce<string[]>(
        (acc: string[], d: MarkovJumpValue) => acc.concat([d.to, d.from]),
        [],
      );
      const curr = currentDomain ? (currentDomain as string[]) : [];
      return [...new Set([...curr, ...value])].sort();
    }

    default:
      throw new Error(`Unrecognized type  when updating domain`);
  }
}
