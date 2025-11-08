import { u } from "../../../utils";
import { ImmutableTree } from "../NormalizedTree/ImmutableTree";
import { processAnnotationValue } from "./AnnotationParser";
import { describe, it, expect } from 'vitest';
describe("Test annotation parsing",()=>{

    it('integer', function () {
        const annotation = processAnnotationValue("1");
        expect(annotation).toEqual({ type: "NUMERICAL", value: 1 });
    });
    it('integer array', function () {
        const annotation = processAnnotationValue(["1", "2", "3"]);
        expect(annotation).toEqual({ type: "NUMERICAL_SET", value: [1,2,3] });
    });

    it('continuous array', function () {
        const annotation = processAnnotationValue(["1", "2.5", "3"]);
        expect(annotation).toEqual({ type: "NUMERICAL_SET", value: [1, 2.5, 3] });
    });

    it('continuous range', function () {
        const annotation = processAnnotationValue([0.0,1]);
        expect(annotation).toEqual({ type: "NUMERICAL_SET", value: [0,1] });
    });

    it('continuous', function () {
        const annotation = processAnnotationValue("1.3");
        expect(annotation).toEqual({ type: "NUMERICAL", value: 1.3 });
    });
    it('discrete', function () {
        const annotation = processAnnotationValue("a");
        expect(annotation).toEqual({ type: "DISCRETE", value: "a" });
    });
    it('discrete array', function () {
        const annotation = processAnnotationValue(["a", "b", "c"]);
        expect(annotation).toEqual({ type: "DISCRETE_SET", value: ["a", "b", "c"] });
    });
    it('markov jump', function () {
        const annotation = processAnnotationValue([["0.1", "U", "me"]]);
        expect(annotation).toEqual({ type: "MARKOV_JUMPS", value: [{ time: 0.1, from: "U", to: "me" }] });
    });
    it('markov jump array', function () {
        const annotation = processAnnotationValue([["0.1", "U", "me"], ["0.2", "me", "U"]]);
        expect(annotation).toEqual({ type: "MARKOV_JUMPS", value: [{ time: 0.1, from: "U", to: "me" }, { time: 0.2, from: "me", to: "U" }] });
    });
    it('probabilities', function () {
        const annotation = processAnnotationValue({ HERE: 0.3, THERE: 0.7 });
        expect(annotation).toEqual({ type: "DENSITIES", value: { HERE: 0.3, THERE: 0.7 } });
    });
});

