import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectAppearance, setColourBy, setLineWidth, setMinWidth, setWidthBy } from './appearanceSlice';
import { selectAnnotationTypes } from '../../../Tree/treeSlice';
import { SettingPanel } from '../PanelHeader';
export function Appearance(){
    const { colourBy,
        lineWidth,
        widthBy,
        minWidth,
    } = useAppSelector(selectAppearance)
    const attributeTypes = useAppSelector(selectAnnotationTypes);
    const attributeKeys = Object.keys(attributeTypes).length>0?["Selection",...Object.keys(attributeTypes)]:["No attributes"]
    
    const options = []
    for(const key of attributeKeys){
        options.push(<option key={key} value={key}>{key}</option>)
    }
    
    const dispatch = useAppDispatch();


    return (
        <SettingPanel title="Appearance">
            <div>
                <select  name="colourBy" id="colourBy" onChange={e=>dispatch(setColourBy(e.target.value))} value = {colourBy}>
                    {options}
                </select>
                <label htmlFor='colourBy'>Colour By:</label>
            </div>
            <div>
                <input name="width" id="width" type="number" value={lineWidth} onChange={e=>dispatch(setLineWidth(e.target.value))} />
                <label htmlFor='width'>Line Width</label>
            </div>
            <div>
            <select  name="widthBy" id="widthBy" onChange={e=>dispatch(setWidthBy(e.target.value))} value = {widthBy}>
                    {options}
                </select>
                <label htmlFor='widthBy'>Width By:</label>
            </div>
            <div>
                <input name="minWidth" id="minWidth" type="number" value={minWidth} onChange={e=>dispatch(setMinWidth(e.target.value))} />
                <label htmlFor='minWidth'>Min Width</label>
            </div>
        </SettingPanel>
    )

}