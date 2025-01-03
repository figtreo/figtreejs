import { getColorScale, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import {  NodeRef, BranchLabels as BL} from "@figtreejs/core";
import { selectNodeDecorations } from "../../Header/headerSlice";
import { getTextFunction } from "./labelUtils";
import { COLOUR_ANNOTATION } from "../../../app/constants";

export function BranchLabels(props:any) {
    const { attrs={} } = props;
    const settings = useAppSelector(selectLabelState("branch"));
    const {tree} = props;
    const taxaColours = useAppSelector(selectNodeDecorations)
    const filter = (n: NodeRef) => true;

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

        let textFunction = getTextFunction(tree,settings);
       
        return (
            <BL {...props} filter={filter} attrs={{ fontSize: settings.fontSize,...attrs }}  text={textFunction} /> 
        )

    } else {
        return <g></g>;
    }



}


