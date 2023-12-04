import React from "react";
import { BaseBaubleProps } from "..";
declare const Rectangle: (props: any) => React.JSX.Element;
export interface RectangleProps extends BaseBaubleProps {
    attrs: {
        fill: string;
        strokeWidth: number;
        stroke: string;
    };
}
export default Rectangle;
