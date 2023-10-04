import React from "react";
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
import { selectHeader, setSelectionMode } from "./headerSlice";
import { rotate } from "../Tree/treeSlice";
export function Header() {

    const dispatch = useAppDispatch();

    const header = useAppSelector(selectHeader)

    const optionClasses = header.SelectionRoot ? "tool" : "tool gray"
    return (
        <div className="header">
            <div className={optionClasses}>
                <img src={cartoon} />
                <p>Cartoon</p>
            </div>
            <div className={optionClasses}>
                <img src={collapse} />
                <p>Collapse</p>
            </div>
            <div className={optionClasses}>
                <img src={rooting} />
                <p>Reroot</p>
            </div>
            <div className={optionClasses}>
                <img src={rotatePic} onClick={() => {
                    if (header.SelectionRoot) {
                        if (header.SelectionMode === "Node") {
                            dispatch(rotate({ node: header.SelectionRoot, recursive: false }))

                        } else if (header.SelectionMode === "Clade") {
                            dispatch(rotate({ node: header.SelectionRoot, recursive: true }))
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
                <img src={colour} />
                <p>Colour</p>
            </div>
            <div className={optionClasses}>
                <img src={highlight} />
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
                        <div className="selectionOption">
                            <div className="arrow left" />
                        </div>
                        <div className="selectionOption">
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