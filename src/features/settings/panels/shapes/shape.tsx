import React from "react";
import { shapeActions, shapeTarget, selectShapeState } from "./shapeSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SettingPanel } from "../PanelHeader";
import { selectTree } from "../../../../app/store";



export function BaseShapes(props: { target: shapeTarget, }) {

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectShapeState(props.target))
    const tree = useAppSelector(selectTree);

    //duplicate code
    const attributeTypes = tree.getCurrentIndex()>-1?tree.getAnnotations():[];
    //TODO add defaults like height/length/ etc.
    const attributeKeys = Object.keys(attributeTypes).length > 0 ? ["Fixed","User selection", ...Object.keys(attributeTypes)] : ["Fixed","User selection"]

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }

    const shapes = []
    if (props.target === "tip") {
        for (const key of ["Circle", "Rectangle"]) {
            shapes.push(<option key={key} value={key}>{key}</option>)
        }
    } else {
        for (const key of ["Circle", "Rectangle", "Swoosh"]) {
            shapes.push(<option key={key} value={key}>{key}</option>)
        }
    }
    const { setShape, setMaxSize, setMinSize, setSizeBy, setColourBy, setColour, setOutlineColour, setOutlineWidth } = shapeActions[props.target]
//TODO interactions
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

                <input name="maxSize" id="maxSize" min={0} type="number" value={settings.maxSize} onChange={e => dispatch(setMaxSize(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='sizeBy'>Size By:</label>

                <select name="sizeBy" id="sizeBy" onChange={e => dispatch(setSizeBy(e.target.value))} value={settings.sizeBy} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='minSize'>Min Size: </label>

                <input name="minSize" id="minSize" min={0} type="number" value={settings.minSize} onChange={e => dispatch(setMinSize(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='colourBy'>Colour By:</label>

                <select name="colourBy" id="colourBy" onChange={e => dispatch(setColourBy(e.target.value))} value={settings.colourBy} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='colour'> Colour: </label>

                <input name="colour" id="colour"  type="color" value={settings.colour} onChange={e => dispatch(setColour(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='outlineWidth'>Outline Width: </label>

                <input name="outlineWidth" id="outlineWidth" min={0} type="number" value={settings.outlineWidth} onChange={e => dispatch(setOutlineWidth(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='outlineColour'>Outline Colour: </label>

                <input name="outlineColour" id="outlineColour" type="color" value={settings.outlineColour} onChange={e => dispatch(setOutlineColour(e.target.value))} disabled={!settings.activated} />
            </div>
        </div>
    )

}


export function Shapes(props: { target: shapeTarget,background?:boolean }) {
    const dispatch = useAppDispatch();

    const mainTarget = props.target;
    const backgroundTarget = `${props.target}Background` as shapeTarget
    const mainSettings = useAppSelector(selectShapeState(mainTarget))
    const mainFlipActivated = shapeActions[mainTarget].flipActivated
    
    const backgroundSettings = useAppSelector(selectShapeState(backgroundTarget))
    const backgroundFlipActivated = shapeActions[backgroundTarget].flipActivated
    
    return (
        <SettingPanel title={`${mainTarget[0].toLocaleUpperCase() + mainTarget.slice(1)} Shapes`} checkable={true} onClick={() => dispatch(mainFlipActivated(false))} checked={mainSettings.activated}>
            <BaseShapes target={props.target} />
            {props.background&&
            <SettingPanel title="Background" checkable={true} onClick={() => dispatch(backgroundFlipActivated(false))} checked={backgroundSettings.activated}>
                <BaseShapes target={backgroundTarget} />
            </SettingPanel>
            }
        </SettingPanel>
    )
}

