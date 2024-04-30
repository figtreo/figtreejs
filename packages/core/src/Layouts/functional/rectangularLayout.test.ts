import { ImmutableTree } from "../../Evo/Tree";
import { PreOrderTraversalCache } from "../../Evo/Tree/Traversals";
import { rectangularLayout } from "./rectangularLayout";

describe("Test rectangular layout",()=>{
    it('check x and y on root', function() {
        const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);");
        const layout = rectangularLayout();
        const root = layout(tree, tree.getRoot());
        expect(root.x).toBeCloseTo(0);
        expect(root.y).toBeCloseTo(1.25); 

        // //a
        const a = tree.getNodeByTaxon("a")!;
        const aV = layout(tree,a)
        expect(aV.x).toBeCloseTo(2);
        expect(aV.y).toBeCloseTo(0); 

        // //c
        const c = tree.getNodeByTaxon("c")!;
        const cV = layout(tree,c)
        expect(cV.x).toBeCloseTo(1);
        expect(cV.y).toBeCloseTo(2); 
    });
    it('check x and y on root - tree', function() {
       
        const cache = new PreOrderTraversalCache();
        
        const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);")
                                    .treeSubscribeCallback((tree,node)=>cache.handleUpdate(tree,node));
        const layout = rectangularLayout(cache);
        const root = layout(tree, tree.getRoot());
        const c = tree.getNodeByTaxon("c")!;
        const cV = layout(tree,c)
        const tree2 = tree.setDivergence(tree.getNodeByTaxon('a')!,3.0)

        const root2 = layout(tree2,tree2.getRoot());
        const c2 = tree2.getNodeByTaxon("c")!;
        const cV2 = layout(tree,c2)
        expect(c2).toStrictEqual(c)
        expect(cV2).toStrictEqual(cV)
        // check a parent should 
        expect(tree.getRoot()).toStrictEqual(tree2.getRoot())
        expect(root2).not.toStrictEqual(root) //these are vertexes
        expect(root2.maxX).toBeCloseTo(3);

    });
    // check above but with rotations
    


})