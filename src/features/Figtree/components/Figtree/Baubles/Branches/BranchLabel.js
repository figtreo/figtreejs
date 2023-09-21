export default function BranchLabel(props){
    const {attrs,text,node,vertex} = props;
    const {alignmentBaseline,textAnchor,rotation,x,y} = vertex.branch.label;
    
    return (
        <g>
        <text alignmentBaseline={alignmentBaseline} textAnchor={textAnchor}   transform={`translate(${x},${y}) rotate(${rotation})`} {...attrs}>{text(node)}</text>
        </g>
    )
}
