import { RootState } from '../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//TODO tree list or count to include multiple trees


type SelectionMode = "Node"|"Clade"|"Taxa"
interface HeaderData{
    selectionMode:SelectionMode,
    selectedNode:string|null,
    cartoonedNodes:Set<string>,
    collapsedNodes:Set<string>,
    hilightedNodes:Set<string>,
    customColorMap:{[key:string]:string} //maybe better on tree?
}

const initialState:HeaderData = {
    selectionMode: "Node",
    selectedNode: null,
    cartoonedNodes: new Set<string>(),
    collapsedNodes: new Set<string>(),
    hilightedNodes: new Set<string>(),
    customColorMap: {}
}


export const HeaderSlice = createSlice({
    name:"header",
    initialState,
    reducers:{
        selectNode:(state, action: PayloadAction<string>) => {
                state.selectedNode = action.payload;
        },
        clearSelection:(state,action)=>{
            state.selectedNode = null;
        },
        setSelectionMode:(state,action:PayloadAction<SelectionMode>)=>{
            state.selectionMode = action.payload;
        },
        cartoonNode:(state,action:PayloadAction<string>)=>{
            state.cartoonedNodes.add(action.payload)
        },
        uncartoonNode:(state,action:PayloadAction<string>)=>{
            state.cartoonedNodes.delete(action.payload);
        },        
        collapseNode:(state,action:PayloadAction<string>)=>{
            state.collapsedNodes.add(action.payload)
        },
        uncollapseNode:(state,action:PayloadAction<string>)=>{
            state.collapsedNodes.delete(action.payload);
        },        
        hiLightNode:(state,action:PayloadAction<string>)=>{
            state.hilightedNodes.add(action.payload)
        },
        unhightNode:(state,action:PayloadAction<string>)=>{
            state.hilightedNodes.delete(action.payload);
        },
        colorNode:(state,action:PayloadAction<{id:string,colour:string}>)=>{
            state.customColorMap[action.payload.id] = action.payload.colour
        }
    }

})
export default HeaderSlice.reducer;
export const {setSelectionMode} = HeaderSlice.actions;
//Lets 
export const selectHeader = (state:RootState) => ({
    SelectionMode:state.header.selectionMode,
    SelectedNode:state.header.selectedNode,
    CartoonedNodes:state.header.cartoonedNodes,
    CollapsedNodes:state.header.collapsedNodes,
    HilightedNodes:state.header.hilightedNodes,
    CustomColorMap:state.header.customColorMap,
})
