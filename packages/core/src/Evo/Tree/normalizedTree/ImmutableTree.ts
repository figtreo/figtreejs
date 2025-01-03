import { extent } from "d3-array"
import {
  Annotation,
  AnnotationType,
  NodeRef,
  Tree,
  newickParsingOptions,
} from "../Tree.types"
import { parseNewick, processAnnotationValue } from "../Parsers"
import { immerable, produce } from "immer"
import { Taxon, TaxonSet, TaxonSetInterface } from "../Taxa/Taxon"
import { format } from "d3-format"

//TODO will need to think about taxonsets and immutability.
interface Node extends NodeRef {
  number: number
  taxon: number | undefined
  label: string | undefined
  children: number[]
  parent: number | undefined
  length: number | undefined
  level: number | undefined
  annotations: { [annotation: string]: string | string[] | number | number[] }
  _id: symbol // an id so we can mark updates to root when topology changes
}

interface ImmutableTreeData {
  nodes: {
    allNodes: Node[]
    byTaxon: number[]
    byLabel: {
      [label: string]: number
    }
  }
  heights:[];
  nodeToTaxon: number[]
  rootNode: number
  is_rooted: boolean

  annotations: { [annotation: string]: Annotation }
}

export class ImmutableTree implements Tree, TaxonSetInterface {
  //TODO remove the TaxonSetInterface implementation.
  [immerable] = true

  _data: ImmutableTreeData
  taxonSet: TaxonSetInterface
  constructor(
    input: { data?: ImmutableTreeData; taxonSet?: TaxonSetInterface } = {},
  ) {
    let { data, taxonSet } = input || {}
    if (taxonSet) {
      this.taxonSet = taxonSet
    } else {
      this.taxonSet = new TaxonSet()
    }
    if (data === undefined) {
      data = {
        nodes: {
          allNodes: [
            {
              number: 0,
              children: [],
              parent: undefined,
              label: "",
              length: undefined,
              level: undefined,
              taxon: undefined,
              annotations: {},
              _id: Symbol(),
            },
          ],
          byTaxon: [],
          byLabel: {},
        },
        nodeToTaxon: [],
        rootNode: 0,
        is_rooted: true,
        annotations: {},
        heights:[]
      }
    }
    this._data = data
  }
  lockTaxa(): TaxonSetInterface {
    this.taxonSet.lockTaxa()
    return this
  }
  addTaxon(name: string): ImmutableTree {
    this.taxonSet.addTaxon(name)
    return this
  }
  getTaxonByName(name: string): Taxon {
    return this.taxonSet.getTaxonByName(name)
  }
  getTaxonCount(): number {
    return this.taxonSet.getTaxonCount()
  }

  getTaxonSet(): TaxonSetInterface {
    return this.taxonSet
  }
  // Parsers and constructors

  static fromNewick(
    newick: string,
    options: newickParsingOptions = {},
  ): ImmutableTree {
    // const tree = new this()
    return parseNewick(newick, options)
  }
  static fromNexus(
    nexus: string,
    options?: newickParsingOptions | undefined,
  ): ImmutableTree {
    const tree = new this()
    // return parseNexus(tree, nexus, options)
    throw new Error("Nexus parsing not implemented")
  }
  static fromString(
    string: string,
    options?: newickParsingOptions | undefined,
  ): ImmutableTree {
    if (string.toLowerCase().includes("#nexus")) {
      return this.fromNexus(string, options)
    } else {
      return this.fromNewick(string, options)
    }
  }

  // ------------------ Getters ----------------------

  isRooted(): boolean {
    return this._data.is_rooted
  }
  getAnnotationType(name: string): AnnotationType | undefined {
    if (this._data.annotations[name] === undefined) {
      return undefined
    }
    return this._data.annotations[name].type
  }

  getAnnotationKeys(): string[] {
    return Object.keys(this._data.annotations)
  }

