# The tree class

The Immutable tree class forms the foundation of all visualizations.

The tree is implemented as an immutable object, which allows it to play nicely in reactive
environments like observable notebooks and react apps. 

Any method that changes a tree or any node in a tree returns a new reference.
Under the hood we use immer for immutability, so we do not copy the entire tree - only the changes.

```js echo=true 
import {ImmutableTree} from "@figtreejs/browser"
```
Internally, trees save their data in normalized object _data which can be stored in a 
redux store. Trees also have a taxonSet, which will be made by the tree if one is not provided.
The taxon set is not immutable, in that edits to it create a new taxonset or a new tree.
The taxonset it is meant to be made and then not changed. It can be shared between trees and allows for clades in different trees to be identified by their descendent taxa.

You can explore the tree below. Note a node is only changed if its data is changed. 
Changes are not propagated to the root.

```js
display(tree)
```
```js echo=true
const tree = ImmutableTree.fromNewick("((A:1,B:1):1,C:2);")
```
We should not access nodes directly. The _data member is meant to be private.
Trees are immutable and our reference may be outdated. 
Instead you ask the tree about its nodes. 
Here we get the 'A' node from it's name and then get the node's divergence and height.

```js echo=true
const aNode = tree.getNode('A');
 display({divergence:tree.getDivergence(aNode),height:tree.getHeight(aNode)})
```
<div class="note">
These values are not stored; they are calculated on the fly.
Only the lengths are stored. Future versions will cache these calculations 
to be more efficient.

</div>

When we annotate a node the tree keeps track of the type of annotation 
and its domain so that we can easily create scales from the annotations.

```js echo=true
let annotatedTree= tree;
for (const node of tree.getExternalNodes()){
    annotatedTree = annotatedTree.annotateNode(node,{host:"human"})
}
display(annotatedTree.getAnnotationDomain("host"))
```
```js echo=true
display(annotatedTree.getAnnotationType("host"))
```
Note this is a new tree.

```js echo=true
display(annotatedTree===tree)
```
