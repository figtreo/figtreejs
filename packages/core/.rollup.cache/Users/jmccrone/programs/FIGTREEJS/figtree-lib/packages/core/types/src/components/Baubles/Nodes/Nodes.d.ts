import React from "react";
declare function NodeLabels(props: any): React.JSX.Element;
declare const Nodes: {
    Circle: (props: any) => React.JSX.Element;
    Coalescent: (props: any) => React.JSX.Element;
    AnimatedCircleNodes: (props: any) => React.JSX.Element;
    Rectangle: (props: any) => React.JSX.Element;
    Label: typeof NodeLabels;
};
export default Nodes;
