import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { SettingPanel } from '../panel-header';
import { setScaleBy, setOffset, setScale, setRootAge, selectTimeScale } from './time-scale-slice'

export function TimeScale() {
    const { scaleBy, offset, rootAge, scale } = useAppSelector(selectTimeScale);

    const dispatch = useAppDispatch();


    return (
        <SettingPanel title="Time Scale">
            <div>
                <input type="radio" id="factor" name="factor" value="factor" checked={scaleBy === "factor"}
                    onChange={() => dispatch(setScaleBy("factor"))} />
                <label htmlFor="factor">Scale by factor:</label>

                <div>
                    <label htmlFor='offset'>Offset by:</label>

                    <input
                        id="offset"
                        value={offset.toString()}
                        onChange={(e) => dispatch(setOffset(parseFloat(e.target.value)))}
                        disabled={scaleBy !== "factor"}
                    />
                </div>
                <div>

                    <label htmlFor="scale">Scale By</label>

                    <input
                        id="scale"
                        value={scale.toString()}
                        onChange={(e) => dispatch(setScale(parseFloat(e.target.value)))}
                        disabled={scaleBy !== "factor"}
                    />
                </div>
            </div>
            <div>
                <input type="radio" id="rootAge" name="rootAge" value="rootAge" checked={scaleBy === "rootAge"}
                    onChange={() => dispatch(setScaleBy("rootAge"))} />
                <label htmlFor="factor">Scale root to:</label>

                <div>
                    <label htmlFor='rootAge'>Root age:</label>
                    <input
                       id="rootAge"
                        value={rootAge.toString()}
                        onChange={(e) => dispatch(setRootAge(parseFloat(e.target.value)))}
                        disabled={scaleBy !== "rootAge"}

                    />
                </div>

            </div>
        </SettingPanel>
    )



}