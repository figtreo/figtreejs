import { Tree, NodeRef } from "../Tree.types";
import { TreeTraversal } from "./TraversalTypes";
export class PreOrderTraversalCache implements TreeTraversal{
    _forwardCache:Map<NodeRef,NodeRef>
    _reverseCache:Map<NodeRef,NodeRef>
    cache:Map<NodeRef,any>
    constructor(){
        this._forwardCache= new Map()
        this._reverseCache = new Map()
        this.cache = new Map()
    }
    

    *traverse(tree:Tree,node?:NodeRef):Generator<NodeRef>{
        const traverse = function* (node: NodeRef): Generator<NodeRef> {
            const childCount = tree.getChildCount(node);
            
            if (childCount > 0) {
                for (let i = 0; i < childCount; i++) {
                    const child = tree.getChild(node, i);
                        yield* traverse(child);
                }
            }
            yield node;

        };
        if(node===undefined){
            node = tree.getRoot();
            if(node===undefined){
                throw new Error("Tree has no root node. Cannot traverse tree");
            }
        }
        yield* traverse(node!);
    }
    
    handleUpdate(tree:Tree,node:NodeRef):void{ 
//TODO begin again here and provide tree with nodes to mark as new. 
        console.log(`Handling update for node ${node.number}`)
        let n:NodeRef|undefined = node
        while(n!==undefined){
            this.cache.delete(n)
            this._reverseCache.delete(n)
            this._forwardCache.delete(n)

            const preceding = this._reverseCache.get(node);
            const next  = this._forwardCache.get(node)
            if(preceding){
               this._forwardCache.delete(preceding)
            }
            if(next){
                this._reverseCache.delete(next)
            }
            n = tree.getParent(n)
        }
    }

//Check we've been to next otherwise we need to update again.
    getNext(tree: Tree, node: NodeRef): NodeRef|undefined{
        if(this._forwardCache.has(node)) return this._forwardCache.get(node)!
        if(tree.isRoot(node)){ //start over
           return undefined;
        }
            const parent = tree.getParent(node)!;
            const rs = tree.getRightSibling(node);
            if(rs){
                this._forwardCache.set(node,rs)
                this._reverseCache.set(rs,node)
            }else{
                this._forwardCache.set(node,parent)
                this._reverseCache.set(parent,node)
            }
            return this._forwardCache.get(node)!;
      
    }
    getPrevious(tree: Tree, node: NodeRef): NodeRef|undefined {
        if(this._reverseCache.has(node)) return this._reverseCache.get(node);
        if(node ===this.traverse(tree).next().value){
            return undefined;
        }
        if(tree.isInternal(node)){
            const childCount = tree.getChildCount(node)-1;
            const lastChild = tree.getChild(node,childCount)!;
            this._reverseCache.set(node,lastChild);
            this._forwardCache.set(lastChild,node);
        }
        else{
            const ls = tree.getLeftSibling(node);
            if(ls){
                this._reverseCache.set(node,ls)
                this._forwardCache.set(ls,node)
            }else{
                let aunt = undefined;
                let n = node
                while(aunt===undefined){
                    if(n===tree.getRoot()){
                        throw new Error("Hit root in preorder traversal when should not");
                    }
                    aunt = tree.getLeftSibling(n);
                    n  = tree.getParent(n)!
                }
                this._reverseCache.set(node,aunt)
                this._forwardCache.set(aunt,node)
               // look for parent's left sibling if none try again until root
               // if at and no ls error we are at first tip and should have caught this above.
            }
        }
        return this._reverseCache.get(node)!;
    }
}