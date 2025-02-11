import { Appearance } from "./panels/appearance/appearance";
import { Labels } from "./panels/label/label";
import { Layout } from "./panels/layout/layout";
import {  Shapes } from "./panels/shapes/shape";
import { Axis } from "./panels/axis/axis"
import { ColourScales } from "./panels/colorScales/colourScale";
import { selectTree, useAppSelector } from "../../app/hooks";
import { selectColorableAttributes } from "./panels/colorScales/colourSlice";
import { Title } from "./panels/title/title";
import { Tangle } from "./panels/tanglegram/tangle";

export function Settings() {
    const colorableAttributes = useAppSelector(selectColorableAttributes)
    const tree = useAppSelector(selectTree);
        return (
        <div className="Settings">
            <Layout />
            <Appearance/>
            <Title/>
            {/* <TimeScale/> */}
            <Labels target='tip' defaultOptions={['Name']}/>
            <Shapes target="tip" background={true} />
            <Labels target='node' defaultOptions={[]}/>
            <Shapes target="node"/>
            <Labels target='branch' defaultOptions={[]}/>
            <Axis />
            {colorableAttributes.length>0&&<ColourScales/>}
            {/* {tree.getTreeCount()>1 && <Tangle/> } */}

        </div>
    )
}