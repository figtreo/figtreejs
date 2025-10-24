import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {  selectLayout, setCurvature,  setRootLength, flipAlignTipLabels,  flipInvert } from './layoutSlice';

export function RectangularOptions() {
    const { invert, curvature, rootLength, alignTipLabels } = useAppSelector(selectLayout);
    const dispatch = useAppDispatch();


    return (
        <div>
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
            <div className='option range'>
                <label htmlFor="curvature">Curvature</label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="curvature"
                    onChange={(e) => dispatch(setCurvature(parseFloat(e.target.value)))}
                    value={curvature}
                />
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