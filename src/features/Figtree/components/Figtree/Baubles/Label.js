import { css } from '@emotion/react';

import React from "react";


export default function Label(props){
    const {data,attrs,text} = props;
    console.log(data);
    return <text css={css`${props.css}`} {...attrs(data)}>{text(data)}</text>
}
Label.defaultProps={
    attrs:(v)=>v.textLabel,
    text:(v)=>v.id,
    css:'',

};

