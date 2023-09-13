import react from 'react';
import { linkPolar } from './curve';
import { Vertex } from '../../../layoutFunctions';
import { animated } from '@react-spring/web';
import React from 'react';

// interface Edge{
//     source:Vertex,
//     target:Vertex,
// }
// interface BranchProps{
// 	attrs:{
// 		r:number,
// 		fill:string,
// 		strokeWidth:number,
// 		stroke:string,
// 		[key:string]:any
// 	},
//     curvature?:number,
//     edge:Edge,
// }
const PolarBranchPath = React.memo((props)=>{
    let {edge,curvature:number,attrs,...rest} = props;
    // let path =useSpring({d:branchPathGenerator({x0,y0,x1,y1})});
    
    const linker = linkPolar()
    .angel(d => d.theta )
    .radius(d =>  d.r )
    let path ={d:linker(edge)};
    return(<animated.path {...attrs}  {...path} {...rest} fill={"none"} />)
})
export default PolarBranchPath;