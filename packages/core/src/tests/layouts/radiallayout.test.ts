import { describe, it, expect } from "vitest";
import { ImmutableTree } from "../../evo";
import { radialLayout } from "../../layouts";
describe("Test rectangular layout", () => {
  it("check x and y on root", function () {
    const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);");
    const layout = radialLayout(tree);
    const root = layout(tree.getRoot());
    expect(root.x).toBeCloseTo(0);
    expect(root.y).toBeCloseTo(0);

    // //a
    const a = tree.getNodeByTaxon(tree.getTaxonByName("a"));
    const aV = layout(a);
    expect(aV.x).toBeCloseTo(-1.4421376941044097);
    expect(aV.y).toBeCloseTo(1.0445158798278553);

    const c = tree.getNodeByTaxon(tree.getTaxonByName("c"));
    const cV = layout(c);
    expect(cV.x).toBeCloseTo(0.4539904997395474);
    expect(cV.y).toBeCloseTo(-0.8910065241883676);
  });
});
