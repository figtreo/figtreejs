# Introduction to animating

One of the best parts of working in javascript is out ability to make interactive figures come alive for exploration.

Figtreejs is based on a react framework where changes trickle down from a single source of truth are rerendered with the appropriate changes.
If we provide the `animated` flag to the figure, these changes should be rendered as smooth transitions.
Otherwise they are instantaneous, which is more performant for large trees, and may be enough for your purposes.

It is important to keep in mind, that outside of a react environment the figure doesn't know when variables have changed.
We would have to call the drawing function again to record the change on the screen. 
Luckily, so long as our settings depend on a changing variable observable will rerun the cell for us.


```js 
import {rectangularLayout, polarLayout, radialLayout} from "@figtreejs/browser"
```

All the other bits we'll need
```js 
import {ImmutableTree as Tree,figtree,Branches, NodeLabels,BranchLabels,CircleNodes,RectangleNodes} from "@figtreejs/browser"
```

We'll use the same tree as before.

```js 
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
```js echo
const fillScale = d3.scaleOrdinal(d3.schemeAccent).domain(tree.getAnnotationSummary("host").domain)
```
We'll be using the same set up as before but now I'll set the curvature of the branch from a slider.

```js echo
const curvature = view(Inputs.range([0, 1], {value:0, step: 0.1, label: "Curvature"}))
```

```js  echo
const svg = html`<svg id="rect" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg}
</div>

```js echo
const options = {
                    width:width,
                    height:width*9/16,
                    margins:{top:10,right:10,bottom:10,left:10},
                    tree,
                    animated:true, // for smooth diffs
                     baubles:[
                       Branches({attrs:{stroke:"black",strokeWidth:2},curvature}),
                       CircleNodes({
                        filter:n=>tree.isExternal(n),
                        attrs:{
                            r:6,
                            fill:n=>fillScale(tree.getAnnotation(n,'host').value),
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
```js echo
figtree({...options,svg:svg,layout:rectangularLayout});
```
## Layouts 

What if we want to change the layout? 
That might look something like this.

```js echo
const layoutChoice = view(Inputs.radio(["Rectangular", "Polar", "Radial"], {label: "Layout", value: "Rectangular"}));
```
```js echo
const layout = layoutChoice==="Rectangular"?rectangularLayout :layoutChoice==="Polar"?polarLayout:radialLayout
```

```js  
const svg2 = html`<svg id="layout" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg2}
</div>

```js echo
const options2 = {
                    svg:svg2,
                    layout:layout,
                    width:width,
                    height:width*9/16,
                    margins:{top:10,right:10,bottom:10,left:10},
                    tree,
                    animated:true, // for smooth diffs
                     baubles:[
                       Branches({attrs:{stroke:"black",strokeWidth:2}}),
                       CircleNodes({
                        filter:n=>tree.isExternal(n),
                        attrs:{
                            r:6,
                            fill:n=>fillScale(tree.getAnnotation(n,'host').value),
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
```js echo
figtree(options2);
```