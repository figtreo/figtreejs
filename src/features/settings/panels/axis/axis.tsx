import Collapsible from "react-collapsible";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { flipActivated, selectAxis } from "./axisSlice";
import {flipShowGrid,flipShowBoxes,setLineWeight,flipReverseAxis,setLabelSpacing,setTickSpacing,setOriginValue,setFontSize} from "./axisSlice"
import { SettingPanel } from "../PanelHeader";

export function Axis() {

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectAxis);

    return(
    <SettingPanel title="Scale Axis" checkable={true} onClick={()=>dispatch(flipActivated())} checked={settings.activated}>

        <div>
            <div>
                <input id="showGrid" type='checkbox' name="showGrid" checked={settings.showGrid} onClick={e=>dispatch(flipShowGrid())} disabled={!settings.activated}/>
                <label htmlFor="showGrid">Show grid</label>
            </div>
            <div>
                <label htmlFor="lineWeight">Line weight: </label>
                <input id="lineWeight" name="lineWeight" type="number" min={0} value={settings.lineWeight}  onChange={e=>dispatch(setLineWeight(e.target.value))} disabled={!settings.activated}/>
            </div>
            <div>
                <input id="reverseAxis" name="reverseAxis" type='checkbox' checked={settings.reverseAxis} onChange={e=>dispatch(flipReverseAxis())} disabled={!settings.activated}/>
                <label htmlFor="reverseAxis">Reverse axis</label>
            </div>

            <div>
                <label htmlFor="labelSpacing">Label spacing: </label>
                <input id="labelSpacing" name="labelSpacing" type="number" min={0} value={settings.labelSpacing} onChange={e=>dispatch(setLabelSpacing(e.target.value))} disabled={!settings.activated}/>
            </div>
            <div>
                <label htmlFor="tickSpacing">Tick Spacing: </label>
                <input id="tickSpacing" name="tickSpacing" type="number" min={0} value={settings.tickSpacing} onChange={e=>dispatch(setTickSpacing(e.target.value))} disabled={!settings.activated}/>
            </div>
            <div>
                <label htmlFor="originValue">Origin Value: </label>
                <input id="originValue" name="originValue" type="number" min={0} value={settings.originValue} onChange={e=>dispatch(setOriginValue(e.target.value))}disabled={!settings.activated}/>
            </div>
           
            <div>
                <label htmlFor="fontSize">Font size: </label>
                <input id="fontSize" name="fontSize" type="number" min={0} value={settings.fontSize} onChange={e=>dispatch(setFontSize(e.target.value))}disabled={!settings.activated}/>
            </div>
        </div>
    </SettingPanel>


    )

}


