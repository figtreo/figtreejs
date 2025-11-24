export default class NexusParser {
  // get lock on file
  // only read when asked for tree.
  tokens: string[];
  constructor(contents: string) {
    this.tokens = contents
      .split(
        /\s*(?:\bBegin\s+|\bbegin\s+|\bBEGIN\s+|\bend\s*;|\bEnd\s*;|\bEND\s*;)\s*/,
      )
      .filter((d) => d !== "");
  }
}
