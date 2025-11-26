import {createSlice } from '@reduxjs/toolkit';
import type{ PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store';
import { layoutClass } from '@figtreejs/core';


export interface LayoutState {
    layout: layoutClass,
    expansion: number,
    pollard: number,
    rootLength: number,
    curvature: number,
    alignTipLabels: boolean
    zoom: number,
    rootAngle: number,
    angleRange: number,
    showRoot: boolean,
    spread:number
    pointOfInterest: { x: number; y: number; } | undefined;
    fishEye: number,
    animate:boolean,
    tangle:boolean,
    invert:boolean,
    minR:number
}

export const initialState: LayoutState = {
    layout: layoutClass.Rectangular,
    expansion: 0,
    rootLength: 0,
    curvature: 0,
    alignTipLabels: false,
    zoom: 0,
    rootAngle: 3.14,
    angleRange: 2*3.14-0.5,
    showRoot: true,
    spread:0,
    pointOfInterest:{x:0,y:0},
    fishEye:0,
    animate:false,
    pollard:0,
    tangle:false,
    invert:false,
    minR:0
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLayout: (state, action: PayloadAction<layoutClass>) => {
            state.layout = action.payload;
        },
        setExpansion: (state, action: PayloadAction<number>) => {
            state.expansion = action.payload;
        },
        setRootLength: (state, action: PayloadAction<number>) => {
            state.rootLength = action.payload;
        },
        setCurvature: (state, action: PayloadAction<number>) => {
            state.curvature = action.payload;
        },        
        setMinR: (state, action: PayloadAction<number>) => {
            state.minR = action.payload;
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
        },
        setFisheye: (state, action: PayloadAction<number>) => {
            state.fishEye = action.payload;
        },        
        setPollard: (state, action: PayloadAction<number>) => {
            state.pollard = action.payload;
        },
        setPointOfInterest(state, action: PayloadAction<{ x: number; y: number; }>) {
            state.pointOfInterest = action.payload;
        },
        flipAnimate(state) {
            state.animate = !state.animate;
        },
        flipTangle(state) {
            state.tangle = !state.tangle;
        },
        flipInvert(state){
            state.invert = !state.invert;
        }
    }
}
)

export const { flipInvert,setMinR,flipTangle,setSpread, setZoom, setLayout, setExpansion, setFisheye, setRootLength, setCurvature, flipAlignTipLabels,setRootAngle,flipShowRoot,setAngleRange,setPointOfInterest,flipAnimate,setPollard} = layoutSlice.actions;

export const selectLayout = (state: RootState) => state.settings.layout

export default layoutSlice.reducer;