import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';


export interface LayoutState {
    layout:"rectangular"|"circular"|"equalangle",
    expansion:number,
    fisheye:number,
    rootLength:number,
    curvature:number,
    alignTipLabels:boolean
}

const initialState:LayoutState = {
    layout:'rectangular',
    expansion:0,
    fisheye:0,
    rootLength:0,
    curvature:0,
    alignTipLabels:false,
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLayout: (state, action: PayloadAction<"rectangular"|"circular"|"equalangle">) => {
            state.layout = action.payload;
        },
        setExpansion: (state, action: PayloadAction<number>) => {
            state.expansion = action.payload;
        },
        setFisheye: (state, action: PayloadAction<number>) => {
            state.fisheye = action.payload;
        },
        setRootLength: (state, action: PayloadAction<number>) => {
            state.rootLength = action.payload;
        },
        setCurvature: (state, action: PayloadAction<number>) => {
            state.curvature = action.payload;
        },
        flipAlignTipLabels: (state) => {
            state.alignTipLabels = !state.alignTipLabels;
        },
    },
}
)

export const { setLayout, setExpansion, setFisheye, setRootLength, setCurvature, flipAlignTipLabels } = layoutSlice.actions;

export const selectLayout = (state:RootState) => state.settings.layout

export default layoutSlice.reducer;