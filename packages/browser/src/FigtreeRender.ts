import React from "react";
import { createRoot, type Root } from 'react-dom/client';

import { FigTree, FigtreeProps } from '@figtreejs/core'
import ReactDOMServer from "react-dom/server";
import type { FigTreeOptions } from "./FigtreeOptions";
const rootMap =new Map<SVGElement,Root>();


//TODO update children to be called Baubles
export default function figtreeRender(options:FigTreeOptions){
    

    const svg = options.svg;

    const root = rootMap.get(svg) 
    if( root!==undefined){
         root.render(React.createElement(FigTree, options));
    }
    else{
        const root = createRoot(svg);
        rootMap.set(svg,root);
         root.render(React.createElement(FigTree, options));

    }
}

export function staticRender(options:FigtreeProps){    
        const element = React.createElement(FigTree, options);
        const markup = ReactDOMServer.renderToStaticMarkup(element);
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}">${markup}</svg>`;
    
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
