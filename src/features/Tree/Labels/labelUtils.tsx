import { format } from "d3-format";
import { NodeRef, decimalToDate, Tree, AnnotationType } from "@figtreejs/core";
import { timeFormat } from "d3-time-format";

// a function that converts a number to roman numerals
//https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanize(num: number): string {
    const roman: any = {
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

export function getNumericalFormatter(formatString: string, sigDigs: number): (n: number) => string {
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
            return (n: number) => timeFormat("%Y-%m-%d")(decimalToDate(n));
        default:
            throw new Error(`Unknown numerical format ${formatString}`);
    }
}

export function getTextFunction(tree: Tree, settings: any) {
    let numericalFormatter = getNumericalFormatter(settings.format, settings.sigDigs);
    let textFunction;
    switch (settings.display) {
        case "Name":
            textFunction = (node: NodeRef) => tree.getName(node);
            break;
        case "Node Heights":
            textFunction = (node: NodeRef) => numericalFormatter(tree.getHeight(node));
            break;
        case "Branch lengths":
            textFunction = (node: NodeRef) => {
                if (tree.getLength(node)) {
                   return  numericalFormatter(tree.getLength(node));
                }else{
                    return '';
                }
                
            }
            break;
        default:
            const type = tree.getAnnotationType(settings.display);
            if (type === AnnotationType.CONTINUOUS) {
                textFunction = (node: NodeRef) => {
                    if (tree.getAnnotation(node, settings.display)) {
                        numericalFormatter(tree.getAnnotation(node, settings.display));
                    }else{
                        return '';
                    }
                }
            } else if (type === AnnotationType.RANGE) {
                textFunction = (node: NodeRef) => {
                    if (tree.getAnnotation(node, settings.display)) {
                        return `[${tree.getAnnotation(node, settings.display).map(numericalFormatter).join(", ")}]`;
                    }
                    return '';
                };
            } else {
                textFunction = (node: NodeRef) => tree.getAnnotation(node, settings.display);
            }

        // throw new Error(`Unknown tip label display type ${settings.display}}`);
    }
    return textFunction;
}
