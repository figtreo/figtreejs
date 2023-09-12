import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setZoom, selectLayout, setCurvature, setExpansion, setFisheye, setRootLength, flipAlignTipLabels } from './layoutSlice';

export function RectangularOptions() {
    const { zoom, expansion, fisheye, curvature, rootLength, alignTipLabels } = useAppSelector(selectLayout);
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
        </div>)

}