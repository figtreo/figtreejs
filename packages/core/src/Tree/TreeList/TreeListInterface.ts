import { Tree } from "../Tree.types";

export interface TreeList {
    getNextTree():Tree;
    getPreviousTree():Tree;
    getTree(index:number):Tree;
    getCurrentIndex():number;
    getTreeCount():number;
    getTrees(): Generator<Tree>;
    addTree(tree:Tree):void;
    hasTree():boolean;
}