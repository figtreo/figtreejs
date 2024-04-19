//TODO test immutable tree include tests that check nodes to roots update as well.

import { Tree } from "./tree";



describe('Tree', () =>{
        it('order', function() {

            const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
    
            const tree = Tree.parseNewick(newickString,{parseAnnotations:false});
            const orderedTree = tree.orderNodesByDensity(false)
    
        }); 

        it('reroot',function(){
            const tree = Tree.parseNewick("((A:1,B:1):1,C:2);");
            tree.reroot(tree.getNodeByName("A")!,0.5);
            expect(tree.toNewick()).toBe("(A:0.5,(B:1,C:3):0.5);")
        });
        it('bigger reroot - caused issues once',function(){
            const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;

            const tree = Tree.parseNewick(newickString)
           tree.reroot(tree.getParent(tree.getNodeByName("virus3")!)!,0.5);
            expect(tree.toNewick()).toBe("(((virus1:0.1,virus2:0.12):0.08,(virus5:0.21,((virus6:0.45,virus7:0.4):0.02,(virus8:0.4,(virus9:0.04,virus10:0.03):0.7):0.1):0.2):0.03):0.075,(virus3:0.011,virus4:0.0087):0.075);")
        })
        it('rotate',function(){
            const tree = Tree.parseNewick("((A:1,B:1):1,C:2);");
            const node = tree.getParent(tree.getNodeByName("A")!)!;
            const child1 = tree.getChild(node,0)!;
            tree.rotate(node);
            const child2 = tree.getChild(node,0)!;

                                
            expect(tree.getNodeTaxon(child2)).toBe("B");
            expect(tree.getNodeTaxon(child1)).toBe("A");
        })
})
