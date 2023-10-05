import { AnnotationType } from "../Tree.types"

export interface Node {
    id: string,
    name: string | null,
    label: string | null,
    children: string[],
    parent: string | null,
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
        byId: {
            [id: string]: Node
        },
        byName: {
            [name: string]: string
        },
        byLabel: {
            [label: string]: string
        },
        annotations: {
            [nodeId: string]: {
                [annotation: string]: string | string[] | number | number[]
            }
        },

        allIds: string[]
    },
    rootNode: string | null,

    annotations: {
        byId: {
            [annotation: string]: Annotation
        },
        allIds: string[]
    },
}