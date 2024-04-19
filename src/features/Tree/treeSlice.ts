import { combineReducers, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImmutableTree } from '@figtreejs/core';

const tree = createSlice({
    name: 'tree',
    initialState: {tree:new ImmutableTree()},
    reducers:{
        setTree:{
            reducer (state, action: PayloadAction<ImmutableTree>){
                state.tree = action.payload;
            },
            prepare(tree:ImmutableTree){
                return {payload:tree}
            }
        }
    }   
})
export default tree.reducer;

export const {setTree} = tree.actions;