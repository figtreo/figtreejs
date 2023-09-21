export default function NodeLabel(props){
    const {attrs,text,node,vertex,aligned} = props;
    const {alignmentBaseline,textAnchor,rotation} = vertex.nodeLabel;
    const {x,y} = aligned &&  vertex.nodeLabel.alignedPos ? vertex.nodeLabel.alignedPos:vertex.nodeLabel;
    // radial layout do not provide an aligned Position
    return (
        <g>
        <text alignmentBaseline={alignmentBaseline} textAnchor={textAnchor}   transform={`translate(${x},${y}) rotate(${rotation})`} {...attrs}>{text(node)}</text>
        {aligned &&  vertex.nodeLabel.alignedPos ?<path strokeWidth={1} stroke='grey' stroke-dasharray="2" d={`M${vertex.x} ${vertex.y}L${x} ${y}`}/>:null}
        </g>
    )
}
NodeLabel.defaultProps={
    attrs:(v)=>v.textLabel,
    text:(v)=>v.id,
    css:'',

};

