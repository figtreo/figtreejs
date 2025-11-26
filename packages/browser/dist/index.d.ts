import * as Core from '@figtreejs/core';
import { FigtreeProps } from '@figtreejs/core';

export declare function figtree(options: FigTreeOptions): void;

declare interface FigTreeOptions extends FigtreeProps {
    svg: SVGSVGElement;
}

export declare function figtreeStatic(options: FigtreeProps): string;

declare type FT = typeof Core & {
    figtree: typeof figtree;
    figtreeStatic: typeof figtreeStatic;
};

export declare const ft: FT;


export * from "@figtreejs/core";

export { }
