import {  createSlice } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';

import {  BaseAnnotationType,type AnnotationSummary } from '@figtreejs/core';
import { scaleOrdinal, scaleSequential } from 'd3-scale';
import * as d3 from 'd3-scale-chromatic';
import type { RootState } from '../../../../app/store';

export interface colorScale {
    attribute:string
    type:"continuous"|"discrete",
    scheme: string,
    range:string[]|[string,string],
    domain: string[]|number[]|boolean[],
    legend: {
        activated: boolean,
        x:number,
        y:number,
        direction?:"horizontal"|"vertical",
        columns?:number,
        title?:string,
        width:number
        height:number,
        fontSize:number,
        swatchSize?:number,
    }
    

}
interface colorState{
    byId:{[key:string]:colorScale}
    allIds:string[]}

const initialState:colorState = {
    byId:{},
    allIds:[]
}

/// state will need a custom scales object. 
// custom scales will come with own domain. need to 

const discreteColorSchemes = ["Accent","Category10","Dark2","Paired","Pastel1","Pastel2","Set1","Set2","Set3","Tableau10"]
const divergingColorSchemes = ["BrBG","PRGn","PiYG","PuOr","RdBu","RdGy","RdYlBu","RdYlGn","Spectral"]
const sequentialColorSchemes = ["Blues","Greens","Greys","Oranges","Purples","Reds"]// others can not be discretized,"Turbo","Viridis","Inferno","Magma","Civids","Warm","Cool"]

export const schemes = {
    discrete:discreteColorSchemes,
    sequential:sequentialColorSchemes,
    diverging:divergingColorSchemes
}
export function getScale(scaleData:colorScale){
    const prefix = scaleData.type==="discrete"?"scheme":"interpolate";
    const {scheme,domain} = scaleData;
    
    switch(scaleData.type){
        case "discrete":
            if(discreteColorSchemes.includes(scheme)){
                return scaleOrdinal(d3[`${prefix}${scheme}`]).domain(domain as string[]);
        
            }else if(sequentialColorSchemes.includes(scheme)){
                const n=Math.max(3,Math.min(domain.length,9));
                return scaleOrdinal(d3[`${prefix}${scheme}`][n]).domain(domain);
        
            }else if(divergingColorSchemes.includes(scheme)){
                const n=Math.max(3,Math.min(domain.length,11));
                return scaleOrdinal(d3[`${prefix}${scheme}`][n]).domain(domain);
            }else{
                throw new Error(`Unknown color scheme ${prefix}${scheme}`)
            }
        case "continuous":
            return scaleSequential(d3[`${prefix}${scheme}`]).domain(domain as [number,number]);
    
    }
}


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
        setScheme:{
            reducer:(state,action:PayloadAction<{attribute:string,scheme:string}>) =>{
            const {attribute,scheme} = action.payload;
            state.byId[attribute].scheme = scheme;
            },
            prepare: (attribute: string, scheme: string) => ({payload:{attribute,scheme}})
        },

        flipLegendActivation:(state,action:PayloadAction<{attribute:string}>)=>{
            const {attribute} = action.payload;
            state.byId[attribute].legend.activated = !state.byId[attribute].legend.activated;
        },

        setLegendDirection:(state,action:PayloadAction<{attribute:string,direction:"horizontal"|"vertical"}>)=>{
            const {attribute,direction} = action.payload;
            state.byId[attribute].legend.direction = direction;
        },
        setLegendColumns:(state,action:PayloadAction<{attribute:string,columns:number}>)=>{
            const {attribute,columns} = action.payload;
            state.byId[attribute].legend.columns = columns;
        },        
        setLegendWidth:(state,action:PayloadAction<{attribute:string,width:number}>)=>{
            const {attribute,width} = action.payload;
            state.byId[attribute].legend.width = width;
        },        
        setLegendHeight:(state,action:PayloadAction<{attribute:string,height:number}>)=>{
            const {attribute,height} = action.payload;
            state.byId[attribute].legend.height = height;
        },
        setLegendTitle:(state,action:PayloadAction<{attribute:string,title:string}>)=>{
            const {attribute,title} = action.payload;
            state.byId[attribute].legend.title = title;
        },

        setLegendX: (state, action: PayloadAction<{ attribute: string, x: number }>) => {
            const { attribute, x } = action.payload;
            state.byId[attribute].legend.x = x;
        },
        setLegendY: (state, action: PayloadAction<{ attribute: string, y: number }>) => {
            const { attribute, y } = action.payload;
            state.byId[attribute].legend.y = y;
        },
        setLegendFontSize(state,action:PayloadAction<{attribute:string,fontSize:number}>){
            const {attribute,fontSize} = action.payload;
            state.byId[attribute].legend.fontSize = fontSize;
        },
        setLegendSwatchSize(state,action:PayloadAction<{attribute:string,swatchSize:number}>){
            const {attribute,swatchSize} = action.payload;
            state.byId[attribute].legend.swatchSize = swatchSize;
        },
            
        addScaleFromAnnotation:{
            reducer:(state,action:PayloadAction<colorScale>)=>{
                const {attribute} = action.payload;
                state.byId[attribute] = action.payload;
                if(!state.allIds.includes(attribute)){
                    state.allIds.push(attribute);
                }
                

        },
            prepare: (annotation: AnnotationSummary) => {
                if(annotation.type===BaseAnnotationType.DISCRETE_SET|| annotation.type===BaseAnnotationType.NUMERICAL_SET){
                    throw new Error("Cannot create color scale from range or set annotation")
                }
                const type = annotation.type === BaseAnnotationType.NUMERICAL ? "continuous" : "discrete";

                switch (type) {
                    case "continuous":
                        return {
                            payload: {
                                attribute: annotation.id,
                                type: "continuous",
                                domain: annotation.domain!,
                                scheme: 'Blues',
                                range: scaleSequential(d3.interpolateBlues).domain(annotation.domain as [number, number]).range(),
                                legend:{
                                    activated:false,
                                    pos:{x:0,y:0},
                                    direction:"horizontal",
                                    title:annotation.id,
                                    width:100,
                                    height:200,
                                    x:0,
                                    y:0,
                                    fontSize:12,

                                }
                            }
                        };
                    case "discrete":
                        return {
                            payload: {
                                attribute: annotation.id,
                                type: "discrete",
                                domain: annotation.domain!,
                                scheme: 'Blues',
                                range: getStartingRange(annotation.domain!, "Blues"),
                                legend:{
                                    activated:false,
                                    x:0,
                                    y:0,
                                    columns:1,
                                    title:annotation.id,
                                    width:100,
                                    height:200,
                                    swatchSize:10,
                                    fontSize:12,
                                }
                            }
                        };
                }
            }
        }
    }
    });
export default colorScalesSlice.reducer;

export const  {addScaleFromAnnotation,setScheme,setLegendColumns,setLegendTitle,setLegendPos,flipLegendActivation,setLegendDirection,setLegendHeight,setLegendWidth, setLegendX,setLegendY, setLegendFontSize,setLegendSwatchSize} = colorScalesSlice.actions;

export const selectColorableAttributes = (state:RootState) => state.colorScales.allIds;