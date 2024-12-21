import { ImmutableTree } from "../../NormalizedTree"
import { Taxon, TaxonSet } from "../../Taxa/Taxon"
import { NodeRef } from "../../Tree.types"
import { parseAnnotation } from "../AnnotationParser"

export class NexusImporter {
  reader: ReadableStreamDefaultReader<string>
  taxonSet: TaxonSet | undefined
  currentBlock: string | undefined
  hasTree: boolean | undefined
  options: { labelName?: string }

  translateTaxonMap: Map<string, Taxon> | undefined

  constructor(
    stream: ReadableStream<any>,
    options: { labelName?: string } = {},
  ) {

    const nexusTransformer = new TransformStream(transformerOptions())

    this.reader = stream
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(nexusTransformer)
      .getReader();

    this.taxonSet = undefined
    this.currentBlock = undefined
    this.options = options
  }

  async *getTrees(): AsyncIterableIterator<ImmutableTree> {
    while (this.currentBlock !== "trees") {
      await this.parseNextBlock()
      this.hasTree = true
    }
    yield* this.parseTreesBlock()
  }

  private async parseNextBlock() {
    const blockName = await this.getNextBlockName()
    switch (blockName) {
      case "taxa":
        this.currentBlock = "taxa"
        await this.parseTaxaBlock()
        break
      case "trees":
        this.currentBlock = "trees"
        break
      default:
        console.log(
          `skipping block ${blockName}. Only parsing blocks are taxa and trees for now.`,
        )
        await this.readToEndOfBlock()
    }
  }

  private async nextToken() {
    const { done, value } = await this.reader.read()
    if (done) {
      throw "unexpectedly hit the end of the stream"
    }
    return value
  }
  //make skip and then a list of regex to skip
  private async skipSemiColon() {
    const { done, value } = await this.reader.read()
    if (done) {
      throw "unexpectedly hit the end of the stream"
    }
    if (!value.match(/;$/)) {
      throw `expected ";" got ${value}`
    }
  }

  private async getNextBlockName() {
    while (true) {
      const value = await this.nextToken()

      if (value.match(/\bbegin/i)) {
        const token = await this.nextToken()
        this.skipSemiColon()
        return token
      }
    }
  }

  private async readToEndOfBlock() {
    while (true) {
      const value = await this.nextToken()
      if (value.match(/\bend;/i)) {
        break
      }
    }
  }

  private async getNextCommand(command: RegExp) {
    while (true) {
      const value = await this.nextToken()
      if (value === ";") {
        throw `Hit ; looking for ${command}`
      }
      if (command.test(value)) {
        return value
        break
      }
    }
  }
  // skip until match and return match
  private async skipUntil(stopper: RegExp) {
    while (true) {
      const value = await this.nextToken()
      if (stopper.test(value)) {
        return value
      }
    }
  }
  // read up to match return everything up to including the match
  private async readUntil(stopper: RegExp) {
    let buffer = ""
    while (true) {
      const value = await this.nextToken()
      if (stopper.test(value)) {
        return buffer + value
      }
      buffer += value
    }
  }
  private async parseTaxaBlock() {
    let ntax
    let command = await this.skipUntil(/dimensions|taxlabels|end/i)
    while (true) {
      switch (true) {
        case /dimensions/i.test(command):
          const taxaLine = await this.readUntil(/;/)
          const ntaxa = taxaLine.match(/ntax=(\d+);/)
          if (ntaxa) {
            ntax = parseInt(ntaxa[1])
          } else {
            throw `Expected dimension in form of ntax=(\d+);. Got ${taxaLine}`
          }
          break
        case /taxlabels/i.test(command):
          let token = await this.nextToken()
          this.taxonSet = new TaxonSet()
          while (token !== ";") {
            this.taxonSet.addTaxon(token)
            token = await this.nextToken()
          }
          if (ntax) {
            if (ntax != this.taxonSet.getTaxonCount()) {
              throw `found ${this.taxonSet.getTaxonCount()} taxa. Expected: ${ntax}}`
            }
          }
          break
        case /end/i.test(command):
          if (this.taxonSet!.getTaxonCount() === 0) {
            throw "hit end of taxa section but didn't find any taxa"
          }
          this.skipSemiColon()
        default:
          throw `Reached impossible code looking for dimensions or taxlabels in taxa block "${command}"`
      }
      command = await this.skipUntil(/dimensions|taxlabels|end/i)
    }
  }

