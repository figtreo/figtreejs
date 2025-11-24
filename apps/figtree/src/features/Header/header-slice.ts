import type { RootState } from '../../app/store';
import {  createSlice } from '@reduxjs/toolkit';
import type  { PayloadAction } from '@reduxjs/toolkit';
//TODO tree list or count to include multiple trees


type SelectionMode = "Node"|"Clade"|"Taxa"

type NodeDecoration = Record< number,string>&{taxaCustomColor?:string}

interface HeaderData{
    selectionMode:SelectionMode,
    selectionRoot:number|undefined,
    nodeDecorations: NodeDecoration[]
}

const initialState:HeaderData = {
    selectionMode: "Node",
    selectionRoot: undefined,
    nodeDecorations:[]

}


export const HeaderSlice = createSlice({
    name:"header",
    initialState,
    reducers:{
        setSelectionRoot:(state, action: PayloadAction<number|undefined>) => {
                state.selectionRoot = action.payload;
        },
        clearSelection:(state)=>{
            state.selectionRoot = undefined;
        },
        setSelectionMode:(state,action:PayloadAction<SelectionMode>)=>{
            state.selectionMode = action.payload;
        },
        colourTaxa:(state,action:PayloadAction<{number:number,colour:string}[]>)=>{
            for(const node of action.payload){
                if(!state.nodeDecorations[node.number]){
                    state.nodeDecorations[node.number]={} as NodeDecoration;
                }
                state.nodeDecorations[node.number].taxaCustomColor = node.colour
            }        }
    }

})
export default HeaderSlice.reducer;
export const {setSelectionMode,setSelectionRoot,colourTaxa} = HeaderSlice.actions;
//Lets 


export const selectSelectionRoot = (state:RootState) => state.header.selectionRoot;
export const selectSelectionMode = (state:RootState) => state.header.selectionMode;
export const selectNodeDecorations = (state:RootState) => state.header.nodeDecorations;