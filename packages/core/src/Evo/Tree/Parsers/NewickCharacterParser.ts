import type { Taxon} from "../Taxa/Taxon";
import { TaxonSet } from "../Taxa/Taxon"
import type { NodeRef } from "../Tree.types"
import { ImmutableTree } from "../NormalizedTree/ImmutableTree"
import { parseAnnotation } from "./AnnotationParser"
import { notNull } from "../../../utils";

export class NewickCharacterParser {
  done: boolean
  started: boolean
  level: number
  currentNode: NodeRef | undefined
  nodeStack: NodeRef[]
  labelNext: boolean
  lengthNext: boolean
  taxonSet: TaxonSet
  tree: ImmutableTree
  options: { labelName?: string; translateTaxonNames?: Map<string, string> }
  constructor(
    taxonSet: TaxonSet=new TaxonSet(),
    options: {
      labelName?: string
      translateTaxonNames?: Map<string, string>
    } = {},
  ) {
    this.done = false
    this.started = false
    this.level = 0
    this.currentNode = undefined
    this.nodeStack = []
    this.labelNext = false
    this.lengthNext = false
    this.taxonSet = taxonSet;
    this.options = options;
    this.tree = new ImmutableTree({ taxonSet: this.taxonSet });
  }
  isDone() {
    return this.done
  }
  isStarted() {
    return this.started
  }
  getTree(): ImmutableTree {
    if(!this.done){
        throw new Error ("expecting a semi-colon at the end of the newick string")
    }
    if(!this.started){
         throw new Error ("No tree to give - parsing has not started.");
    }
    //set hights

    return this.tree;
  }

  parseCharacter(t: string): void {
    if(this.done){
        throw ("Parsing is done. We have seen a ';'")
    }
    if (t.length > 2 && t.substring(0, 2) === "[&") {
      const annotations = parseAnnotation(t)

      // for(const annotation of annotations){
        notNull(this.currentNode,"Internal Parsing error - Current not is not defined")
        this.tree = this.tree.annotateNode(this.currentNode, annotations) as ImmutableTree
      // }
      

    } else if (t === ";") {
        // check if done.
        //set done.
        if (this.level > 0) {
            throw new Error(`unexpected semi-colon in tree did not reach the root yet`)
          }
          if(!this.started){
            throw new Error(`unexpected semi-colon in tree parsing has not started yet`)
        }
        this.done = true;
    } else if (t === "(") {
      // an internal node
        this.started=true;
      if (this.labelNext) {
        // if labelNext is set then the last bracket has just closed
        // so there shouldn't be an open bracket.
        throw new Error("expecting a comma")
      }
      let node
      this.level += 1
      if (this.currentNode !== undefined) {
        const added = this.tree.addNodes(1)
        this.tree = added.tree
        node = added.nodes[0]
        this.nodeStack.push(this.currentNode)
      } else {
        node = this.tree.getRoot()
      }
      this.currentNode = node
    } else if (t === ",") {
      // another branch in an internal node

      this.labelNext = false // labels are optional
      if (this.lengthNext) {
        throw new Error("branch length missing")
      }

      const parent = this.nodeStack.pop()!
      notNull(this.currentNode,"Internal Parsing error - Current not is not defined")
      this.tree = this.tree.addChild(parent, this.currentNode)
      // tree.setParent(currentNode!,parent)

      this.currentNode = parent
    } else if (t === ")") {
      if (this.level === 0) {
        throw new Error(
          "the brackets in the newick file are not balanced: too many closed",
        )
      }
      // finished an internal node

      this.labelNext = false // labels are optional
      if (this.lengthNext) {
        throw new Error("branch length missing")
      }

      // the end of an internal node
      const parent = this.nodeStack.pop()!
      notNull(this.currentNode,"Internal Parsing error - Current not is not defined")
      this.tree = this.tree.addChild(parent, this.currentNode)
      // tree.setParent(currentNode!,parent)

      this.level -= 1
      this.currentNode = parent

      this.labelNext = true
    } else if (t === ":") {
      this.labelNext = false // labels are optional
      this.lengthNext = true
    } else {
      // not any specific token so may be a label, a length, or an external node name
      if (this.lengthNext) {
        notNull(this.currentNode,"Internal Parsing error - Current not is not defined")
        this.tree = this.tree._setLength(this.currentNode, parseFloat(t))
        this.lengthNext = false
      } else if (this.labelNext) {
        if (!t.startsWith("#")) {
          let value: number |string  = parseFloat(t)
          if (isNaN(value)) {
            value = t
          }
          if (this.options.labelName) {

            notNull(this.currentNode,"Internal Parsing error - Current not is not defined")
            this.tree = this.tree.annotateNode(
              this.currentNode,
             this.options.labelName,
             value
            ) as ImmutableTree
          } else {
            console.warn(
              `No label name provided to newick parser but found label ${t}. It will be ignored`,
            )
          }
        } else {
          notNull(this.currentNode,"Internal Parsing error - Current not is not defined")
          this.tree = this.tree.setLabel(this.currentNode, t.slice(1)) //remove the # todo put it back when writing to newick
        }
        this.labelNext = false
      } else {
        let name = t // TODO tree needs be a map that's not the ID

        // remove any quoting and then trim whitespace
        // TODO add to bit that parses taxa block
        if (name.startsWith('"') || name.startsWith("'")) {
          name = name.substr(1)
        }
        if (name.endsWith('"') || name.endsWith("'")) {
          name = name.substr(0, name.length - 1)
        }
        name = name.trim()

        const added = this.tree.addNodes(1)
        this.tree = added.tree
        const externalNode = added.nodes[0]
        let taxon: Taxon
        if (this.options.translateTaxonNames) {
          if (this.options.translateTaxonNames.has(name)) {
            name = this.options.translateTaxonNames.get(name)!
          } else {
            throw `No mapping found for ${name} in tipNameMap. It's name will not be updated`
          }
        }
        
        if (this.taxonSet.isFinalized) {
          // if set then it will be finalised by now.
          taxon = this.taxonSet.getTaxonByName(name)
          if (taxon === undefined) {
            // hmm trees won't have
            throw `Taxon ${name} not found in taxa - but found in tree`
          }
        } else {
          this.taxonSet.addTaxon(name)
          taxon = this.taxonSet.getTaxonByName(name)!
        }

        this.tree = this.tree.setTaxon(externalNode, taxon)

        if (this.currentNode) {
          this.nodeStack.push(this.currentNode)
        }
        this.currentNode = externalNode
      }
    }
  }
}
