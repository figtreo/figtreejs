//TODO test immutable tree include tests that check nodes to roots update as well.

import { ImmutableTree } from "./ImmutableTree";



describe('ImmutableTree', () =>{

        it('simpleTree', function() {
            const tree = new ImmutableTree();
            const tree1 = tree.addNode();
            expect(tree.getNodeCount()).toEqual(0);
            expect(tree1.getNodeCount()).toEqual(1);
            expect(tree1).not.toEqual(tree);
            
        });
//Add child used getNode and updates both node and child.
        it('build tree and check parent', function() {
            const tree = new ImmutableTree()
                            .addNode()
                            .addNode()
                            .addNode()
                            
            const parent = tree.getNode(0);
            const child = tree.getNode(1);
            const child2 = tree.getNode(2);
            const tree1 = tree.addChild(parent,child)
                            .addChild(parent,child2);
            
            expect(tree1).not.toEqual(tree);
            expect(tree1.getChildCount(parent)).toEqual(2);

            expect(tree1.getParent(child)).not.toEqual(parent); //bc parent changed when added child
            expect(tree1.getParent(child)).toEqual(tree1.getNode(0)); //bc parent changed when added child
            expect(tree.getParent(child)).toBeUndefined();
            expect(tree1.getChild(parent,0)).toEqual(tree1.getNode(1));
            expect(tree1.getChild(parent,0)).not.toEqual(child); // this child has no parent!

        });
    //editing length does not access parent. Does the parent still update.
        it('Change branchlength', function() {
            const tree = new ImmutableTree()
                            .addNode()
                            .addNode()
                            .addNode()
                            
            const parent = tree.getNode(0);
            const child = tree.getNode(1);
            const child2 = tree.getNode(2);
            const tree1 = tree.addChild(parent,child)
                            .addChild(parent,child2);
            
            const tree2 = tree1.setBranchLength(child,0.5);
            expect(tree2).not.toEqual(tree1);

            console.log(tree1.getParent(child)===tree2.getParent(child));

            expect(tree1.getNode(0)).not.toBe(tree2.getNode(0));
            expect(tree1.getParent(child)).not.toBe(tree2.getParent(child));

        });
        // it('simpleParse', function() {

        //     const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
    
        //     const tree = ImmutableTree.fromNewick(newickString,{parseAnnotations:false});
        //     expect(tree.toNewick()).toEqual(newickString);
    
        // }); 
       
    
})