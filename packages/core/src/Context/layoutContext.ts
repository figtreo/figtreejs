import { createContext } from 'react';
import { layoutType } from '../store/store';
import { layoutClass } from '../Layouts';

const defaultLayout:layoutType = () =>{
    return {
        x:0,
        y:0,
        layoutClass:layoutClass.Rectangular,
        nodeLabel:{ // todo move this to a helper function
            alignmentBaseline:"middle",
            textAnchor:"end",
            dxFactor:0, 
            dyFactor:0,
            rotation:0
        }
    }
}
export const layoutContext = createContext(defaultLayout);