  getAnnotationSummary(annotation: string): Annotation {
    return this._data.annotations[annotation]
  }
  getRoot(): NodeRef {
    return this._data.nodes.allNodes[this._data.rootNode]
  }
  getNodeCount(): number {
    return this._data.nodes.allNodes.length
  }
  getInternalNodeCount(): number {
    return this._data.nodes.allNodes.filter((n) => n.children.length > 0).length
  }
  getExternalNodeCount(): number {
    return this._data.nodes.allNodes.filter((n) => n.children.length == 0)
      .length
  }
  getInternalNodes(): NodeRef[] {
    return this._data.nodes.allNodes.filter((n) => n.children.length > 0)
  }
  getExternalNodes(): NodeRef[] {
    return this._data.nodes.allNodes.filter((n) => n.children.length == 0)
  }
  getNodes(): NodeRef[] {
    return this._data.nodes.allNodes
  }
  getNode(i: string | number | Taxon): NodeRef {
    if (typeof i === "number") {
      return this._data.nodes.allNodes[i]
    } else if (i instanceof Taxon) {
      return this.getNodeByTaxon(i)!
    } else if (typeof i === "string") {
      const taxon = this.getTaxonByName(i)
      if (taxon) {
        return this.getNodeByTaxon(taxon)!
      } else {
        const node = this.getNodeByLabel(i)
        if (node) {
          return node
        }
      }
    }
    throw `Node ${i} not found`
  }

  getTaxonFromNode(node: NodeRef): Taxon | undefined {
    const taxaIndex = this._data.nodeToTaxon[node.number]
    if (taxaIndex === undefined) {
      return undefined
    }
    return this.taxonSet.getTaxon(taxaIndex)
  }
  getTaxon(id: number): Taxon | undefined {
    return this.taxonSet.getTaxon(id)
  }

  hasNodeHeights(): boolean {
    throw new Error("hasNodeHeights not implemented.")
  }
  //todo cache
  getHeight(node: NodeRef): number {
    const divMap: number[] = []
    let maxDiv = 0
    for (const node of preOrderIterator(this)) {
      if(this.isRoot(node)){
        divMap[node.number] = 0;
        continue;
      }
      const nodeDiv = this.getLength(node)! + divMap[this.getParent(node)!.number]
      divMap[node.number] = nodeDiv
      if (nodeDiv > maxDiv) {
        maxDiv = nodeDiv
      }
    }
  return maxDiv-divMap[node.number];
  }
  hasBranchLength(node: NodeRef): number {
    throw new Error("hasBranchLength not implemented.")
  }
  getLength(node: NodeRef): number | undefined {
    const length = (node as Node).length
    return length
  }

  _toString(node: NodeRef, blFormat = format("0.2")): string {
    // pass formating on
    return (
      (this.getChildCount(node) > 0
        ? `(${this.getChildren(node)
            .map((child) => this._toString(child))
            .join(",")})${this.getLabel(node) ? "#" + this.getLabel(node) : ""}`
        : `${
            this.getTaxonFromNode(node) ? this.getTaxonFromNode(node)!.name : ""
          }`) +
      (this.getLength(node) ? `:${blFormat(this.getLength(node)!)}` : "")
    )
  }

  toNewick(node?: NodeRef, options?: { includeAnnotations: boolean }): string {
    if (options === undefined) {
      options = { includeAnnotations: false }
    }
    if (node === undefined) {
      if (this.getRoot() === undefined) {
        throw new Error("No root node and no node provided to newick generator")
      }
      node = this.getRoot()
    }

    return this._toString(node!) + ";"
  }

  getMRCA(node1: NodeRef, node2: NodeRef): NodeRef {
    const path1 = [...this.getPathToRoot(node1)]

    let mrca = null
    for (const ancestor of this.getPathToRoot(node2)) {
      if (path1.includes(ancestor)) {
        mrca = ancestor
        break
      }
    }
    if (mrca === null) {
      throw new Error("No MRCA found")
    }
    return mrca
  }

