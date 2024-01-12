import { format } from "d3-format";
import { getColorScale, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { selectLayout } from "../../Settings/panels/layout/layoutSlice";
import { AnnotationType, NodeRef, Nodes } from "@figtreejs/core";
import { Node } from "../treeSlice";
import {  selectNodeDecorations } from "../../Header/headerSlice";
import { selectTree } from '../../../app/hooks';
import { getTextFunction } from "./labelUtils";

export function TipLabels(props: { attrs?:{[key:string]:any} }) {
    const { attrs={} } = props;
    const settings = useAppSelector(selectLabelState("tip"));
    const tree = useAppSelector(selectTree);
    const { alignTipLabels } = useAppSelector(selectLayout)

    const filter = (n: Node) => tree.getChildCount(n) === 0;

    const taxaColours = useAppSelector(selectNodeDecorations)
    const fillColorScale = useAppSelector( (state)=>getColorScale(state,settings.colourBy));
    attrs.fill = (n:NodeRef)=>{
        if(settings.colourBy==="User selection"){
        
            if(taxaColours[n.id]&&taxaColours[n.id].taxaCustomColor){
                return taxaColours[n.id].taxaCustomColor as string;
            }
           return settings.colour;
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
            <Nodes.Label filter={filter} attrs={{ fontSize: settings.fontSize,...attrs }} aligned={alignTipLabels} text={textFunction} />
        )

    } else {
        return <g></g>;
    }



}

// a function that converts a number to roman numerals
//https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanize(num: number):string {
    const roman:any = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
      };
      var str = '';
    
      for (var i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
      }
    
      return str;
    }
