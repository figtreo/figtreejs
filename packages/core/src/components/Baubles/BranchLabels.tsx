
import React from "react";
import { isFn, useAttributeMappers } from "./helpers";
import { LiftToUser } from "./types";
import { Attrs, StripProps, UserAttrs } from "./types";
import { NodeRef, preOrderIterator } from "../../Evo";
import { BaubleTypes } from "../FigTree/Figtree.types";
import { textSafeDegrees } from "../../store/polarScale";
import { BaseLabelProps,BaseLabel } from "./Shapes/Label";
import { withAnimation } from "../HOC/withAnimation";


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
type BranchLabelPropTypes = Omit< BaubleTypes, "animated"> & {animated?:boolean} //  animation is optional


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
                      const texter = isFn(text) ? (n:NodeRef)=> text(n) : ()=> text as string;
                      const {layoutClass} = dimensions

                    return (
                            <g className={"branch-label-layer"}>
                                {[...preOrderIterator(tree)].filter(n=>filter(n) && !tree.isRoot(n)).map((node) => { 
                                        const v = layout(node);
                                        const parentVertex = layout(tree.getParent(node)!);
                                        const scaledV = scale(v);
                                        const scaledpV = scale(parentVertex);
                                       
                                        const rotation = layoutClass==="Polar"?textSafeDegrees(scaledV.theta!):0;
                                        const step = scale({x:parentVertex.x,y:v.y})
                                        const {dx,dy} = layoutClass==="Polar"? getPolarBranchDs(scaledV.theta!,gap):{dx:0,dy:-1*gap};
                                        const x = (layoutClass==="Polar"? (scaledV.x+step.x)/2 : (scaledV.x+scaledpV.x)/2 )+dx;
                                        const y = (layoutClass==="Polar"? (scaledV.y+step.y)/2  : layoutClass==="Radial"? (scaledV.y+scaledpV.y)/2 : scaledV.y )+dy;

                                        
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