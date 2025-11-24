import type { BaubleTarget } from "./bauble";
import { CladeShapes } from "./bauble";

import type { InternalInteractionType } from "./types";
import type { NodeRef } from "../../evo";
import { Cartoons } from "./clades/cartoon";
import { Highlights } from "./clades/highlight";
import type { Clade } from "../hoc/with-clades";
import type { PathAttrs, RectAttrs } from "./shapes";

// Accessor for Node Shapes

export function Clades(props: CladeProps) {
  switch (props.shape) {
    case CladeShapes.Cartoon:
      return <Cartoons {...props} />;
    case CladeShapes.Highlight:
      return <Highlights {...props} />;
  }
}

type CartoonCladeProps = {
  shape: CladeShapes.Cartoon;
  clades: Clade[];
  attrs: { [key: string]: PathAttrs };
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  // shape:NodeShapes,
  keyBy?: (n: NodeRef) => string;
};
type HighlighCladeProps = {
  shape: CladeShapes.Highlight;
  clades: Clade[];
  attrs: { [key: string]: Omit<RectAttrs, "width" | "height"> };
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  // shape:NodeShapes,
  keyBy?: (n: NodeRef) => string;
};

export type HighlightRectAttrs = Omit<RectAttrs, "width" | "height">; //width and height provided by figtree
export type CladeProps = CartoonCladeProps | HighlighCladeProps;

export type CladeSpec = CladeProps & {
  target: BaubleTarget.Clade;
  id?: string;
};
