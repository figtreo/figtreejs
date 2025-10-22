import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SettingPanel } from "../PanelHeader";
import { flipActivated, selectTitle, setColor, setFontSize, setFontWeight, setText, setX, setY } from "./titleSlice";

export function Title(){
    const dispatch = useAppDispatch();
    const {text,fontSize,x,y,color,activated,fontWeight} = useAppSelector(selectTitle);


    return(
        <SettingPanel title="Title" checkable={true} onClick={() => dispatch(flipActivated())} checked={activated} >
            <div>
                <label htmlFor='title'>Title:</label>
                <input name="title" id="title" type="text" value={text} onChange={e => dispatch(setText(e.target.value))} disabled={!activated}/>
            </div>
            <div>
                <label htmlFor='fontSize'>Font Size:</label>
                <input name="fontSize" id="fontSize" type="number" value={fontSize} onChange={e => dispatch(setFontSize(parseFloat(e.target.value)))} disabled={!activated}/>
                <div>
                <label htmlFor='fontWeight'>Font Weight:</label>
                <input name="fontWeight" id="fontWeight" type="number" value={fontWeight} onChange={e => dispatch(setFontWeight(parseFloat(e.target.value)))} disabled={!activated}/>
            </div>
            </div>

            <div>
                <label htmlFor='colour'>Colour:</label>
                <input name="colour" id="colour" type="color" onChange={e => dispatch(setColor(e.target.value))} value={color} disabled={!activated}/>
            </div>
            <div>
                <label htmlFor='x'>x:</label>
                <input type="number" name="x" id="x" onChange={e => dispatch(setX(parseFloat(e.target.value)))} value={x} disabled={!activated}/>
                <label htmlFor='y'>y:</label>
                <input type="number" name="y" id="y" onChange={e => dispatch(setY(parseFloat(e.target.value)))} value={y} disabled={!activated}/>
            </div> 
        </SettingPanel>
    )
}
