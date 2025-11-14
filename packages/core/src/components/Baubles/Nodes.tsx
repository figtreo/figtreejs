import type { CircleAttrs, RectAttrs } from "./Shapes";
import { BaseCircle, CenteredRectangle } from "./Shapes";

import { withNode } from "../HOC";
import type { BaubleTarget } from "./Bauble";
import { NodeShapes } from "./Bauble";
import { withNodes } from "../HOC/withNodes";
import type { InternalInteractionType } from "./types";
import type { NodeRef } from "../../Evo";

/**
 * Add a Circle node Bauble to the figure.
 */
const CircleNodes = withNodes(withNode(BaseCircle));
/**
 *
 * Add a Rectangular node Bauble to the figure.
 */
const RectangleNodes = withNodes(withNode(CenteredRectangle));

// Accessor for Node Shapes

export function Nodes(props: NodeProps) {
  switch (props.shape) {
    case NodeShapes.Circle:
      return <CircleNodes {...props} />;
    case NodeShapes.Rectangle:
      return <RectangleNodes {...props} />;
  }
}

type CircleNodeProps = {
  shape: NodeShapes.Circle;
  nodes: NodeRef[];
  attrs: { [key: string]: CircleAttrs };
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  // shape:NodeShapes,
  keyBy?: (n: NodeRef) => string;
};
type RectangleNodeProps = {
  shape: NodeShapes.Rectangle;
  nodes: NodeRef[];
  attrs: { [key: string]: RectAttrs };
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  // shape:NodeShapes,
  keyBy?: (n: NodeRef) => string;
};

type NodeProps = CircleNodeProps | RectangleNodeProps;

export type NodeSpec = NodeProps & { target: BaubleTarget.Node; id?: string };
