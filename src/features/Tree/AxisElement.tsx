import { Axis, AxisBars } from "@figtreejs/core"
import { useAppSelector } from "../../app/hooks"
import { selectAxis } from "../Settings/panels/axis/axisSlice"
import { getNumericalFormatter } from "./Labels/labelUtils"
import { selectLayout } from "../Settings/panels/layout/layoutSlice"

export default function AxisElement(props:{}) {

    const axisSettings = useAppSelector(selectAxis)
    const {layout} = useAppSelector(selectLayout)
    const ticks = {number:axisSettings.ticks,
                style:{fontSize:axisSettings.fontSize},
                format:getNumericalFormatter(axisSettings.format,axisSettings.sigDigs)
    }
    if(axisSettings.activated && layout!=="equalangle"){
        return(
        <Axis reverse={axisSettings.reverseAxis} offsetBy={axisSettings.originValue} scaleBy = {axisSettings.scaleBy} strokeWidth={axisSettings.lineWeight} ticks={ticks} title={{text:axisSettings.title,style:{fontSize:axisSettings.fontSize+6},padding:45   }}>
            {axisSettings.showGrid?<AxisBars />:undefined}
        </Axis>
            )
    }else{
        return null;
    }

}