import { useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import {  NodeRef, BranchLabels as BL} from "@figtreejs/core";
import { selectNodeDecorations } from "../../Header/headerSlice";
import { selectTree } from '../../../app/hooks';
import { getTextFunction } from "./labelUtils";

export function BranchLabels(props:{ attrs?:{[key:string]:any} }) {
    const { attrs={} } = props;
    const settings = useAppSelector(selectLabelState("branch"));
    const tree = useAppSelector(selectTree);

    const taxaColours = useAppSelector(selectNodeDecorations)
    const filter = (n: NodeRef) => true;

    attrs.fill =  settings.colourBy==="User Selection"?(n:NodeRef)=>{
        const custom = taxaColours[n.id];
        return custom?custom:settings.colour
    }:settings.colour;


    if (settings.activated) {

        let textFunction = getTextFunction(tree,settings);
       
        return (
            <BL filter={filter} attrs={{ fontSize: settings.fontSize,...attrs }}  text={textFunction} /> 
        )

    } else {
        return <g></g>;
    }



}