  getPath(node1: NodeRef, node2: NodeRef): NodeRef[] {
    const path = []
    const mrca = this.getMRCA(node1, node2)
    for (let node of [node1, node2]) {
      while (node != mrca && node != undefined) {
        path.push(node)
        const parent = this.getParent(node)
        if (parent === undefined) {
          throw new Error("No parent - hit root but not mrca?")
        }
        node = parent
      }
    }
    return path
  }

  getPathLength(node1: NodeRef, node2: NodeRef): number {
    let sum = 0
    const mrca = this.getMRCA(node1, node2)
    for (let node of [node1, node2]) {
      while (node != mrca) {
        const length = this.getLength(node)
        if (length === undefined) {
          throw new Error("No length on node")
        }
        sum += length
        const parent = this.getParent(node)
        if (parent === undefined) {
          throw new Error("No parent - hit root but not mrca?")
        }
        node = parent
      }
    }

    return sum
  }

  *getPathToRoot(node: NodeRef): Generator<NodeRef> {
    let n: NodeRef | undefined = node
    while (n !== undefined) {
      yield n
      n = this.getParent(n)
    }
  }
  getNextSibling(node: NodeRef): NodeRef | undefined {
    const parent =
      this._data.nodes.allNodes[this._data.nodes.allNodes[node.number].parent!]
    const index = parent.children.map((c) => c).indexOf(node.number)
    if (this.getChildCount(this.getParent(node)!) === 1) {
      console.warn(`Node ${node.number} has only no sibling`)
      return undefined
    } else if (index === this.getChildCount(this.getParent(node)!) - 1) {
      return this.getChild(this.getParent(node)!, 0)
    } else {
      return this.getChild(this.getParent(node)!, index + 1)
    }
  }

  getRightSibling(node: NodeRef): NodeRef | undefined {
    const parent =
      this._data.nodes.allNodes[this._data.nodes.allNodes[node.number].parent!]
    const index = parent.children.map((c) => c).indexOf(node.number)
    if (this.getChildCount(this.getParent(node)!) === 1) {
      console.warn(`Node ${node.number} has no sibling`)
      return undefined
    } else if (index === this.getChildCount(this.getParent(node)!) - 1) {
      return undefined
    } else {
      return this.getChild(this.getParent(node)!, index + 1)
    }
  }
  getLeftSibling(node: NodeRef): NodeRef | undefined {
    const parent =
      this._data.nodes.allNodes[this._data.nodes.allNodes[node.number].parent!]
    const index = parent.children.map((c) => c).indexOf(node.number)
    if (this.getChildCount(this.getParent(node)!) === 1) {
      console.warn(`Node ${node.number} has no sibling`)
      return undefined
    } else if (index === 0) {
      return undefined
    } else {
      return this.getChild(this.getParent(node)!, index - 1)
    }
  }

  getDivergence(node: NodeRef): number {
    return this.getHeight(this.getRoot()) - this.getHeight(node)
  }

  getChildCount(node: NodeRef): number {
    return this._data.nodes.allNodes[node.number].children.length
  }
  getChild(node: NodeRef, index: number): NodeRef {
    return this._data.nodes.allNodes[
      this._data.nodes.allNodes[node.number].children[index]
    ]
  }
  getParent(node: NodeRef): NodeRef | undefined {
    const parentId = this._data.nodes.allNodes[node.number].parent
    if (parentId === undefined) {
      return undefined
    } else {
      return this._data.nodes.allNodes[parentId]
    }
  }
  getChildren(node: NodeRef): NodeRef[] {
    return this._data.nodes.allNodes[node.number].children.map((n) =>
      this.getNode(n),
    )
  }

  getAnnotation(node: NodeRef, name: string): any | undefined {
    return (this.getNode(node.number) as Node).annotations[name]
  }
  getLabel(node: NodeRef): string | undefined {
    return this._data.nodes.allNodes[node.number].label
  }

