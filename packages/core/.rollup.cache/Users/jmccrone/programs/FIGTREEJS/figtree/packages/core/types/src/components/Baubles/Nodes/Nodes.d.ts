import React from "react";
import { NodeProps } from "./Node.types";
export declare function NodesHOC(ShapeComponent: React.ComponentType<any>): (props: NodeProps) => React.JSX.Element;
declare function NodeLabels(props: any): React.JSX.Element;
declare const Nodes: {
    Circle: (props: NodeProps) => React.JSX.Element;
    Coalescent: (props: NodeProps) => React.JSX.Element;
    Rectangle: (props: NodeProps) => React.JSX.Element;
    Label: typeof NodeLabels;
};
export default Nodes;
