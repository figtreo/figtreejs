import { ImmutableTree } from "../Evo/Tree";
import { RectangularLayout } from "./rectangularLayout";

describe("Test rectangular layout",()=>{
    it('check x and y on root', function() {
        const tree = ImmutableTree.fromNewick("((a:1,b:1):1,c:1);");
        const vertices = RectangularLayout.layout(tree,{width:100,height:200,padding:0});
        expect(vertices.vertices[0].x).toBeCloseTo(0);
        expect(vertices.vertices[0].y).toBeCloseTo(125); 

        //a
        const a = tree.getNodeByName("a")!;
        expect(vertices.vertices[a.number].x).toBeCloseTo(100);
        expect(vertices.vertices[a.number].y).toBeCloseTo(0); 

        //c
        const c = tree.getNodeByName("c")!;
        expect(vertices.vertices[c.number].x).toBeCloseTo(50);
        expect(vertices.vertices[c.number].y).toBeCloseTo(200); 
    });

    it("bigger tree",()=>{
        const newickString =
        '((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);';
        const tree = ImmutableTree.fromNewick(newickString);

    })
})