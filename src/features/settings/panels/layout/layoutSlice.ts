import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';


export interface LayoutState {
    layout: "rectangular" | "circular" | "equalangle",
    expansion: number,
    fisheye: number,
    rootLength: number,
    curvature: number,
    alignTipLabels: boolean
    zoom: number,
    rootAngle: number,
    angleRange: number,
    showRoot: boolean,
    spread:number
}

const initialState: LayoutState = {
    layout: 'rectangular',
    expansion: 0,
    fisheye: 0,
    rootLength: 0,
    curvature: 0,
    alignTipLabels: false,
    zoom: 0,
    rootAngle: 0,
    angleRange: 360,
    showRoot: true,
    spread:0
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLayout: (state, action: PayloadAction<"rectangular" | "circular" | "equalangle">) => {
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
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
        flipShowRoot: (state) => {
            state.showRoot = !state.showRoot;
        },
        setAngleRange: (state, action: PayloadAction<number>) => {
            state.angleRange = action.payload;
        },
        setRootAngle: (state, action: PayloadAction<number>) => {
            state.rootAngle = action.payload;
        },
        setSpread: (state, action: PayloadAction<number>) => {
            state.spread = action.payload;
        }
    }
}
)

export const { setSpread, setZoom, setLayout, setExpansion, setFisheye, setRootLength, setCurvature, flipAlignTipLabels,setRootAngle,flipShowRoot,setAngleRange} = layoutSlice.actions;

export const selectLayout = (state: RootState) => state.settings.layout

export default layoutSlice.reducer;