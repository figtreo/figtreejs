import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';

type shapes = "Circle" | "Rectangle" | "Swoosh"

interface ShapeState {
    shape: shapes
    maxSize: number,
    minSize: number,
    sizeBy: string,
    colourBy: string,
    colour:string,
    outlineWidth: number,
    outlineColour: string,
    activated: boolean
}
//todo select color for all nodes
const initialState: ShapeState = {
    shape: "Circle",
    maxSize: 12,
    minSize: 12,
    sizeBy: "Fixed",
    colourBy: "Selection",
    colour:"#000000",
    outlineWidth: 0,
    outlineColour: "#000000",
    activated: false
}

type selector = {
    (state: RootState): any;
}

export type shapeTarget = "node" | "tip" | "nodeBackground" | "tipBackground"
//todo link tips and node attributes
const shapeSliceGenerator = (target: shapeTarget): {
    slice: Slice<ShapeState>,
    selectors: { [key: string]: selector }
} =>
({
    slice: createSlice({
        name: `${target}Shapes`,
        initialState,
        reducers: {
            setShape: (state, action) => {
                state.shape = action.payload
            },
            setMaxSize: (state, action) => {
                state.maxSize = action.payload
            },
            setMinSize: (state, action) => {
                state.minSize = action.payload
            },
            setSizeBy: (state, action) => {
                state.sizeBy = action.payload
            },
            setColourBy: (state, action) => {
                state.colourBy = action.payload
            },
            setOutlineColour: (state, action) => {
                state.outlineColour = action.payload
            },
            setOutlineWidth: (state, action) => {
                state.outlineWidth = action.payload
            },
            flipActivated: (state) => { state.activated = !state.activated },
            setColour: (state, action) => { state.colour = action.payload }

        }
    }),
    selectors: {
        selectShape: (state: RootState) => state.settings[`${target}Shapes`]
    }

})
//todo clean this up
const nodeShapeSlice = shapeSliceGenerator('node');
export const nodeShapeReducer = nodeShapeSlice.slice.reducer
const tipShapeSlice = shapeSliceGenerator('tip');
export const tipShapeReducer = tipShapeSlice.slice.reducer
const nodeBackgroundShapeSlice = shapeSliceGenerator('nodeBackground');
export const nodeBackgroundReducer = nodeBackgroundShapeSlice.slice.reducer;
const tipBackgroundShapeSlice = shapeSliceGenerator('tipBackground');
export const tipBackgroundReducer = tipBackgroundShapeSlice.slice.reducer;


export const selectShapeState = (target: shapeTarget): selector => (state: RootState): any => state.settings[`${target}Shapes`]

export const shapeActions = {
    tip: tipShapeSlice.slice.actions,
    node: nodeShapeSlice.slice.actions,
    tipBackground: tipBackgroundShapeSlice.slice.actions,
    nodeBackground: nodeBackgroundShapeSlice.slice.actions
}