  getLevel(node: NodeRef): number {
    return this._data.nodes.allNodes[node.number].level!
  }
  isExternal(node: NodeRef): boolean {
    return (this.getNode(node.number) as Node).children.length === 0
  }
  isInternal(node: NodeRef): boolean {
    return (this.getNode(node.number) as Node).children.length > 0
  }
  isRoot(node: NodeRef) {
    return this._data.rootNode === node.number
  }
  getNodeByTaxon(taxon: Taxon): NodeRef | undefined {
    return this.getNode(this._data.nodes.byTaxon[taxon.number])
  }

  getNodeByLabel(label: string): NodeRef | undefined {
    return this.getNode(this._data.nodes.byLabel[label])
  }

  addNodes(n: number = 1): { tree: ImmutableTree; nodes: NodeRef[] } {
    const newNodes: NodeRef[] = []

    return {
      tree: produce(this, (draft) => {
        const number = draft._data.nodes.allNodes.length
        for (let i = 0; i < n!; i++) {
          const newNode = {
            number: number + i,
            children: [],
            parent: undefined,
            label: "",
            length: undefined,
            divergence: undefined,
            height: undefined,
            name: undefined,
            level: undefined,
            taxon: undefined,
            annotations: {},
            _id: Symbol(),
          }
          newNodes.push(newNode)
          draft._data.nodes.allNodes.push(newNode)
        }
      }),
      nodes: newNodes,
    }
  }

