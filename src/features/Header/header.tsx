import React, { useState } from "react";
import './header.css'

import cartoon from "../../figtreeGraphics/CartoonTool.png"
import collapse from "../../figtreeGraphics/CollapseTool.png"
import rooting from "../../figtreeGraphics/rootingTool.png"
import rotatePic from "../../figtreeGraphics/rotateTool.png"
import annotate from "../../figtreeGraphics/annotationTool.png"
import colour from "../../figtreeGraphics/coloursTool.png"

import find from "../../figtreeGraphics/findTool.png"
import highlight from "../../figtreeGraphics/HilightTool.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cartoonNode, collapseNode, colorClade, colorNode, colourTaxa, hiLightNode, selectHeader, setSelectionMode } from "./headerSlice";
import { tree } from "../../app/store";
export function Header() {

    const dispatch = useAppDispatch();

    const header = useAppSelector(selectHeader)

    const optionClasses = header.SelectionRoot ? "tool" : "tool deactivated"


    const nextTreeAvaliable = tree.getCurrentIndex() < tree.getTreeCount() - 1;
    const previoustreeAvaliable = tree.getCurrentIndex() > 0;

    return (
        <div className="header">
            <div className={optionClasses}>
                <img src={cartoon} onClick={() => {
                    if (header.SelectionRoot && header.SelectionMode !== "Taxa") {
                        dispatch(cartoonNode(header.SelectionRoot))
                    }
                }
                } />
                <p>Cartoon</p>
            </div>
            <div className={optionClasses}>
                <img src={collapse} onClick={() => {
                    if (header.SelectionRoot && header.SelectionMode !== "Taxa") {
                        dispatch(collapseNode(header.SelectionRoot))
                    }
                }} />
                <p>Collapse</p>
            </div>
            <div className={optionClasses}>
                <img src={rooting} onClick={() => {
                    if (header.SelectionRoot && header.SelectionMode !== "Taxa") {
                        tree.reroot({id:header.SelectionRoot},0.5)
                    }
                }} />
                <p>Reroot</p>
            </div>
            <div className={optionClasses}>
                <img src={rotatePic} onClick={() => {
                    if (header.SelectionRoot) {
                        if (header.SelectionMode === "Node") {
                           tree.rotate( {id:header.SelectionRoot},false )

                        } else if (header.SelectionMode === "Clade") {
                            tree.rotate( {id:header.SelectionRoot},true )
                        }
                    }

                }} />
                <p>Rotate</p>
            </div>
            <div className={optionClasses}>
                <img src={annotate} />
                <p>Annotate</p>
            </div>
            <div className={optionClasses}>
                <label>
                <img src={colour} />
                <input style={{display:"none"}} type='color' onChange={(e)=>{
                    const customColor=e.target.value;
                     if (header.SelectionRoot) {
                        if (header.SelectionMode === "Node") {
                            dispatch(colorNode({ id: header.SelectionRoot, colour: customColor }))

                        } else if (header.SelectionMode === "Clade") {
                            const colours = [];
                            for(const node of tree.getPostorderNodes(tree.getNode(header.SelectionRoot))){
                                colours.push({id:node.id,colour:customColor})
                            }
                            dispatch(colorClade(colours))
                        } else if (header.SelectionMode ==="Taxa"){
                            const colours = [];
                            for(const node of tree.getTips(tree.getNode(header.SelectionRoot))){
                                colours.push({id:node.id,colour:customColor})
                            }

                            dispatch(colourTaxa(colours))
                        }
                    }
                }}/>
                </label>
               
                <p>Colour</p>
            </div>
            <div className={optionClasses}>
                
            <label>
                <img src={highlight} />
                <input style={{display:"none"}} type='color' onChange={(e)=>{
                    const customColor=e.target.value;
                     if (header.SelectionRoot) {
                        if (header.SelectionMode === "Node" || header.SelectionMode==="Clade") {
                            dispatch(hiLightNode({ id: header.SelectionRoot, colour: customColor }))
                        } 
                    }
                }}/>
                </label>  
                <p>Highlight</p>
            </div>
            <div className="tool">
                <img src={find} />
                <p>Find</p>
            </div>

            <div className="tool">
                <div className="selectionOptions">
                    <div className='optionContainer'>
                        <div className={`selectionOption ${header.SelectionMode === "Node" ? "selected" : ''}`} onClick={() => dispatch(setSelectionMode("Node"))}>
                            <p>Node</p>
                        </div>
                        <div className={`selectionOption ${header.SelectionMode === "Clade" ? "selected" : ''}`} onClick={() => dispatch(setSelectionMode("Clade"))} >
                            <p>Clade</p>
                        </div>
                        <div className={`selectionOption ${header.SelectionMode === "Taxa" ? "selected" : ''}`} onClick={() => dispatch(setSelectionMode("Taxa"))} >
                            <p>Taxa</p>
                        </div>
                    </div>
                </div>
                <p className="selectionLabel">Selection Mode</p>
            </div>
            <div className="pushInput" />

            <div className="tool">
                <div className="selectionOptions">
                    <div className='optionContainer'>
                        <div className={`selectionOption ${previoustreeAvaliable?"":"deactivated"}`} onClick={()=>{if(previoustreeAvaliable){tree.getPreviousTree()}}}>
                            <div className="arrow left" />
                        </div>
                        <div className={`selectionOption ${nextTreeAvaliable?"":"deactivated"}`} onClick={()=>{if(nextTreeAvaliable){tree.getNextTree()}}}>
                            <div className="arrow right" />

                        </div>
                    </div>
                </div>
                <p className="selectionLabel">Prev/Next</p>
            </div>
            <div className="pushInput" />

            <div className="filterer">
                <input type="text" placeholder="Filter" />

            </div>
        </div>


    )
}