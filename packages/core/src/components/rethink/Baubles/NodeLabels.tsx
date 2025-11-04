
import React from "react";
import Label, { BaseLabelProps } from "../Shapes/Label";
import { Attrs,  UserAttrs } from "../types";
import { NodeRef, preOrderIterator, Tree } from "../../../Evo";
import { isFn, LiftToUser, useAttributeMappers } from "./helpers";
import { dimensionType } from "../../FigTree/Figtree.types";
import { layout, scale } from "../../../store/store";
import { simpleVertex } from "../../../Layouts/functional/rectangularLayout";
// TODO think about passing dimensions to all children

type LabelProps<A extends UserAttrs>={
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs?:A,

        aligned?:boolean,
        gap? :number,
        text:string | ((n:NodeRef)=>string)
}

type InternalLabelProps<A extends UserAttrs>={
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs?:A,

        aligned?:boolean,
        gap? :number,
        text:string | ((n:NodeRef)=>string)
        tree:Tree,
        scale:scale,
        layout:layout,
        dimensions:dimensionType
}

type RemainingProps<U extends UserAttrs> =
  Omit<InternalLabelProps<U>, keyof LabelProps<U>>;

function makeNodeLabels<
 A extends Attrs,
>(LabelComponent:React.FC<BaseLabelProps>):
 ( initial:LabelProps<LiftToUser<A>> ) => React.FC<RemainingProps<A>>{

    return ( initial ) =>{

        const Labels:React.FC<RemainingProps<A>> = ({ tree, scale, layout,dimensions }) => {
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
                      const texter = isFn(text) ? (n:NodeRef)=> text(n) : ()=> text as string;
                      const {domainX,layoutClass} = dimensions

                    return (
                            <g className={"node-label-layer"}>
                                {[...preOrderIterator(tree)].filter(filter).map((node) => { 
                                        const v = layout(node);
                                       
                                        const scaledV = scale(v) as simpleVertex &{nodeLabel:{dxFactor:number,dyFactor:number,alignmentBaseline: React.SVGAttributes<SVGTextElement>['alignmentBaseline'],rotation:number,textAnchor:React.SVGAttributes<SVGTextElement>['textAnchor']}}; // todo don't like that this is not really inherent
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

export const NodeLabels = makeNodeLabels(Label)