import { useAppSelector } from "../../app/hooks";
import { Nodes } from "../Figtree";
import { selectShapeState } from "../settings/panels/shapes/shapeSlice";
import { NormalizedTree } from "./normalizedTree";
import { Node } from "./treeSlice";

export function Tips(props: { tree: NormalizedTree }) {
    const tree = props.tree;
    const settings = useAppSelector(selectShapeState("tip"));
    const filter = (n: Node) => tree.getChildCount(n) === 0;


    // check if sizing by an attribute or by a constant
    const radius = settings.maxSize / 2;
    const fill = settings.colour;
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