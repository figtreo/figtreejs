import { shapeActions, type shapeTarget, selectShapeState } from "./shape-slice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SettingPanel } from "../panel-header";
import { selectColorableAttributes } from "../color/colour-slice";

const defaultOptions = ["Fixed","User selection",]


export function BaseShapes(props: { target: shapeTarget,activated:boolean }) {

    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectShapeState(props.target))
    const {activated} = props;
    //duplicate code

    const attributes = useAppSelector(selectColorableAttributes)
    const attributeKeys = [...defaultOptions, ...attributes] 

    const options = []
    for (const key of attributeKeys) {
        options.push(<option key={key} value={key}>{key}</option>)
    }


    const shapes = []
    if (props.target === "tip") {
        for (const key of ["Circle", "Rectangle"]) {
            shapes.push(<option key={key} value={key}>{key}</option>)
        }
    } else {
        for (const key of ["Circle", "Rectangle", "Swoosh"]) {
            shapes.push(<option key={key} value={key}>{key}</option>)
        }
    }
    const { setShape, setMaxSize, setMinSize, setSizeBy, setColourBy, setColour, setOutlineColour, setOutlineWidth } = shapeActions[props.target]
//TODO interactions
    return (
        <div>
            <div>
                <label htmlFor='display'>Shape: </label>

                <select name="shape" id="shape" onChange={e => dispatch(setShape(e.target.value))} value={settings.shape} disabled={!activated}>
                    {shapes}
                </select>
            </div>
            <div>
                <label htmlFor='maxSize'>Max Size: </label>

                <input name="maxSize" id="maxSize" min={0} type="number" value={settings.maxSize} onChange={e => dispatch(setMaxSize(e.target.value))} disabled={!activated} />
            </div>
            <div>
                <label htmlFor='sizeBy'>Size By:</label>

                <select name="sizeBy" id="sizeBy" onChange={e => dispatch(setSizeBy(e.target.value))} value={settings.sizeBy} disabled={!activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='minSize'>Min Size: </label>

                <input name="minSize" id="minSize" min={0} type="number" value={settings.minSize} onChange={e => dispatch(setMinSize(e.target.value))} disabled={!activated} />
            </div>
            <div>
                <label htmlFor='colourBy'>Colour By:</label>

                <select name="colourBy" id="colourBy" onChange={e => dispatch(setColourBy(e.target.value))} value={settings.colourBy} disabled={!activated}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor='colour'> Colour: </label>

                <input name="colour" id="colour"  type="color" value={settings.colour} onChange={e => dispatch(setColour(e.target.value))} disabled={!activated} />
            </div>
            <div>
                <label htmlFor='outlineWidth'>Outline Width: </label>

                <input name="outlineWidth" id="outlineWidth" min={0} type="number" value={settings.outlineWidth} onChange={e => dispatch(setOutlineWidth(e.target.value))} disabled={!activated} />
            </div>
            <div>
                <label htmlFor='outlineColour'>Outline Colour: </label>

                <input name="outlineColour" id="outlineColour" type="color" value={settings.outlineColour} onChange={e => dispatch(setOutlineColour(e.target.value))} disabled={!activated} />
            </div>
        </div>
    )

}


export function Shapes(props: { target: shapeTarget,background?:boolean }) {
    const dispatch = useAppDispatch();

    const mainTarget = props.target;
    const backgroundTarget = `${props.target}Background` as shapeTarget
    const mainSettings = useAppSelector(selectShapeState(mainTarget))
    const mainFlipActivated = shapeActions[mainTarget].flipActivated
    
    const backgroundSettings = useAppSelector(selectShapeState(backgroundTarget))
    const backgroundFlipActivated = shapeActions[backgroundTarget].flipActivated
    
    return (
        <SettingPanel title={`${mainTarget[0].toLocaleUpperCase() + mainTarget.slice(1)} Shapes`} checkable={true} onClick={() => dispatch(mainFlipActivated(false))} checked={mainSettings.activated}>
            <BaseShapes target={props.target} activated={mainSettings.activated}/>
            {props.background&&
            <SettingPanel title="Background" checkable={true} onClick={() => dispatch(backgroundFlipActivated(false))} checked={backgroundSettings.activated && mainSettings.activated}>
                <BaseShapes target={backgroundTarget} activated={ backgroundSettings.activated && mainSettings.activated}/>

            </SettingPanel>
            }
        </SettingPanel>
    )
}

