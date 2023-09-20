import { Appearance } from "./panels/appearance/appearance";
import { Labels } from "./panels/label/label";
import { Layout } from "./panels/layout/layout";
import {  Shapes } from "./panels/shapes/shape";
import { TimeScale } from "./panels/timeScale/timeScale";
import { Axis } from "./panels/axis/axis"

export function Settings() {

    return (
        <div className="Settings">
            <Layout />
            <Appearance/>
            <TimeScale/>
            <Labels target='tip' defaultOptions={['Name']}/>
            <Shapes target="tip" />
            <Labels target='node' defaultOptions={[]}/>
            <Shapes target="node"/>
            <Labels target='branch' defaultOptions={[]}/>
            <Axis />
        </div>
    )
}