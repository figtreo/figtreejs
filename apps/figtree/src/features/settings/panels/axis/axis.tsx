import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { flipActivated, selectAxis, setScale, setTicks, setTitle } from "./axis-slice";
import { flipShowGrid, setFormat,setSigDigs, setLineWeight, flipReverseAxis, setOriginValue, setFontSize } from "./axis-slice"
import { SettingPanel } from "../panel-header";

export function Axis() {

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectAxis);
    const formats = []
    for (const key of ["Decimal", "Scientific", "Percent", "Date"]) {
        formats.push(<option key={key} value={key}>{key}</option>)
    }

    return (
        <SettingPanel title="Scale Axis" checkable={true} onClick={() => dispatch(flipActivated())} checked={settings.activated}>

            <div>
                <div>
                    <input id="showGrid" type='checkbox' name="showGrid" checked={settings.showGrid} onClick={() => dispatch(flipShowGrid())} disabled={!settings.activated} />
                    <label htmlFor="showGrid">Show grid</label>
                </div>
                <div>
                    <label htmlFor="lineWeight">Line weight: </label>
                    <input id="lineWeight" name="lineWeight" type="number" min={0} value={settings.lineWeight} onChange={(e) => dispatch(setLineWeight(e.target.value))} disabled={!settings.activated} />
                </div>
                <div>
                    <input id="reverseAxis" name="reverseAxis" type='checkbox' checked={settings.reverseAxis} onChange={() => dispatch(flipReverseAxis())} disabled={!settings.activated} />
                    <label htmlFor="reverseAxis">Reverse axis</label>
                </div>

                <div>
                    <label htmlFor="ticks">Ticks: </label>
                    <input id="ticks" name="ticks" type="number" min={0} value={settings.ticks} onChange={e => dispatch(setTicks(parseFloat(e.target.value)))} disabled={!settings.activated} />
                </div>
                <div>
                    <label htmlFor="originValue">Origin Value: </label>
                    <input id="originValue" name="originValue" type="number" min={0} value={settings.originValue} onChange={e => dispatch(setOriginValue(parseFloat(e.target.value)))} disabled={!settings.activated} />
                </div>
                <div>
                    <label htmlFor="scaleFactor">Scale Factor: </label>
                    <input id="scaleFactor" name="scaleFactor" type="number" min={0} value={settings.scaleBy} onChange={e => dispatch(setScale(parseFloat(e.target.value)))} disabled={!settings.activated} />
                </div>
                <div>
                    <label htmlFor="fontSize">Font size: </label>
                    <input id="fontSize" name="fontSize" type="number" min={0} value={settings.fontSize} onChange={e => dispatch(setFontSize(parseFloat(e.target.value)))} disabled={!settings.activated} />
                </div>

                <div>
                <label htmlFor='format'>Format: </label>
                <select name="format" id="format" onChange={e => dispatch(setFormat(e.target.value))} value={settings.format} disabled={!settings.activated}>
                    {formats}
                </select>
            </div>
            <div>
                <label htmlFor='sigDigits'>Sig. Digits: </label>
                <input name="sigDigits" id="sigDigits" type="number" value={settings.sigDigs} min={0} onChange={e => dispatch(setSigDigs(e.target.value))} disabled={!settings.activated} />
            </div>
            <div>
                    <label htmlFor="title">Title: </label>
                    <input id="title" name="title" type="text" value={settings.title} onChange={e => dispatch(setTitle(e.target.value))} disabled={!settings.activated} />
                </div>
        </div>
    </SettingPanel >


    )

}


