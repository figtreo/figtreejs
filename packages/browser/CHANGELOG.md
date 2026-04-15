# @figtreejs/browser

## 0.1.0-beta.8

### Minor Changes

- a3d18da: Updates how we use getNodes.

  Now that nodes can be removed from the trees hierarchy getNodes is not used internally in figure creation as it can return unattached nodes.

### Patch Changes

- Updated dependencies [a3d18da]
  - @figtreejs/core@0.1.0-beta.8

## 0.1.0-beta.7

### Patch Changes

- 26c9e5d: Baubles use postorder traversal so only nodes in topology are rendered
- Updated dependencies [26c9e5d]
  - @figtreejs/core@0.1.0-beta.7

## 0.1.0-beta.6

### Patch Changes

- 7267760: Implements methods to remove node and clade from tree traversals
- Updated dependencies [7267760]
  - @figtreejs/core@0.1.0-beta.6

## 0.1.0-beta.5

### Patch Changes

- bc6d916: Fixes bug in addNodes where taxon list was not updated
- Updated dependencies [bc6d916]
  - @figtreejs/core@0.1.0-beta.5

## 0.1.0-beta.4

### Patch Changes

- 66dc3a2: Fixes bug in pseudo traversals that were sensitive to the root placement
- Updated dependencies [66dc3a2]
  - @figtreejs/core@0.1.0-beta.4

## 0.1.0-beta.3

### Minor Changes

- 46c6e75: This update changes the radial layout. Internally, the code is easier to folllow. It also allows for pseudorooting and traversals

### Patch Changes

- Updated dependencies [46c6e75]
  - @figtreejs/core@0.1.0-beta.3

## 0.1.0-beta.2

### Minor Changes

- e918ff2: updates to react-19

### Patch Changes

- Updated dependencies [e918ff2]
  - @figtreejs/core@0.1.0-beta.2

## 0.0.1-beta.1

### Patch Changes

- Updated dependencies [6279d10]
  - @figtreejs/core@0.0.1-beta.1

## 0.0.1-beta.0

### Patch Changes

- 6c958e3: This marks the initial development set up for figtreejs.
- Updated dependencies [6c958e3]
  - @figtreejs/core@0.0.1-beta.0
