import type { NodeRef, Tree } from "../Tree.types";

export  interface TreeTraversal{
    getNext(tree:Tree,node:NodeRef):NodeRef|undefined;
    getPrevious(tree:Tree,node:NodeRef):NodeRef|undefined;

}