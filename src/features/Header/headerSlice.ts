import { RootState } from '../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import counterSlice from '../counter/counterSlice';
//TODO tree list or count to include multiple trees


type SelectionMode = "Node"|"Clade"|"Taxa"

interface NodeDecoration{
    cartooned:boolean,
    collapsed:boolean,
    hilighted:boolean,
    customColor:string|undefined
    taxaCustomColor:string|undefined
}
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
        selectionRoot:(state, action: PayloadAction<string>) => {
                state.selectionRoot = action.payload;
        },
        clearSelection:(state,action)=>{
            state.selectionRoot = undefined;
        },
        setSelectionMode:(state,action:PayloadAction<SelectionMode>)=>{
            state.selectionMode = action.payload;
        },
        cartoonNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].cartooned = true;
        },
        uncartoonNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].cartooned = false;
        },        
        collapseNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].collapsed = true;
        },
        uncollapseNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].collapsed = false;
        },        
        hiLightNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].hilighted = true;
        },
        unhightNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].hilighted = false;
        },
        colorNode:(state,action:PayloadAction<{id:string,colour:string}>)=>{
            state.nodeDecorations[action.payload.id].customColor = action.payload.colour;

        },
        colourTaxa:(state,action:PayloadAction<{id:string,colour:string}>)=>{
            state.nodeDecorations[action.payload.id].taxaCustomColor = action.payload.colour;
        }
    }

})
export default HeaderSlice.reducer;
export const {setSelectionMode} = HeaderSlice.actions;
//Lets 
export const selectHeader = (state:RootState) => ({
    SelectionMode:state.header.selectionMode,
    SelectionRoot:state.header.selectionRoot,
    isCollapsed:(id:string)=>state.header.nodeDecorations[id].collapsed,
    isHighilited:(id:string)=>state.header.nodeDecorations[id].hilighted,
    iscartooned:(id:string)=>state.header.nodeDecorations[id].cartooned,
    getCustomColor:(id:string)=>state.header.nodeDecorations[id].customColor,

})
