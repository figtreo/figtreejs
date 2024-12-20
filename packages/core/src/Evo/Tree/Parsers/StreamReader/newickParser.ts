const nexusTransformer = ({
  start() {},
  utf8Decoder: new TextDecoder("utf-8"),
  deliminators: /(\bbegin\s+\w+;)|(\bend;)/i,
  partialEnd: "",
  // don't want to break in the middle of deliminator. Can't if last chunk is a ; or new line.
  enders: /\n|\r|;/,
  transform(chunk:any, controller:any) { // not really any but we'll see
    let chunks = (this.partialEnd + chunk)
      .split(this.deliminators)
      .filter((n) => n);

    //does last split end in the start of a deliminator?
    //chunks[-1]
    // is there a line break followed by a partial delimator? if so trim it out and add to the next bit
    // I think we can just read back until we hit a new line or ;?

    const lastBit = chunks.pop()!;

    for (const c of chunks) {
      controller.enqueue(c);
    }
    if (!this.enders.exec(lastBit[lastBit.length - 1])) {
      this.partialEnd = lastBit;
    } else {
      controller.enqueue(lastBit);
    }
  },
  flush() {
    /* do any destructor work here */
  }
})


const nexusTransformStream = new TransformStream(nexusTransformer);


