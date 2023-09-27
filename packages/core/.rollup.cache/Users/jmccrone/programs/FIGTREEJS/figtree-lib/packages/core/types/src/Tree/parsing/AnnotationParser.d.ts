import { AnnotationType } from "../Tree.types";
export declare function parseAnnotation(annotationString: string): {
    id: string;
    value: any;
}[];
export declare function processAnnotationValue(values: any): {
    type: AnnotationType;
    value: any;
};
