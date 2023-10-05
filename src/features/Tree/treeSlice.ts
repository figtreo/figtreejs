import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { NormalizedTree, NormalizedTreeData } from '@figtreejs/core';

export interface Node {
    id: string,
    name: string | null,
    label: string | null,
    children: string[],
    parent: string | null,
    length: number | null,
    height: number | null,
    divergence: number | null,//derive height and divergence from this for now
}

export interface TreeState {
    tree: NormalizedTreeData,
    status: 'idle' | 'loading' | 'failed';
}
//fill initial state of tree with a single node and empty annotations
const initialState: TreeState = {
    tree: {
        nodes: {
            byId: {},
            allIds: [],
            byName: {},
            byLabel: {}
        },
        rootNode: null,
        annotations: {},
        annotationTypes: {},
    },
    status: 'idle',
}
export const parseNewick = createAsyncThunk(
    'tree/parseNewick',
    async (newickString: string) => {
        const response = await getTreeFromNewick(newickString);
        return response.data;
    }
);


export const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {

        rotate: (state, action: PayloadAction<{node:string,recursive:boolean}>) => {
            const tree = new NormalizedTree(state.tree);
            const node = tree.getNode(action.payload.node);
            tree.rotate(node,action.payload.recursive);
            state.tree = tree.data;
            // state.tree.nodes.byId[action.payload].children = state.tree.nodes.byId[action.payload].children.reverse();
        },
        reroot: (state, action: PayloadAction<string>) => {
            const tree = new NormalizedTree(state.tree);
            const node = tree.getNode(action.payload);
            tree.reroot(node,0.5);
            state.tree = tree.data;
            //TODO update all nodes
        }
        //orderDecreasing
        //orderIncreasing
        //annotateNode

    },
    extraReducers: (builder) => {
        builder
            .addCase(parseNewick.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(parseNewick.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(parseNewick.rejected, (state) => {
                state.status = 'failed';
            });
    }
})
//This requires knowing about the root state. Can we refactor so that information can be provided?

export const selectNodeCount = (state: RootState) => state.tree.tree.nodes.allIds.length;
export const selectAnnotationTypes = (state: RootState) => state.tree.tree.annotationTypes;
export const selectTree = (state: RootState) => state.tree;
//TODO can we fake a tree class like this that use redux store underneath?

// export const tree = {
//     rotate:treeSlice.actions.rotate,
//     reroot:treeSlice.actions.reroot
// }


export const { rotate, reroot } = treeSlice.actions;
export default treeSlice.reducer;


function getTreeFromNewick(newick: string, options?: { label: string, datePrefix: string | null, parseAnnotations: boolean }): Promise<{ data: TreeState }> {

    return new Promise<{ data: TreeState }>((resolve) =>
        resolve({ data: {tree:(NormalizedTree.fromNewick(newick, options) as NormalizedTree).data,status:'idle'} })
    );

}

