import React from "react";
import './header.css'

import cartoon from "../../figtreeGraphics/CartoonTool.png"
import collapse from "../../figtreeGraphics/CollapseTool.png"
import rooting from "../../figtreeGraphics/rootingTool.png"
import rotate from "../../figtreeGraphics/rotateTool.png"
import annotate from "../../figtreeGraphics/annotationTool.png"
import colour from "../../figtreeGraphics/coloursTool.png"

import find from "../../figtreeGraphics/findTool.png"
import highlight from "../../figtreeGraphics/HilightTool.png"
export function Header() {

    return (
        <div className="header">
            <div className="tool">
                <img src={cartoon} />
                <p>Cartoon</p>
            </div>
            <div className="tool">
                <img src={collapse} />
                <p>Collapse</p>
            </div>
            <div className="tool">
                <img src={rooting} />
                <p>Reroot</p>
            </div>
            <div className="tool">
                <img src={rotate} />
                <p>Rotate</p>
            </div>
            <div className="tool">
                <img src={annotate} />
                <p>Annotate</p>
            </div>
            <div className="tool">
                <img src={colour} />
                <p>Colour</p>
            </div>
            <div className="tool">
                <img src={highlight} />
                <p>Highlight</p>
            </div>
            <div className="tool">
                <img src={find} />
                <p>Find</p>
            </div>

            <div className="tool">
                <div className="selectionOptions">
                    <div className="optionSpacer" />
                    <div className='optionContainer'>
                        <div className="option" >
                            <p>Node</p>
                        </div>
                        <div className="option" >
                            <p>Clade</p>
                        </div>
                        <div className="option" >
                            <p>Taxa</p>
                        </div>
                    </div>
                    <div className="optionSpacer" />
                </div>
                <p>Selection Mode</p>
            </div>
        </div>

    )
}