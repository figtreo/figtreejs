import { useAppSelector } from "../../app/hooks";
import { selectShapeState } from "../settings/panels/shapes/shapeSlice";
import { NormalizedTree, Nodes, NodeRef} from "@figtreejs/core";
import { Node } from "./treeSlice";
import { selectHeader } from "../Header/headerSlice";

export function Tips(props: { tree: NormalizedTree }) {
    const tree = props.tree;
    const settings = useAppSelector(selectShapeState("tip"));
    const header = useAppSelector(selectHeader)

    const filter = (n: Node) => tree.getChildCount(n) === 0;


    // check if sizing by an attribute or by a constant
    const radius = settings.maxSize / 2;
    const fill = settings.colourBy==="User Selection"?(n:NodeRef)=>{
        const custom = header.getCustomColor(n.id);
        return custom?custom:settings.colour
    }:settings.colour; //todo add scale
    const stroke = settings.outlineColour;;
    const strokeWidth = settings.outlineWidth;

    
    if(settings.activated){
        if (settings.shape === "Circle") {
            return (
                <Nodes.Circle filter={filter} attrs={{ r: radius, fill, stroke, strokeWidth }} />

            )
        } else if (settings.shape === "Rectangle") {
            return (
                <Nodes.Rectangle filter={filter} attrs={{ width: settings.maxSize, height: settings.maxSize, fill, stroke, strokeWidth }} />
            )
        }
        else{
            throw new Error("Invalid tip shape")
        }
    }else{
        return <g></g>;
    }
    


}