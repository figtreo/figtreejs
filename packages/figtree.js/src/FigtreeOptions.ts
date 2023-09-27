import { FigtreeProps } from "@figtreejs/core";

export interface FigTreeOptions extends FigtreeProps {
    svg: SVGSVGElement;
    baubles: React.ReactNode[];
}