  setTaxon(node: NodeRef, taxon: Taxon): ImmutableTree {
    // check we know about this taxon;
    if (taxon !== this.taxonSet.getTaxonByName(taxon.name)) {
      throw new Error(`Taxon ${taxon.name} not in the taxon set`)
    }
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node
      n.taxon = taxon.number
      draft._data.nodes.byTaxon[taxon.number] = node.number
      draft._data.nodeToTaxon[node.number] = taxon.number
    })
  }

  getAnnotationDomain(
    name: string,
  ): [number, number] | [boolean, boolean] | string[] | number[] | undefined {
    if (this._data.annotations[name] === undefined) {
      return undefined
    }
    return this._data.annotations[name].domain
  }

  annotateNode(
    node: NodeRef,
    annotation: { name: string; value: any },
  ): ImmutableTree
  annotateNode(
    node: NodeRef,
    annotation: { [name: string]: any },
  ): ImmutableTree
  annotateNode(
    node: NodeRef,
    annotation: { name: string; value: any }[],
  ): ImmutableTree

  annotateNode(
    node: NodeRef,
    annotation:
      | { name: string; value: any }
      | { name: string; value: any }[]
      | { [name: string]: any },
  ): ImmutableTree {
    if (Array.isArray(annotation)) {
      return this._annotateNodeFromArrary(node, annotation)
    } else {
      if (annotation.name && annotation.value) {
        return this._annotateNodeFromNameValue(
          node,
          annotation as { name: string; value: any },
        )
      } else {
        return this._annotateNodeFromObject(node, annotation)
      }
    }
  }

  // ---------------- Setters ---------------------

  //TODO handle height and divergence changes still not very happy with how these are handled.


  setHeight(node: NodeRef, height: number): ImmutableTree {
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node
      if(height < 0){
        throw new Error("Height must be non-negative")
      }

      const currentHeight = draft.getHeight(node);
      const change = currentHeight-height; // positive change increases length
      n.length=n.length!+change;
  })}

  setLength(node: NodeRef, length: number): ImmutableTree {
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node
      n.length = length;
    })
  }
  // can only be called once heights are known.
  setDivergence(node: NodeRef, divergence: number): ImmutableTree {
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node
      const height = draft.getHeight(node);
      const rootHeight = draft.getHeight(draft.getRoot());
      const currentDivergence = rootHeight-height;
      const change = currentDivergence-divergence;// a negative change increases the length
      n.length=n.length!-change;
  })}

  setLabel(node: NodeRef, label: string): ImmutableTree {
    if (this._data.nodes.byLabel[label] !== undefined) {
      throw new Error(`Duplicate node label ${label}`)
    }

    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node
      n.label = label
      draft._data.nodes.byLabel[label] = node.number
    })
  }

  _setLength(node: NodeRef, length: number): ImmutableTree {
    return produce(this, (draft) => {
      const n = draft.getNode(node.number) as Node
      n.length = length
    })
  }



  // Topology changes  - updates to root and descendants

  root(n: NodeRef): ImmutableTree {
    throw new Error("root not implemented in immutable tree")
  }
  unroot(n: NodeRef): ImmutableTree {
    throw new Error("unroot not implemented in immutable tree")
  }
  deleteNode(n: NodeRef): ImmutableTree {
    throw new Error("deleteNode not implemented in immutable tree")
  }

  deleteClade(n: NodeRef): ImmutableTree {
    throw new Error("deleteClade not implemented in immutable tree")
  }

  orderNodesByDensity(down: boolean, node?: NodeRef): ImmutableTree {
    return produce(this, (draft) => {
      if (node === undefined) {
        if (draft._data.rootNode === undefined) {
          throw new Error(
            "No root node and no node provided to density ordering",
          )
        }
        node = draft._data.nodes.allNodes[draft._data.rootNode]
      }
      const factor = down ? 1 : -1
      orderNodes(draft._data, node, (nodeA, countA, nodeB, countB) => {
        return (countA - countB) * factor
      })
    })
  }

  rotate(nodeRef: NodeRef, recursive: boolean = false): ImmutableTree {
    return produce(this, (draft) => {
      const node = draft.getNode(nodeRef.number) as Node
      node.children = node.children.reverse()
      if (recursive) {
        for (const child of node.children.map((n) => draft.getNode(n))) {
          draft.rotate(child, recursive)
        }
      }
    })
  }
  //TODO infinte loop
  reroot(node: NodeRef, proportion: number): ImmutableTree {
    return produce(this, (draft) => {
      if (node.number === draft._data.rootNode) {
        // the node is the root - nothing to do
        return draft
      }
      if (draft._data.rootNode === undefined) {
        throw new Error("No root node in this tree to begin with")
      }
      const rootNode = draft.getRoot() as Node
      if (rootNode.children.length !== 2) {
        console.warn(
          "Root node has more than two children and we are rerooting! There be dragons!",
        )
      }
      let rootLength = 0

      if (rootNode.children.length == 2) {
        // just sum them.
        rootLength = rootNode.children
          .map((n) => draft.getNode(n))
          .map((n) => draft.getLength(n))
          .reduce((acc, l) => l! + acc!, 0)!
      } else {
        // we need the length of the incoming root branch
        const pathToRoot = [...draft.getPathToRoot(node)]
        const rootChild = pathToRoot[pathToRoot.length - 2] // last one is the root
        if (!rootNode.children.includes(rootChild.number)) {
          throw new Error(
            "Root child not in path to root - likely an internal error",
          )
        }
        rootLength = draft.getLength(rootChild)!
      }

      const treeNode = draft.getNode(node.number) as Node
      if (draft.getParent(node) !== rootNode) {
        // the node is not a child of the existing root so the root is actually changing

        let node0 = treeNode
        let parent = draft.getParent(treeNode)! as Node

        if (!parent) {
          throw new Error("no parent")
        }

        // was the node the first child in the parent's children?
        const nodeAtTop = draft.getChild(parent, 0).number === node.number

        const rootChild1 = treeNode
        const rootChild2 = parent

        let oldLength = draft.getLength(parent)!

        while (draft.getParent(parent) !== undefined) {
          // remove the node that will becoming the parent from the children

          parent.children = parent.children.filter((n) => n !== node0.number)

          if (draft.getParent(parent)!.number === rootNode.number) {
            // at the root
            if (rootNode.children.length == 2) {
              const ls = draft.getLeftSibling(parent)
              const sibling = ls
                ? (ls as Node)
                : (draft.getRightSibling(parent) as Node)

              if (!sibling) {
                console.log(parent.number)
                console.log(
                  draft
                    .getChildren(draft.getParent(parent)!)
                    .map((d) => d.number),
                )
                throw new Error("no sibling in rerooting")
              }
              parent.children.push(sibling.number)
              sibling.parent = parent.number
              sibling.length = rootLength
            } else {
              // need to add a new node here.
              const newNode: Node = {
                number: draft._data.nodes.allNodes.length,
                children: [],
                parent: undefined,
                label: "",
                length: undefined,
                taxon: undefined,
                level: undefined,
                annotations: {},
                _id: Symbol(),
              }
              draft._data.nodes.allNodes.push(newNode)
              newNode.length = rootLength
              parent.children.push(newNode.number)
              newNode.parent = parent.number
              for (const childNumber of rootNode.children) {
                const child = draft.getNode(childNumber) as Node
                if (child.number !== parent.number) {
                  child.parent = newNode.number
                  newNode.children.push(child.number)
                }
              }
            }
          } else {
            // swap the parent and parent's parent's length around
            const nan = draft.getParent(parent)! as Node // your mammy's mammy
            if (!nan) {
              throw new Error("no nan!")
            }
            const nanLength = draft.getLength(nan)!
            nan.length = oldLength
            oldLength = nanLength

            //

            // add the new child don't update the parent yet - need for loop.
            // nan.parent = parent.number;
            parent.children.push(nan.number)
          }

          node0 = parent

          parent = draft.getParent(parent)! as Node
        }

        // Reuse the root node as root...

        // Set the order of the children to be the same as for the original parent of the node.
        // This makes for a more visually consistent rerooting graphically.
        rootChild1.parent = rootNode.number
        rootChild2.parent = rootNode.number
        rootNode.children = [rootChild1.number, rootChild2.number]

        if (!nodeAtTop) {
          rootNode.children = rootNode.children.reverse()
        }
        // connect all the children to their parents which we put off above
        this.getInternalNodes().forEach((node) => {
          for (const child of draft.getChildren(node) as Node[]) {
            child.parent = node.number
          }
        })

        const l = draft.getLength(rootChild1)! * proportion
        rootChild2.length = l
        rootChild1.length! -= l
      } else {
        // the root is staying the same, just the position of the root changing
        const l = draft.getLength(node)! * (1.0 - proportion)
        treeNode.length = l
        const sibling = draft.getNextSibling(node)! as Node
        sibling.length = rootLength - l
      }
      // todo reset heights.
      // traverse and get max height;
      // set all heights to max height - divergence

    })
  }
  removeChild(parent: NodeRef, child: NodeRef): ImmutableTree {
    return produce(this, (draft) => {
      draft._data.nodes.allNodes[parent.number].children =
        draft._data.nodes.allNodes[parent.number].children.filter(
          (n) => n !== child.number,
        )
      draft._data.nodes.allNodes[child.number].parent = -1
    })
  }
  sortChildren(
    node: NodeRef,
    compare: (a: NodeRef, b: NodeRef) => number,
  ): ImmutableTree {
    return produce(this, (draft) => {
      draft._data.nodes.allNodes[node.number].children =
        this._data.nodes.allNodes[node.number].children
          .map((n) => draft.getNode(n))
          .sort(compare)
          .map((n) => n.number)
    })
  }

  addChild(parent: NodeRef, child: NodeRef): ImmutableTree {
    return produce(this, (draft) => {
      const c = draft.getNode(child.number) as Node
      const p = draft.getNode(parent.number) as Node
      p.children.push(c.number)
      c.parent = parent.number
    })
  }

  setRoot(node: NodeRef): ImmutableTree {
    return produce(this, (draft) => {
      draft._data.rootNode = node.number
    })
  }

  _checkAnnotation(input: {
    name: string
    suggestedType: AnnotationType
  }): AnnotationType {
    let annotationType = this.getAnnotationType(input.name)
    let suggestedType = input.suggestedType

    if (!annotationType) {
      return suggestedType
    } else if (annotationType === suggestedType) {
      return annotationType
    } else if (annotationType !== suggestedType) {
      if (
        (suggestedType === AnnotationType.INTEGER &&
          annotationType === AnnotationType.CONTINUOUS) ||
        (suggestedType === AnnotationType.CONTINUOUS &&
          annotationType === AnnotationType.INTEGER)
      ) {
        // upgrade to float
        return AnnotationType.CONTINUOUS
      }
      if (
        suggestedType === AnnotationType.RANGE &&
        annotationType === AnnotationType.SET
      ) {
        return AnnotationType.RANGE
      }
      if (
        suggestedType === AnnotationType.SET &&
        annotationType === AnnotationType.RANGE
      ) {
        return AnnotationType.RANGE
      }
    }

    throw new Error(
      `Annotation ${input.name} has type ${suggestedType} but previously seen as ${annotationType}`,
    )
  }

  _getUpdatedDomain(annotation: {
    id: string
    value: any
    type: AnnotationType
  }): [number, number] | string[] | number[] | [boolean, boolean] {
    const domain = this.getAnnotationDomain(annotation.id)
    // const type = this.getAnnotationType(annotation.id);
    let newDomain = domain
    switch (annotation.type) {
      case AnnotationType.CONTINUOUS: {
        if (domain === undefined) {
          newDomain = [annotation.value, annotation.value]
        } else {
          newDomain = extent([...domain, annotation.value]) as [number, number]
        }
        break
      }
      case AnnotationType.INTEGER || AnnotationType.DISCRETE: {
        if (domain === undefined) {
          newDomain = [annotation.value]
        } else {
          newDomain = [...new Set([...domain, annotation.value])]
          newDomain.sort()
        }
        break
      }
      case AnnotationType.BOOLEAN: {
        newDomain = [true, false]
        break
      }
      case AnnotationType.PROBABILITIES: {
        newDomain = [0, 1]
        break
      }
      case AnnotationType.MARKOV_JUMP: {
        if (domain === undefined) {
          newDomain = [annotation.value.to, annotation.value.from]
        } else {
          newDomain = [
            ...new Set([...domain, annotation.value.to, annotation.value.from]),
          ]
        }
        newDomain.sort()
        break
      }
      case AnnotationType.DISCRETE: {
        if (domain === undefined) {
          newDomain = [annotation.value]
        } else {
          newDomain = [...new Set([...domain, annotation.value])]
          newDomain.sort()
        }
        break
      }
      case AnnotationType.SET: {
        if (domain === undefined) {
          newDomain = [annotation.value]
        } else {
          newDomain = [...new Set([...domain, annotation.value])]
          newDomain.sort()
        }
        break
      }
      case AnnotationType.RANGE: {
        if (domain === undefined) {
          newDomain = extent(annotation.value) as unknown as [number, number]
        } else {
          newDomain = extent([...domain, ...annotation.value]) as unknown as [
            number,
            number,
          ]
        }
        break
      }
      default: {
        throw new Error(`Unknown annotation type ${annotation.type}`)
      }
    }
    return newDomain!
  }

  _annotateNodeFromNameValue(
    node: NodeRef,
    annotation: { name: string; value: any; type?: AnnotationType },
  ): ImmutableTree {
    return produce(this, (draft) => {
      annotateNodeHelper(draft, node, annotation)
    })
  }
  _annotateNodeFromArrary(
    node: NodeRef,
    annotation: { name: string; value: any; type?: AnnotationType }[],
  ): ImmutableTree {
    return produce(this, (draft) => {
      for (const a of annotation) {
        annotateNodeHelper(draft, node, a)
      }
    })
  }

  _annotateNodeFromObject(
    node: NodeRef,
    annotation: { [name: string]: any },
  ): ImmutableTree {
    return produce(this, (draft) => {
      for (const a in annotation) {
        if (annotation[a].type && annotation[a].value) {
          annotateNodeHelper(draft, node, {
            name: a,
            value: annotation[a].value,
            type: annotation[a].type,
          })
        } else {
          annotateNodeHelper(draft, node, { name: a, value: annotation[a] })
        }
      }
    })
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
  let count = 0
  if (treeData.nodes.allNodes[node.number].children.length > 0) {
    // count the number of descendents for each child
    const counts = new Map()
    for (const child of treeData.nodes.allNodes[node.number].children.map(
      (n) => treeData.nodes.allNodes[n],
    )) {
      const value = orderNodes(treeData, child, ordering)
      counts.set(child.number, value)
      count += value
    }
    // sort the children using the provided function
    const reorderedChildren = treeData.nodes.allNodes[node.number].children
      .slice()
      .sort((a, b) => {
        // sort updates the array in place so changed is always false
        return ordering(
          treeData.nodes.allNodes[a],
          counts.get(a),
          treeData.nodes.allNodes[b],
          counts.get(b),
        )
      })

    let changed = false
    reorderedChildren.forEach((n: number, i: number) => {
      if (n !== treeData.nodes.allNodes[node.number].children[i]) {
        changed = true
      }
    })
    if (changed) {
      treeData.nodes.allNodes[node.number].children = reorderedChildren
    }
  } else {
    count = 1
  }
  return count
}

