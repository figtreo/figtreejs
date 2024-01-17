import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../../app/store"

interface TitleState {
    fontSize: number,
    fontWeight: number,
    color: string,
    x: number,
    y: number,
    activated: boolean
    text: string
}

const initialState:TitleState = {
    fontSize: 20,
    fontWeight: 300,
    color: "black",
    x: 0,
    y: 0,
    activated: false,
    text:""
}

const titleSlice = createSlice({
    name: "title",
    initialState: initialState,
    reducers: {
        setText:(state, action) => {
            state.text = action.payload
        },
        setFontSize:(state, action) => {
            state.fontSize = action.payload
        },
        setColor:(state, action) => {
            state.color = action.payload
        },
        setX:(state, action) => {
            state.x = action.payload
        },
        setY:(state, action) => {
            state.y = action.payload
        },
        setFontWeight:(state, action) => {
            state.fontWeight = action.payload
        },
        flipActivated:(state) => {
            state.activated = !state.activated
        }

    }
})

export const {setText, setFontSize, setColor, setX, setY,flipActivated,setFontWeight} = titleSlice.actions;
export default titleSlice.reducer;

export const selectTitle = (state:RootState) => state.settings.title
