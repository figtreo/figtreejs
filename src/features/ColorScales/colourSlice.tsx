import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Annotation, AnnotationType } from '@figtreejs/core';
import { scaleOrdinal, scaleSequential } from 'd3-scale';
import {schemeBlues} from 'd3-scale-chromatic';
import * as d3 from 'd3-scale-chromatic';
import { RootState } from '../../app/store';

interface colorScale {
    attribute:string
    type:"continuous"|"discrete",
    scheme: string,
    range:string[]|[string,string],
    domain: string[]|number[]|boolean[]

}
interface colorState{
    byId:{[key:string]:colorScale}
    allIds:string[]
}

const initialState:colorState = {
    byId:{},
    allIds:[]
}

const discreteColorSchemes = ["Accent","Category10","Dark2","Paired","Pastel1","Pastel2","Set1","Set2","Set3","Tableau10","BrBG","PRGn","PiYG","PuOr","RdBu","RdGy","RdYlBu","RdYlGn","Spectral"]
const divergingColorSchemes = ["BrBG","PRGn","PiYG","PuOr","RdBu","RdGy","RdYlBu","RdYlGn","Spectral"]
const sequentialColorSchemes = ["Blues","Greens","Greys","Oranges","Purples","Reds","BuGn","BuPu","GnBu","OrRd","PuBuGn","PuBu","PuRd","RdPu","YlGnBu","YlGn","YlOrBr","YlOrRd","Viridis","Inferno","Magma","Plasma","Warm","Cool","CubehelixDefault","BuGnYl","BuPuYl","GnBuPu","OrRdPu","PuBuGnYl","PuBuPu","PuRdPu","RdPuPu","YlGnBuPu","YlGnPu","YlOrBrPu","YlOrRdPu","ViridisYl","InfernoYl","MagmaYl","PlasmaYl","WarmYl","CoolYl","CubehelixDefaultYl","BuGnYl","BuPuYl","GnBuPu","OrRdPu","PuBuGnYl","PuBuPu","PuRdPu","RdPuPu","YlGnBuPu","YlGnPu","YlOrBrPu","YlOrRdPu","ViridisYl","InfernoYl","MagmaYl","PlasmaYl","WarmYl","CoolYl","CubehelixDefaultYl"]

function getStartingRange(domain:any[],name:string):string[]{
    let scheme:any=undefined;
    if(discreteColorSchemes.includes(scheme)){
        scheme = `${name}`;
        return scaleOrdinal(d3[`scheme${scheme}`]).domain(domain).range() as string[];

    }else if(sequentialColorSchemes.includes(name)){
        const n=Math.max(3,Math.min(domain.length,9));
        return scaleOrdinal(d3[`scheme${name}`][n]).domain(domain).range() as string[];

    }else if(divergingColorSchemes.includes(name)){
        const n=Math.max(3,Math.min(domain.length,11));
        return scaleOrdinal(d3[`scheme${name}`][n]).domain(domain).range() as string[];
    }else{
        throw new Error("Unknown color scheme")
    }

}

export const colorScalesSlice = createSlice({
    name: 'colorScales',
    initialState,
    reducers: {
        addScale: (state, action: PayloadAction<colorScale>) => {
            const {attribute} = action.payload;
            state.byId[attribute] = action.payload;
            state.allIds.push(attribute);
        },
        removeScale: (state, action: PayloadAction<string>) => {
            const {payload} = action;
            delete state.byId[payload];
            state.allIds = state.allIds.filter(id=>id!==payload);
        },
        setItemColor:(state,action:PayloadAction<{attribute:string,key:string|boolean|number,colour:string}>)=>{
            if(state.byId[action.payload.attribute].type==="discrete"){
                const {attribute,key,colour} = action.payload;
                const index = state.byId[attribute].domain.indexOf(key);
                state.byId[attribute].range[index] = colour;
            }else{
                throw new Error("Cannot set colour of continuous scale. use setMinColor and setMaxColor")
            }
        },
        setNthColor:(state,action:PayloadAction<{attribute:string,index:number,colour:string}>)=>{
            if(state.byId[action.payload.attribute].type==="discrete"){
                const {attribute,index,colour} = action.payload;
                state.byId[attribute].range[index] = colour;
            }else{
                throw new Error("Cannot set colour of continuous scale. use setMinColor and setMaxColor")
            }
        },
        setMaxColor:(state,action:PayloadAction<{attribute:string,colour:string}>)=>{
            if(state.byId[action.payload.attribute].type==="continuous"){
            const {attribute,colour} = action.payload;
            state.byId[attribute].range[1] = colour;
            }else{
                throw new Error("Cannot set max colour of discrete scale. use setItemColor")
            }
        },
        setMinColor:(state,action:PayloadAction<{attribute:string,colour:string}>)=>{
            if(state.byId[action.payload.attribute].type==="continuous"){
                const {attribute,colour} = action.payload;
                state.byId[attribute].range[0] = colour;
                }else{
                    throw new Error("Cannot set max colour of discrete scale. use setItemColor")
                }
        },
        setColorRange(state,action:PayloadAction<{attribute:string,range:string[]}>) {
            const {attribute,range} = action.payload;
            state.byId[attribute].range = range;
        },
        addScaleFromAnnotation:{
            reducer:(state,action:PayloadAction<colorScale>)=>{
                const {attribute} = action.payload;
                state.byId[attribute] = action.payload;
                if(!state.allIds.includes(attribute)){
                    state.allIds.push(attribute);
                }
                

        },
            prepare: (annotation: Annotation) => {
                if(annotation.type===AnnotationType.RANGE|| annotation.type===AnnotationType.SET){
                    throw new Error("Cannot create color scale from range or set annotation")
                }
                const type = annotation.type === AnnotationType.CONTINUOUS || annotation.type === AnnotationType.INTEGER ? "continuous" : "discrete";

                switch (type) {
                    case "continuous":
                        return {
                            payload: {
                                attribute: annotation.id,
                                type: "continuous",
                                domain: annotation.domain!,
                                scheme: 'Blues',
                                range: scaleSequential(d3.interpolateBlues).domain(annotation.domain as [number, number]).range() 
                            }
                        };
                    case "discrete":
                        return {
                            payload: {
                                attribute: annotation.id,
                                type: "discrete",
                                domain: annotation.domain!,
                                scheme: 'Blues',
                                range: getStartingRange(annotation.domain!, "Blues")
                            }
                        };
                }
            }
        }
    }
    });
export default colorScalesSlice.reducer;

export const  {addScaleFromAnnotation} = colorScalesSlice.actions;

export const selectColorableAttributes = (state:RootState) => state.colorScales.allIds;