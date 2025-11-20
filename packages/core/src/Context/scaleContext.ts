import { createContext } from "react";
import type { scaleType } from "../store/store";
import type { simpleVertex } from "../Layouts/types";

const defaultScale: scaleType = <T extends simpleVertex>(vertex: T) => {
  return {
    ...vertex,
    x: 0,
    y: 0,
  };
};
export const ScaleContext = createContext(defaultScale);
