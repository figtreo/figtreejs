import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectAppearance, setColourBy, setLineWidth, setMinWidth, setWidthBy, setColour } from './appearanceSlice';
import { SettingPanel } from '../PanelHeader';
import { selectTree } from '../../../../app/store';
export function Appearance() {
    const { colourBy,
        lineWidth,
        widthBy,
        minWidth,
        colour
    } = useAppSelector(selectAppearance)
    const tree = useAppSelector(selectTree);

    const attributeTypes = tree.getCurrentIndex()>-1?tree.getAnnotations():[];
    const attributeKeys = Object.keys(attributeTypes).length > 0 ? ["User selection", ...Object.keys(attributeTypes)] : ["User selection"]

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }

    const dispatch = useAppDispatch();


    return (
        <SettingPanel title="Appearance">
            <div>
                <label htmlFor='colourBy'>Colour By:</label>
                <select name="colourBy" id="colourBy" onChange={e => dispatch(setColourBy(e.target.value))} value={colourBy}>
                    {options}
                </select>
            </div>

            <div>
                <label htmlFor='colour'>Colour:</label>
                <input name="colour" id="colour" type="color" onChange={e => dispatch(setColour(e.target.value))} value={colour}/>

            </div>
            <div>
                <label htmlFor='width'>Line Width</label>
                <input name="width" id="width" type="number" value={lineWidth} onChange={e => dispatch(setLineWidth(parseFloat(e.target.value)))} />
            </div>
            <div>
                <label htmlFor='widthBy'>Width By:</label>
                <select name="widthBy" id="widthBy" onChange={e => dispatch(setWidthBy(e.target.value))} value={widthBy}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='minWidth'>Min Width</label>
                <input name="minWidth" id="minWidth" type="number" value={minWidth} onChange={e => dispatch(setMinWidth(e.target.value))} />
            </div>
        </SettingPanel>
    )

}