import type { Taxon, TaxonSet } from "./taxa/taxon";

/**
 * The base interface for a node.
 * Information about the node will be provided by the tree.
 */
export interface NodeRef {
  number: number;
  _id: string;
}
/**
 * Types of annotations that can exist on nodes in a tree.
 * Each type corresponds to a value type.
 */
export enum BaseAnnotationType {
  DISCRETE = "DISCRETE", // string  could also be stringy numbers
  BOOLEAN = "BOOLEAN", // true false
  NUMERICAL = "NUMERICAL", // float

  NUMERICAL_SET = "NUMERICAL_SET", // number[]
  DISCRETE_SET = "DISCRETE_SET", // string[]

  MARKOV_JUMPS = "MARKOV_JUMPS", // {from: to: time:}
  DENSITIES = "DENSITIES", // Record<string, number>
}
export type MarkovJumpValue = { from: string; to: string; time?: number };

// A helper type function that returns the value type of an annotation given its
// figtree type.
export type ValueOf<T extends BaseAnnotationType> =
  T extends BaseAnnotationType.DISCRETE
    ? string
    : T extends BaseAnnotationType.BOOLEAN
      ? boolean
      : T extends BaseAnnotationType.NUMERICAL
        ? number
        : T extends BaseAnnotationType.NUMERICAL_SET
          ? number[]
          : T extends BaseAnnotationType.DISCRETE_SET
            ? string[]
            : T extends BaseAnnotationType.MARKOV_JUMPS
              ? MarkovJumpValue[]
              : T extends BaseAnnotationType.DENSITIES
                ? Record<string, number>
                : never;

// A helper function that returns the raw value type that corresponds to a figtreejs annotation type.
// This generally is the same as the value type, but some annotations such as markov jumps are transformed
// between being read from a nexus file and stored in the tree.
export type RawValueOf<T extends BaseAnnotationType> =
  T extends BaseAnnotationType.DISCRETE
    ? string
    : T extends BaseAnnotationType.BOOLEAN
      ? boolean
      : T extends BaseAnnotationType.NUMERICAL
        ? number
        : T extends BaseAnnotationType.NUMERICAL_SET
          ? number[]
          : T extends BaseAnnotationType.DISCRETE_SET
            ? string[]
            : T extends BaseAnnotationType.MARKOV_JUMPS
              ?
                  | [number, string, string][]
                  | [string, string, string][]
                  | [number, string, string, string][]
                  | [string, string, string, string][]
              : T extends BaseAnnotationType.DENSITIES
                ? Record<string, number>
                : never;

/**
 *  A helper type function that returns the domain of an annotation based on the
 * type of an annotation.
 */
export type DomainOf<T extends BaseAnnotationType> =
  T extends BaseAnnotationType.DISCRETE
    ? string[]
    : T extends BaseAnnotationType.BOOLEAN
      ? [boolean, boolean]
      : T extends BaseAnnotationType.NUMERICAL
        ? [number, number]
        : T extends BaseAnnotationType.NUMERICAL_SET
          ? [number, number]
          : T extends BaseAnnotationType.DISCRETE_SET
            ? string[] | number[]
            : T extends BaseAnnotationType.MARKOV_JUMPS
              ? string[] // just locations
              : T extends BaseAnnotationType.DENSITIES
                ? string[] // just states
                : never;

/** A single, generic annotation, discriminated by `type`. */
export type AbstractAnnotation<T extends BaseAnnotationType> = {
  id: string;
  type: T;
  value: ValueOf<T>;
};

export type Annotation = {
  [K in BaseAnnotationType]: AbstractAnnotation<K>;
}[BaseAnnotationType];

/**
 * The type of summary information that can be provided by a tree.
 */
export interface AbstractAnnotationSummary<T extends BaseAnnotationType> {
  id: string;
  type: T;
  domain: DomainOf<T>;
}

/**
 * unions across all types of annotations.
 */
export type AnnotationDomain = {
  [K in BaseAnnotationType]: DomainOf<K>;
}[BaseAnnotationType];

export type AnnotationValue = {
  [K in BaseAnnotationType]: ValueOf<K>;
}[BaseAnnotationType];

export type AnnotationSummary = {
  [K in BaseAnnotationType]: AbstractAnnotationSummary<K>;
}[BaseAnnotationType];

export type RawAnnotationValue = {
  [K in BaseAnnotationType]: RawValueOf<K>;
}[BaseAnnotationType];

/**
 * A object for the parsing options available for importing a newick string.
 * dateFormat : string if provided with date prefix the data will be parsed from the taxon label and stored in an annotation called 'date'
 * datePrefix : string The character immediately preceding the date assuming the date is at the end of the taxon label
 * labelName : If there are node labels they will be parsed as annotations and stored with this annotation name
 * tipNameMap : If taxon are present as number or some other encoding this map will be used to insert the full taxon name.
 * taxonSet : If provided this taxon set will be used to link taxa across trees.
 */
