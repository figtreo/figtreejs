import { notNull } from "../../../../utils"
import type { ImmutableTree } from "../../NormalizedTree"
import {  TaxonSet } from "../../Taxa/Taxon"

import { NewickCharacterParser } from "../NewickCharacterParser"
import { newickDeliminators, nexusTokenizer } from "./nexusTokenizer"

export class NexusImporter {
  reader: ReadableStreamDefaultReader<string>
  taxonSet: TaxonSet
  currentBlock: string | undefined
  hasTree: boolean | undefined
  options: { labelName?: string }
  translateTaxonMap: Map<string, string> | undefined
  constructor(
    stream: ReadableStream<BufferSource>,
    options: { labelName?: string } = {},
  ) {
    const tokenizer = new TransformStream(nexusTokenizer())

    this.reader = stream
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(tokenizer)
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
    let keepGoing = true
    let token;
    while (keepGoing) {
      const value = await this.nextToken()
      if (value.match(/\bbegin/i)) {
        token = await this.nextToken()
        this.skipSemiColon()
        keepGoing=false
      }
    }
    return token
  }

  private async readToEndOfBlock() {
    let keepGoing = true
    while (keepGoing) {
      const value = await this.nextToken()
      if (value.match(/\bend;/i)) {
       keepGoing=false;
      }
    }
  }

  // private async getNextCommand(command: RegExp) {
  //   let value;
  //   let keepGoing = true
  //   while (keepGoing) {
  //     value = await this.nextToken()
  //     if (value === ";") {
  //       throw `Hit ; looking for ${command}`
  //     }
  //     if (command.test(value)) {
  //       keepGoing=false
  //     }
  //   }
  //   return value
  // }
  // skip until match and return match
  private async skipUntil(stopper: RegExp):Promise<string> {
    let value;
    let keepGoing = true
    while (keepGoing) {
      value = await this.nextToken()
      if (stopper.test(value)) {
          keepGoing=false;
      }
    }
    if(value==undefined) throw new Error(`Internal parsing error: ${stopper.source} not found `)
    return value
  }
  // read up to match return everything up to including the match
  private async readUntil(stopper: RegExp) {
      let buffer = ""
      let keepGoing = true
      while (keepGoing) {
      const value = await this.nextToken()
      if (stopper.test(value)) {
        buffer+=value
         keepGoing=false
      }
      buffer += value
    }
    return buffer
  }
  private async parseTaxaBlock() {
    let ntax
    let keepGoing = true
    while (keepGoing) {
      const command = await this.skipUntil(/dimensions|taxlabels|end/i)
      switch (true) {
        case /dimensions/i.test(command):{
          const taxaLine = await this.readUntil(/;/)
          const ntaxa = taxaLine.match(/ntax=(\d+);/)
          if (ntaxa) {
            ntax = parseInt(ntaxa[1])
          } else {
            throw `Expected dimension in form of ntax=(\\d+);. Got ${taxaLine}`
          }
          break
        }
        case /taxlabels/i.test(command):{
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
        }
        case /end/i.test(command):{
          if (this.taxonSet.getTaxonCount() === 0) {
            throw "hit end of taxa section but didn't find any taxa"
          }
          this.taxonSet.lockTaxa() // no more taxa can be added since we parsed a block;
          this.skipSemiColon()
          keepGoing = false
          break
        }
        default:
          throw `Reached impossible code looking for dimensions or taxlabels or end in taxa block "${command}"`
      }
    }
  }

  private async *parseTreesBlock() {
    let token
    let keepGoing = true
    while (keepGoing) {
      const command = await this.skipUntil(/translate|tree|end/i)
      switch (true) {
        case /translate/i.test(command):{
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
              if (this.taxonSet.isFinalized) {
                if (this.taxonSet.getTaxonByName(token) === undefined) {
                  throw `Taxon ${token} not found in taxa block - but found in translate block`
                }
              } else {
                //new taxon set so add it;
                this.taxonSet.addTaxon(token)
              }
              // const taxon = this.taxonSet.getTaxonByName(token)
              notNull(key,'Error parsing nexus. Expected key for taxa but found nothing')
              this.translateTaxonMap.set(key, token)
            }
            token = await this.nextToken()
            while (token === ",") {
              token = await this.nextToken()
            } //incase some white space in there
            i++
          }
          this.taxonSet.lockTaxa()
          break
        }
        case /tree/i.test(command):{
          //parse tree
          // put this in loop so the next call parses the next tree;

          // first token will be tree id
          // then possible annotation
          // Then =
          // then possible annotations
          // then tree
          //tree id = 
          await this.nextToken() //todo - read to'=' not just next token
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
        }
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


