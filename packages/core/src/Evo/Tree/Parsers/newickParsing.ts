import {newickParsingOptions } from "../Tree.types";
import { ImmutableTree, postOrderIterator,  preOrderIterator } from "../NormalizedTree/ImmutableTree";

import { NewickCharacterParser } from "./NewickCharacterParser";
import { TaxonSet } from "../Taxa/Taxon";

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