export interface newickParsingOptions {
  dateFormat?: string;
  datePrefix?: string;
  labelName?: string;
  parseAnnotations?: boolean;
  tipNameMap?: Map<string, string>;
  taxonSet?: TaxonSet;
}
/**
 * A representation of a phylogenetic tree.
 * Trees may represent unrooted tree, but all trees nominally have a root node.
 * Functions do not return 'undefined' or 'null'.
 * If a value that does not exist is accessed the tree will throw an error.
 * Helper functions are provided to check if a value exists.
 */
export interface Tree {
  /**
   * Return the root of the tree.
   */
  getRoot(): NodeRef;
  // isRooted(): boolean;
  /**
   * Return the number of nodes in the tree.
   */
  getNodeCount(): number;
  /**
   * Return the number of internal nodes.
   */
  getInternalNodeCount(): number;
  /**
   * Return the number of tips / external nodes
   */
  getExternalNodeCount(): number;
  /**
   * Get Node by name/label, taxon, or index (in full node list)
   * @param i: string | Taxon | number
   */
  getNode(i: string | Taxon | number): NodeRef;
  /**
   * Get an array of internal nodes
   */
  getInternalNodes(): NodeRef[];
  /**
   * Get an array of external nodes
   */
  getExternalNodes(): NodeRef[];
  /**
   * Get an array of all nodes.
   */
  getNodes(): NodeRef[];
  /**
   * Get the taxon affiliated with a node or by it's index
   * @param id: number | NodeRef
   */
  getTaxon(id: number | NodeRef): Taxon;
  /**
   * Helper to function to determine if a node in an external node
   * @param node
   */
  isExternal(node: NodeRef): boolean;
  /**
   * A helper function to determine if an node is an internal node
   * @param node
   */
  isInternal(node: NodeRef): boolean;
  /**
   * A helper function to determine if a node is the root node.
   * @param node
   */
  isRoot(node: NodeRef): boolean;
  /**
   * Return the number of children an given node has.
   * @param node
   */
  getChildCount(node: NodeRef): number;
  /**
   * Access the ith child of a node
   * @param node - NodeRef
   * @param i - index of the child
   */
  getChild(node: NodeRef, i: number): NodeRef;
  /**
   * An explicit function to get a node by it's Taxon
   * @param taxon
   */
  getNodeByTaxon(taxon: Taxon): NodeRef;
  /**
   * An explicit function to access a node by it's label
   * @param label - string
   */
  getNodeByLabel(label: string): NodeRef;
  // getLevel(node:NodeRef):number;
  /**
   * Return the distance from this node to the root.
   * @param node -NodeRef
   */
  getDivergence(node: NodeRef): number;
  /**
   * Return the distance between a node and the node furthest from the root
   * @param node -NodeRef
   */
  getHeight(node: NodeRef): number;
  /**
   * Return the length of the branch subtending a node
   * @param node -NodeRef
   */
  getLength(node: NodeRef): number;
  /**
   * Return a node's parent
   * @param node -NodeRef
   */
  getParent(node: NodeRef): NodeRef;
  /**
   * Get an array of the node's children
   * @param node -NodeRef
   */
  getChildren(node: NodeRef): NodeRef[];
  /**
   * Get the annotation value for a node.
   * If the default value is not provided, and the node is not annotated, the function will throw an error.
   * @param node - NodeRef
   * @param name - string the name of the annotation
   * @param d - AnnotationValue - The default value to return if the node does not have the provided annotation.
   */
  getAnnotation(
    node: NodeRef,
    name: string,
    d?: AnnotationValue,
  ): AnnotationValue; // what about or undefined?
  /**
   * Annotate a node with a value.
   * @param node - NodeRef
   * @param name -string - Name of the annotation
   * @param value - the annotation value for a node.
   */
  annotateNode(node: NodeRef, name: string, value: RawAnnotationValue): Tree;
  annotateNode(
    node: NodeRef,
    annotation: Record<string, RawAnnotationValue>,
  ): Tree;
  /**
   * Get the label for a given node
   * @param node
   */
  getLabel(node: NodeRef): string;
  /**
   * Check if a node has a label
   * @param node
   */
  hasLabel(node: NodeRef): boolean;
  /**
   * Get all the names of annotations in the tree
   */
  getAnnotationKeys(): string[];
  /**
   * Get the type of an annotation found in the tree.
   * @param name string - Name of the annotation
   */
  getAnnotationType(name: string): BaseAnnotationType;

