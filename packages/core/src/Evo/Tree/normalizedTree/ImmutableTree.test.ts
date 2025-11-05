//TODO test immutable tree include tests that check nodes to roots update as well.

import { ImmutableTree } from "./ImmutableTree";
import { describe, it, expect } from 'vitest';


describe('ImmutableTree', () =>{

        it('simpleTree', function() {
            const tree = new ImmutableTree();
            const added  = tree.addNodes();
            const tree1 = added.tree;
            expect(tree.getNodeCount()).toEqual(1);
            expect(tree1.getNodeCount()).toEqual(2);
            expect(tree1).not.toEqual(tree);
            
        });
//Add child used getNode and updates both node and child.
        it('build tree and check parent', function() {
            const prototree = new ImmutableTree()
            const {tree:tree,nodes:[child,child2]}=prototree.addNodes(2)

            const parent = tree.getNode(0);
            if(!parent) throw new Error("no parent node");
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
        it('Change branchlength', function() {
            const prototree = new ImmutableTree()
                            
            const {tree:tree,nodes:[parent,child,child2]} = prototree.addNodes(3)


            const tree1 = tree.addChild(parent,child)
                            .addChild(parent,child2)
            
            const tree2 = tree1.setLength(child,0.5);
            expect(tree2).not.toEqual(tree1)
            // expect(tree1.getNode(0)).not.toBe(tree2.getNode(0));
            // expect(tree1.getParent(child)).not.toBe(tree2.getParent(child));

        });
        it('change height', function() {
            const tree=  ImmutableTree.fromNewick("((A:1,B:1):1,C:2);");
            const A = tree.getTaxonByName("A");
            const B = tree.getTaxonByName("B");
            expect(tree.getHeight(tree.getNodeByTaxon(A))).toBe(0);
            const tree1 = tree.setHeight(tree.getNodeByTaxon(A),0.5);

            expect(tree1.getHeight(tree1.getNodeByTaxon(A))).toBe(0.5);

            expect(tree1.getHeight(tree1.getNodeByTaxon(tree.getTaxonByName("B")))).toBe(0);
            expect(tree1.getLength(tree1.getNodeByTaxon(A))).toBe(0.5);

            expect(tree1.getDivergence(tree1.getNodeByTaxon(A))).toBe(1.5);
            expect(tree1.getDivergence(tree1.getNodeByTaxon(B))).toBe(2);
        });
        it('order', function() {

            const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
    
            const tree = ImmutableTree.fromNewick(newickString,{parseAnnotations:false});
            const orderedTree = tree.orderNodesByDensity(true)
            
            expect(orderedTree.toNewick()).toBe(`((virus9:0.04,virus10:0.03):0.6,(virus8:0.4,((virus6:0.45,virus7:0.4):0.02,(virus5:0.21,((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03):0.2):0.1):0.1);`)
        }); 

        it('bigger reroot - caused issues once',function(){
            const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;

            const tree = ImmutableTree.fromNewick(newickString)
            const virus3 = tree.getTaxonByName("virus3");
            const tree1 = tree.reroot(tree.getParent(tree.getNodeByTaxon(virus3)),0.5);
            expect(tree1.toNewick()).toBe("(((virus1:0.1,virus2:0.12):0.08,(virus5:0.21,((virus6:0.45,virus7:0.4):0.02,(virus8:0.4,(virus9:0.04,virus10:0.03):0.7):0.1):0.2):0.03):0.075,(virus3:0.011,virus4:0.0087):0.075);")
        });

        it('rotate', function(){ 
            const tree = ImmutableTree.fromNewick("((A:1,B:1):1,C:2);");
            const A = tree.getTaxonByName("A");
            const B = tree.getTaxonByName("B");
            const node = tree.getParent(tree.getNodeByTaxon(A))!;
            const child1 = tree.getChild(node,0);
            const rotatedTree = tree.rotate(node);
            const child2 = rotatedTree.getChild(node,0);
            
            expect(rotatedTree.getTaxonFromNode(child2)).toBe(B);
            expect(tree.getTaxonFromNode(child1)).toBe(A);
        });
        it('set height test',function(){
            const tree = ImmutableTree.fromNewick("((A:1,B:1):1,C:2);");
            const A = tree.getTaxonByName("A");
            const B = tree.getTaxonByName("B");
            const node = tree.getParent(tree.getNodeByTaxon(A))!;  // current height is 1.
            // const child1 = tree.getChild(node,0)!;
            // const child2 = tree.getChild(node,1)!;
            expect(tree.getHeight(node)).toBe(1);
            const newTree = tree.setHeight(node,0.5);
            expect(newTree.getLength(node)).toBe(1.5);
            expect(newTree.getHeight(node)).toBe(0.5);

            expect(newTree.getLength(tree.getNodeByTaxon(A))).toBe(0.5);
            expect(newTree.getLength(tree.getNodeByTaxon(B))).toBe(0.5);

        });
        it('set height test - negative length',function(){
            const tree = ImmutableTree.fromNewick("((A:1,B:1):1,C:2);");
            const A = tree.getTaxonByName("A");

            const node = tree.getParent(tree.getNodeByTaxon(A))!;  // current height is 1.
            const root = tree.getRoot();

            const newTree = tree.setHeight(root,0.5);
            expect(newTree.getLength(node)).toBe(-0.5);
            expect(newTree.getHeight(node)).toBe(1.0);

            const Cnode = tree.getNode("C");
            if(!Cnode) throw new Error("no C node");
            expect(newTree.getLength(Cnode)).toBe(0.5);
            // expect(newTree.getLength(tree.getNodeByTaxon(B)!)).toBe(0.5);

        })
})

