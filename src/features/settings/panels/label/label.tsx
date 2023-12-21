import React from "react";
import { labelActions, labelTarget, selectLabelState } from "./labelSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SettingPanel } from "../PanelHeader";
import { tree } from "../../../../app/store";

const defaultOptions = ["Fixed","User selection","Node Heights","Branch lengths"]

export function BaseLabel(props: { target: labelTarget,defaultOptions:string[], }) {

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectLabelState(props.target))

    //duplicate code
    const attributeTypes = tree.getCurrentIndex()>-1?tree.getAnnotations():[];
    //TODO add defaults like height/length/ etc.
    const attributeKeys = [...defaultOptions,...props.defaultOptions, ...Object.keys(attributeTypes)] 

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }
    const formats = []
    for (const key of ["Decimal", "Scientific", "Percent", "Roman"]) {
        formats.push(<option key={key} value={key}>{key}</option>)
    }
    const { setDisplay, setColourBy, setFormat, setSigDigs, setFontSize } = labelActions[props.target]

    return (
        <div>
            <div>
            <label htmlFor='display'>Display: </label>

                <select name="display" id="display" onChange={e => dispatch(setDisplay(e.target.value))} value={settings.display} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
            <label htmlFor='colourBy'>Colour By:</label>

                <select name="colourBy" id="colourBy" onChange={e => dispatch(setColourBy(e.target.value))} value={settings.colourBy} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
            <label htmlFor='fontSize'>Font Size: </label>

                <input name="fontSize" id="fontSize" min={1} type="number" value={settings.fontSize} onChange={e => dispatch(setFontSize(e.target.value))}  disabled={!settings.activated}/>
            </div>
            <div>
            <label htmlFor='format'>Format: </label>

                <select name="format" id="format" onChange={e => dispatch(setFormat(e.target.value))} value={settings.format} disabled={!settings.activated}>
                    {formats}
                </select>
            </div>
            <div>
            <label htmlFor='sigDigits'>Sig. Digits: </label>
                <input name="sigDigits" id="sigDigits" type="number" value={settings.sigDigs} min={2} onChange={e => dispatch(setSigDigs(e.target.value))} disabled={!settings.activated} />
            </div>
        </div>
    )

}

export function Labels(props:{target:labelTarget,defaultOptions:string[]}){

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectLabelState(props.target))
    const flipActivated = labelActions[props.target].flipActivated
    return (
        <SettingPanel title={`${props.target[0].toLocaleUpperCase()+props.target.slice(1)} Label`} checkable={true} onClick={()=>dispatch(flipActivated(false))} checked={settings.activated}>
            <BaseLabel target={props.target} defaultOptions={props.defaultOptions} />
        </SettingPanel>
    )
}
