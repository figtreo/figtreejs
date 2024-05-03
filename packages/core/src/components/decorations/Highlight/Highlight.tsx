import { NodeRef, tipIterator } from "../../../Evo/Tree";
import React from "react";
import { NodesHOC } from "../../Baubles/Nodes/Nodes";
import {arc as arcgen} from "d3-shape"
import { useFigtreeStore, useVertex } from "../../../store/store";
import withAnimation from "../../HOC/withAnimation";
import withNode from "../../HOC/withNode";
const arc = arcgen();

function CladeHighlight(props:any ){

    const {shapeProps,node, padding = 10} = props;
    const scale = useFigtreeStore(state=>state.scale);   
    console.log("Highlight",{...shapeProps(node)})
    console.log("Highlight - node",node);
    const v = useVertex(node);

    const {attrs,interactions} = shapeProps(node);
    if(v.layoutClass==="Rectangular"){
        const {x,y} = scale(v);
        const scaledMax = scale({x:v.maxX,y:v.maxY});
        const scaledMin = scale({x:x,y:v.minY});
        const minX = x - padding; //padding
        let minY = scaledMin.y - padding;
        
        const width = scaledMax.x-minX+ padding*2; //padding
        const height = (scaledMax.y-scaledMin.y)+padding*2 ;

        return (<rect {...attrs} {...interactions} height={height} width={width} x={minX} y={minY} />)
    }else if(v.layoutClass==="Polar"){
        return null //throw new Error("Highlight not implemented for polar layout")

    //     const transform =  `translate(${verticies.origin!.x},${verticies.origin!.y})` 
    //     const scaleContext = useScale();
    //     const scaleR = scaleLinear().domain([0,scaleContext.maxR!]).range([0,verticies.axisLength!])
    //     const minR = tree.getParent(node)? (verticies.vertices[node.number].r! +verticies.vertices[tree.getParent(node)!.number].r!)/2:0;
    //     let maxR = -Infinity;
    //     let maxTheta=-Infinity;
    //     let minTheta = Infinity;
    //     let lastTheta;
    //     let padding = 0;
    //     for(const tip of tipIterator(tree,node)){
    //         const v = verticies.vertices[tip.number];
    //         if(v.r!>maxR) maxR=v.r!;
    //         if(v.y>maxTheta) maxTheta=v.theta!;
    //         if(v.y<minTheta) minTheta=v.theta!;

    //         if(lastTheta && v.theta!>lastTheta){ // TODO account for crossing 0;
    //             padding = (v.theta!-lastTheta)/2;
    //         }
    //         lastTheta=v.theta;
    //     }
    //     // const angleRange =  minTheta>theta![1]+0.1?2*Math.PI-(minTheta-(theta![1]+0.1)):(theta![1]+0.1)-minTheta;
    //     const angleRange =  minTheta>maxTheta?2*Math.PI-(minTheta-(maxTheta)):(maxTheta)-minTheta;

    //     const startAngle = minTheta-padding+Math.PI/2
    //     const endAngle = startAngle+angleRange +(padding*2)

    //     const shape = arc( {
    //         innerRadius:scaleR(minR),
    //         outerRadius:scaleR(maxR+5),
    //         startAngle: startAngle,
    //         endAngle: endAngle
    //     }
    // )!
    // // console.log({startAngle,endAngle,angleRange})
    //     return <path d={shape} {...attrs} transform={transform}/>

    }else{
        return null
    }
}

const Highlight = NodesHOC(CladeHighlight)
export default Highlight;