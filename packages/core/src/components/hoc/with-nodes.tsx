import type { NodeRef } from "../../evo";
import type { AttrsRecord, InternalInteractionType } from "../baubles/types";

export type NodeProps<A extends object> = {
  nodes: NodeRef[];
  attrs?: AttrsRecord<A>;
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  aligned?: boolean;
  keyBy?: (n: NodeRef) => string;
};

//TODO key by not being passed down

/**
 * A component that
 * The factory accepts the options above and returns a Bauble to be rendered by the figure.
 */
//TODO do interactions
export function withNodes<T extends object>(
  ShapeComponent: React.FC<T & { node: NodeRef }>,
): React.FC<NodeProps<T>> {
  const withNodes = (props: NodeProps<T>) => {
    const { nodes, keyBy = (n: NodeRef) => n._id, attrs = {}, aligned } = props;

    return (
      <g className={"node-layer"}>
        {nodes.map((node) => {
          const nodeAttrs = attrs[node._id] ?? {};
          // const nodeInteractions = interactions[node._id]?? {}
          return (
            <ShapeComponent
              key={keyBy(node)}
              node={node}
              {...nodeAttrs}
              aligned={aligned}
              // interactions={nodeInteractions}
            />
          );
        })}
      </g>
    );
  };
  withNodes.displayName = `withNodesArray(${ShapeComponent.displayName || ShapeComponent.name || "Component"})`;
  return withNodes;
}
