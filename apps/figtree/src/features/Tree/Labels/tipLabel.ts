
import { getColorScale, selectTree, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { selectLayout } from "../../Settings/panels/layout/layoutSlice";
import { type NodeRef, NodeLabels } from "@figtreejs/core";
import {  selectNodeDecorations } from "../../Header/headerSlice";

import { getTextFunction } from "./labelUtils";

export function TipLabels(props: any ) {
    const { attrs={},filter:baseFilter , tree} = props;
    const settings = useAppSelector(selectLabelState("tip"));
    
    // const tree = useAppSelector(selectTree);

    const { alignTipLabels } = useAppSelector(selectLayout)

    const filter = (n: NodeRef) =>baseFilter(n) && tree.getChildCount(n) === 0;

    const taxaColours = useAppSelector(selectNodeDecorations)
    const fillColorScale = useAppSelector( (state)=>getColorScale(state,settings.colourBy));
    attrs.fill = (n:NodeRef)=>{
        if(settings.colourBy==="User selection"){
        
            if(taxaColours[n.number]&&taxaColours[n.number].taxaCustomColor){
                return taxaColours[n.number].taxaCustomColor as string;
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

        const textFunction = getTextFunction(tree,settings);

        return (
             NodeLabels({...props, filter, attrs:{ fontSize: settings.fontSize,...attrs }, aligned:alignTipLabels, text:textFunction} )

        )

    }
}

// a function that converts a number to roman numerals
//https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
// function romanize(num: number):string {
//     const roman:any = {
//         M: 1000,
//         CM: 900,
//         D: 500,
//         CD: 400,
//         C: 100,
//         XC: 90,
//         L: 50,
//         XL: 40,
//         X: 10,
//         IX: 9,
//         V: 5,
//         IV: 4,
//         I: 1
//       };
//       let str = '';
    
//       for (const i of Object.keys(roman)) {
//         const q = Math.floor(num / roman[i]);
//         num -= q * roman[i];
//         str += i.repeat(q);
//       }
    
//       return str;
//     }
