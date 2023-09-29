import { RootState } from '../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//TODO tree list or count to include multiple trees
enum SelectionMode{
    TAXA,
    CLADE,
    NODE
}
interface HeaderData{
    selectionMode:SelectionMode,
    selectedNode:string|null,
    cartoonedNodes:Set<string>,
    collapsedNodes:Set<string>,
    hilightedNodes:Set<string>,
    customColorMap:{[key:string]:string} //maybe better on tree?
}

const initialState:HeaderData = {
    selectionMode: SelectionMode.NODE,
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

//Lets 
export const selectHeader = {
    SelectionMode:(state:RootState)=>state.header.selectionMode,
    SelectedNode:(state:RootState)=>state.header.selectedNode,
    CartoonedNodes:(state:RootState)=>state.header.cartoonedNodes,
    CollapsedNodes:(state:RootState)=>state.header.collapsedNodes,
    HilightedNodes:(state:RootState)=>state.header.hilightedNodes,
    CustomColorMap:(state:RootState)=>state.header.customColorMap,
}
