import { ImmutableTree } from "../NormalizedTree"
import { TaxonSet } from "../Taxa/Taxon"

class nexusImporter {
    reader: ReadableStreamDefaultReader<string>
    utf8Decoder: TextDecoder
    nexusTransformer: TransformStream<string, string>
    taxonSet: TaxonSet|undefined;
    currentBlock: string|undefined
  constructor(stream: ReadableStream<Uint8Array>) {
    this.utf8Decoder = new TextDecoder("utf-8")
    this.nexusTransformer = new TransformStream(transformerOptions())

    this.reader = stream
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(this.nexusTransformer)
      .getReader()

      this.taxonSet = undefined;
      this.currentBlock = undefined;
  }

  async nextToken() {
    const { done, value } = await this.reader.read()
    if (done) {
      throw "unexpectedly hit the end of the stream"
    }
    return value
  }
  //make skip and then a list of regex to skip
  async skipSemiColon() {
    const { done, value } = await this.reader.read()
    if (done) {
      throw "unexpectedly hit the end of the stream"
    }
    if (!value.match(/;$/)) {
      throw `expected ";" got ${value}`
    }
  }

  async getNextBlockName() {
    while (true) {
      const value = await this.nextToken()

      if (value.match(/\bbegin/i)) {
        const token = await this.nextToken()
        this.skipSemiColon()
        return token
      }
    }
  }

  async readToEndOfBlock() {
    while (true) {
      const value = await this.nextToken()
      if (value.match(/\bend;/i)) {
        break
      }
    }
  }

  async getNextCommand(command:RegExp) {
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
  async skipUntil(stopper:RegExp) {
    while (true) {
      const value = await this.nextToken()
      if (stopper.test(value)) {
        return value
      }
    }
  }
  // read up to match return everything up to including the match
  async readUntil(stopper:RegExp) {
    let buffer = ""
    while (true) {
      const value = await this.nextToken()
      if (stopper.test(value)) {
        return buffer + value
      }
      buffer += value
    }
  }
  async parseTaxaBlock() {
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
          this.taxonSet = new TaxonSet();
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
          if (this.taxonSet!.getTaxonCount()===0) {
            throw "hit end of taxa section but didn't find any taxa"
          }
          this.skipSemiColon()
        default:
          throw `Reached impossible code looking for dimensions or taxlabels in taxa block "${command}"`
      }
      command = await this.skipUntil(/dimensions|taxlabels|end/i)
    }
  }

  async parseTreesBlock() {
    let translateMap
    let command = await this.skipUntil(/translate|tree|end/i)
    let token
    while (true) {
      switch (true) {
        case /translate/i.test(command):
          // all white space removed by tranformStream so will be
          // ['key','taxon,'] but may be ['key','taxon',','] if space tween taxa and ,
          translateMap = new Map()
          let i = 0
          let key
          token = await this.nextToken();
          while (token !== ";") {
            if (i % 2 == 0) {
              key = token
            } else {
              if (token[token.length - 1] === ",") {
                token = token.slice(0, -1)
              }
              // todo get taxa to add here.
              translateMap.set(key, token)
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
          const treeId = await this.nextToken()
          // read to first '(';
          token = await this.skipUntil(/\(/)
          let buffer = token
            .split(newickDeliminators)
            .filter((n) => n.length > 0)
            .reverse()
          const t = []
          const tree = new ImmutableTree()
          let level = 0
          let currentNode = undefined
          let nodeStack = []
          let labelNext = false
          let lengthNext = false

          while (token !== ";") {
            while (buffer.length > 0) {
              const t = buffer.pop()
            }
            token = await this.nextToken()
            buffer = token
              .split(newickDeliminators)
              .filter((n) => n.length > 0)
              .reverse()
          }


          break
        case /end/i.test(command):
          this.skipSemiColon();
          break
        default:
          throw `Reached impossible code in treeblock block "${command}"`
      }
      command = await this.skipUntil(/translate|tree|end/i)
    }
    // return translateMap;
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
