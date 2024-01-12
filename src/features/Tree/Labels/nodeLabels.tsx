import { format } from "d3-format";
import { useAppSelector } from "../../../app/hooks";
import { selectLabelState } from "../../Settings/panels/label/labelSlice";
import { Node } from "../treeSlice";
import { Nodes,NodeRef} from "@figtreejs/core";
import {  selectNodeDecorations } from "../../Header/headerSlice";
import { selectTree } from '../../../app/hooks';
import { getTextFunction } from "./labelUtils";

export function NodeLabels(props:{ attrs?:{[key:string]:any} }) {
    const { attrs={} } = props;
    const settings = useAppSelector(selectLabelState("node"));
    const taxaColours = useAppSelector(selectNodeDecorations)
    const tree = useAppSelector(selectTree);


    attrs.fill =  settings.colourBy === "User selection" ?
    (n: NodeRef) => {
        const custom = taxaColours[n.id] ? taxaColours[n.id].customColor : settings.colour
        return custom!
    } : settings.colour;

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
