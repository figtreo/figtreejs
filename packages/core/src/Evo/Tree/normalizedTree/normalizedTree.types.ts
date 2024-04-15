import { AnnotationType, NodeRef } from "../Tree.types"

export interface Node {
    number: number,
    name: string | null,
    label: string | null,
    children: number[],
    parent: number | null,
    length: number | undefined,
    height: number | undefined,
    divergence: number | undefined,//derive height and divergence from this for now
    level: number | undefined
}

export interface Annotation {
    id: string,
    type: AnnotationType
    domain: [number, number] | string[] | number[]|[boolean,boolean]|undefined
}
export interface NormalizedTreeData {
    nodes: {
        allNodes:NodeRef[],

        byName: {
            [name: string]: number
        },
        byLabel: {
            [label: string]: number
        },
        annotations: {
            [nodeId: string]: {
                [annotation: string]: string | string[] | number | number[]
            }
        },
    },
    rootNode: number | null,

    annotations: {
        byId: {
            [annotation: string]: Annotation
        },
        allIds: string[]
    },
}

export type TreeData = NormalizedTreeData;
