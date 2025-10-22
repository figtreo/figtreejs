import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectLayout, setSpread} from './layoutSlice';

export function RadialOptions() {
    const {  spread } = useAppSelector(selectLayout);
    const dispatch = useAppDispatch();


    return(
    <div className='option range'>
        <label htmlFor="spread">Spread: </label>
        <input id="spread" name="spread" type="number" max="100" min="0" value={spread} onChange={(e)=>dispatch(setSpread(parseFloat(e.target.value)))}/>
    </div>)

}