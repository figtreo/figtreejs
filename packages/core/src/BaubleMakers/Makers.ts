// Nodes

import type {
  CircleAttrs,
  TextAttrs,
  PathAttrs,
  RectAttrs,
  HighlightRectAttrs,
} from "../Components";
import {
  BaubleTarget,
  CladeShapes,
  NodeShapes,
} from "../Components/Baubles/Bauble";
import type { BaseBaubleOptions, ExposedAttrs } from "./utils";

type RectangleNodeAttrs = ExposedAttrs<RectAttrs>;
type CircleNodeAttrs = ExposedAttrs<CircleAttrs>;

export type RectangleNodeOptions = BaseBaubleOptions<RectangleNodeAttrs>;
export type CircleNodeOptions = BaseBaubleOptions<CircleNodeAttrs>;
export type InternalNodeOptions = (
  | (CircleNodeOptions & { shape: NodeShapes.Circle })
  | (RectangleNodeOptions & { shape: NodeShapes.Rectangle })
) & { target: BaubleTarget.Node };

export function CircleNodes(options: CircleNodeOptions): InternalNodeOptions {
  return { ...options, shape: NodeShapes.Circle, target: BaubleTarget.Node };
}

export function RectangleNodes(
  options: RectangleNodeOptions,
): InternalNodeOptions {
  return { ...options, shape: NodeShapes.Rectangle, target: BaubleTarget.Node };
}

// Branches

type BranchAttrs = ExposedAttrs<PathAttrs>;

export type BranchOptions = BaseBaubleOptions<BranchAttrs> & {
  curvature?: number;
};
export type InternalBranchOptions = BranchOptions & {
  target: BaubleTarget.Branch;
};

/**
 * This function takes options from the user about the branches they would like in the figure
 * and passes it to the figure. It is a nice functional API.
 *
 */

export function Branches(options: BranchOptions): InternalBranchOptions {
  return { ...options, target: BaubleTarget.Branch };
}

// Labels

type LabelSpecificTextAttrs = Omit<TextAttrs, "text">; // we will provide this next the text attrs
type LabelAttrs = ExposedAttrs<LabelSpecificTextAttrs>;
type LabelOptions = BaseBaubleOptions<LabelAttrs> &
  ExposedAttrs<{ text: string }>;
export type InternalLabelOptions = LabelOptions &
  (
    | { target: BaubleTarget.NodeLabel; aligned?: boolean }
    | { target: BaubleTarget.BranchLabel }
  );
export type ExternalLabelOptions = Omit<LabelOptions, "attrs"> & {
  attrs?: LabelAttrs;
};

export function NodeLabels(
  options: ExternalLabelOptions & { aligned?: boolean },
): InternalLabelOptions {
  return {
    attrs: {},
    aligned: false,
    ...options,
    target: BaubleTarget.NodeLabel,
  };
}

export function BranchLabels(
  options: ExternalLabelOptions,
): InternalLabelOptions {
  return { attrs: {}, ...options, target: BaubleTarget.BranchLabel };
}

type HighlightAttrs = ExposedAttrs<HighlightRectAttrs>;
type CartoonAttrs = ExposedAttrs<PathAttrs>;

export type HighlightOptions = BaseBaubleOptions<HighlightAttrs>;
export type CartoonOptions = BaseBaubleOptions<CartoonAttrs>;
export type InternalCladeOptions = (
  | (HighlightOptions & { shape: CladeShapes.Highlight })
  | (CartoonOptions & { shape: CladeShapes.Cartoon })
) & { target: BaubleTarget.Clade };

export function HighlightClades(
  options: HighlightOptions,
): InternalCladeOptions {
  return {
    ...options,
    shape: CladeShapes.Highlight,
    target: BaubleTarget.Clade,
  };
}

export function CartoonClades(options: CartoonOptions): InternalCladeOptions {
  return { ...options, shape: CladeShapes.Cartoon, target: BaubleTarget.Clade };
}
