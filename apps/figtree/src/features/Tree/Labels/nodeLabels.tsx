
import { getColorScale, selectTree, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { NodeLabels as nl, ImmutableTree, type NodeRef, type Tree} from "@figtreejs/core";

import { getTextFunction } from "./labelUtils";
import { COLOUR_ANNOTATION } from "../../../app/constants";

export function NodeLabels(props:{ attrs?:{[key:string]:any},filter:(n:NodeRef)=>boolean,tree:ImmutableTree }) {
    const { attrs={},filter:baseFilter, tree} = props;
    const settings = useAppSelector(selectLabelState("node"));
    // const tree = useAppSelector(selectTree);


    const fillColorScale = useAppSelector( (state)=>getColorScale(state,settings.colourBy));
    attrs.fill = (n:NodeRef)=>{
        if(settings.colourBy==="User selection"){
          const custom = tree.getAnnotation(n,COLOUR_ANNOTATION)!.value;
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
            nl({...props, filter, attrs:{ fontSize: settings.fontSize,...attrs }, text:textFunction} )
        )

    } else {
        return <g></g>;
    }



}

