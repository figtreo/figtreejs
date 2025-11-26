import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectLayout, setRootAngle, setAngleRange, flipShowRoot, setRootLength, flipAlignTipLabels, flipInvert, setMinR } from './layout-slice';

const roundPI= 3.14;//inputs can't get to 0
export function PolarOptions() {
    const { rootAngle, showRoot, rootLength, alignTipLabels,angleRange,invert,minR} = useAppSelector(selectLayout);
    const dispatch = useAppDispatch();


    return (
        <div>

            <div className='option range'>
                <label htmlFor="rootAngle">Root Angle: </label>

                <input
                    type="range"
                    min={roundPI} // we start here so the layout matches figtree
                    max={3*roundPI}
                    step={0.02}
                    id="rootAngle"
                    onChange={(e) => dispatch(setRootAngle(parseFloat(e.target.value)))} // starts 
                    value={rootAngle}
                />
            </div>

            <div className='option range'>
                <label htmlFor="angleRange">Angle Range: </label>

                <input
                    type="range"
                    min={0.2}
                    max={2*roundPI}
                    step={0.01}
                    id="angleRange"
                    onChange={(e) => dispatch(setAngleRange(2*roundPI-parseFloat(e.target.value)))} //invert the value
                    value={2*roundPI-angleRange}
                />
            </div>
            <div className='option range'>
                <label htmlFor="minR">Minimum Radius: </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="minR"
                    onChange={(e) => dispatch(setMinR(parseFloat(e.target.value)))}
                    value={minR}
                />
            </div>
            <div className='option range'>
                <label htmlFor="rootLength">Root Length: </label>

                <input
                    type="range"
                    min="0"
                    max="0.5"
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
            <div>
                <input
                    type="checkbox"
                    checked={invert}
                    onChange={() => dispatch(flipInvert())}
                    id="alignLabels"
                />
                <label htmlFor='checkbox'>Invert Layout</label>
            </div>
        </div>)

}