function annotateNodeHelper(
  tree: ImmutableTree,
  node: NodeRef,
  annotation: { name: string; value: any; type?: AnnotationType },
): void {
  const suggestedType = annotation.type
    ? annotation
    : processAnnotationValue(annotation.value)
  let checkedType = tree._checkAnnotation({
    name: annotation.name,
    suggestedType: suggestedType.type!,
  })
  tree._data.nodes.allNodes[node.number].annotations[annotation.name] =
    suggestedType.value
  const domain = tree._getUpdatedDomain({
    id: annotation.name,
    value: annotation.value,
    type: checkedType,
  })
  tree._data.annotations[annotation.name] = {
    id: annotation.name,
    domain,
    type: checkedType,
  }
}

export function* preOrderIterator(
  tree: Tree,
  node: NodeRef | undefined = undefined,
): Generator<NodeRef> {
  const traverse = function* (node: NodeRef): Generator<NodeRef> {
    yield tree.getNode(node.number) // get from tree so we keep proxy when used in draft
    const childCount = tree.getChildCount(node)
    if (childCount > 0) {
      for (let i = 0; i < childCount; i++) {
        const child = tree.getChild(node, i)
        yield* traverse(child)
      }
    }
  }
  if (node === undefined) {
    node = tree.getRoot()
    if (node === undefined) {
      throw new Error("Tree has no root node. Cannot traverse tree")
    }
  }

  yield* traverse(node!)
}

