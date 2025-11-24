/**
 * An HOC that calculates the clades needed for clade shapes and
 * passes them on to the shapes themselves
 */

import type { NodeRef } from "../../evo";
import type { AttrsRecord, InternalInteractionType } from "../baubles/types";

export type Clade = {
  root: NodeRef;
  leftMost: NodeRef;
  rightMost: NodeRef;
  mostDiverged: NodeRef;
};

export type CladeProps<A extends object> = {
  clades: Clade[];
  attrs?: AttrsRecord<A>;
  interactions?: { [key: string]: InternalInteractionType }; // keyed by node id // check type
  // shape:NodeShapes,
  keyBy?: (n: NodeRef) => string;
};
export function withClades<T extends object>(
  ShapeComponent: React.FC<T & { clade: Clade }>,
): React.FC<CladeProps<T>> {
  const withClades = (props: CladeProps<T>) => {
    const { clades, keyBy = (n: NodeRef) => n._id, attrs = {} } = props;

    return (
      <g className={"node-layer"}>
        {clades.map((clade) => {
          const cladeAttrs = attrs[clade.root._id] ?? {};
          return (
            <ShapeComponent
              key={keyBy(clade.root)}
              clade={clade}
              {...cladeAttrs}
              // interactions={nodeInteractions}
            />
          );
        })}
      </g>
    );
  };
  withClades.displayName = `withCladessArray(${ShapeComponent.displayName || ShapeComponent.name || "Component"})`;
  return withClades;
}
