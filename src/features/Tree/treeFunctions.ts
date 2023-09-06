import { TreeState,Node } from "./treeSlice";
//TODO fake tree class with methods or 
// wrap state
export function* postorderGenerator(tree:TreeState,node: Node): Generator<Node> {

    const traverse = function* (node: Node): Generator<Node> {
        const childCount = node.children.length;
        if (childCount>0) {
            for (let i=0;i<childCount;i++) {
                const child = tree.nodes.byId[node.children[i]];
                yield* traverse(child);
            }
        }
        yield node;
    };
    yield* traverse(node);

}

export function* preorderGenerator(tree:TreeState,node: Node): Generator<Node>  {

    const traverse = function* (node: Node): Generator<Node> {
        yield node;
        const childCount = node.children.length;
        if (childCount>0) {
            for (let i=0;i<childCount;i++) {
                const child = tree.nodes.byId[node.children[i]];
                yield* traverse(child);
            }
        }
    };
    yield* traverse(node);

}

export function getNode(tree:TreeState,id:string):Node {
    return tree.nodes.byId[id];
}
export function getHeight(tree:TreeState,node:Node):number{
    const maxDivergence = getNodes(tree).reduce((acc,node) => Math.max(acc,getDivergence(tree,node)),0);
    const thisDivergence = getDivergence(tree,node);
    return maxDivergence - thisDivergence;
}
export function getNodes(tree:TreeState):Node[] {
    return tree.nodes.allIds.map((id) => tree.nodes.byId[id]);
}
export function getRoot(tree:TreeState):Node {
    return tree.nodes.byId[tree.rootNode!];
}
export function getParent(tree:TreeState,node:Node):Node|null {
    return node.parent ? tree.nodes.byId[node.parent] : null;
}
export function getDivergence(tree:TreeState,node:Node):number{
    if (node.id ===tree.rootNode!) {
           return 0;
        }
        else {
            return node.length! + getDivergence(tree,getParent(tree,node)!);
        } 
}