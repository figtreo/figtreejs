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
     const output = setDivergence(tree);
     tree = output.tree;
     const maxDivergence = output.maxDivergence;
     // TODO yuck find a more robust way to handel heights and lengths;
    for (const node of postOrderIterator(tree) ) {
        tree = tree.setHeight(node,maxDivergence - tree.getDivergence(node));
    }

    return tree;
}


export function setDivergence(tree: ImmutableTree): {tree:ImmutableTree,maxDivergence:number} {
let maxDivergence = 0;
for (const node of preOrderIterator(tree)) {
    if (tree.getParent(node)!==undefined ){
        const nodeLength = tree.getLength(node)==undefined? 1:tree.getLength(node)!;
        tree = tree.setDivergence(node,nodeLength + tree.getDivergence(tree.getParent(node)!)!);
    } else {
        tree = tree.setDivergence(node,0);
    }
    if (tree.getDivergence(node) > maxDivergence) {
        maxDivergence = tree.getDivergence(node);
    }
}
return {tree,maxDivergence};
}