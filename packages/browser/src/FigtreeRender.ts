import React from "react";
import { createRoot } from 'react-dom/client';
import { FigTreeOptions } from "./FigtreeOptions";
import { FigTree } from '@figtreejs/core'
import ReactDOMServer from "react-dom/server";
const rootMap =new Map();


//TODO update children to be called Baubles
export default function figtreeRender(options:FigTreeOptions){
    

    const svg = options.svg;

    if(svg==undefined){
        return  ReactDOMServer.renderToStaticMarkup( React.createElement(FigTree, options,...options.baubles));
    }

    if(rootMap.has(svg)){
        const root = rootMap.get(svg);
        root.render(React.createElement(FigTree, options,...options.baubles));
    }
    else{
        const root = createRoot(svg);
        rootMap.set(svg,root);
        root.render(React.createElement(FigTree, options,...options.baubles));

    }
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
