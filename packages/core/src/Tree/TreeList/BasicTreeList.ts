import { Tree } from "../Tree.types";
import { TreeList } from "./TreeListInterface";

class BasicTreeList implements TreeList{
    private trees:Tree[];
    private currentTree: number;
    constructor(trees:Tree[]=[]){
        this.trees=trees;
        this.currentTree = 0;
    }
    getNextTree(): Tree {
        if(this.currentTree<=this.trees.length-1){
            this.currentTree+=1;
            return this.trees[this.currentTree];
        }
        throw new Error("No more trees in list")
    }
    getPreviousTree(): Tree {
        if(this.currentTree>-1 &&  this.trees.length>0){
            this.currentTree+=1;
            return this.trees[this.currentTree];
        }
        throw new Error("No more trees in list")
    }
    getTree(index: number): Tree {
        return this.trees[index];
    }
    getCurrentIndex(): number {
        return this.currentTree;
    }
    getTreeCount(): number {
        return this.trees.length;
    }
    getTrees(): Generator<Tree> {
        const that = this;
        function* treeGenerator():Generator<Tree>{
            let i = 0;
            while(i<that.trees.length){
                yield that.getTree(i)
                i+=1;
            }
        }
        return treeGenerator();
    }
    addTree(tree: Tree): void {
        this.trees.push(tree)
    }
    hasTree():boolean{
        return this.currentTree<this.trees.length-1
    }

}