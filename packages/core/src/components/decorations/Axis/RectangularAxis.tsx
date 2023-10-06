import React from 'react'
import { line } from "d3-shape"
import { mean, quantile, range } from "d3-array"
import { useScale } from "../../../hooks";
import { ScaleContinuousNumeric, scaleLinear } from 'd3-scale';
import { AxisOrientation, AxisProps, AxisScaleContext, defaultAxisProps } from './Axis.types';
import { AxisContext } from './Axis.context';

//TODO do things to scale and allow date as origin not maxD.


export default function Axis(props: AxisProps) {

    const scaleContext = useScale();
    const { direction = defaultAxisProps.direction!, 
        gap = defaultAxisProps.gap!,
        strokeWidth = defaultAxisProps.strokeWidth! } = props;
    
    const ticks = props.ticks?{...defaultAxisProps.ticks!,...props.ticks}:defaultAxisProps.ticks!;
    const title = props.title?{...defaultAxisProps.title!, ...props.ticks}:defaultAxisProps.title!;

    const scale = makeAxisScale(props, scaleContext);

    // scaleSequentialQuantile doesn’t implement tickValues or tickFormat.
    let tickValues: number[];
    if (!scale.ticks) {
        tickValues = range(ticks.number!).map(i => quantile(scale.domain(), i / (ticks.number! - 1))) as number[];
    } else {
        tickValues = scale.ticks(ticks.number);
    }

    const transform = direction === "horizontal" ? `translate(${0},${scaleContext.height + gap})` : `translate(${-1 * gap},${0})`;

    //TODO break this into parts HOC with logic horizontal/ vertical axis ect.
    return (
        <g className={"axis"} transform={transform}>
            {/*This is for Bars*/}
            <AxisContext.Provider value={{ tickValues, gap,scale,direction }}>
                {props.children}
            </AxisContext.Provider>
          

            <path d={getPath(scale, direction)} stroke={"black"} strokeWidth={strokeWidth} />
            <g>
                {tickValues.map((t, i) => {
                    return (
                        <g key={i} transform={`translate(${(direction === "horizontal" ? scale(t) : 0)},${(direction === "horizontal" ? 0 : scale(t))})`}>
                            <line {...getTickLine(ticks.length!, direction)} stroke={"black"} strokeWidth={strokeWidth}/>
                            <text transform={`translate(${(direction === "horizontal" ? 0 : ticks.padding)},${(direction === "horizontal" ? ticks.padding : 0)})`}
                                textAnchor={"middle"} alignmentBaseline={"middle"} {...ticks.style} >{ticks.format!(t)}</text>
                        </g>
                    )
                })}
                {/*TODO sometimes scale doesn't have a range*/}
                <g transform={`translate(${(direction === "horizontal" ? mean(scale.range()) : title.padding)},${(direction === "horizontal" ? title.padding : mean(scale.range()))})`}>
                    <text textAnchor={"middle"}>{title.text}</text>
                </g>
            </g>

        </g>

    )
}
//TODO merge these in instead of overwriting;



function getPath(scale: ScaleContinuousNumeric<number, number, never>, direction: AxisOrientation): string {
    const f = line<[number, number]>().x(d => d[0]).y(d => d[1]);

    switch (direction) {
        case 'horizontal':
            return f(scale.range().map<[number, number]>(d => [d, 0]))!
        case 'vertical':
            return f(scale.range().map<[number, number]>(d => [0, d]))!
        case 'polar':
            throw new Error("Polar not implemented")
        default:
            throw new Error(`Direction ${direction} not implemented`)
    }

}

function getTickLine(length: number, direction: AxisOrientation) {
    if (direction === "horizontal") {
        return { x1: 0, y1: 0, y2: length, x2: 0 }
    } else if (direction === "vertical") {
        return { x1: 0, y1: 0, y2: 0, x2: -1 * length }

    }
}

/**
 * A helper function to make the scale used in the axis. if supplied by props then no modifications are
 * applied.
 * @param props
 * @param contextScales
 * @returns {*}
 */



function makeAxisScale(props: any, { width, height, maxDivergence }: AxisScaleContext) {
    const { reverse = defaultAxisProps.reverse,
        offsetBy = defaultAxisProps.offsetBy,
        scaleBy = defaultAxisProps.scaleBy, 
        scale= defaultAxisProps.scale,
        direction = defaultAxisProps.direction } = props;
        

    const axisScale = (scale === undefined ? (direction === "horizontal" ? scaleLinear().domain([0, maxDivergence]).range([0, width]) : scaleLinear().domain([0, maxDivergence]).range([0, height])) : scale).copy();
    if (scale === undefined) {
        if (reverse) {
            const newMax = axisScale.domain()[0];
            const newMin = axisScale.domain()[0]-axisScale.domain()[1];
            axisScale.domain([newMin,newMax]);
        }
        if (offsetBy !== 0 || scaleBy !== 1) {
            const domain = axisScale.domain().map((d: number) => (d + offsetBy) * scaleBy)
            axisScale.domain(domain);
        }
    }
    return axisScale.nice();

}

