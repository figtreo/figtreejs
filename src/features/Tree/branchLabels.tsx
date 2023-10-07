import { format } from "d3-format";
import { useAppSelector } from "../../app/hooks";
import { selectLabelState } from "../settings/panels/label/labelSlice";
import { NormalizedTree, NodeRef, BranchLabels as BL, decimalToDate} from "@figtreejs/core";
import { timeFormat } from "d3-time-format";
import { selectHeader } from "../Header/headerSlice";

export function BranchLabels(props:{ tree: NormalizedTree,attrs?:{[key:string]:any} }) {
    const { tree,attrs={} } = props;
    const settings = useAppSelector(selectLabelState("branch"));

    const header = useAppSelector(selectHeader)
    const filter = (n: NodeRef) => true;

    attrs.fill =  settings.colourBy==="User Selection"?(n:NodeRef)=>{
        const custom = header.getCustomTaxaColor(n.id);
        return custom?custom:settings.colour
    }:settings.colour;


    if (settings.activated) {

        let numericalFormatter = getNumericalFormatter(settings.format,settings.sigDigs)



        let textFunction;
        switch (settings.display) {
            case "Name":
                textFunction = (node: NodeRef) => tree.getName(node);
                break;
            case "Node Heights":
                textFunction = (node: NodeRef) => numericalFormatter(tree.getHeight(node));
                break;
            case "Branch Lengths":
                textFunction = (node: NodeRef) => numericalFormatter(tree.getLength(node));
                break
            default:
                throw new Error(`Unknown tip label display type ${settings.display}}`);
        }
        
        return (
            <BL filter={filter} attrs={{ fontSize: settings.fontSize,...attrs }}  text={textFunction} /> 
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

    export function getNumericalFormatter(formatString:string,sigDigs:number): (n: number) => string {
    switch (formatString) {
        case "Decimal":
            return format(`.${sigDigs}f`);
        case "Scientific":
           return format(`.${sigDigs}e`);
        case "Percent":
           return format(`.${sigDigs}%`);
           
        case "Roman":
           return (n: number) => romanize(n);
        case "Date":
            return (n:number)=> timeFormat("%Y-%m-%d")(decimalToDate(n))
        default:
            throw new Error(`Unknown numerical format ${formatString}`);
    }
}