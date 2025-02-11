

import { NewickCharacterParser } from "./NewickCharacterParser";
import { ImmutableTree, newickParsingOptions,TaxonSet } from "..";

export function parseNewick(newick: string,options:newickParsingOptions={}): ImmutableTree {

    const taxonSet = options.taxonSet ? options.taxonSet : new TaxonSet();
    const tokens = newick.split(/\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/).filter(token => token.length > 0);

    const parser = new NewickCharacterParser(taxonSet,options); 

    for (const token of tokens) {
        parser.parseCharacter(token);
    }
    let tree = parser.getTree();

    return tree;
}

