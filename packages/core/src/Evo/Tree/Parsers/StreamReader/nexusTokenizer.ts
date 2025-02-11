export enum STATUS {
    PARSING = "parsing",
    IN_SINGLE_QUOTE = "in single quote",
    IN_DOUBLE_QUOTE = "in double quote",
    IN_COMMENT = "in comment",
}

export function nexusTokenizer() {
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
  
  function getStatusAndEnd(char: string): [STATUS, string] {
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

export   const newickDeliminators = /\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/