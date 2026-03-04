# Using jsx

JSX makes it much easier to manipulate html elements with a simple api.

```js echo
import {
  rectangularLayout,
  polarLayout,
  radialLayout,
} from "npm:@figtreejs/core@0.1.0-beta.4";
import {
  ImmutableTree as Tree,
  FigTree,
  Branches,
  NodeLabels,
  BranchLabels,
  CircleNodes,
  RectangleNodes,
} from "npm:@figtreejs/core@0.1.0-beta.4";
```

Figtreejs uses this api under the hood so leveraging it here is fairly straightforward.

We'll use the same tree and data as before.

```js echo=true
const newickString =
  "((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);";
const hostData = {
  virus1: { host: "camel" },
  virus2: { host: "camel" },
  virus3: { host: "human" },
  virus4: { host: "human" },
  virus5: { host: "bat" },
  virus6: { host: "bat" },
  virus7: { host: "bat" },
  virus8: { host: "bat" },
  virus9: { host: "whale" },
  virus10: { host: "whale" },
};
function annotateTips(data, tree) {
  let t = tree;
  for (const tip of Object.keys(data)) {
    t = t.annotateNode(t.getNode(tip), data[tip]);
  }
  return t;
}
// using a promise so we can chain the processing together.
const tree = new Promise((resolve) =>
  resolve(Tree.fromNewick(newickString)),
).then((t) => annotateTips(hostData, t));
```

```js echo
const fillScale = d3
  .scaleOrdinal(d3.schemeAccent)
  .domain([...tree.getAnnotationSummary("host").domain, "unknown"]);
```

```js
const treeRef = Mutable(tree);
const setTree = (tree) => (treeRef.value = tree);
```

```js echo
const options = {
  width: width,
  height: (width * 9) / 16,
  tree: treeRef,
  margins: { top: 10, right: 10, bottom: 10, left: 10 },
  layout: rectangularLayout,
  animated: true,
  baubles: [
    Branches({
      attrs: { stroke: "black", strokeWidth: 2, cursor: "pointer" },
      interactions: {
        onClick: (n) => setTree(treeRef.reroot(n, 0.5)),
      },
    }),
    CircleNodes({
      filter: (n) => tree.isExternal(n),
      attrs: {
        r: 6,
        fill: (n) => fillScale(tree.getAnnotation(n, "host", "unknown")),
        stroke: "black",
        strokeWidth: 2,
      },
    }),
    RectangleNodes({
      filter: (n) => tree.isRoot(n),
      attrs: {
        height: 10,
        width: 10,
        fill: "red",
        stroke: "black",
      },
    }),
  ],
  opts: {
    root: treeRef.getNode("virus7"),
  },
};
```

Figtreejs adds a figure to an existing svg.
Here we'll define a function to make that svg and the figure

```jsx echo
function Figure({ options }) {
  return (
    <svg width={options.width} height={options.height}>
      <FigTree {...options} />
    </svg>
  );
}
```

```jsx echo
display(<Figure options={options} />);
```

```jsx echo
display(<Figure options={{ ...options, layout: radialLayout }} />);
```
