import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getTreeFromNewick } from './parsing/TreeParser';

export interface Node {
        id:string,
        label:string|null,
        children:string[],
        parent:string|null,
        length:number|null, 
        height:number|null,
        divergence:number|null,//derive height and divergence from this for now
}

export interface TreeState {
    nodes:{
        byId:{
            [id:string]:Node
        },
        allIds:string[]
        },
    rootNode:string|null,
    annotations:{
        [nodeId:string]:{
            [annotation:string]:string|string[]|number|number[]
        }
    },
    annotationTypes:{
        [annotation:string]:string
    }
    status: 'idle' | 'loading' | 'failed';
}
//fill initial state of tree with a single node and empty annotations
const initialState: TreeState = {
    nodes:{
        byId:{},
        allIds:[]
    },
    rootNode:null,
    annotations:{},
    annotationTypes:{},
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

        rotate: (state, action: PayloadAction<string>) => {  
            state.nodes.byId[action.payload].children = state.nodes.byId[action.payload].children.reverse();
        },
        reroot: (state, action: PayloadAction<string>) => {
            state.rootNode = action.payload;
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

export const selectNodeCount= (state:RootState) => state.tree.nodes.allIds.length;
export const selectAnnotationTypes = (state:RootState) => state.tree.annotationTypes;
export const selectTree = (state:RootState) => state.tree;
//TODO can we fake a tree class like this that use redux store underneath?

// export const tree = {
//     rotate:treeSlice.actions.rotate,
//     reroot:treeSlice.actions.reroot
// }


export const { rotate, reroot } = treeSlice.actions;
export default treeSlice.reducer;




