import { format } from "d3-format";
import { getColorScale, useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { Node } from "../treeSlice";
import { Nodes,NodeRef} from "@figtreejs/core";
import { selectTree } from '../../../app/hooks';
import { getTextFunction } from "./labelUtils";
import { COLOUR_ANNOTATION } from "../../../app/constants";

export function NodeLabels(props:{ attrs?:{[key:string]:any} }) {
    const { attrs={} } = props;
    const settings = useAppSelector(selectLabelState("node"));
    const tree = useAppSelector(selectTree);


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

    const filter = (n: Node) => tree.getChildCount(n) > 0;


    if (settings.activated) {

        let textFunction = getTextFunction(tree,settings);

        return (
            <Nodes.Label filter={filter} attrs={{ fontSize: settings.fontSize,...attrs }}  text={textFunction} />
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
