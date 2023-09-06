import { processAnnotationValue } from "./AnnotationParser";
import { parseNewick } from "./TreeParser";

describe("Test annotation parsing",()=>{

    it('integer', function () {
        const annotation = processAnnotationValue("1");
        expect(annotation).toEqual({ type: "INTEGER", value: 1 });
    });
    it('integer array', function () {
        const annotation = processAnnotationValue(["1", "2", "3"]);
        expect(annotation).toEqual({ type: "INTEGER", value: [1, 2, 3] });
    });

    it('continuous array', function () {
        const annotation = processAnnotationValue(["1", "2.5", "3"]);
        expect(annotation).toEqual({ type: "CONTINUOUS", value: [1, 2.5, 3] });
    });

    it('continuous', function () {
        const annotation = processAnnotationValue("1.3");
        expect(annotation).toEqual({ type: "CONTINUOUS", value: 1.3 });
    });
    it('discrete', function () {
        const annotation = processAnnotationValue("a");
        expect(annotation).toEqual({ type: "DISCRETE", value: "a" });
    });
    it('discrete array', function () {
        const annotation = processAnnotationValue(["a", "b", "c"]);
        expect(annotation).toEqual({ type: "DISCRETE", value: ["a", "b", "c"] });
    });
    it('markov jump', function () {
        const annotation = processAnnotationValue([["0.1", "U", "me"]]);
        expect(annotation).toEqual({ type: "MARKOV_JUMP", value: [{ time: 0.1, from: "U", to: "me" }] });
    });
    it('markov jump array', function () {
        const annotation = processAnnotationValue([[0.1, "U", "me"], [0.2, "me", "U"]]);
        expect(annotation).toEqual({ type: "MARKOV_JUMP", value: [{ time: 0.1, from: "U", to: "me" }, { time: 0.2, from: "me", to: "U" }] });
    });
    it('probabilities', function () {
        const annotation = processAnnotationValue({ HERE: 0.3, THERE: 0.7 });
        expect(annotation).toEqual({ type: "PROBABILITIES", value: { HERE: 0.3, THERE: 0.7 } });
    });
});

// describe("Test tree parsing",()=>{
//     it('simpleParse', function() {

//         const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;

//         const tree = parseNewick(newickString);
//         expect(tree.toNewick()).equal(newickString);

//     }); 
//     it('height', function() {
//         const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
//         const tree = parseNewick(newickString);

//         const virus1Node = tree.getNodeFromTaxonName("virus1")!
//         expect(tree.getNodeHeight(virus1Node)).to.be.closeTo(0.06,1e-6)
//   })
//   it('divergence', function() {
//     const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
//     const tree = parseNewick(newickString);

//     const virus6Node = tree.getNodeFromTaxonName("virus6")!
//     expect(tree.getNodeDivergence(virus6Node)).to.be.closeTo(0.67,1e-6)
// })
//  it('general_parse', function() {
//     const tree = parseNewick("(a:1,b:4)l;");
//     const root = tree.root!;
//     const label = tree.getLabel(root)
//     expect(label).to.equal( "l");

//     const r = tree.getNodeFromLabel("l");
//     expect(r).to.equal(root);

//     const  names = [];
//     const   bl = [];

//     const count = tree.getChildCount(root);
//     const rootLength = tree.getBranchLength(root);
//     if(rootLength) {
//         bl.push(tree.getBranchLength(root))
//     }
//     for (let i = 0; i < count; i++) {
//         const child=  tree.getChild(root, i);
//         names.push(tree.getTaxon(child)!.id);
//         bl.push(tree.getBranchLength(child))
//     }
//     expect(names).to.deep.equal(["a", "b"]);

//     expect(bl).to.deep.equal([1, 4]);
// })

// it('scientific notation', function() {
//     const tree = parseNewick("(a:1E1,b:2e-5)l;");
//     const root = tree.root!;
//     const bl = [];
//     const count = tree.getChildCount(root);
//     const rootLength = tree.getBranchLength(root);
//     if (rootLength) {
//         bl.push(tree.getBranchLength(root));
//     }
//     for (let i = 0; i < count; i++) {
//         const child = tree.getChild(root, i);
//         bl.push(tree.getBranchLength(child));
//     }
//     expect(bl[0]).to.be.closeTo(10.0, 1e-6);
//     expect(bl[1]).to.be.closeTo(0.00002, 1e-6);

// })

// it('quoted taxa', function() {

//    const tree = parseNewick("('234] ':1,'here a *':1);")
//    const names = tree.nodes.map((node) => tree.getTaxon(node)).filter(taxa => taxa !== null).map((taxa) => taxa!.id)
//    expect(names).to.deep.equal(["'234] '", "'here a *'"])
// })

// it('whitespace', function() {
//     const tree = parseNewick("  (a,b:1);\t")
//     expect(tree.toNewick()).to.equal("(a,b:1);")
// });
// it('node id', function() {
//     const tree = parseNewick("((A,T)Node_1:1,(a,b:1));")
    
//     const A = tree.getNodeFromTaxonName("A")!;
//     const node1 = tree.getNodeFromLabel("Node_1")!;
//     const parent = tree.getParent(A);
//     expect(parent).to.equal(node1);

//     expect(tree.toNewick()).to.equal("((A,T)Node_1:1,(a,b:1));")
// });
// it('root length and label', function() {
//     const tree = parseNewick("((A,T)Node_1:1,(a,b:1))root:0.1;")
//     const root = tree.root!;
//     const rootLength = tree.getBranchLength(root);
//     expect(rootLength).to.equal(0.1);
//     const label = tree.getLabel(root);
//     expect(label).to.equal("root");
//     expect(tree.toNewick()).to.equal("((A,T)Node_1:1,(a,b:1))root:0.1;");
// });

// it('fail no ;', function(){
//     expect(()=>parseNewick("('234] ','here a *')")).to.throw("expecting a semi-colon at the end of the newick string");
// });


// it('fail unbalanced )', function(){
//     expect(()=>parseNewick("(a,b));")).to.throw("the brackets in the newick file are not balanced: too many closed");
// });

// it('fail unbalanced (', function(){
//     expect(()=>parseNewick("((a,b);")).to.throw("the brackets in the newick file are not balanced: too many opened");
// });

// it('comment', function() {
//     const tree = parseNewick("(a[&test=ok],b:1);")
//     const a = tree.getNodeFromTaxonName("a")!;
//     const testAnnotation =    tree.getAnnotation(a, "test");
//     expect(testAnnotation).to.equal( "ok" );
// });


// it('markov jump comment', function() {
//     const tree = parseNewick("(a[&test=ok],b[&jump={{0.1,U,me}}]);")
//     const a = tree.getNodeFromTaxonName("a")!;
//     const b = tree.getNodeFromTaxonName("b")!;
//     const testAnnotation =    tree.getAnnotation(a, "test");
//     expect(testAnnotation).to.equal("ok");
//     const jumpAnnotation =    tree.getAnnotation(b, "jump");
//     expect(jumpAnnotation).to.deep.equal( [ {time:0.1, from:"U",to: "me"}]);
   
// });

// it('double comment', function() {
//     const tree = parseNewick("(a[&test=ok,other test = 1],b:1);")
//     const a = tree.getNodeFromTaxonName("a")!;
//     const testAnnotation =    tree.getAnnotation(a, "test");
//     expect(testAnnotation).to.equal("ok");
//     const otherTestAnnotation =    tree.getAnnotation(a, "other test");
//     expect(otherTestAnnotation).to.equal(1);
// });
// }    )

