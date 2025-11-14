
## Introduction to layouts

Figtreejs offers three layouts 
```js echo
import {rectangularLayout, polarLayout, radialLayout} from "@figtreejs/browser"
```

All the other bits we'll need
```js echo
import {ImmutableTree as Tree,figtree,Branches, NodeLabels,BranchLabels,CircleNodes,RectangleNodes} from "@figtreejs/browser"
```

We'll use the same tree as before.

```js echo=true
const newickString = '((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);'
const hostData = {
        "virus1": { host: "camel" },
        "virus2": { host: "camel" },
        "virus3": { host: "human" },
        "virus4": { host: "human" },
        "virus5": { host: "bat" },
        "virus6": { host: "bat" },
        "virus7": { host: "bat" },
        "virus8": { host: "bat" },
        "virus9": { host: "whale" },
        "virus10": { host: "whale" }
    }
function annotateTips(data,tree){
    let t = tree;
    for(const tip of Object.keys(data)){
        t = t.annotateNode(t.getNode(tip),data[tip])
    }
    return t;
}
// using a promise so we can chain the processing together.
const tree = new Promise((resolve)=>resolve(Tree.fromNewick(newickString)))
                                .then(t=>annotateTips(hostData,t))
```

Many of the visual aspects of a figure depend on the layout. 
Figtree.js handles that for you. Notice that branches are drawn differently in each layout below.

This options will be shared by all figures.
```js echo

const fillScale = d3.scaleOrdinal(d3.schemeAccent).domain([...tree.getAnnotationSummary("host").domain,'unknown'])

const options = {
                    width:width,
                    height:width*9/16,
                    margins:{top:10,right:10,bottom:10,left:10},
                    tree,
                     baubles:[
                       Branches({attrs:{stroke:"black",strokeWidth:2}}),
                       CircleNodes({
                        filter:n=>tree.isExternal(n),
                        attrs:{
                            r:6,
                            fill:n=>fillScale(tree.getAnnotation(n,'host','unknown')),
                            stroke:'black',
                            strokeWidth:2
                        }
                       }),
                       RectangleNodes({
                        filter:n=>tree.isRoot(n),
                        attrs:{
                            height:10,
                            width:10,
                            fill:'red',
                            stroke:'black'
                        }
                       })
                       ]
                }

```


## Rectangular layout
I'll make the svg here and then I'll render the figure to it below.
```js  echo
const svg = html`<svg id="rect" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg}
</div>

```js echo
figtree({...options,svg:svg,layout:rectangularLayout});
```
## Polar layout

```js  echo
const svg2 = html`<svg id="polar" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg2}
</div>

```js echo
figtree({...options,svg:svg2,layout:polarLayout});
```

## Radial layout

```js  echo
const svg3 = html`<svg id="radial" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg3}
</div>

```js echo
figtree({...options,svg:svg3,layout:radialLayout});
```
# Deeper exploration
What is going on under the hood? Each layout function takes a tree and returns a function that converts a node to a vertex.
Figtreejs passes this function to the required baubles to render each shape, but we can use it outside of the figure as well.
This can be particularly useful if we want to render a tree with a different library, such as observable plot.

```js echo 
const rl = rectangularLayout(tree)
```
All of the work is done upfront in the first call. each subsequent call just accesses the precomputed values.
```js echo
display(tree.getNodes().map(d=>rl(d)) )
```
The main thing to notice is the x,y. These are not scaled to the svg.

There is how we might recreate a figure in observable plot.
we'll have to do some work to make the branches.
```js echo
const edges = tree.getNodes()
        .filter(n => !tree.isRoot(n))
        .map(n => ({ child: rl(n), parent: rl(tree.getParent(n)), node: n }))
```

```js echo
Plot.plot({
        width: width,
        height: width*9/16,
        marginRight: 15,
        marginTop: 20,
        marginBottom:30,
        y: { axis: null },
        x: {
           label:"divergence"
        },
        marks: [
            //branches
            Plot.link(edges, {
                x2: e => e.child.x,
                x1: e => e.parent.x,
                y1: e => e.parent.y,
                y2: e => e.child.y,
                curve: "step-before",
                strokeWidth: 2,
                stroke: 'black'
            }),
            //tips
            Plot.dot(tree.getNodes().filter(d=>tree.isExternal(d)).map(d=>({...rl(d),node:d})),{
                filter:d=>tree.isExternal(d.node),
                r:6 ,
                fill: n=>fillScale(tree.getAnnotation(n.node,'host','unknown')),
                x:"x",
                y:"y",
                stroke:'black',
                strokeWidth:2
            })

        ]
    })

```



