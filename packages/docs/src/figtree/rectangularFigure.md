
## Rectangular figure

We'll demo how to make a figure using figtreejs 
in an observable page. The main themes are the same for adding a figure to a webpage, say in a `<script/>` tag.


```js
import {ImmutableTree as Tree,figtree,rectangularLayout,Branches, NodeLabels,BranchLabels,CircleNodes,RectNodes} from "@figtreejs/browser"
```

We'll import a tree and some data. 

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

Then we make an svg to house the figure. 
Width is a special parameter determined by observable. 
We could easily set it to our own preferred size.
I'll make the svg here and then I'll render the figure to it below.
```js  echo=Te
const svg = html`<svg id="my-figure" width=${width} height=${width*9/16}></svg>`
```

<div>
   ${svg}
</div>

We make a figure by fist defining options for that figure and then passing it to the 
`figtree` function that renders the figure. If any of the options change we can recall the function
and the figure will be updated.
This represents the simplest options.
The 'marks' on the figure are determined by the `Baubles` array. 
Here we just include branches.
```js echo
const options1  = {
    svg,
    width:width,
    height:width*9/16,
    tree,
    margins:{top:10,right:10,bottom:10,left:10},
    layout:rectangularLayout,
    baubles:[Branches()]
}
```
And now we draw it.
```js echo
figtree(options1);
```
# Adding nodes labels

All baubles are functions that take in filter,attrs, and interaction options. 
Filter is a function that operates on each node of the tree. Only nodes that return true are rendered.
attrs is an object of either constants or function that act on nodes and return the value of attributes.
Interaction behaves similarly.

Here we'll just add tip labels to our tree.
```js  echo
const svg2 = html`<svg id="my-figure2" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg2}
</div>

```js echo
const options2 = {...options1,
                    svg:svg2,
                    margins:{...options1.margins,right:60},
                    baubles:[
                        Branches(),
                        NodeLabels(
                            {filter:n=>tree.isExternal(n),
                            text:n=>tree.getTaxon(n).name,
                            attrs:{
                                fontFamily:'Helvetica',
                                fontWeight:400,
                            }
                            }
                    )]
                    };
figtree(options2);
```
## Adding Branch labels

```js  echo
const svg3 = html`<svg id="my-figure3" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg3}
</div>

```js echo
const options3 = {...options2,
                    svg:svg3,
                    margins:{...options2.margins,top:20},
                     baubles:[
                       ...options2.baubles,
                       BranchLabels(
                        {
                            text:n=>tree.getLength(n),
                            attrs:{
                                fontFamily:'Helvetica',
                                fontWeight:400,
                                fontSize:12
                            }
                        }
                       )]
                }
figtree(options3);
```

## Nodes

Now let's go back to the original and this time add node shapes colored by the host annotation.
I'll also add rectangle at the root.

First we'll make a color scale.
```js echo
const fillScale = d3.scaleOrdinal(d3.schemeAccent).domain(tree.getAnnotationDomain("host"))
```

```js  echo
const svg2b = html`<svg id="my-figure2b" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg2b}
</div>

```js echo
const options3 = {...options2,
                    svg:svg2b,
                    
                     baubles:[
                       ...options1.baubles,
                       CircleNodes({
                        filter:n=>tree.isExternal(n),
                        attrs:{
                            r:6,
                            fill:n=>fillScale(tree.getAnnotation(n,'host')),
                            stroke:'black',
                            strokeWidth:2
                        }
                       }),
                       RectNodes({
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
figtree(options3);
```