describe("Test tree parsing and normalized Tree",()=>{
    it('simpleParse', function() {

        const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;

        const tree = ImmutableTree.fromNewick(newickString,{parseAnnotations:false, labelName:"probability"});
        expect(tree.toNewick()).toEqual(newickString);

    }); 

    it('height', function() {
        const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
        const tree = ImmutableTree.fromNewick(newickString,{labelName:"prob"});
        const virus1 = tree.getTaxonByName("virus1")
        const virus1Node = tree.getNodeByTaxon(virus1)
        expect(tree.getHeight(virus1Node)).toBeCloseTo(0.06,1e-6)
  })
  it('divergence', function() {
    const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
    const tree = ImmutableTree.fromNewick(newickString,{labelName:"prob"});
    const virus6 = tree.getTaxonByName("virus6");
    const virus6Node = tree.getNodeByTaxon(virus6)
    expect(tree.getDivergence(virus6Node)).toBeCloseTo(0.67,1e-6)
})
 it('general_parse', function() {
    const tree = ImmutableTree.fromNewick("(a:1,b:4)#l;"); 
    const root = tree.getRoot();
    const label = tree.getLabel(root)
    expect(label).toEqual( "l");

    const r = tree.getNodeByLabel("l");
    expect(r).toEqual(root);

    const  names = [];
    const   bl = [];

    const count = tree.getChildCount(root);

    for (let i = 0; i < count; i++) {
        const child=  tree.getChild(root, i);
        names.push(tree.getTaxonFromNode(child).name);
        bl.push(tree.getLength(child))
    }
    expect(names).toEqual(["a", "b"]);

    expect(bl).toEqual([1, 4]);
})

it('scientific notation', function() {
    const tree = ImmutableTree.fromNewick("(a:1E1,b:2e-5);");
    const root = tree.getRoot();
    const bl = [];
    const count = tree.getChildCount(root);

    for (let i = 0; i < count; i++) {
        const child = tree.getChild(root, i);
        bl.push(tree.getLength(child));
    }
    expect(bl[0]).toBeCloseTo(10.0, 1e-6);
    expect(bl[1]).toBeCloseTo(0.00002, 1e-6);

})

it('quoted taxa', function() {

   const tree =  ImmutableTree.fromNewick("('234] ':1,'here a *':1);")
   const names = [...tree.getExternalNodes()].map((node) => tree.getTaxonFromNode(node).name);
   expect(names).toEqual(["234]", "here a *"])
})

it('whitespace', function() {
    const tree =  ImmutableTree.fromNewick("  (a,b:1);\t")
    expect(tree.toNewick()).toEqual("(a,b:1);")
});
it('node id', function() {
    const tree = ImmutableTree.fromNewick("((A,T)#Node_1:1,(a,b:1));")
    const A = tree.getTaxonByName("A");
    const B = tree.getTaxonByName("b");
    const Anode = tree.getNodeByTaxon(A);
    const node1 = tree.getNodeByLabel("Node_1");
    const parent = tree.getParent(Anode);

    expect(parent).toEqual(node1);

    expect(tree.getLength(u(tree.getNodeByTaxon(B)))).toEqual(1);
    expect(tree.toNewick()).toEqual("((A,T)#Node_1:1,(a,b:1));")
});
it('root length and label', function() {
    const tree = ImmutableTree.fromNewick("((A,T)#Node_1:1,(a,b:1))#root:0.1;")
    const root = tree.getRoot();
    const rootLength = tree.getLength(root);
    expect(rootLength).toEqual(0.1);
    const label = tree.getLabel(root);
    expect(label).toEqual("root");
    expect(tree.toNewick()).toEqual("((A,T)#Node_1:1,(a,b:1))#root:0.1;");
});

it('fail no ;', function(){
    expect(()=>ImmutableTree.fromNewick("('234] ','here a *')")).toThrow("expecting a semi-colon at the end of the newick string");
});


it('fail unbalanced )', function(){
    expect(()=>ImmutableTree.fromNewick("(a,b));")).toThrow("the brackets in the newick file are not balanced: too many closed");
});

it('fail unbalanced (', function(){
    expect(()=>ImmutableTree.fromNewick("((a,b);")).toThrow("unexpected semi-colon in tree did not reach the root yet");
});

it('comment', function() {
    const tree = ImmutableTree.fromNewick("(a[&test=ok],b:1);",{parseAnnotations:true})
    const a = tree.getTaxonByName("a");
    const aNode = tree.getNodeByTaxon(a);
    const testAnnotation =    tree.getAnnotation(aNode, "test");
    expect(testAnnotation).toEqual( "ok" );
});


it('markov jump comment', function() {
    const tree = ImmutableTree.fromNewick("(a[&test=ok],b[&jump={{0.1,U,me}}]);",{parseAnnotations:true})
    const a = tree.getNodeByTaxon(tree.getTaxonByName("a"));
    const b = tree.getNodeByTaxon(tree.getTaxonByName("b"));
    const testAnnotation =    tree.getAnnotation(a, "test");
    expect(testAnnotation).toEqual("ok");
    const jumpAnnotation =    tree.getAnnotation(b, "jump");
    expect(jumpAnnotation).toEqual( [ {time:0.1, from:"U",to: "me"}]);
   
});

it('double comment', function() {
    const tree = ImmutableTree.fromNewick("(a[&test=ok,other test = 1],b:1);",{parseAnnotations:true})
    const a = tree.getNodeByTaxon(tree.getTaxonByName("a"));
    const testAnnotation =    tree.getFullNodeAnnotation(a, "test");
    
    expect(testAnnotation).toEqual({
                            "id": "test",
                            "type": "DISCRETE",
                            "value": "ok",
                            });
    const otherTestAnnotation =    tree.getFullNodeAnnotation(a, "other test");
    expect(otherTestAnnotation).toEqual({
                            "id": "other test",
                            "type": "NUMERICAL",
                            "value": 1,
                            });
});

it('label annotation', function(){
    const tree = ImmutableTree.fromNewick('((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);',
    {parseAnnotations:true,labelName:"probability"});
    const virus1Node = tree.getNodeByTaxon(tree.getTaxonByName("virus1"));

    const probability = tree.getAnnotation(tree.getParent(virus1Node), "probability");
    
    expect(probability).toEqual(0.95);
    
})
}   
 )

