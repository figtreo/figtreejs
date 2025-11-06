
// src/index.ts
import * as Core from '@figtreejs/core';
import figtree from './FigtreeRender';

// named export
export * from '@figtreejs/core';
export { figtree };

// default export as a convenient namespace:
type FT = typeof Core & { figtree: typeof figtree };
export const ft: FT = { ...Core, figtree };

