

import { isFn, useAttributeMappers } from "./helpers";
import type { LiftToUser } from "./types";
import type { Attrs, StripProps, UserAttrs } from "./types";
import type { NodeRef} from "../../Evo";
import { preOrderIterator } from "../../Evo";
import type { BaubleTypes } from "../FigTree/Figtree.types";
import { textSafeDegrees } from "../../store/polarScale";
import type { BaseLabelProps} from "./Shapes/Label";
import {BaseLabel } from "./Shapes/Label";
import { withAnimation } from "../HOC/withAnimation";
import { panic } from "../../utils";
import  { layoutClass } from "../../Layouts";
import type { PolarVertex } from "../../Layouts/functional/rectangularLayout";


// TODO think about passing dimensions to all children
/**
 * User options for designating and styling labels in a figure
 */
export type LabelOptionsType<A extends UserAttrs>={
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs?:A,
        aligned?:boolean,
        gap? :number,
        text:string | ((n:NodeRef)=>string)
}

// The props accepted by the branch label Bauble 
export type BranchLabelPropTypes = Omit< BaubleTypes, "animated"> & {animated?:boolean} //  animation is optional


/**
 * A factory generator that returns a component factory to the user.
 * The factory accepts the options above and returns a branch label Bauble to be rendered by the figure.
 */
function makeBranchLabels<
 A extends Attrs,
>(LabelComponent:React.FC<StripProps<BaseLabelProps>>): // BaseLabelProps are animatable this hoc calculated raw values and passes the on
 ( initial:LabelOptionsType<LiftToUser<A>> ) =>  React.FC<BranchLabelPropTypes>{

    return ( initial ) =>{

        const Labels:React.FC<BranchLabelPropTypes> = ({ tree, scale, layout,dimensions, animated=false }) => {
                        const {
                            filter = () => true,
                            keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                            attrs={} as A,
                            gap = 6,
                            text
                            // ...rest // all shape-specific extras E
                        } = initial;
                        //move text to attrs so it can be applied
                      const fullAttrs = {...attrs,text}
                      const applyAttrInteractions = useAttributeMappers<A>(fullAttrs,{});
                      const texter = isFn(text) ? (n:NodeRef)=> text(n) : ()=> text;
                      const {layoutClass:layoutType} = dimensions

                    return (
                            <g className={"branch-label-layer"}>
                                {[...preOrderIterator(tree)].filter(n=>filter(n) && !tree.isRoot(n)).map((node) => { 
                                        const v = layout(node);
                                        const parent = tree.getParent(node)
                                        const parentVertex = layout(parent);
                                        const scaledV = scale(v);
                                        const scaledpV = scale(parentVertex);
                                       // todo fix this so we don't need all the casting etc. 
                                        const theta = layoutType===layoutClass.Polar ? (scaledV as PolarVertex).theta || panic("Layout is polar but did not compute theta"):0
                                        const rotation = layoutType===layoutClass.Polar?textSafeDegrees(theta):0;
                                        const step = scale({x:parentVertex.x,y:v.y})
                                        const {dx,dy} = layoutType===layoutClass.Polar? getPolarBranchDs(theta,gap):{dx:0,dy:-1*gap};
                                        const x = (layoutType===layoutClass.Polar? (scaledV.x+step.x)/2 : (scaledV.x+scaledpV.x)/2 )+dx;
                                        const y = (layoutType===layoutClass.Polar? (scaledV.y+step.y)/2  : layoutType===layoutClass.Radial? (scaledV.y+scaledpV.y)/2 : scaledV.y )+dy;

                                        
                                        const {attrs}=applyAttrInteractions(node)
                                       
                                        const finalAttrs = {...attrs,
                                            alignmentBaseline:("baseline" as React.SVGAttributes<SVGTextElement>['alignmentBaseline']),
                                            rotation,
                                            textAnchor:("middle" as React.SVGAttributes<SVGTextElement>['textAnchor'])}
                                            
                                        const text = texter(node);
                                        return <LabelComponent  
                                        key={keyBy(node)} 
                                        text={text} 
                                        x={x}
                                        y={y} 
                                        attrs={finalAttrs}
                                        animated={animated}
                                        /> 
                                    })
                                
                                }
                            </g>
                        )
                        
                    }
               return Labels
                }
            }

function getPolarBranchDs(theta:number,gap:number){
                //branch lable dx dy;
                let branchDx,branchDy;
                if(theta>0 && theta<Math.PI/2){//good
                    branchDx = Math.sin((Math.PI/2) -theta)*gap;
                    branchDy = -Math.cos((Math.PI/2) -theta)*gap;
                }else if(theta>Math.PI/2 && theta<Math.PI){ //good
                    branchDx = -Math.cos((Math.PI/2) - (Math.PI-theta))*gap;
                    branchDy = -Math.sin((Math.PI/2) - (Math.PI-theta))*gap;
                }else if (theta>Math.PI && theta<3*Math.PI/2){ // good
                    branchDx = Math.cos((Math.PI/2) - (theta-Math.PI))*gap;
                    branchDy = -Math.sin((Math.PI/2) - (theta-Math.PI))*gap;
                }else{
                    branchDx = -Math.cos((Math.PI/2) - (2*Math.PI-theta))*gap;
                    branchDy = -Math.sin((Math.PI/2) - (2*Math.PI-theta))*gap;
                }
                return {dx:branchDx,dy:branchDy};
}
/**
 * Add branch labels to the figure.
 * The relative position and rotation is determined according to the layout
*/
export const BranchLabels = makeBranchLabels(withAnimation(BaseLabel))