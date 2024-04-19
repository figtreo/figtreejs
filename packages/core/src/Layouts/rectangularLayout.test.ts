import { ImmutableTree, Tree } from "../Evo/Tree";
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
    it('check x and y on root - tree', function() {
        const tree = Tree.parseNewick("((a:1,b:1):1,c:1);");
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
    


})