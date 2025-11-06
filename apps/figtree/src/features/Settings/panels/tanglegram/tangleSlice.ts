import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type  { RootState } from "../../../../app/store";

interface tanglegramState {
    activated: boolean,
    alpha: number,
    colorBy: string,
    width: number,
    colour:string,

}

const initialState: tanglegramState = {
    activated: false,
    alpha: 0.5,
    colorBy: "none",
    width: 1,
    colour:'lightgrey',

}

export const tanglegramSlice = createSlice({
    name: 'tanglegram',
    initialState,
    reducers: {
        flipActivated: (state) => {
            state.activated = !state.activated;
        },
        setAlpha: (state, action: PayloadAction<number>) => {
            state.alpha = action.payload;
        },
        setColorBy: (state, action: PayloadAction<string>) => {
            state.colorBy = action.payload;
        },
        setWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload;
        },
        setColor(state,action:PayloadAction<string>){
            state.colour = action.payload;
        }
    }
})

export const { flipActivated, setAlpha, setColorBy, setWidth,setColor } = tanglegramSlice.actions;
export const selectTanglegram = (state: RootState) => state.settings.tanglegram
export const tanglegramReducer = tanglegramSlice.reducer;