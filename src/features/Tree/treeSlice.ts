import { combineReducers, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizedTree, NormalizedTreeData, TreeduxListReducer } from '@figtreejs/core';

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

export interface TreeStatusState {
    status: 'idle' | 'loading' | 'failed';
}
//fill initial state of tree with a single node and empty annotations
const initialState: TreeStatusState = {
    status: 'idle',
}
export const parseNewick = createAsyncThunk(
    'tree/parseNewick',
    async (newickString: string) => {
        const response = await getTreeFromNewick(newickString);
        return response.data;
    }
);



const treeStatus = createSlice({
    name: 'treeStatus',
    initialState,
    reducers: {
        setStatus:{
            reducer(state, action: PayloadAction<TreeStatusState>) {
                state.status = action.payload.status;
            },
            prepare(status:TreeStatusState){
                return {payload:status}
            }
        }
    },
})


const treeReducer =  combineReducers({
    status: treeStatus.reducer,
    tree: TreeduxListReducer})
    
export default treeReducer;


function getTreeFromNewick(newick: string, options?: { label: string, datePrefix: string | null, parseAnnotations: boolean }): Promise<{ data:{tree:NormalizedTreeData,status:'idle'}  }> {

    return new Promise<{ data:{tree:NormalizedTreeData,status:'idle'} }>((resolve) =>
        resolve({ data: {tree:(NormalizedTree.fromNewick(newick, options) as NormalizedTree).data,status:'idle'} })
    );

}

