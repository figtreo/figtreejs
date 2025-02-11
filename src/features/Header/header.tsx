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
import {  colourTaxa, selectSelectionMode, selectSelectionRoot, setSelectionMode } from "./headerSlice";
import { AnnotationType, postOrderIterator, tipIterator } from "@figtreejs/core";
import { CARTOON_ANNOTATION, COLLAPSE_ANNOTATION, COLOUR_ANNOTATION, HILIGHT_ANNOTATION } from "../../app/constants";
import { selectTree } from '../../app/hooks'
import { setTree } from '../Tree/treeSlice'
export function Header() {

    const dispatch = useAppDispatch();

    const selectionRoot = useAppSelector(selectSelectionRoot)
    const selectionMode = useAppSelector(selectSelectionMode)
    const tree = useAppSelector(selectTree);

    const optionClasses = selectionRoot ? "tool" : "tool deactivated"


    const nextTreeAvaliable = false;// tree.getCurrentIndex() < tree.getTreeCount() - 1;
    const previoustreeAvaliable = false; //tree.getCurrentIndex() > 0;

    return (
        <div className="header">
            <div className={optionClasses}>
                <img src={cartoon} onClick={() => {
                    if (selectionRoot && selectionMode !== "Taxa") {
                        let cartoon:boolean|undefined = tree.getAnnotation(tree.getNode(selectionRoot),CARTOON_ANNOTATION);
                        if(cartoon===undefined){
                            cartoon = true;
                            dispatch(setTree(tree.annotateNode(tree.getNode(selectionRoot),{name:COLLAPSE_ANNOTATION,value:0.25,type:AnnotationType.CONTINUOUS})))
                        }else{
                            cartoon = !cartoon;
                        }
                       dispatch( setTree(tree.annotateNode(tree.getNode(selectionRoot),{name:CARTOON_ANNOTATION,value:cartoon,type:AnnotationType.BOOLEAN})))
                    }
                }
                } />
                <p>Cartoon</p>
            </div>
            <div className={optionClasses}>
                <img src={collapse} onClick={() => {
                    if (selectionRoot && selectionMode !== "Taxa") {
                        let cartoon:boolean|undefined = tree.getAnnotation(tree.getNode(selectionRoot),CARTOON_ANNOTATION);
                        let collapse:number|undefined = tree.getAnnotation(tree.getNode(selectionRoot),COLLAPSE_ANNOTATION);
                        
                        if(collapse===undefined){
                           dispatch( setTree(tree.annotateNode(tree.getNode(selectionRoot),{name:COLLAPSE_ANNOTATION,value:0.25,type:AnnotationType.CONTINUOUS})
                                .annotateNode(tree.getNode(selectionRoot),{name:CARTOON_ANNOTATION,value:true,type:AnnotationType.BOOLEAN})));
                        }else{
                            collapse = collapse!>0.9?0:collapse!+0.25;
                            dispatch(setTree(tree.annotateNode(tree.getNode(selectionRoot),{name:COLLAPSE_ANNOTATION,value:collapse,type:AnnotationType.CONTINUOUS})))
                        }
                    }
                }} />
                <p>Collapse</p>
            </div>
            <div className={optionClasses}>
                <img src={rooting} onClick={() => {
                    if (selectionRoot && selectionMode !== "Taxa") {
                        dispatch(setTree(tree.reroot(tree.getNode(selectionRoot),0.5)))
                    }
                }} />
                <p>Reroot</p>
            </div>
            <div className={optionClasses}>
                <img src={rotatePic} onClick={() => {
                    if (selectionRoot) {
                        if (selectionMode === "Node") {
                           dispatch(setTree(tree.rotate( tree.getNode(selectionRoot),false )))

                        } else if (selectionMode === "Clade") {
                            dispatch(setTree(tree.rotate( tree.getNode(selectionRoot),true )))
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
                     if (selectionRoot) {
                        if (selectionMode === "Node") {
                           dispatch( setTree(tree.annotateNode(tree.getNode(selectionRoot),{name:COLOUR_ANNOTATION,value:customColor,type:AnnotationType.DISCRETE})))

                        } else if (selectionMode === "Clade") {
                            const colours = [];
                            for(const node of postOrderIterator(tree,tree.getNode(selectionRoot))){
                                colours.push({id:node.number,colour:customColor})
                               dispatch( setTree(tree.annotateNode(node,{name:COLOUR_ANNOTATION,value:customColor,type:AnnotationType.DISCRETE})))
                            }
                        } else if (selectionMode ==="Taxa"){
                            const colours = [];
                            for(const node of tipIterator(tree,tree.getNode(selectionRoot))){
                                colours.push({number:node.number,colour:customColor})
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
                     if (selectionRoot) {
                        if (selectionMode === "Node" || selectionMode==="Clade") {
                            dispatch(setTree(tree.annotateNode(tree.getNode(selectionRoot),{name:HILIGHT_ANNOTATION,value:customColor,type:AnnotationType.DISCRETE})))
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
                        <div className={`selectionOption ${selectionMode === "Node" ? "selected" : ''}`} onClick={() => dispatch(setSelectionMode("Node"))}>
                            <p>Node</p>
                        </div>
                        <div className={`selectionOption ${selectionMode === "Clade" ? "selected" : ''}`} onClick={() => dispatch(setSelectionMode("Clade"))} >
                            <p>Clade</p>
                        </div>
                        <div className={`selectionOption ${selectionMode === "Taxa" ? "selected" : ''}`} onClick={() => dispatch(setSelectionMode("Taxa"))} >
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
                        <div className={`selectionOption ${previoustreeAvaliable?"":"deactivated"}`} >{/*onClick={()=>{if(previoustreeAvaliable){tree.getPreviousTree()}}}>*/} 
                            <div className="arrow left" />
                        </div>
                        <div className={`selectionOption ${nextTreeAvaliable?"":"deactivated"}`}  > {/*onClick={()=>{if(nextTreeAvaliable){tree.getNextTree()}}}>*/}
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