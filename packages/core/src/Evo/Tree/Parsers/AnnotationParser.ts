import { AnnotationType, AnnotationValue } from "../Tree.types";

//TODO clean this up to be more typscripty

export function parseAnnotation(annotationString: string):  {name:string, value:AnnotationValue}[]  {
    const tokens = annotationString.split(/\s*('[^']+'|"[^"]+"|;|\(|\)|,|:|=|\[&|\]|\{|\})\s*/).filter(token => token.length > 0);
    let annotationKeyNext = true;
    let annotationKey: string = "";
    let isAnnotationARange = false;
    let inSubRange = false;
    let subValue: string[] = [];
    let value = null;
    const annotations: {name:string, value:AnnotationValue}[] = [];

    // expect the first token to be a [& and last ]
    if (tokens[0] !== "[&" || tokens[tokens.length - 1] !== "]") {
        throw new Error("expecting a [& at the start and ] at the end of the annotation");
    }
    for (const token of tokens) {
        if (token === '[&') {
            // open BEAST annotation
            annotationKeyNext = true;
        }
        else if (token === "=") {
            annotationKeyNext = false;
        } else if (token === ",") {
            if (!isAnnotationARange) {
                annotationKeyNext = true;
            

            //finalize annotation
            annotations.push({ value: value, name: annotationKey });
            }else{
                continue; //to next value in range
            }
        } else if (token === "{") {
            if (isAnnotationARange) {
                inSubRange = true;
                subValue = [];
            } else {
                value = []
            }
            isAnnotationARange = true;
        } else if (token === "}") {
            if (inSubRange) {
                inSubRange = false;
                (value as AnnotationValue[])!.push(subValue)
            } else {
                isAnnotationARange = false
            }
        }
        else if (token === "]") {
            // close BEAST annotation

            //finalize annotation
            annotations.push({ value: value, name: annotationKey })
        } else {
            // must be annotation
            // remove any quoting and then trim whitespace
            let annotationToken = token;
            if (annotationToken.startsWith("\"") || annotationToken.startsWith("'")) {
                annotationToken = annotationToken.substr(1);
            }
            if (annotationToken.endsWith("\"") || annotationToken.endsWith("'")) {
                annotationToken = annotationToken.substr(0, annotationToken.length - 1);
            }
            if (annotationKeyNext) {
                annotationKey = annotationToken.replace(".", "_");
            } else {
                if (isAnnotationARange) {
                    if (inSubRange) {
                        subValue.push(annotationToken)
                    } else {
                        (value as AnnotationValue[]).push(annotationToken);
                    }
                } else {
                    if (isNaN(annotationToken as unknown as number)) {
                        value = annotationToken;

                    } else {
                        value = parseFloat((annotationToken));
                    }
                }
            }
        }

    }
    return annotations;
}



export function processAnnotationValue(values: AnnotationValue):{type:AnnotationType, value: AnnotationValue}{
    
    let type=AnnotationType.DISCRETE;
    let processedValue: AnnotationValue = values;
    if (Array.isArray(values)) {
        // is a set of  values

        if (values[0] instanceof Array) {
            type = AnnotationType.MARKOV_JUMP;
            if (values.map(v => v.length === 3).reduce((acc, curr) => acc && curr, true)) {
                processedValue = values.map(v => { return { time: parseFloat(v[0]), from: v[1], to: v[2] } })
            } else {
                throw Error(`Markov jump with dimension ${values[0].length} detected. Expected 3.`)
            }

        }

        else if (values.map(v => isNaN(v)).reduce((acc, curr) => acc && curr, true)) {
            type = AnnotationType.SET;
            processedValue = values;

        }
        else if (values.map(v => parseFloat(v)).reduce((acc, curr) => acc && Number.isInteger(curr), true)) {
            processedValue = values.map(v => parseInt(v))
            type=(processedValue as Array<AnnotationValue>).length===2?AnnotationType.RANGE:AnnotationType.SET;
        } else if (values.map(v => parseFloat(v)).reduce((acc, curr) => acc || !Number.isInteger(curr), false)) {
            processedValue = values.map(v => parseFloat(v))
            type=(processedValue as Array<AnnotationValue>).length===2?AnnotationType.RANGE:AnnotationType.SET;
        }

    } else if (Object.isExtensible(values)) {
        // is a set of properties with values

        let sum = 0.0;
        const keys: string[] = [];
        processedValue = {};
        for (const [key, value] of Object.entries(values)) {
            let parsed
            if (keys.includes(key)) {
                throw Error(`the states of annotation, ${key}, should be unique`);
            }
            if (typeof value === typeof 1.0) {
                // This is a vector of probabilities of different states
                type  = AnnotationType.PROBABILITIES;
                parsed = parseFloat(value as string);

                sum += value as number;
                if (sum > 1.01) {
                    throw Error(`the values of annotation, ${key}, should be probabilities of states and add to 1.0`);
                }
            } else if (typeof value === typeof true) {
                type = AnnotationType.DISCRETE;
                parsed = value as boolean;
            }
            (processedValue as {[key:string]:AnnotationValue})[key] = parsed!;
        }

    } else {
        if (typeof values === typeof true) {
            type = AnnotationType.BOOLEAN;
            processedValue = values //.map((v: string)=>v as unknown as boolean);
        } else if (!isNaN((values as number))) {
            type = ((values as number) % 1 === 0 ? AnnotationType.INTEGER : AnnotationType.CONTINUOUS);
            processedValue = parseFloat((values as string));
        }
    }
    return { type:type, value: processedValue }


}

