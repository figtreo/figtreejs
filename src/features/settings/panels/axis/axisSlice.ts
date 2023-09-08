import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../../app/store"

interface axisState {
    showGrid: boolean,
    showBoxes: boolean,
    lineWeight: number,
    reverseAxis: boolean,
    labelSpacing: number,
    tickSpacing: number,
    originValue: number,
    fontSize: number,
    activated: boolean
}
//TODO handel dates
const initialState: axisState = {
    showGrid: false,
    showBoxes: false,
    lineWeight: 1,
    reverseAxis: false,
    labelSpacing: 1,
    tickSpacing: 0.5,
    originValue: 0.0,
    fontSize: 8,
    activated: false
}

const AxisSlice = createSlice({
    name: "axis",
    initialState,
    reducers: {
        flipActivated: (state) => { state.activated = !state.activated },
        flipShowGrid: (state) => { state.showGrid = !state.showGrid },
        flipShowBoxes: (state) => { state.showBoxes = !state.showGrid},
        setLineWeight: (state, action) => { state.lineWeight = action.payload },
        flipReverseAxis: (state) => { state.reverseAxis= !state.reverseAxis },
        setLabelSpacing: (state, action) => { state.labelSpacing = action.payload },
        setTickSpacing: (state, action) => { state.tickSpacing = action.payload },
        setOriginValue: (state, action) => { state.originValue = action.payload },
        setFontSize: (state, action) => { state.fontSize = action.payload }

    }
})

export default AxisSlice.reducer

export const {flipActivated, flipShowGrid,flipShowBoxes,setLineWeight,flipReverseAxis,setLabelSpacing,setTickSpacing,setOriginValue,setFontSize} = AxisSlice.actions

export const selectAxis = (state:RootState)=>state.settings.axis