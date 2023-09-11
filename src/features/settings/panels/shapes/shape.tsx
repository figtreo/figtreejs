import React from "react";
import { shapeActions, shapeTarget, selectShapeState } from "./shapeSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectAnnotationTypes } from "../../../Tree/treeSlice";
import { SettingPanel } from "../PanelHeader";
import { Tracing } from "trace_events";

export function BaseShapes(props: { target: shapeTarget, }) {

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectShapeState(props.target))

    //duplicate code
    const attributeTypes = useAppSelector(selectAnnotationTypes);
    //TODO add defaults like height/length/ etc.
    const attributeKeys = Object.keys(attributeTypes).length > 0 ? ["Selection", ...Object.keys(attributeTypes)] : ["No attributes"]

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }
    const shapes = []
    for (const key of ["Circle", "Rectangle", "Swoosh"]) {
        shapes.push(<option key={key} value={key}>{key}</option>)
    }
    const { setShape, setMaxSize, setMinSize, setSizeBy, setColourBy, setFormat, setOutlineColour, setOutlineWidth } = shapeActions[props.target]

    return (
        <div>
            <div>
                <label htmlFor='display'>Shape: </label>

                <select name="shape" id="shape" onChange={e => dispatch(setShape(e.target.value))} value={settings.shape} disabled={!settings.activated}>
                    {shapes}
                </select>
            </div>
            <div>
                <label htmlFor='maxSize'>Max Size: </label>

                <input name="maxSize" id="maxSize" min={0} type="number" value={settings.maxSize} onChange={e => dispatch(setMaxSize(e.target.value))} disabled={!settings.activated}/>
            </div>
            <div>
                <label htmlFor='sizeBy'>Size By:</label>

                <select name="sizeBy" id="sizeBy" onChange={e => dispatch(setSizeBy(e.target.value))} value={settings.sizeBy} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='minSize'>Min Size: </label>

                <input name="minSize" id="minSize" min={0} type="number" value={settings.minSize} onChange={e => dispatch(setMinSize(e.target.value))} disabled={!settings.activated}/>
            </div>
            <div>
                <label htmlFor='colourBy'>Colour By:</label>

                <select name="colourBy" id="colourBy" onChange={e => dispatch(setColourBy(e.target.value))} value={settings.colourBy} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='outlineWidth'>Outline Width: </label>

                <input name="outlineWidth" id="outlineWidth" min={0} type="number" value={settings.outlineWidth} onChange={e => dispatch(setOutlineWidth(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='outlineColour'>Outline Colour: </label>

                <input name="outlineColour" id="outlineColour" value={settings.outlineColour} onChange={e => dispatch(setOutlineColour(e.target.value))} disabled={!settings.activated}/>
            </div>
        </div>
    )

}


export function Shapes(props:{target:shapeTarget}) {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectShapeState(props.target))
    const flipActivated = shapeActions[props.target].flipActivated
    return (
        <SettingPanel title={`${props.target[0].toLocaleUpperCase()+props.target.slice(1)} Shapes`} checkable={true} onClick={()=>dispatch(flipActivated(false))} checked={settings.activated}>
            <BaseShapes target={props.target} />
        </SettingPanel>
    )
}