  /**
   * Return an array of summary data for all annotations in the tree.
   */
  getAnnotations(): AnnotationSummary[];
  /**
   * Return a summary of an annotation in the tree
   * @param name - name of the annotation
   */
  getAnnotationSummary(name: string): AnnotationSummary;
  /**
   * Add nodes to a tree.
   * The nodes can be accessed by their indices, but have no relationships with other nodes in the tree.
   * Returns an object with {tree: the new tree with nodes,node: An array of the new nodes}
   * @param n - number of nodes to add default 1
   */
  addNodes(n?: number): { tree: Tree; nodes: NodeRef[] };
  /**
   * Remove a node from the tree topology.
   * The node still exists, and is known to the tree, it is just removed from the topology
   * It is not possible to delete the root node.
   * @param n - NodeRef
   */
  removeNode(n: NodeRef): Tree;
  /**
   * Remove a node and its descendants from the tree topology.
   * The node still exists, and is known to the tree, it is just removed from the topology
   * It is not possible to delete the root node.
   * @param n - NodeRef
   */
  removeClade(n: NodeRef): Tree;
  /**
   * Remove a child node from a parent node's descendants
   * @param parent - The node whose child will be removed
   * @param child - The child that is removed from the parent.
   */
  removeChild(parent: NodeRef, child: NodeRef): Tree;
  // deleteClade(n: NodeRef): Tree;
  // hasNextSibling(node:Node)
  /**
   * Get the next sibling.
   * This will wrap back to the first sibling if the provided node is the last sibling.
   * @param node - NodeRef
   */
  getNextSibling(node: NodeRef): NodeRef;
  /**
   * A checker function to determine if a node has a right sibling
   * @param node - NodeRef
   */
  hasRightSibling(node: NodeRef): boolean;
  /**
   * Return a node's right sibling (if it has one) or error.
   * @param node
   */
  getRightSibling(node: NodeRef): NodeRef;
  /**
   * Check if a node has a left sibling
   * @param node
   */
  hasLeftSibling(node: NodeRef): boolean;
  /**
   * Return a node's left sibling (if it has one) or throw an error.
   * @param node
   */
  getLeftSibling(node: NodeRef): NodeRef;

  /**
   * Set the distance between a node and the node furthest from the root.
   * @param node
   * @param height number - the new node height
   */
  setHeight(node: NodeRef, height: number): Tree;
  /**
   * Set the distance between a node and the root node.
   * @param node
   * @param divergence number - new divergence
   */
  setDivergence(node: NodeRef, divergence: number): Tree;
  /**
   * Set the length of the branch subtending a node
   * @param node NodeRef
   * @param length - number - the new length
   */
  setLength(node: NodeRef, length: number): Tree;
  /**
   * Assign a taxon to a node.
   * @param node NodRef
   * @param taxon Taxon
   */
  setTaxon(node: NodeRef, taxon: Taxon): Tree;
  /**
   * Set the label on a node.
   * @param node Noderf
   * @param label string
   */
  setLabel(node: NodeRef, label: string): Tree;
  /**
   * Add a child to a node.
   * @param parent the parent that gets a new child
   * @param child The child added to a parent
   */
  addChild(parent: NodeRef, child: NodeRef): Tree;
  // root(node: NodeRef,portion:number): Tree
  // unroot(node: NodeRef): Tree;

  /**
   *
   * @param node - An optional node start writing from. If not provided the whole tree will be written.
   * @param options { includeAnnotations: boolean } - include annotations in newick string
   */
  toNewick(node?: NodeRef, options?: { includeAnnotations: boolean }): string;
  /**
   * Sort children arrays by the number of offspring.
   * @param down Boolean to sort down or up.
   */
  orderNodesByDensity(down: boolean): Tree;
  /**
   *
   * @param node Node whose children will be sorted
   * @param compare - A function which compares two nodes. Will be used as in an array sort
   */
  sortChildren(
    node: NodeRef,
    compare: (a: NodeRef, b: NodeRef) => number,
  ): Tree;
  /**
   * Get the most recent common ancestor of two nodes
   * @param node1
   * @param node2
   */
  getMRCA(node1: NodeRef, node2: NodeRef): NodeRef;
  /**
   * Get the most recent common ancestor of an array of nodes
   * @param nodes
   */
  getMRCA(nodes: NodeRef[]): NodeRef;
  /**
   * Rotate a node's children
   * @param node
   * @param recursive - rotate the children as well down the tree
   */
  rotate(node: NodeRef, recursive: boolean): Tree;
  /**
   * Reroot a tree along a branch subtending a new node.
   * @param node The root will be inserted along the branch subtending this node
   * @param proportion - proportion along the branch to place the root.
   */
  reroot(node: NodeRef, proportion: number): Tree;
}

export type TreeListener = (tree: Tree, node: NodeRef) => void;
