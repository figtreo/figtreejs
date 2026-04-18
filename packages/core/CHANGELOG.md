# @figtreejs/core

## 0.1.0-beta.9

### Patch Changes

- a69b31e: Updates Markov jump parsing to include robust counting arrays of length 4

## 0.1.0-beta.8

### Minor Changes

- a3d18da: Updates how we use getNodes.

  Now that nodes can be removed from the trees hierarchy getNodes is not used internally in figure creation as it can return unattached nodes.

## 0.1.0-beta.7

### Patch Changes

- 26c9e5d: Baubles use postorder traversal so only nodes in topology are rendered

## 0.1.0-beta.6

### Patch Changes

- 7267760: Implements methods to remove node and clade from tree traversals

## 0.1.0-beta.5

### Patch Changes

- bc6d916: Fixes bug in addNodes where taxon list was not updated

## 0.1.0-beta.4

### Patch Changes

- 66dc3a2: Fixes bug in pseudo traversals that were sensitive to the root placement

## 0.1.0-beta.3

### Minor Changes

- 46c6e75: This update changes the radial layout. Internally, the code is easier to folllow. It also allows for pseudorooting and traversals

## 0.1.0-beta.2

### Minor Changes

- e918ff2: updates to react-19

## 0.0.1-beta.1

### Patch Changes

- 6279d10: Rotates radial tip labels properly to match branch angle

## 0.0.1-beta.0

### Patch Changes

- 6c958e3: This marks the initial development set up for figtreejs.
