import { useAppSelector } from "../../app/hooks";
import { Nodes } from "../Figtree";
import { Vertex } from "../Figtree/components/Figtree/Layouts/LayoutInterface";
import { selectLabelState } from "../settings/panels/label/labelSlice";
import { NodeRef, NormalizedTree } from "./normalizedTree";
import { Node } from "./treeSlice";

export function TipLabels(props: { tree: NormalizedTree }) {
    const tree = props.tree;
    const settings = useAppSelector(selectLabelState("tip"));

    const filter = (n: Node) => tree.getChildCount(n) === 0;


    if (settings.activated) {

        return (
            <Nodes.Label filter={filter} attrs={{fontSize:settings.fontSize,x:(v:Vertex )=>v.x+10,alignmentBaseline:"middle"}} text={(node:NodeRef)=>tree.getName(node)} />

        )

    } else {
        return <g></g>;
    }



}