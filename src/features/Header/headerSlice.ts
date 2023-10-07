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
        cartoonNode:(state,action:PayloadAction<string>)=>{
            if(!state.nodeDecorations[action.payload]){ //false and undefined
                state.nodeDecorations[action.payload] = {cartooned:true,collapseFactor:0,hilighted:false,customColor:undefined,taxaCustomColor:undefined};
            }else{
                state.nodeDecorations[action.payload].cartooned =  !state.nodeDecorations[action.payload].cartooned;
            }
        },      
        collapseNode:(state,action:PayloadAction<string>)=>{
            if(!state.nodeDecorations[action.payload]){
                state.nodeDecorations[action.payload] = {cartooned:true,collapseFactor:0.25,hilighted:false,customColor:undefined,taxaCustomColor:undefined};
            }else if(!state.nodeDecorations[action.payload].cartooned){
                state.nodeDecorations[action.payload].cartooned = true;
                state.nodeDecorations[action.payload].collapseFactor = 0.25;
            }
            else{
                const currentCollapseFactor = state.nodeDecorations[action.payload].collapseFactor;
                state.nodeDecorations[action.payload].collapseFactor = currentCollapseFactor!>0.9?0:currentCollapseFactor!+0.25;
            }
        },
        // uncollapseNode:(state,action:PayloadAction<string>)=>{
        //     state.nodeDecorations[action.payload].collapsed = false;
        // },        
        hiLightNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].hilighted = true;
        },
        unhightNode:(state,action:PayloadAction<string>)=>{
            state.nodeDecorations[action.payload].hilighted = false;
        },
        colorNode:(state,action:PayloadAction<{id:string,colour:string}>)=>{
            if(!state.nodeDecorations[action.payload.id]){
                state.nodeDecorations[action.payload.id]={} as NodeDecoration;
            }
            state.nodeDecorations[action.payload.id].customColor = action.payload.colour;

        },
        colorClade:(state,action:PayloadAction<{id:string,colour:string}[]>)=>{
            for(const node of action.payload){
                if(!state.nodeDecorations[node.id]){
                    state.nodeDecorations[node.id]={} as NodeDecoration;
                }
                state.nodeDecorations[node.id].customColor = node.colour
            }
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
export const {setSelectionMode,setSelectionRoot,cartoonNode,collapseNode,colorNode,colorClade,colourTaxa} = HeaderSlice.actions;
//Lets 
export const selectHeader = (state:RootState) => ({
    SelectionMode:state.header.selectionMode,
    SelectionRoot:state.header.selectionRoot,
    SelectNodeDecorations:state.header.nodeDecorations,

})
