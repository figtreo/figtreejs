import { NodeRef, Tree, newickParsingOptions } from "../Tree.types";
import { ImmutableTree, postOrderIterator,  preOrderIterator } from "../NormalizedTree/ImmutableTree";
import { parseAnnotation } from "./AnnotationParser";
import { timeParse } from "d3-time-format";

export function parseNewick(tree:ImmutableTree,newick: string,options?:newickParsingOptions): ImmutableTree {
    if (options === undefined) {
     
        options = { parseAnnotations: false }
    }

    const tokens = newick.split(/\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/).filter(token => token.length > 0);


    let level = 0;
    let currentNode: NodeRef|undefined = undefined;
    let nodeStack: NodeRef[] = [];
    let labelNext = false;
    let lengthNext = false;

    const end = tokens.pop();
    if (end !== ";") {
        throw new Error("expecting a semi-colon at the end of the newick string")
    }

    for (const token of tokens) {

        if (options.parseAnnotations && token.length > 2 && token.substring(0, 2) === '[&') {
            const annotations = parseAnnotation(token);
            
            tree = tree.annotateNode(currentNode!, annotations);

        } else if (token === "(") {
            // an internal node

            if (labelNext) {
                // if labelNext is set then the last bracket has just closed
                // so there shouldn't be an open bracket.
                throw new Error("expecting a comma");
            }

           
            let node
            level += 1;
            if (currentNode!==undefined) {
                 const added =  tree.addNodes(1);
                tree = added.tree;
                node = added.nodes[0];
                 nodeStack.push(currentNode);
            } else {
                // tree.setRoot(node);
                node = tree.getRoot();
            }
            currentNode = node;

        } else if (token === ",") {
            // another branch in an internal node

            labelNext = false; // labels are optional
            if (lengthNext) {
                throw new Error("branch length missing");
            }

            let parent = nodeStack.pop()! as NodeRef;
            tree = tree.addChild(parent,currentNode!)
            // tree.setParent(currentNode!,parent)

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
            let parent = nodeStack.pop()! as NodeRef;
            tree = tree.addChild(parent,currentNode!)
            // tree.setParent(currentNode!,parent)

            level -= 1;
            currentNode = parent ;

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
                tree = tree.setLength(currentNode!,parseFloat(token));
                lengthNext = false;
            } else if (labelNext) {
                
                if (!token.startsWith("#")) {
                    let value: number | any = parseFloat(token);
                    if (isNaN(value)) {
                        value = token;
                    }
                    if(options.labelName){
                        let label_annotation = { name: options.labelName, value: value }
                        tree = tree.annotateNode(currentNode!, label_annotation)

                    }else{
                        console.warn(`No label name provided to newick parser but found label ${token}. It will be ignored`)
                    }
                }else{
                    tree = tree.setLabel(currentNode!,token.slice(1)) //remove the # todo put it back when writing to newick
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


                const added = tree.addNodes(1);
                tree = added.tree;
                const externalNode = added.nodes[0];

                if(options.tipNameMap && options.tipNameMap.keys().next().value !== undefined ){
                    if(options.tipNameMap.has(name)){
                        name=options.tipNameMap.get(name)!
                    }else{
                        console.warn(`No mapping found for ${name} in tipNameMap. It's name will not be updated`)
                    }
                }
                tree = tree.setTaxon(externalNode,name)

                let date = undefined;
                if (options.datePrefix && options.dateFormat) {
                    const parts = name.split(options.datePrefix);
                    if (parts.length === 0) {
                    throw new Error(
                        `the tip, ${name}, doesn't have a date separated by the prefix, '${options.datePrefix}'`
                    );
                    }
                    const dateBit = parts[parts.length - 1];
                    if (options.dateFormat === "decimal") {
                    date = parseFloat(parts[parts.length - 1]);
                    } else {
                    date = timeParse(options.dateFormat)(dateBit);
                    if (!date) {
                        date = timeParse(options.dateFormat)(`${dateBit}-15`);
                    }
                    if (!date) {
                        date = timeParse(options.dateFormat)(`${dateBit}-06-15`);
                    }
                    }
                }
                if(date){
                    tree = tree.annotateNode(externalNode,{name:"date",value:date})
                }


                // externalNode.label = taxon.id;
                // externalNode.name = taxon.id;


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

     const output = setDivergence(tree);
     tree = output.tree;
     const maxDivergence = output.maxDivergence;
    for (const node of postOrderIterator(tree) ) {
        tree = tree.setHeight(node,maxDivergence - tree.getDivergence(node));
    }

    return tree;
}


export function setDivergence(tree: ImmutableTree): {tree:ImmutableTree,maxDivergence:number} {
let maxDivergence = 0;
for (const node of preOrderIterator(tree)) {
    if (tree.getParent(node)) {
        tree = tree.setDivergence(node,tree.getLength( node)! + tree.getDivergence(tree.getParent(node)!)!);
    } else {
        tree = tree.setDivergence(node,0);
    }
    if (tree.getDivergence(node) > maxDivergence) {
        maxDivergence = tree.getDivergence(node);
    }
}
return {tree,maxDivergence};
}