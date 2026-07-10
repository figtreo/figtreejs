import { describe, it, expect } from "vitest";
import { ImmutableTree } from "../../evo";
import { explodedLayout } from "../../layouts";

describe("Test exploded layout", () => {
  it("check x and y on tips", function () {
    const tree = ImmutableTree.fromNewick(
      "((a[&group=1]:1,b[&group=1]:1)[&group=1]:1,(c[&group=2]:1,d[&group=2]:1)[&group=2]:1)[&group=2];",
      { parseAnnotations: true },
    );
    const layout = explodedLayout(tree, { explodeBy: "group" });
    const root = layout(tree.getRoot());
    expect(root.x).toBeCloseTo(0);
    expect(root.y).toBeCloseTo(6.5);

    // //a
    const a = tree.getNodeByTaxon(tree.getTaxonByName("a"));
    const aV = layout(a);
    expect(aV.x).toBeCloseTo(2);
    expect(aV.y).toBeCloseTo(0);
    // b
    const b = tree.getNodeByTaxon(tree.getTaxonByName("b"));
    const bV = layout(b);
    expect(bV.x).toBeCloseTo(2);
    expect(bV.y).toBeCloseTo(1);
    // //c
    const c = tree.getNodeByTaxon(tree.getTaxonByName("c"));
    const cV = layout(c);
    expect(cV.x).toBeCloseTo(2);
    expect(cV.y).toBeCloseTo(6);
  });
  it("check x double group", function () {
    const tree = ImmutableTree.fromNewick(
      "((a[&group=1]:1,b[&group=1]:1)[&group=1]:1,(c[&group=2]:1,d[&group=1]:1)[&group=2]:1)[&group=2];",
      { parseAnnotations: true },
    );
    const layout = explodedLayout(tree, { explodeBy: "group" });
    const root = layout(tree.getRoot());
    expect(root.x).toBeCloseTo(0);
    expect(root.y).toBeCloseTo(8); // should be same as d since there is only 1 group

    // //a
    const a = tree.getNodeByTaxon(tree.getTaxonByName("a"));
    const aV = layout(a);
    expect(aV.x).toBeCloseTo(2);
    expect(aV.y).toBeCloseTo(0);
    // b
    const b = tree.getNodeByTaxon(tree.getTaxonByName("b"));
    const bV = layout(b);
    expect(bV.x).toBeCloseTo(2);
    expect(bV.y).toBeCloseTo(1);
    // //c
    const c = tree.getNodeByTaxon(tree.getTaxonByName("c"));
    const cV = layout(c);
    expect(cV.x).toBeCloseTo(2);
    expect(cV.y).toBeCloseTo(8);
    // //d
    const d = tree.getNodeByTaxon(tree.getTaxonByName("d"));
    const dV = layout(d);
    expect(dV.x).toBeCloseTo(2);
    expect(dV.y).toBeCloseTo(3);
  });
});
