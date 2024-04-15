import { TreeduxList } from "./treeduxList";

describe("Test tree parsing and TREEDUX",()=>{
    it('simpleParse', function() {

        const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;

        const tree = TreeduxList.fromNewick(newickString,{parseAnnotations:false});
        expect(tree.toNewick()).toEqual(newickString);

    }); 

    it('height', function() {
        const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
        const tree = TreeduxList.fromNewick(newickString);

        const virus1Node = tree.getNodeByName("virus1")!
        expect(tree.getHeight(virus1Node)).toBeCloseTo(0.06,1e-6)
  })
  it('divergence', function() {
    const newickString = `((((((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2,(virus6:0.45,virus7:0.4):0.02):0.1,virus8:0.4):0.1,(virus9:0.04,virus10:0.03):0.6);`;
    const tree = TreeduxList.fromNewick(newickString);

    const virus6Node = tree.getNodeByName("virus6")!
    expect(tree.getDivergence(virus6Node)).toBeCloseTo(0.67,1e-6)
})
 it('general_parse', function() {
    const tree = TreeduxList.fromNewick("(a:1,b:4)#l;"); 
    const root = tree.root!;
    const label = tree.getLabel(root)
    expect(label).toEqual( "l");

    const r = tree.getNodeByLabel("l");
    expect(r).toEqual(root);

    const  names = [];
    const   bl = [];

    const count = tree.getChildCount(root);
    const rootLength = tree.getLength(root);
    if(rootLength) {
        bl.push(tree.getLength(root))
    }
    for (let i = 0; i < count; i++) {
        const child=  tree.getChild(root, i);
        names.push(tree.getName(child)!);
        bl.push(tree.getLength(child))
    }
    expect(names).toEqual(["a", "b"]);

    expect(bl).toEqual([1, 4]);
})

it('scientific notation', function() {
    const tree = TreeduxList.fromNewick("(a:1E1,b:2e-5)l;");
    const root = tree.root!;
    const bl = [];
    const count = tree.getChildCount(root);
    const rootLength = tree.getLength(root);
    if (rootLength) {
        bl.push(tree.getLength(root));
    }
    for (let i = 0; i < count; i++) {
        const child = tree.getChild(root, i);
        bl.push(tree.getLength(child));
    }
    expect(bl[0]).toBeCloseTo(10.0, 1e-6);
    expect(bl[1]).toBeCloseTo(0.00002, 1e-6);

})

it('quoted taxa', function() {

   const tree =  TreeduxList.fromNewick("('234] ':1,'here a *':1);")
   const names = [...tree.getTips()].map((node) => tree.getName(node));
   expect(names).toEqual(["234]", "here a *"])
})

it('whitespace', function() {
    const tree =  TreeduxList.fromNewick("  (a,b:1);\t")
    expect(tree.toNewick()).toEqual("(a,b:1);")
});
it('node id', function() {
    const tree = TreeduxList.fromNewick("((A,T)#Node_1:1,(a,b:1));")
    
    const A = tree.getNodeByName("A")!;
    const node1 = tree.getNodeByLabel("Node_1")!;
    const parent = tree.getParent(A);

    expect(parent).toEqual(node1);

    expect(tree.toNewick()).toEqual("((A,T)#Node_1:1,(a,b:1));")
});
it('root length and label', function() {
    const tree = TreeduxList.fromNewick("((A,T)#Node_1:1,(a,b:1))#root:0.1;")
    const root = tree.root!;
    const rootLength = tree.getLength(root);
    expect(rootLength).toEqual(0.1);
    const label = tree.getLabel(root);
    expect(label).toEqual("root");
    expect(tree.toNewick()).toEqual("((A,T)#Node_1:1,(a,b:1))#root:0.1;");
});

it('fail no ;', function(){
    expect(()=>TreeduxList.fromNewick("('234] ','here a *')")).toThrow("expecting a semi-colon at the end of the newick string");
});


it('fail unbalanced )', function(){
    expect(()=>TreeduxList.fromNewick("(a,b));")).toThrow("the brackets in the newick file are not balanced: too many closed");
});

it('fail unbalanced (', function(){
    expect(()=>TreeduxList.fromNewick("((a,b);")).toThrow("the brackets in the newick file are not balanced: too many opened");
});

it('comment', function() {
    const tree = TreeduxList.fromNewick("(a[&test=ok],b:1);",{parseAnnotations:true})
    const a = tree.getNodeByName("a")!;
    const testAnnotation =    tree.getAnnotation(a, "test");
    expect(testAnnotation).toEqual( "ok" );
});


it('markov jump comment', function() {
    const tree = TreeduxList.fromNewick("(a[&test=ok],b[&jump={{0.1,U,me}}]);",{parseAnnotations:true})
    const a = tree.getNodeByName("a")!;
    const b = tree.getNodeByName("b")!;
    const testAnnotation =    tree.getAnnotation(a, "test");
    expect(testAnnotation).toEqual("ok");
    const jumpAnnotation =    tree.getAnnotation(b, "jump");
    expect(jumpAnnotation).toEqual( [ {time:0.1, from:"U",to: "me"}]);
   
});

it('double comment', function() {
    const tree = TreeduxList.fromNewick("(a[&test=ok,other test = 1],b:1);",{parseAnnotations:true})
    const a = tree.getNodeByName("a")!;
    const testAnnotation =    tree.getAnnotation(a, "test");
    expect(testAnnotation).toEqual("ok");
    const otherTestAnnotation =    tree.getAnnotation(a, "other test");
    expect(otherTestAnnotation).toEqual(1);
});

it('label annotation', function(){
    const tree = TreeduxList.fromNewick('((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);',
    {parseAnnotations:true,labelName:"probability"});

    const virus1Node = tree.getNodeByName("virus1")!;
    const probability = tree.getAnnotation(tree.getParent(virus1Node)!, "probability");
    
    expect(probability).toEqual(0.95);
    
})

it('rotate',function(){
    const tree = TreeduxList.fromNewick('(A:1,(B:1,(C:1,D:1):1):1);');
    const C = tree.getNodeByName("C")!;
    const D = tree.getNodeByName("D")!;
    const parent = tree.getParent(C)!;
    expect(tree.getChild(parent,0)).toEqual(C);
    tree.rotate(parent,true);
    expect(tree.getChild(parent,0)).toEqual(D);
})

it('reroot',function(){
    const tree = TreeduxList.fromNewick('(A:1,(B:1,(C:1,D:1):1):1);');
    const C = tree.getNodeByName("C")!;
    const divergence = tree.getDivergence(C);
    expect(divergence).toEqual(3);
    tree.reroot(C,0.5);
    const newDivergence = tree.getDivergence(C);
    expect(newDivergence).toEqual(0.5);
}   
 ),
it('two trees',function(){
    const tree = TreeduxList.fromNewick('((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);',
    {parseAnnotations:true,labelName:"probability"});
    tree.addFromNewick('(A:1,(B:1,(C:1,D:1):1):1);');
    const C = tree.getNodeByName("C")!;
    const divergence = tree.getDivergence(C);
    expect(divergence).toEqual(3);

    tree.getPreviousTree();
    const virus1Node = tree.getNodeByName("virus1")!;
    const probability = tree.getAnnotation(tree.getParent(virus1Node)!, "probability");
    
    expect(probability).toEqual(0.95);
})


})