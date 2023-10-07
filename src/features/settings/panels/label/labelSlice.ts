import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';

export type numericalFormat = "Decimal" | "Scientific" | "Percent" | "Roman"

interface LabelState {
    display: string,
    colourBy: string,
    fontSize: number,
    format: numericalFormat,
    sigDigs: number,
    activated:boolean
}
export type labelTarget = "node" | "tip" | "branch"

const initialState: LabelState = {
    display: "No Attributes",
    colourBy: "User selection",
    fontSize: 12,
    format: "Decimal",
    sigDigs: 2,
    activated:false
}

const initialStates:{[key:string]:LabelState} = {
    tip:{
        display: "Name",
        colourBy: "User selection",
        fontSize: 12,
        format: "Decimal",
        sigDigs: 2,
        activated:true
    },
    node:{
        display: "Branch lengths",
        colourBy: "User selection",
        fontSize: 12,
        format: "Decimal",
        sigDigs: 2,
        activated:false
    },
    branch:{
        display: "Branch lengths",
        colourBy: "User selection",
        fontSize: 12,
        format: "Decimal",
        sigDigs: 2,
        activated:false
    }
}

type selector = {
    (state: RootState): any;
}


const labelSliceGenerator = (target: labelTarget): {
    slice: Slice<LabelState>,
    selectors: { [key: string]: selector }
} =>
({
    slice: createSlice({
        name: `${target}Labels`,
        initialState: initialStates[target],
        reducers: {
            setDisplay: (state, action) => {
                state.display = action.payload;
            },
            setColourBy: (state, action) => {
                state.colourBy = action.payload;
            },
            setFontSize: (state, action) => {
                state.fontSize = action.payload
            },
            setFormat: (state, action) => {
                state.format = action.payload
            },
            setSigDigs: (state, action) => {
                state.sigDigs = action.payload
            },
            flipActivated: (state) => { state.activated = !state.activated },

        }
    }),
    selectors: {
        selectLabel: (state: RootState) => state.settings[`${target}Labels`]
    }

})
//todo clean this up
const nodeLabelSlice = labelSliceGenerator('node');
export const nodeLabelReducer = nodeLabelSlice.slice.reducer
const tipLabelSlice = labelSliceGenerator('tip');
export const tipLabelReducer = tipLabelSlice.slice.reducer
const branchLabelSlice = labelSliceGenerator('branch');
export const branchLabelReducer = branchLabelSlice.slice.reducer;



export const selectLabelState = (target: labelTarget): selector => (state: RootState): any => state.settings[`${target}Labels`]

export const labelActions = {
    tip:tipLabelSlice.slice.actions,
    node:nodeLabelSlice.slice.actions,
    branch:branchLabelSlice.slice.actions
}