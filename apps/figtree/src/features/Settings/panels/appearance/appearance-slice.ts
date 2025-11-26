import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../../../app/store";

export interface AppearanceState {
    colourBy:string,
    colourScheme:string,
    lineWidth:number,
    widthBy:string,
    minWidth:number,
    colour: string,
}

//slice function with initial state and reducers using AppearanceState from above 

const initialState:AppearanceState = {
    colourBy:'User selection',
    colourScheme:'set1',
    lineWidth:2,
    widthBy:'Fixed',
    minWidth:0,
    colour:'#000000',
}

export const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers:{
        setColourBy: (state, action) => {
            state.colourBy = action.payload;
        },
        setColourScheme: (state, action) => {
            state.colourScheme = action.payload;
        },
        setLineWidth: (state, action) => {
            state.lineWidth = action.payload;
        },
        setWidthBy: (state, action) => {
            state.widthBy = action.payload;
        },
        setMinWidth: (state, action) => {
            state.minWidth = action.payload;
        },
        setColour: (state, action) => {
            state.colour = action.payload;
        }
    }
});

//export actions from slice
export const { setColourBy,setColour, setColourScheme, setLineWidth, setWidthBy, setMinWidth } = appearanceSlice.actions;

export const selectAppearance = (state:RootState) => state.settings.appearance;
export const selectLineWidth = (state:RootState) => state.settings.appearance.lineWidth;
export const selectStroke = (state:RootState) => state.settings.appearance.colour;
export default appearanceSlice.reducer;