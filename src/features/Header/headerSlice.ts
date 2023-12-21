import { RootState } from '../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NodeDecoration } from '@figtreejs/core';
//TODO tree list or count to include multiple trees


type SelectionMode = "Node"|"Clade"|"Taxa"


interface HeaderData{
    selectionMode:SelectionMode,
    selectionRoot:string|undefined,
    nodeDecorations:{
        [key:string]:NodeDecoration
    }
}

const initialState:HeaderData = {
    selectionMode: "Node",
    selectionRoot: undefined,
    nodeDecorations:{}

}


export const HeaderSlice = createSlice({
    name:"header",
    initialState,
    reducers:{
        setSelectionRoot:(state, action: PayloadAction<string|undefined>) => {
                state.selectionRoot = action.payload;
        },
        clearSelection:(state,action)=>{
            state.selectionRoot = undefined;
        },
        setSelectionMode:(state,action:PayloadAction<SelectionMode>)=>{
            state.selectionMode = action.payload;
        },
        colourTaxa:(state,action:PayloadAction<{id:string,colour:string}[]>)=>{
            for(const node of action.payload){
                if(!state.nodeDecorations[node.id]){
                    state.nodeDecorations[node.id]={} as NodeDecoration;
                }
                state.nodeDecorations[node.id].taxaCustomColor = node.colour
            }        }
    }

})
export default HeaderSlice.reducer;
export const {setSelectionMode,setSelectionRoot,colourTaxa} = HeaderSlice.actions;
//Lets 
export const selectHeader = (state:RootState) => ({
    SelectionMode:state.header.selectionMode,
    SelectionRoot:state.header.selectionRoot,
    SelectNodeDecorations:state.header.nodeDecorations,

})
