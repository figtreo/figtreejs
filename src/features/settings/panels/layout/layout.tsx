import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectLayout, setCurvature, setExpansion, setFisheye, setLayout, setRootLength, flipAlignTipLabels } from './layoutSlice';
import Collapsible from 'react-collapsible';
import { SettingPanel } from '../PanelHeader';

export function Layout() {
    const { layout, expansion, fisheye, curvature, rootLength, alignTipLabels } = useAppSelector(selectLayout);

    const dispatch = useAppDispatch();

    return (
        <SettingPanel title="Layout" >
        
            <div>


                <div>
                    <input type="radio" id="rectangular" name="layout" value="Rectangular" checked={layout === "rectangular"}
                        onChange={e => dispatch(setLayout("rectangular"))} />
                    <label htmlFor="rectangular">Rectangular</label>
                </div>
                <div>
                    <input type="radio" id="circular" name="layout" value="Circular" checked={layout === "circular"}
                        onChange={e => dispatch(setLayout("circular"))} />
                    <label htmlFor="circular">Circular</label>
                </div>
                <div>
                    <input type="radio" id="equalangle" name="layout" value="EqualAngle" checked={layout === "equalangle"}
                        onChange={e => dispatch(setLayout("equalangle"))} />
                    <label htmlFor="equalangle">Equal Angle</label>
                </div>
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="expansion"
                    onChange={(e) => {console.log("got it");dispatch(setExpansion(parseFloat(e.target.value)))}}
                    value={expansion}
                />
                <label htmlFor="expansion">Expansion</label>
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    id="fisheye" step={0.01}

                    onChange={(e) => dispatch(setFisheye(parseFloat(e.target.value)))}
                    value={fisheye}
                />
                <label htmlFor="fisheye">Fisheye</label>
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="rootLength"
                    onChange={(e) => dispatch(setRootLength(parseFloat(e.target.value)))}
                    value={rootLength}
                />
                <label htmlFor="rootLength">Root Length</label>
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="curvature"
                    onChange={(e) => dispatch(setCurvature(parseFloat(e.target.value)))}
                    value={curvature}
                />
                <label htmlFor="curvature">Curvature</label>
            </div>

            <div>
                <input
                    type="checkbox"
                    checked={alignTipLabels}
                    onChange={() => dispatch(flipAlignTipLabels())}
                    id="alignLabels"
                />
                <label htmlFor='alignlabels'>Align Tip Labels</label>
            </div>
         </SettingPanel>

    )


}