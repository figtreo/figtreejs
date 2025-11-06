import { ImmutableTree } from "../../Evo/Tree";
import { u } from "../../utils";
import { rectangularLayout } from "./rectangularLayout";
import { describe, it, expect } from 'vitest';
describe("Test rectangular layout",()=>{
    it('check x and y on root', function() {
        const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);");
        const layout = rectangularLayout(tree);
        const root = layout(tree.getRoot());
        expect(root.x).toBeCloseTo(0);
        expect(root.y).toBeCloseTo(1.25); 

        // //a
        const a = tree.getNodeByTaxon(tree.getTaxonByName("a"))!;
        const aV = layout(a);
        expect(aV.x).toBeCloseTo(2);
        expect(aV.y).toBeCloseTo(0); 

        // //c
        const c = tree.getNodeByTaxon(tree.getTaxonByName("c"))!;
        const cV = layout(c);
        expect(cV.x).toBeCloseTo(1);
        expect(cV.y).toBeCloseTo(2); 
    });
    it('check x and y on root - tree', function() {
       
        
        const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);")

        const layout = rectangularLayout(tree);
        const root = layout(tree.getRoot());
        const c = tree.getNodeByTaxon(tree.getTaxonByName("c"))!;
        const cV = layout(c) 
        const tree2 = tree.setDivergence(u(tree.getNodeByTaxon(tree.getTaxonByName("a"))),3.0)
        const layout2 =rectangularLayout(tree2);
        const root2 = layout2(tree2.getRoot());
        const c2 = tree2.getNodeByTaxon(tree.getTaxonByName("c"))!;
        const cV2 = layout2(c2);

        expect(c2).toStrictEqual(c)
        expect(cV2).toStrictEqual(cV)

        expect(root2).not.toBe(root) //these are vertexes
        expect(root2.x).toBeCloseTo(0);

    });

    it('check after reordering', function() {
    // check above but with rotations
        
    const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);")
                               
    const layout = rectangularLayout(tree);
    const reordered = tree.orderNodesByDensity(true)
    const reorderedLayout = rectangularLayout(reordered);
    const reordededC = reordered.getNodeByTaxon(tree.getTaxonByName("c"))!;
    const ogC = tree.getNodeByTaxon(tree.getTaxonByName("c"))!;

    const ogCvertext = layout(ogC)
    const reorderedCVertex = reorderedLayout(reordededC);

    expect(ogCvertext).not.toBe(reorderedCVertex)
    });
    


})