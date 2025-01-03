import { ImmutableTree } from "../../NormalizedTree"
import { Taxon, TaxonSet } from "../../Taxa/Taxon"

import { NewickCharacterParser } from "../NewickCharacterParser"

export class NexusImporter {
  reader: ReadableStreamDefaultReader<string>
  taxonSet: TaxonSet
  currentBlock: string | undefined
  hasTree: boolean | undefined
  options: { labelName?: string }
  translateTaxonMap: Map<string, string> | undefined
  constructor(
    stream: ReadableStream<any>,
    options: { labelName?: string } = {},
  ) {
    const nexusTransformer = new TransformStream(transformerOptions())

    this.reader = stream
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(nexusTransformer)
      .getReader()

    this.taxonSet = new TaxonSet()
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
    let keepGoing = true
    while (keepGoing) {
      let command = await this.skipUntil(/dimensions|taxlabels|end/i)
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
          this.taxonSet.lockTaxa() // no more taxa can be added since we parsed a block;
          this.skipSemiColon()
          keepGoing = false
          break
        default:
          throw `Reached impossible code looking for dimensions or taxlabels or end in taxa block "${command}"`
      }
    }
  }

  private async *parseTreesBlock() {
    let token
    let keepGoing = true
    while (keepGoing) {
      let command = await this.skipUntil(/translate|tree|end/i)
      switch (true) {
        case /translate/i.test(command):
          // all white space removed by tranformStream so will be
          // ['key','taxon,'] but may be ['key','taxon',','] if space tween taxa and ,
          this.translateTaxonMap = new Map()
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
              if (this.taxonSet.finalized) {
                if (this.taxonSet.getTaxonByName(token) === undefined) {
                  throw `Taxon ${token} not found in taxa block - but found in translate block`
                }
              } else {
                //new taxon set so add it;
                this.taxonSet.addTaxon(token)
              }
              // const taxon = this.taxonSet.getTaxonByName(token)
              this.translateTaxonMap.set(key!, token)
            }
            token = await this.nextToken()
            while (token === ",") {
              token = await this.nextToken()
            } //incase some white space in there
            i++
          }
          this.taxonSet.lockTaxa()
          break
        case /tree/i.test(command):
          //parse tree
          // put this in loop so the next call parses the next tree;

          // first token will be tree id
          // then possible annotation
          // Then =
          // then possible annotations
          // then tree
          const treeId = await this.nextToken() //todo - read to'=' not just next token
          const parser = new NewickCharacterParser(this.taxonSet,{translateTaxonNames:this.translateTaxonMap})
          // read to first '(';
          token = await this.skipUntil(/\(/)
          let buffer = token
            .split(newickDeliminators)
            .filter((n) => n.length > 0)
            .reverse()
          while (!parser.isDone()) {
            while (buffer.length > 0) {
              const c = buffer.pop()
              parser.parseCharacter(c!)
            }
            if (!parser.isDone()) {
              // get next token
              token = await this.nextToken()
              buffer = token
                .split(newickDeliminators)
                .filter((n) => n.length > 0)
                .reverse()
            }
          }
          const tree = parser.getTree()
          yield tree
          break
        case /end/i.test(command):
          this.skipSemiColon()
          this.hasTree = false
          // Give up the ghost.
          //TODO read to the end of the file.
          this.reader.releaseLock()
          keepGoing = false
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
