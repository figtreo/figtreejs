import { BaubleProps, attrType } from "..";
export interface BranchProps extends BaubleProps {
    attrs: {
        fill: attrType;
        stroke: attrType;
        strokeWidth: attrType;
    };
}
