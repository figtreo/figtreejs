import { NodeRef, tipIterator } from "../../../Evo/Tree";
import React from "react";
import { NodesHOC } from "../../Baubles/Nodes/Nodes";
import {arc as arcgen} from "d3-shape"
import { useFigtreeStore } from "../../../store";
const arc = arcgen();

function CladeHighlight(props:{attrs:{[key:string]:any},node:NodeRef}){

    const {attrs,node} = props;
    const tree = useFigtreeStore(state=>state.tree);
    const layout = useFigtreeStore(state=>state.layout);   
    const x = useFigtreeStore(state=>state.scaleX);   
    const y = useFigtreeStore(state=>state.scaleY); 
    
    const v = layout(node);
    if(v.layoutClass==="Rectangular"){
        const minX = tree.getParent(node)? (x(layout(node).x) +x(layout(tree.getParent(node)!).x))/2:0;
        let maxX = x(v.maxX);
        let maxY=y(v.maxY);
        let minY = y(v.minY);
        
        const width = maxX-minX+5; //padding
        const height = maxY-minY;

        return (<rect {...attrs} height={height+2*5} width={width} x={minX} y={minY-5} />)
    }else if(v.layoutClass==="Polar"){
        throw new Error("Highlight not implemented for polar layout")

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