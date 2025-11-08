import { ImmutableTree } from "../../Evo";
import { radialLayout } from "./radialLayout";
import { describe, it, expect } from 'vitest';
describe("Test rectangular layout",()=>{
    it('check x and y on root', function() {
        const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);");
        const layout = radialLayout(tree);
        const root = layout(tree.getRoot());
        expect(root.x).toBeCloseTo(0);
        expect(root.y).toBeCloseTo(0); 

        // //a
        const a = tree.getNodeByTaxon(tree.getTaxonByName("a"));
        const aV = layout(a);
        expect(aV.x).toBeCloseTo(0.0015820025368573631);
        expect(aV.y).toBeCloseTo( -1.7311355093381278); 

        // //c
        const c = tree.getNodeByTaxon(tree.getTaxonByName("c"));
        const cV = layout(c);
        expect(cV.x).toBeCloseTo(0.500);
        expect(cV.y).toBeCloseTo(0.8660254037844386); 
    });
})