export function* postOrderIterator(
  tree: Tree,
  node: NodeRef | undefined = undefined,
): Generator<NodeRef> {
  const traverse = function* (node: NodeRef): Generator<NodeRef> {
    const childCount = tree.getChildCount(node)
    if (childCount > 0) {
      for (let i = 0; i < childCount; i++) {
        const child = tree.getChild(node, i)
        yield* traverse(child)
      }
    }
    yield node
  }
  if (node === undefined) {
    node = tree.getRoot()
    if (node === undefined) {
      throw new Error("Tree has no root node. Cannot traverse tree")
    }
  }

  yield* traverse(node!)
}

export function* tipIterator(tree: Tree, node: NodeRef): Generator<NodeRef> {
  const traverse = function* (node: NodeRef): Generator<NodeRef> {
    const childCount = tree.getChildCount(node)
    if (childCount > 0) {
      for (let i = 0; i < childCount; i++) {
        const child = tree.getChild(node, i)
        yield* traverse(child)
      }
    } else {
      yield node
    }
  }
  yield* traverse(node)
}

export function* pathToRootIterator(
  tree: Tree,
  node: NodeRef,
): Generator<NodeRef> {
  let n: NodeRef | undefined = node
  while (n !== undefined) {
    yield n
    n = tree.getParent(n)
  }
}
