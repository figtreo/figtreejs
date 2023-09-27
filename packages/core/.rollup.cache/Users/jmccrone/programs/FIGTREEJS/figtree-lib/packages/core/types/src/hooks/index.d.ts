export declare function useAttributeMappers(props: any, hoverKey?: string, selectionKey?: string): (dataEntry: any) => {
    attrs: any;
};
export declare function useInteractions(): {
    state: boolean;
    dispatch: boolean;
};
export declare function useInteractionsState(): boolean;
export declare function useInteractionsDispatch(): boolean;
export declare function useData(): {
    x: number;
    y: number;
}[];
export declare function useLayout(): import("..").Vertices;
export declare function useTree(): import("..").Tree;
export declare function useAnimation(): boolean;
export declare const useFigtreeContext: {
    layout: typeof useLayout;
    tree: typeof useTree;
};
