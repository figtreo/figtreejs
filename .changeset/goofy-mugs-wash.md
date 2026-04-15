---
"@figtreejs/browser": minor
"@figtreejs/core": minor
---

Updates how we use getNodes.

Now that nodes can be removed from the trees hierarchy getNodes is not used internally in figure creation as it can return unattached nodes.
