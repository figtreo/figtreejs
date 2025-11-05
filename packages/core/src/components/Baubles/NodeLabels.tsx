
import React from "react";
import { isFn, useAttributeMappers } from "./helpers";
import type { LiftToUser } from "./types";
import type { Attrs, StripProps } from "./types";
import type { NodeRef} from "../../Evo";
import { preOrderIterator } from "../../Evo";
import type { BaubleTypes } from "../FigTree/Figtree.types";
import { simpleVertex } from "../../Layouts/functional/rectangularLayout";
import type { LabelOptionsType } from "./BranchLabels";
import type { BaseLabelProps} from "./Shapes";
import  {BaseLabel } from "./Shapes";
import { withAnimation } from "../HOC/withAnimation";

// TODO think about passing dimensions to all children

type textFn = ((n:NodeRef)=>string)


// The props accepted by the node label Bauble 
type NodeLabelPropTypes = Omit< BaubleTypes, "animated"> & {animated?:boolean} //  animation is optional


/**
 * A factory generator that returns a component factory to the user.
 * The factory accepts the options above and returns a Bauble to be rendered by the figure.
 */
function makeNodeLabels<
 A extends Attrs,
>(LabelComponent:React.FC<StripProps<BaseLabelProps>>):
 ( initial:LabelOptionsType<LiftToUser<A>> ) => React.FC<NodeLabelPropTypes>{

    return ( initial ) =>{

        const Labels:React.FC<NodeLabelPropTypes> = ({ tree, scale, layout,dimensions, animated=false}) => {
                        const {
                            filter = () => true,
                            keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                            attrs={} as A,
                            aligned=false,
                            gap = 6,
                            text
                            // ...rest // all shape-specific extras E
                        } = initial;
                        //move text to attrs so it can be applied
                      const fullAttrs = {...attrs,text}
                      const applyAttrInteractions = useAttributeMappers<A>(fullAttrs,{});
                      const texter = isFn(text) ? (n:NodeRef)=> (text as textFn)(n) : ()=> text;
                      const {domainX,layoutClass} = dimensions

                    return (
                            <g className={"node-label-layer"}>
                                {[...preOrderIterator(tree)].filter(filter).map((node) => { 
                                        const v = layout(node);
                                       
                                        const scaledV = scale(v); // todo don't like that this is not really inherent
                                        const nodeLabel = scaledV.nodeLabel;
                                        const dx = nodeLabel.dxFactor*gap; 
                                        const dy = nodeLabel.dyFactor*gap;
                                                                
                                        const scaledMax = scale({x:domainX[1],y:v.y})
                                        
                                        const xpos = (aligned? scaledMax.x :scaledV.x) + dx;
                                        const ypos = (aligned && layoutClass==="Polar"? scaledMax.y :scaledV.y) + dy;

                                        const {alignmentBaseline,rotation,textAnchor}=nodeLabel;

                                        const d =        
                                        aligned ?`M${scaledV.x} ${scaledV.y}L${xpos} ${ypos}`:`M${scaledV.x} ${scaledV.y}L${scaledV.x} ${scaledV.y}`

                                        const {attrs}=applyAttrInteractions(node)
                                       
                                        const finalAttrs = {...attrs,alignmentBaseline,rotation,textAnchor}
                                        const text = texter(node);
                                        return <LabelComponent  
                                        key={keyBy(node)} 
                                        text={text} 
                                        d={d} 
                                        x={xpos}
                                        y={ypos} 
                                        attrs={finalAttrs}
                                        animated={animated}
                                        /> 
                                        // const element = <ShapeComponent key={v.id} {...rest}  {...shapeProps(v)}   vertex={v}  x={scales.x(v.x)} y={scales.y(v.y)}/> 
                                    })
                                
                                }
                            </g>
                        )
                        
                    }
               return Labels
                }
            }

/**
 * Add node labels to the figure.
 * The relative position and rotation is determined according to the layout.
 * Use the filter option to specify external and internal node labels
*/
export const NodeLabels = makeNodeLabels(withAnimation(BaseLabel))