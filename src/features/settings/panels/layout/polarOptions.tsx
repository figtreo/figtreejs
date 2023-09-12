import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectLayout, setRootAngle, setAngleRange, flipShowRoot, setRootLength, flipAlignTipLabels } from './layoutSlice';

export function PolarOptions() {
    const { rootAngle, showRoot, rootLength, alignTipLabels } = useAppSelector(selectLayout);
    const dispatch = useAppDispatch();


    return (
        <div>

            <div className='option range'>
                <label htmlFor="rootAngle">Root Angle: </label>

                <input
                    type="range"
                    min="0"
                    max="360"
                    step={1}
                    id="rootAngle"
                    onChange={(e) => dispatch(setRootAngle(parseFloat(e.target.value)))}
                    value={rootAngle}
                />
            </div>

            <div className='option range'>
                <label htmlFor="angleRange">Angle Range: </label>

                <input
                    type="range"
                    min="360"
                    max="0"
                    step={-1}
                    id="angleRange"
                    onChange={(e) => dispatch(setAngleRange(parseFloat(e.target.value)))}
                    value={rootLength}
                />
            </div>
            <div className='option range'>
                <label htmlFor="rootLength">Root Length: </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="rootLength"
                    onChange={(e) => dispatch(setRootLength(parseFloat(e.target.value)))}
                    value={rootLength}
                />
            </div>


            <div style={{ display: "flex" }}>
                <div className='layoutSpacer' />
                <div style={{ flex: "0 0 150px" }}>
                    <input
                        type="checkbox"
                        checked={showRoot}
                        onChange={() => dispatch(flipShowRoot())}
                        id="showRoot"
                    />
                    <label htmlFor='showRoot'>Show Root</label>
                </div>
                <div className='layoutSpacer' />

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
        </div>)

}