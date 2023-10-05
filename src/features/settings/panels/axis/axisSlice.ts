import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../../app/store"
import { numericalFormat } from "../label/labelSlice"


interface axisState {
    showGrid: boolean,
    showBoxes: boolean,
    lineWeight: number,
    reverseAxis: boolean,
    ticks: number,
    originValue: number,
    fontSize: number,
    format: numericalFormat | "Date",
    sigDigs: 2,
    scaleBy:number,
    activated: boolean
}
//TODO handel dates
const initialState: axisState = {
    showGrid: false,
    showBoxes: false,
    lineWeight: 1,
    reverseAxis: false,
    ticks: 5,
    originValue: 0.0,
    fontSize: 12,
    format: "Decimal",
    sigDigs: 2,
    activated: false,
    scaleBy:1
}

const AxisSlice = createSlice({
    name: "axis",
    initialState,
    reducers: {
        flipActivated: (state) => { state.activated = !state.activated },
        flipShowGrid: (state) => { state.showGrid = !state.showGrid },
        flipShowBoxes: (state) => { state.showBoxes = !state.showGrid },
        setLineWeight: (state, action) => { state.lineWeight = action.payload },
        flipReverseAxis: (state) => { state.reverseAxis = !state.reverseAxis },
        setTicks: (state, action) => { state.ticks = action.payload },
        setOriginValue: (state, action) => { state.originValue = action.payload },
        setFontSize: (state, action) => { state.fontSize = action.payload },
        setFormat: (state, action) => {
            state.format = action.payload
        },
        setSigDigs: (state, action) => {
            state.sigDigs = action.payload
        },
        setScale: (state, action) => {
            state.scaleBy = action.payload
        }
    }
})

export default AxisSlice.reducer

export const { flipActivated, flipShowGrid, flipShowBoxes, setLineWeight, flipReverseAxis, setTicks, setOriginValue, setFontSize,setFormat,setSigDigs,setScale } = AxisSlice.actions

export const selectAxis = (state: RootState) => state.settings.axis