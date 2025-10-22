import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SettingPanel } from "../PanelHeader";
import { selectColorableAttributes } from "../colorScales/colourSlice";
import { flipActivated, selectTanglegram, setAlpha, setColor, setColorBy, setWidth } from "./tangleSlice";
const defaultOptions = ["Fixed","User selection",]




export function Tangle(){
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectTanglegram);

    const attributes = useAppSelector(selectColorableAttributes) //todo this is only for the tips
    const attributeKeys = [...defaultOptions, ...attributes] 

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }
        return (
    
    <SettingPanel title="Tanglegram" checkable={true} onClick={() => dispatch(flipActivated())} checked={settings.activated}>
        <div>
            <p>Connections: </p>
                <label htmlFor='colourBy'>Colour By:</label>
                <select name="colourBy" id="colourBy" onChange={e => dispatch(setColorBy(e.target.value))} value={settings.colorBy} disabled={!settings.activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='colour'> Colour: </label>
                <input name="colour" id="colour"  type="color" value={settings.colour} onChange={e => dispatch(setColor(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='width'>Width: </label>

                <input name="width" id="width" min={0} type="number" value={settings.width} onChange={e => dispatch(setWidth(parseFloat(e.target.value)))} disabled={!settings.activated} />
            </div>
            <div>
                <label htmlFor='alpha'> Alpha: </label>
                <input name="alpha" id="alpha"  type="number" value={settings.alpha} onChange={e => dispatch(setAlpha(parseFloat(e.target.value)))} disabled={!settings.activated} />
            </div>

    </SettingPanel>)
}