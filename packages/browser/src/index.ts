// src/index.ts
import * as Core from "@figtreejs/core";
import figtree from "./FigtreeRender";
import { figtreeStatic } from "./FigtreeRender";

// named export
export * from "@figtreejs/core";
export { figtree, figtreeStatic };

// default export as a convenient namespace:
type FT = typeof Core & {
  figtree: typeof figtree;
  figtreeStatic: typeof figtreeStatic;
};
export const ft: FT = { ...Core, figtree, figtreeStatic };
