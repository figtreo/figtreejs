import { format } from "d3-format";
import { useAppSelector } from "../../app/hooks";
import { selectLabelState } from "../Settings/panels/label/labelSlice";
import { Node } from "./treeSlice";
import { Nodes,NodeRef} from "@figtreejs/core";
import { selectHeader } from "../Header/headerSlice";
import { tree } from "../../app/store";

export function NodeLabels(props:{ attrs?:{[key:string]:any} }) {
    const { attrs={} } = props;
    const settings = useAppSelector(selectLabelState("node"));
    const header = useAppSelector(selectHeader)


    const filter = (n: Node) => tree.getChildCount(n) > 0;

    attrs.fill =  settings.colourBy === "User selection" ?
    (n: NodeRef) => {
        const custom = header.SelectNodeDecorations[n.id] ? header.SelectNodeDecorations[n.id].customColor : settings.colour
        return custom!
    } : settings.colour;

    if (settings.activated) {

        let numericalFormater: (n: number) => string;
        switch (settings.format) {
            case "Decimal":
                numericalFormater = format(`.${settings.sigDigs}f`);
                break;
            case "Scientific":
                numericalFormater = format(`.${settings.sigDigs}e`);
                break;
            case "Percent":
                numericalFormater = format(`.${settings.sigDigs}%`);
                break;
            case "Roman":
                numericalFormater = (n: number) => romanize(n);
                break;
            default:
                throw new Error(`Unknown numerical format ${settings.format}`);
        }



        let textFunction;
        switch (settings.display) {
            case "Name":
                textFunction = (node: NodeRef) => tree.getName(node);
                break;
            case "Node Heights":
                textFunction = (node: NodeRef) => numericalFormater(tree.getHeight(node));
                break;
            case "Branch lengths":
                textFunction = (node: NodeRef) => numericalFormater(tree.getLength(node));
                break
            default:
                throw new Error(`Unknown tip label display type ${settings.display}}`);
        }

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
