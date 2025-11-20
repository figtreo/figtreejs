import type {
  InteractionType,
  InternalInteractionType,
} from "../Components/Baubles/types";
import type { NodeRef } from "../Evo";

export type ExposedAttrs<A> = {
  [K in keyof A]: A[K] | ((n: NodeRef) => A[K]);
};
export type filterOption = {
  filter?: (n: NodeRef) => boolean;
};
export type nodeOption = {
  nodes: NodeRef[];
};

export type BaseBaubleOptions<A> = {
  id?: string;
  attrs: A;
  interactions?: InteractionType;
} & (filterOption | nodeOption);

// is T needed here?
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function isFn<T>(val: unknown): val is (n: NodeRef) => T {
  return typeof val === "function";
}

export function mapAttrsToProps<A extends Record<string, unknown>>(
  attrs: ExposedAttrs<A>,
): (n: NodeRef) => A {
  return function (node: NodeRef) {
    const props = {} as A;
    for (const k in attrs) {
      const v = attrs[k];
      if (isFn(v)) {
        props[k as keyof A] = v(node) as A[typeof k];
      } else {
        props[k as keyof A] = v as A[typeof k];
      }
    }
    return props;
  };
}

export function mapInteractionsToProps(
  interactions: InteractionType,
): (n: NodeRef) => InternalInteractionType {
  return function (node: NodeRef) {
    const props: InternalInteractionType = {};
    for (const k in interactions) {
      const possibleInteraction = interactions[k as keyof InteractionType];
      if (possibleInteraction !== undefined) {
        props[k as keyof InteractionType] = () => {
          possibleInteraction(node);
        };
      }
    }
    return props;
  };
}
