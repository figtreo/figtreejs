import { layoutClass } from "../../../Layouts";
import type { InternalCladePropType } from './makeClade';
import { normalizePath } from '../../../path.helpers';
import type { Attrs } from '../types';
import { BasePath } from '../Shapes';

//TODO add padding
// const padding = 10;
//TODO make normalization part of an hoc or d animation.

/**
 * A cartoon drawing of a clade in the tree. 
 * It will not yet render for radial layouts
 */

export function Cartoon<A extends Attrs>(props:InternalCladePropType<A>){
           const {clade,applyAttrInteractions,scale,layout,...rest} = props
           const {root,leftMost,rightMost,mostDiverged} = clade
        const v = scale(layout(root));
        const {attrs,interactions} = applyAttrInteractions(root)
        const {x,y} = v;
        const lmv = scale(layout(leftMost)) // left most child v (top of highlight)
        const rmv = scale(layout(rightMost)) // right most child v (top of highlight)
        const mdv = scale(layout(mostDiverged)) // right most child v (top of highlight)
        const {layoutClass:layoutType} = layout(root);
        let d:string
        if(layoutType ===layoutClass.Rectangular){

            const maxX = mdv.x;
            const maxY = rmv.y;
            
            const minY = lmv.y;

            d = `M${x},${y}L${maxX},${maxY}L${maxX},${minY}Z`

        }else if(layoutType ===layoutClass.Polar){
        
                        //todo maybe swap lmv and rmv
            const top = lmv;
            const bottom =rmv;
          
      const arcBit =  top.theta===bottom.theta||top.r===0?"": `A${top.r},${top.r} 0 0 ${top.theta!<bottom.theta! ?1:0} ${bottom.x},${bottom.y}`; 
       d = `M${x},${y}L${top.x},${top.y} ${arcBit} Z`
        
        }else{
            return null
        }

        const normalized = normalizePath(d!);
        return <BasePath d={normalized} attrs={attrs} interactions={interactions} {...rest}/> 
}