import { NodeRef } from "../../../Tree";
import { useLayout, useScale, useTree } from "../../../hooks";
import React from "react";
import { NodesHOC } from "../../Baubles/Nodes/Nodes";
import {arc as arcgen} from "d3-shape"
import { scaleLinear } from "d3-scale";
const arc = arcgen();

function CladeHighlight(props:{attrs:{[key:string]:any},node:NodeRef}){

    const {attrs,node} = props;

    const tree = useTree();
    const verticies = useLayout();


    if(verticies.type==="Rectangular"){
        const minX = tree.getParent(node)? (verticies.byId[node.id].x +verticies.byId[tree.getParent(node)!.id].x)/2:0;
        let maxX = -Infinity;
        let maxY=-Infinity;
        let minY = Infinity;
        let lastY;
        let padding = 0;
        for(const tip of tree.getTips(node)){
            const v = verticies.byId[tip.id];
            if(v.x>maxX) maxX=v.x;
            if(v.y>maxY) maxY=v.y;
            if(v.y<minY) minY=v.y

            if(lastY){
                padding = (v.y-lastY)/2;
            }
            lastY=v.y;

        }
        const width = maxX-minX+5; //padding
        const height = maxY-minY;

        return (<rect {...attrs} height={height+2*padding} width={width} x={minX} y={minY-padding} />)
    }else if(verticies.type==="Polar"){
        const transform =  `translate(${verticies.origin!.x},${verticies.origin!.y})` 
        const scaleContext = useScale();
        const scaleR = scaleLinear().domain([0,scaleContext.maxR!]).range([0,verticies.axisLength!])
        const minR = tree.getParent(node)? (verticies.byId[node.id].r! +verticies.byId[tree.getParent(node)!.id].r!)/2:0;
        let maxR = -Infinity;
        let maxTheta=-Infinity;
        let minTheta = Infinity;
        let lastTheta;
        let padding = 0;
        for(const tip of tree.getTips(node)){
            const v = verticies.byId[tip.id];
            if(v.r!>maxR) maxR=v.r!;
            if(v.y>maxTheta) maxTheta=v.theta!;
            if(v.y<minTheta) minTheta=v.theta!;

            if(lastTheta && v.theta!>lastTheta){ // TODO account for crossing 0;
                padding = (v.theta!-lastTheta)/2;
            }
            lastTheta=v.theta;
        }
        // const angleRange =  minTheta>theta![1]+0.1?2*Math.PI-(minTheta-(theta![1]+0.1)):(theta![1]+0.1)-minTheta;
        const angleRange =  minTheta>maxTheta?2*Math.PI-(minTheta-(maxTheta)):(maxTheta)-minTheta;

        const startAngle = minTheta-padding+Math.PI/2
        const endAngle = startAngle+angleRange +(padding*2)

        const shape = arc( {
            innerRadius:scaleR(minR),
            outerRadius:scaleR(maxR+5),
            startAngle: startAngle,
            endAngle: endAngle
        }
    )!
    console.log({startAngle,endAngle,angleRange})
        return <path d={shape} {...attrs} transform={transform}/>

    }else{
        return null
    }
}

const Highlight = NodesHOC(CladeHighlight)
export default Highlight;