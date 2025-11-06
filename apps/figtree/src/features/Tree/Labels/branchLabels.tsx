import { getColorScale, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { type NodeRef, BranchLabels as BL} from "@figtreejs/core";
import { getTextFunction } from "./labelUtils";
import { COLOUR_ANNOTATION } from "../../../app/constants";

export function BranchLabels(props:any) {
    const { attrs={},filter=() => true } = props;
    const settings = useAppSelector(selectLabelState("branch"));
  

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


    if (settings.activated) {

        const textFunction = getTextFunction(tree,settings);
       
        return (
            BranchLabels({...props, filter,attrs:{ fontSize: settings.fontSize,...attrs }, text:textFunction})
        )

    } else {
        return <g></g>;
    }



}


