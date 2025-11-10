
// src/index.ts
import * as Core from '@figtreejs/core';
import figtree from './FigtreeRender';
import { staticRender } from './FigtreeRender';

// named export
export * from '@figtreejs/core';
export { figtree, staticRender};

// default export as a convenient namespace:
type FT = typeof Core & { figtree: typeof figtree ; staticRender :typeof staticRender};
export const ft: FT = { ...Core, figtree,staticRender};

