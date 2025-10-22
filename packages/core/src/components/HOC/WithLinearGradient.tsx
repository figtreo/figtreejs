import React from "react";
let counter =1;
/**
 * This is an HOC that creates a linear gradient def and returns this def and the wrapped component with the def
 * applied.
 * @param WrappedContainer
 * @return {function(*): *}
 */
const withLinearGradient = (WrappedContainer:React.ComponentType<any>)=>{
    function WithLinearGradient(props:any){
        // props = {...defaultProps(),...props};
        const {startingX,endingX,staringY,endingY,colorRamper,opacityRamper,n,gradientAttribute,attrs,...restProps} = props;
        const colorStops = [];
        for( let i=0;i<n;i++){
            const style={stopColor:colorRamper(i/(n-1)),stopOpacity:opacityRamper(i/(n-1))};
            colorStops.push( <stop key={i} offset={`${i/(n-1)}`} {...style}/>)
        }
        const idNumber = (counter+=1);
        const newAttrs =attrs?{...attrs,[gradientAttribute]:`url(#grad${idNumber})`}:{[gradientAttribute]:`url(#grad${idNumber})`};
        return(
            <g>
                <defs>
                <linearGradient id={`grad${idNumber}`} x1={startingX} y1={staringY} x2={endingX} y2={endingY}>
                    {colorStops}
                </linearGradient>
            </defs>
                <WrappedContainer {...restProps} attrs={newAttrs} />
            </g>
        )
    }
    return WithLinearGradient;
};
// function defaultProps(){
//     return {
//         startingX:"0%",
//         endingX:"100%",
//         staringY:"0%",
//         endingY:"0%",
//         n:10,
//         colorRamper: (i:number)=>"grey",
//         opacityRamper:(i:number)=>1,
//         gradientAttribute: "fill"
//     }
// }

// function sameGradientProps(prev:{[key:string]:any},curr:{[key:string]:any}){
//     const gradientProps =["startingX","endingX","staringY","endingY","colorRamper","opacityRamper","n","gradientAttribute"];
//     for(const key of gradientProps){
//         if(prev[key]!==curr[key]){
//             return false
//         }
//     }
//     return true

// }

export default withLinearGradient;