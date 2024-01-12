import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectAppearance, setColourBy, setLineWidth, setMinWidth, setWidthBy, setColour } from './appearanceSlice';
import { SettingPanel } from '../PanelHeader';
import { selectTree } from '../../../../app/hooks';
import { selectColorableAttributes } from '../colorScales/colourSlice';
import { AnnotationType } from '@figtreejs/core';
const defaultOptions = ["Fixed","User selection"]


export function Appearance() {
    const { colourBy,
        lineWidth,
        widthBy,
        minWidth,
        colour
    } = useAppSelector(selectAppearance)
    const tree = useAppSelector(selectTree);


    const dispatch = useAppDispatch();
    const attributes = useAppSelector(selectColorableAttributes)
    const continuousAttributes = tree.getCurrentIndex() > -1? tree.getAnnotations().filter(a => tree.getAnnotationType(a) === AnnotationType.CONTINUOUS):[]

    const attributeKeys = [...defaultOptions, ...attributes] 

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }

    const widthOptions = []
    for (const key of continuousAttributes) {
        widthOptions.push(<option key={key} value={key}>{key}</option>)
    }

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
                    {widthOptions}
                </select>
            </div>
            <div>
                <label htmlFor='minWidth'>Min Width</label>
                <input name="minWidth" id="minWidth" type="number" value={minWidth} onChange={e => dispatch(setMinWidth(e.target.value))} />
            </div>
        </SettingPanel>
    )

}