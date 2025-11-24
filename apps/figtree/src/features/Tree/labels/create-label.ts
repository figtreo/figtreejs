import { getColorScale, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../settings/panels/label/labelSlice";
import { type NodeRef, type Tree, BranchLabels, ImmutableTree, type BaubleTypes} from "@figtreejs/core";
import { getTextFunction } from "./label-utils";
import { COLOUR_ANNOTATION } from "../../../app/constants";





export function createLabelsComponent({
  tree,
  settings,
  fillColorScale,
  factory,
  ...rest
}: {
  tree: any;
  settings: any;
  fillColorScale: any;
  factory:any,
  rest:Record<string,any>
}) {
  const fill = (n: NodeRef) => {
    if (settings.colourBy === 'User selection') {
      // const custom = tree.getAnnotation(n, COLOUR_ANNOTATION);
      return !tree.hasAnnotation(n, COLOUR_ANNOTATION)? settings.colour : (tree.getAnnotation(n, COLOUR_ANNOTATION) as string);
    }
    const annotation = tree.getAnnotation(n, settings.colourBy);
    if (annotation === undefined) return settings.colour;
    return fillColorScale(annotation);
  };

  const text = getTextFunction(tree, settings);

  return factory({
    tree,
   ...rest,
    attrs: { fontSize: settings.fontSize, fill },
    text,
  });
}
