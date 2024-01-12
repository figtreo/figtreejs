import { useState } from "react";
import { getColorData, useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SettingPanel } from "../PanelHeader";
import { colorScale, schemes, selectColorableAttributes, setScheme } from "./colourSlice";

export function ColourScales() {

    //these are not local but come from the store
    
    const colorableAttributes = useAppSelector(selectColorableAttributes)

    const [attribute, setAttribute] = useState<string>(colorableAttributes[0])
 


    const colorData = useAppSelector(state=>getColorData(state,attribute))
    const options = []
    for (const key of colorableAttributes) {
        options.push(<option key={key} value={key}>{key}</option>)
    }

        return (
        <SettingPanel title="Colour Scales">
            <div>
                <label htmlFor='attribute'>Attribute:</label>
                <select name="attribute" id="attribute" onChange={e => setAttribute(e.target.value)} value={attribute}>
                    {options}
                </select>
            </div>
           <ColorScaleOptions colorData={colorData}/>
        </SettingPanel>
        )
       
}

function ColorScaleOptions(props:{colorData:colorScale}){
    const dispatch = useAppDispatch();
    const {scheme,type,attribute} = props.colorData
    const initialScaleType = schemes.sequential.includes(scheme)?"Sequential":schemes.diverging.includes(scheme)?"Diverging":"Discrete"

    const [scaleType, setScaleType] = useState<string>(initialScaleType)

    let scaleTypeOptions:any[];
    if(type==="discrete"){
        scaleTypeOptions=["Diverging","Sequential","Discrete"].map(key=><option key={key} value={key}>{key}</option>)
    }else{
        scaleTypeOptions=["Diverging","Sequential"].map(key=><option key={key} value={key}>{key}</option>)
    }

    const scaleOptions = scaleType.length>0?schemes[scaleType.toLowerCase() as 'diverging'|'discrete'|'sequential'].map((key:string)=><option key={key} value={key}>{key}</option>):[]

    return(
        <div>

    <div>
    <label htmlFor='type'>Type:</label>
        <select name="type" id="type" onChange={e => {setScaleType(e.target.value);dispatch(setScheme(attribute,schemes[e.target.value.toLowerCase() as 'diverging'|'discrete'|'sequential'][0])) }} value={scaleType}>
            {scaleTypeOptions}
        </select>
    </div>
    <div>
    <label htmlFor='scale'>Scale:</label>
        <select name="scale" id="scale" onChange={e => dispatch(setScheme(attribute,e.target.value))} value={scheme}>
            {scaleOptions}
        </select>
    </div>
    </div>

    )

}
