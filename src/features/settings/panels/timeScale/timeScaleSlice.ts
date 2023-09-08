import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';

/*
setting for the time scale options. There will be 2 scale options
scale by factor
offset
scale Root to age
*/

export interface TimeScaleState {
    scaleBy:"factor"|"rootAge",
    offset:number,
    scale: number,
    rootAge:number
}

const initialState:TimeScaleState = {
    scaleBy: "factor",
    offset:0,
    scale: 1,
    rootAge:1.0
}

const timeScaleSlice = createSlice({
    initialState,
    name:'timeScale',
    reducers:{
        setScaleBy:(state,action:PayloadAction<"factor"|"rootAge">)=>{
            state.scaleBy = action.payload;
        },
        setOffset:(state,action:PayloadAction<number>)=>{
            state.offset = action.payload;
        },
        setScale:(state,action:PayloadAction<number>)=>{
            state.scale = action.payload;
        },
        setRootAge:(state,action:PayloadAction<number>)=>{
            state.rootAge = action.payload;
        }
    }   
})
export const { setScaleBy, setOffset, setScale, setRootAge } = timeScaleSlice.actions;

export const selectTimeScale = (state:RootState) => state.settings.timeScale;
export default timeScaleSlice.reducer;