import { Axis, AxisBars } from "@figtreejs/core"
import { useAppSelector } from "../../app/hooks"
import { selectAxis } from "../settings/panels/axis/axisSlice"
import { getNumericalFormatter } from "./branchLabels"

export default function AxisElement(props:{}) {

    const axisSettings = useAppSelector(selectAxis)
    const ticks = {number:axisSettings.ticks,
                style:{fontSize:axisSettings.fontSize},
                format:getNumericalFormatter(axisSettings.format,axisSettings.sigDigs)
    }
    if(axisSettings.activated){
        return(
        <Axis reverse={axisSettings.reverseAxis} offsetBy={axisSettings.originValue} scaleBy = {axisSettings.scaleBy} strokeWidth={axisSettings.lineWeight} ticks={ticks}>
            {axisSettings.showGrid?<AxisBars />:undefined}
        </Axis>
            )
    }else{
        return null;
    }

}