  private async *parseTreesBlock() {
    let token
    let keepGoing = true;
    while (keepGoing) {
      let command = await this.skipUntil(/translate|tree|end/i);
      switch (true) {
        case /translate/i.test(command):
          // all white space removed by tranformStream so will be
          // ['key','taxon,'] but may be ['key','taxon',','] if space tween taxa and ,
          this.translateTaxonMap = new Map()
          let newTaxonSet = false
          if (!this.taxonSet) {
            this.taxonSet = new TaxonSet()
            newTaxonSet = true
          }
          let i = 0
          let key
          token = await this.nextToken()
          while (token !== ";") {
            if (i % 2 == 0) {
              key = token
            } else {
              if (token[token.length - 1] === ",") {
                token = token.slice(0, -1)
              }
              // todo get taxa to add here.
              if (!newTaxonSet) {
                if (this.taxonSet.getTaxonByName(token) === undefined) {
                  throw `Taxon ${token} not found in taxa block - but found in translate block`
                }
              } else {
                //new taxon set so add it;
                this.taxonSet.addTaxon(token)
              }
              const taxon = this.taxonSet.getTaxonByName(token)
              this.translateTaxonMap.set(key!, taxon)
            }
            token = await this.nextToken()
            while (token === ",") {
              token = await this.nextToken()
            } //incase some white space in there
            i++
          }
          break
        case /tree/i.test(command):
          //parse tree
          // put this in loop so the next call parses the next tree;

          // first token will be tree id
          // then possible annotation
          // Then =
          // then possible annotations
          // then tree
          const treeId = await this.nextToken()//todo - read to'=' not just next token
          // read to first '(';
          token = await this.skipUntil(/\(/)
          let buffer = token
            .split(newickDeliminators)
            .filter((n) => n.length > 0)
            .reverse()

          let level = 0
          let currentNode: NodeRef | undefined = undefined
          let nodeStack: NodeRef[] = []
          let labelNext = false
          let lengthNext = false

          let tree = new ImmutableTree({ taxonSet: this.taxonSet })

          while (token !== ";") {
            while (buffer.length > 0) {
              const t = buffer.pop()!
              if (t.length > 2 && t.substring(0, 2) === "[&") {
                const annotations = parseAnnotation(t)

                tree = tree.annotateNode(currentNode!, annotations)
              } else if (t === "(") {
                // an internal node

                if (labelNext) {
                  // if labelNext is set then the last bracket has just closed
                  // so there shouldn't be an open bracket.
                  throw new Error("expecting a comma")
                }
                let node
                level += 1
                if (currentNode !== undefined) {
                  const added = tree.addNodes(1)
                  tree = added.tree
                  node = added.nodes[0]
                  nodeStack.push(currentNode)
                } else {
                  node = tree.getRoot()
                }
                currentNode = node
              } else if (t === ",") {
                // another branch in an internal node

                labelNext = false // labels are optional
                if (lengthNext) {
                  throw new Error("branch length missing")
                }

                let parent = nodeStack.pop()! as NodeRef
                tree = tree.addChild(parent, currentNode!)
                // tree.setParent(currentNode!,parent)

                currentNode = parent
              } else if (t === ")") {
                if (level === 0) {
                  throw new Error(
                    "the brackets in the newick file are not balanced: too many closed",
                  )
                }
                // finished an internal node

                labelNext = false // labels are optional
                if (lengthNext) {
                  throw new Error("branch length missing")
                }

                // the end of an internal node
                let parent = nodeStack.pop()! as NodeRef
                tree = tree.addChild(parent, currentNode!)
                // tree.setParent(currentNode!,parent)

                level -= 1
                currentNode = parent

                labelNext = true
              } else if (t === ":") {
                labelNext = false // labels are optional
                lengthNext = true
              } else {
                // not any specific token so may be a label, a length, or an external node name
                if (lengthNext) {
                  tree = tree.setLength(currentNode!, parseFloat(t))
                  lengthNext = false
                } else if (labelNext) {
                  if (!t.startsWith("#")) {
                    let value: number | any = parseFloat(t)
                    if (isNaN(value)) {
                      value = t
                    }
                    if (this.options.labelName) {
                      let label_annotation = {
                        name: this.options.labelName,
                        value: value,
                      }
                      tree = tree.annotateNode(currentNode!, label_annotation)
                    } else {
                      console.warn(
                        `No label name provided to newick parser but found label ${t}. It will be ignored`,
                      )
                    }
                  } else {
                    tree = tree.setLabel(currentNode!, t.slice(1)) //remove the # todo put it back when writing to newick
                  }
                  labelNext = false
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

                  const added = tree.addNodes(1)
                  tree = added.tree
                  const externalNode = added.nodes[0]
                  let taxon: Taxon
                  if (this.translateTaxonMap) {
                    if (this.translateTaxonMap.has(name)) {
                      taxon = this.translateTaxonMap.get(name)!
                    } else {
                      throw `No mapping found for ${name} in tipNameMap. It's name will not be updated`
                    }
                  } else if (this.taxonSet) {
                    taxon = this.taxonSet.getTaxonByName(name)
                    if (taxon === undefined) {
                      throw `Taxon ${name} not found in taxa - but found in tree`
                    }
                  } else {
                    tree.addTaxon(name) //does this affect immutability - using the first tree as a taxon set.
                    taxon = tree.getTaxonByName(name)!
                  }

                  tree = tree.setTaxon(externalNode, taxon)

                  if (currentNode) {
                    nodeStack.push(currentNode)
                  }
                  currentNode = externalNode
                }
              }
            }
            // get next token from reader
            token = await this.nextToken()
            buffer = token
              .split(newickDeliminators)
              .filter((n) => n.length > 0)
              .reverse()
          }
          if (level > 0) {
            throw new Error(`unexpected semi-colon in tree: ${treeId}`)
          }
          if (this.taxonSet === undefined) {
            this.taxonSet === tree
          }
          yield tree
          break
        case /end/i.test(command):
          this.skipSemiColon()
          this.hasTree = false
          // Give up the ghost.
          //TODO read to the end of the file.
          this.reader.releaseLock();
          keepGoing=false;
          break
        default:
          throw `Reached impossible code in treeblock block "${command}"`
      }
    }
  }
}

//TODO make these enums
const STATUS = {
  PARSING: "parsing",
  IN_SINGLE_QUOTE: "in single quote",
  IN_DOUBLE_QUOTE: "in double quote",
  IN_COMMENT: "in comment",
}
const ENDCHAR = {
  SINGLE_QUOTE: "'",
  DOUBLE_QUOTE: '"',
  IN_COMMENT: "]",
}

function transformerOptions() {
  return {
    lastChunk: "",
    status: STATUS.PARSING,
    end: "",
    start() {},
    transform(chunk: string, controller: { enqueue: (arg0: string) => void }) {
      // not really any but we'll see
      let data = this.lastChunk + chunk
      const tokens = []
      let buffer = ""
      for (let i = 0; i < data.length; i++) {
        const char = data[i]
        if (this.status === STATUS.PARSING) {
          // on the look out for quotes and comments
          ;[this.status, this.end] = getStatusAndEnd(char)
          if (this.status === STATUS.IN_COMMENT) {
            // clear the buffer and send the comment separate
            if (buffer.length > 0) {
              controller.enqueue(buffer) //pass it on
            }
            buffer = ""
          }
        } else if (char === this.end) {
          this.status = STATUS.PARSING
          this.end = ""
        }
        // if not in quote and hit a space then send it on.
        if (this.status === STATUS.PARSING && /\s|;|\]/.test(char)) {
          if (buffer.length > 0) {
            if (/\]/.test(char)) {
              buffer += char
            } // close the comment and pass
            controller.enqueue(buffer) //pass it on
            buffer = ""
          }
          if (/;/.test(char)) {
            controller.enqueue(char) // sent the ';'
          }
        } else {
          buffer += char
        }
      }
      this.lastChunk = buffer
    },
    flush(controller: any) {
      if (this.lastChunk) {
        controller.enqueue(this.lastChunk)
      }
    },
  }
}

function getStatusAndEnd(char: string) {
  if (char === "'") {
    return [STATUS.IN_SINGLE_QUOTE, "'"]
  }
  if (char === '"') {
    return [STATUS.IN_DOUBLE_QUOTE, '"']
  }
  if (char === "[") {
    return [STATUS.IN_COMMENT, "]"]
  }
  return [STATUS.PARSING, ""]
}
const newickDeliminators = /\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/
