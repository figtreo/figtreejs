import React from "react";
import ReactDOM from "react-dom";
import { FigTreeOptions } from "./FigtreeOptions";
import { FigTree } from '@figtreejs/core'




//TODO update children to be called Baubles
export default function figtreeRender(options:FigTreeOptions){
    
    const svg = options.svg;
    ReactDOM.render(
        React.createElement(FigTree, options,...options.baubles) ,svg)
}


//TODO set up setters so can use an object style

// export function optionalSetGet(key,value){
//     if(value){
//         this[key]=value;
//         this.render();
//         return this;
//     }
//     else{
//         return this[key];
//     }
// };

// export function optionalDeepSetGet(key,innerKey,value){
//     if(value!==null){
//         this[key][innerKey]=value;
//         this.render();
//         return this;
//     }
//     else{
//         return this[key][innerKey];
//     }
// }
