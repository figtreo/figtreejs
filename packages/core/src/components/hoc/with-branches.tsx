/**
 * An HOC that passes nodes and attrs to label components
 */
import type { NodeRef } from "../../evo";
import type { AttrsRecord, InternalInteractionType } from "../baubles/types";

export type BranchProps<A extends object> = {
  branches: { node: NodeRef; parent: NodeRef }[];
  attrs?: AttrsRecord<A>;
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  // shape:NodeShapes,
  keyBy?: (n: NodeRef) => string;
  curvature?: number;
};

/**
 * A HOC that provides parent child and attrs to componets that need this information
 */
//TODO do interactions
export function withBranches<baseComponentAttrs extends object>(
  ShapeComponent: React.FC<
    baseComponentAttrs & { node: NodeRef; parent?: NodeRef; curvature?: number }
  >,
): React.FC<BranchProps<baseComponentAttrs>> {
  const withNodes = (props: BranchProps<baseComponentAttrs>) => {
    const {
      branches,
      keyBy = (n: NodeRef) => n._id,
      attrs = {},
      curvature,
    } = props;

    return (
      <g className={"branch-layer"}>
        {branches.map(({ node, parent }) => {
          const nodeAttrs = attrs[node._id] ?? {};
          // const nodeInteractions = interactions[node._id]?? {}
          return (
            <ShapeComponent
              key={keyBy(node)}
              node={node}
              parent={parent}
              {...nodeAttrs}
              curvature={curvature}
              // interactions={nodeInteractions}
            />
          );
        })}
      </g>
    );
  };
  withNodes.displayName = `withBranchArray(${ShapeComponent.displayName || ShapeComponent.name || "Component"})`;
  return withNodes;
}
