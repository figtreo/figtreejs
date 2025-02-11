import {   createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImmutableTree,ImmutableTreeData, TaxonSetData, TaxonSet } from '@figtreejs/core';
const tree = createSlice({
    name: 'tree',
    initialState: {tree:new ImmutableTree()._data,taxa:new TaxonSet()._data},
    reducers:{
        setTree:{
            reducer (state, action: PayloadAction<{tree:ImmutableTreeData,taxa:TaxonSetData}>){
                state.tree = action.payload.tree;
                state.taxa = action.payload.taxa;
            },
            prepare(tree:ImmutableTree){
                console.log(tree.taxonSet._data)
                return {payload:{tree:tree._data,taxa:tree.taxonSet._data}}
            }
        }
    }   
})
export default tree.reducer;

export const {setTree} = tree.actions;