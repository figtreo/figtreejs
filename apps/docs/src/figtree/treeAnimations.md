
```js 
import {rectangularLayout, polarLayout, radialLayout} from "@figtreejs/browser"
```

```js 
import {ImmutableTree as Tree,figtree,Branches, NodeLabels,BranchLabels,CircleNodes,RectangleNodes} from "@figtreejs/browser"
```


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
```js 
const fillScale = d3.scaleOrdinal(d3.schemeAccent).domain([...tree.getAnnotationSummary("host").domain,'unknown'])
```


# Animations based on the tree

Perviously our animations were based on actions external to the tree.
But interacting with the tree can be very helpful. 
How do we do that?

## Interactions
Each bauble takes an interactions object composed of keys and functions that fire on that interaction. 
The functions are passed to the node that defined the bauble

Below we'll use this to change the value of a 'hovered' node.
Because these values are updated outside of the cell in which they are defined we use observables mutable interface.

```js echo
const hoveredNode = Mutable(null);
const setHoveredNode=(n) =>hoveredNode.value=n;
```
```js echo
display(hoveredNode)
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
                       Branches({attrs:{stroke:"black",strokeWidth:2}}),
                       CircleNodes({
                        filter:n=>tree.isExternal(n),
                        attrs:{
                            r:6,
                            fill: n=>fillScale(tree.getAnnotation(n,'host','unknown')),
                            stroke:'black',
                            strokeWidth:2
                        },
                        interactions:{
                            onMouseOver:(node)=>setHoveredNode(node),
                            onMouseLeave:(node)=>setHoveredNode(null)
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
## Highlighting a node
Here we'll use the same set up above, but we'll use the selected node's identity to update the radius of a each tip, and optionally display it's tip label.
```js  echo
const svg2 = html`<svg id="interactions" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg2}
</div>

```js echo
const options2 = {
                    svg:svg2,
                    layout:rectangularLayout,
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
                            r:n=>n===hoveredNode?10:6,
                             fill: n=>fillScale(tree.getAnnotation(n,'host','unknown')),
                            stroke:'black',
                            strokeWidth:2,
                            cursor:'pointer' // makes a hand to highlight interactivity
                        },
                        interactions:{
                            onMouseOver:(node)=>setHoveredNode(node),
                            onMouseLeave:(node)=>setHoveredNode(null)
                        }
                       }),
                       NodeLabels({
                        filter:n=>n===hoveredNode,
                        text:n=>tree.getTaxon(n).name,
                        gap:10,
                         attrs:{
                                fontFamily:'Helvetica',
                                fontWeight:400,
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
## Changing the tree
Up to this point the animations are based on a state that does not include the tree. 
What if we want to the tree to change? 
One way to do it is to make the tree a mutable.

```js
const treeRef = Mutable(tree)
const setTree = (tree) =>treeRef.value=tree
```
```js
display(treeRef)
```
```js  echo
const svg3 = html`<svg id="reroot" width=${width} height=${width*9/16}></svg>`
```
<div>
   ${svg3}
</div>

Clicking on branches will reroot the tree halfway along that branch.
Clicking on an internal node will rotate that node.

```js echo
const options3 = {
                    svg:svg3,
                    layout:rectangularLayout,
                    width:width,
                    height:width*9/16,
                    margins:{top:10,right:10,bottom:10,left:10},
                    tree:treeRef,
                    animated:true, // for smooth diffs
                     baubles:[
                       Branches({
                        attrs:{stroke:"black",
                                strokeWidth:2,
                                cursor:"pointer"},
                        interactions:{
                            onClick:(node)=>{
                                setTree(treeRef.reroot(node,0.5))
                            }
                        }
                        }),
                       CircleNodes({
                        filter:n=>treeRef.isExternal(n),
                        attrs:{
                            r:6,
                            fill: n=>fillScale(tree.getAnnotation(n,'host','unknown')),
                            stroke:'black',
                            strokeWidth:2,
                        }
                       }),
                       RectangleNodes({
                        filter:n=>!treeRef.isExternal(n),
                        attrs:{
                            height:10,
                            width:10,
                            fill: n=> treeRef.isRoot(n)?'red':'grey',
                            stroke:'black',
                             cursor:"pointer"
                        },
                        interactions:{
                            onClick:(node)=>{
                                setTree(treeRef.rotate(node))
                            }
                        }
                       
                       }),

                       ]
                }
```
The functions above (onClick) return new trees that are then set as treeRef which triggers the cell below to fire (since it refernces treeRef) which updates the svg.

```js echo
figtree(options3);
```