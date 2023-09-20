import { css } from '@emotion/react';



export default function Label(props){
    const {attrs,text,node,x,y} = props;
    return (
    <g >
        <text x={x} y={y} {...attrs}>{text(node)}</text>
    </g>
    )
}
Label.defaultProps={
    attrs:(v)=>v.textLabel,
    text:(v)=>v.id,
    css:'',

};

