// import { timeParse } from "d3-time-format";
import { parseAnnotation, processAnnotationValue } from "./AnnotationParser";
import { TaxonSet,Taxon } from "../../TaxonSet/taxonSet";
import { TreeState,Node } from "../treeSlice";
import { dateToDecimal } from "../../../dateUtils";
import { getParent, preorderGenerator } from "../treeFunctions";

const timeParse = (sting:string)=>(string:string)=>new Date(); //tTODO remove

function newTree():TreeState{
    return {
        nodes:{
            byId:{},
            allIds:[]
        },
        rootNode:null,
        annotations:{},
        annotationTypes:{},
        status: 'idle'
    }
}

export enum AnnotationType {
    DISCRETE = "DISCRETE",
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    CONTINUOUS = "CONTINUOUS",
    PROBABILITIES = "PROBABILITIES",
    MARKOV_JUMP="MARKOV_JUMP",

}

export function getTreeFromNewick(newick: string,options?:{ label: string, datePrefix: string|null, dateFormat: "decimal" | "YYYY-MM-dd",  parseAnnotations: boolean }){

    return new Promise<{data:TreeState}> ((resolve) =>
       resolve({ data: parseNewick(newick,options) })
    );
  
}
  

export function parseNewick(newick: string, inputOptions?:{ label: string, datePrefix: string|null, dateFormat: "decimal" | "YYYY-MM-dd",  parseAnnotations: boolean }): TreeState {
        const taxonSet = new TaxonSet();//TODO remove
        
        const options:{ label: string, datePrefix: string|null, dateFormat: "decimal" | "YYYY-MM-dd",  parseAnnotations: boolean } = { ...{ label: "label", datePrefix: null, dateFormat: "decimal", tipNameMap: null, parseAnnotations: true }, ...inputOptions }

        
        const tree = newTree();
        const tokens = newick.split(/\s*('[^']+'|"[^"]+"|\[&[^\[]+]|,|:|\)|\(|;)\s*/).filter(token => token.length > 0);




        let level = 0;
        let currentNode:Node|null = null;
        let nodeStack:Node[] = [];
        let labelNext = false;
        let lengthNext = false;
        
        const end = tokens.pop();
        if(end !== ";"){
            throw new Error("expecting a semi-colon at the end of the newick string")
        }
        for (const token of tokens) {

            if (options.parseAnnotations && token.length > 2 && token.substring(0, 2) === '[&') {
                const annotations = parseAnnotation(token);
                annotateNode(tree,currentNode!, annotations);

            } else if (token === "(") {
                // an internal node

                if (labelNext) {
                    // if labelNext is set then the last bracket has just closed
                    // so there shouldn't be an open bracket.
                    throw new Error("expecting a comma");
                }

                let node = addNode(tree);

                level += 1;
                if (currentNode) {
                    nodeStack.push(currentNode);
                } else {
                    tree.rootNode = node.id;
                }
                currentNode = node;

            } else if (token === ",") {
                // another branch in an internal node

                labelNext = false; // labels are optional
                if (lengthNext) {
                    throw new Error("branch length missing");
                }

                let parent = nodeStack.pop()!;
                parent.children.push(currentNode!.id)
                currentNode!.parent = parent.id;

                currentNode = parent;
            } else if (token === ")") {
                if (level === 0) {
                    throw new Error("the brackets in the newick file are not balanced: too many closed")
                }
                // finished an internal node

                labelNext = false; // labels are optional
                if (lengthNext) {
                    throw new Error("branch length missing");
                }

                // the end of an internal node
                let parent = nodeStack.pop()!;
                parent.children.push(currentNode!.id)
                currentNode!.parent = parent.id;

                level -= 1;
                currentNode = parent;

                labelNext = true;
            } else if (token === ":") {
                labelNext = false; // labels are optional
                lengthNext = true;
            } else if (token === ";") {
                // end of the tree, check that we are back at level 0
                if (level > 0) {
                    throw new Error("unexpected semi-colon in tree")
                }
                break;
            }
            else {
                // not any specific token so may be a label, a length, or an external node name
                if (lengthNext) {
                    currentNode!.length = parseFloat(token);
                    lengthNext = false;
                } else if (labelNext) {

                    currentNode!.label = token;
                    if (!token.startsWith("#")) {
                        let value: number | any = parseFloat(token);
                        if (isNaN(value)) {
                            value = token;
                        }
                        let label_annotation= {id:options.label, value:value}
                        annotateNode(tree,currentNode!, [label_annotation])
                    }
                    labelNext = false;
                } else {


                    let name = token; // TODO tree needs be a map that's not the ID


                    // remove any quoting and then trim whitespace 
                    // TODO add to bit that parses taxa block 
                    if (name.startsWith("\"") || name.startsWith("'")) {
                        name = name.substr(1);
                    }
                    if (name.endsWith("\"") || name.endsWith("'")) {
                        name = name.substr(0, name.length - 1);
                    }
                    name = name.trim();

                    let decimalDate = undefined;
                    let date = undefined;
                    if (options.datePrefix) {
                        const parts = name.split(options.datePrefix);
                        if (parts.length === 0) {
                            throw new Error(`the tip, ${name}, doesn't have a date separated by the prefix, '${options.datePrefix}'`);
                        }
                        const dateBit = parts[parts.length - 1];
                        if (options.dateFormat === "decimal") {
                            decimalDate = parseFloat(parts[parts.length - 1]);
                        } else {
                            date = timeParse(options.dateFormat)(dateBit);
                            if (!date) {
                                date = timeParse(options.dateFormat)(`${dateBit}-15`)
                            }
                            if (!date) {
                                date = timeParse(options.dateFormat)(`${dateBit}-06-15`)
                            }
                            decimalDate = dateToDecimal(date!);
                        }
                    }
                    const externalNode = addNode(tree);
                    const taxon = taxonSet.has(token) ? taxonSet.getTaxon(token) : new Taxon(token);
                    externalNode.label = taxon.id;
 
                    if (decimalDate !== null) {
                       annotateNode( tree,externalNode, [{ id:"date", value: decimalDate }])
                    }

                    if (currentNode) {
                        nodeStack.push(currentNode);
                    }
                    currentNode = externalNode;
                }
            }
        }
        if (level > 0) {
            throw new Error("the brackets in the newick file are not balanced: too many opened")
        }

        const maxDivergence = setDivergence(tree);
        for (const node of preorderGenerator(tree,tree.nodes.byId[tree.rootNode!])) {
            node.height = maxDivergence - node.divergence!;
        }

        return tree;
    }




function setDivergence(tree:TreeState):number {
    let maxDivergence = 0;
    for(const node of preorderGenerator(tree,tree.nodes.byId[tree.rootNode!])) {
        if(node.parent){
            node.divergence = node.length! + getParent(tree,node)!.divergence!;
        }else{
            node.divergence = 0;
        }
        if(node.divergence>maxDivergence){
            maxDivergence=node.divergence;
        }
    }
        return maxDivergence;
}


function  annotateNode(tree:TreeState,node: Node, annotations: {id:string, value:any}[] ): void {
        for(const annotation of annotations){
            const {type,value}=processAnnotationValue(annotation.value) ;
            checkAnnotation(tree,{name:annotation.id,suggestedType:type});
            tree.annotations[node.id][annotation.id]=value;
        }
        
}
function checkAnnotation(tree:TreeState,input:{name:string,suggestedType:AnnotationType}): void {
    let annotationType = tree.annotationTypes[input.name];
    let suggestedType = input.suggestedType

    if (!annotationType) {
        tree.annotationTypes[input.name]= suggestedType;
    } else if (annotationType && annotationType !== suggestedType) {
        if ((suggestedType === AnnotationType.INTEGER && annotationType === AnnotationType.CONTINUOUS) ||
            (suggestedType === AnnotationType.CONTINUOUS && annotationType === AnnotationType.INTEGER)) {
            // upgrade to float
            annotationType = AnnotationType.CONTINUOUS;
        } else
            throw new Error(`Annotation {${input.name}} has type ${suggestedType} but previously seen as ${annotationType}`)
    }
}

function addNode(tree:TreeState): Node {
    const node:Node = {
        id:`Node-${tree.nodes.allIds.length}`,
        children:[],
        parent:null,
        label:'',
        length:null,
        height:null,
        divergence:null};
    tree.nodes.allIds.push(node.id);
    tree.nodes.byId[node.id]=node;
    tree.annotations[node.id]={};
    return node;
}
