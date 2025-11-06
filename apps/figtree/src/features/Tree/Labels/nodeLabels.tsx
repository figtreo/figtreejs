
import { getColorScale, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { NodeLabels,NodeRef, ImmutableTree} from "@figtreejs/core";

import { getTextFunction } from "./labelUtils";
import { COLOUR_ANNOTATION } from "../../../app/constants";

export function NodeLabels(props:{ attrs?:{[key:string]:any},tree:ImmutableTree,filter:(n:NodeRef)=>boolean }) {
    const { attrs={},tree,filter:baseFilter } = props;
    const settings = useAppSelector(selectLabelState("node"));
    // const tree = useAppSelector(selectTree);


    const fillColorScale = useAppSelector( (state)=>getColorScale(state,settings.colourBy));
    attrs.fill = (n:NodeRef)=>{
        if(settings.colourBy==="User selection"){
          const custom = tree.getAnnotation(n,COLOUR_ANNOTATION);
          return custom===undefined?settings.colour:(custom as string);
      }else{
        const annotation = tree.getAnnotation(n,settings.colourBy);
        if(annotation===undefined){
          return settings.colour;
        }
        return fillColorScale(tree.getAnnotation(n,settings.colourBy)) as string;
      }
    }

    const filter = (n: NodeRef) => baseFilter(n) && tree.getChildCount(n) > 0;


    if (settings.activated) {

        const textFunction = getTextFunction(tree,settings);

        return (
            <NodeLabels {...props} filter={filter} attrs={{ fontSize: settings.fontSize,...attrs }}  text={textFunction} />
        )

    } else {
        return <g></g>;
    }



}

