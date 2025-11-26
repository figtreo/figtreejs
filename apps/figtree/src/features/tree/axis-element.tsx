import { Axis, AxisBars, layoutClass } from "@figtreejs/core"
import { useAppSelector } from "../../app/hooks"
import { selectAxis } from "../Settings/panels/axis/axis-slice"
import { getNumericalFormatter } from "./labels/label-utils"
import { selectLayout } from "../Settings/panels/layout/layout-slice"

export default function AxisElement(props:any) {

    const axisSettings = useAppSelector(selectAxis)
    const {layout} = useAppSelector(selectLayout)
    const ticks = {number:axisSettings.ticks,
                style:{fontSize:axisSettings.fontSize},
                format:getNumericalFormatter(axisSettings.format,axisSettings.sigDigs)
    }
    
    if(axisSettings.activated && layout!==layoutClass.Radial){
        return(
        <Axis reverse={axisSettings.reverseAxis} offsetBy={axisSettings.originValue}  scaleBy = {axisSettings.scaleBy} strokeWidth={axisSettings.lineWeight} ticks={ticks} title={{text:axisSettings.title,style:{fontSize:axisSettings.fontSize+6},padding:45   }} {...props}>
            {axisSettings.showGrid?<AxisBars key="bars"/>:undefined}
        </Axis>
            )
    }else{
        return null;
    }

}