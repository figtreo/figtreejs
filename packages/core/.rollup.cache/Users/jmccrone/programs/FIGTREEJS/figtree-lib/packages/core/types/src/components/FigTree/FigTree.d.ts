import React from 'react';
import { FigtreeProps } from './Figtree.types';
/**
 * The FigTree component
 * This takes a tree and layout options. It calls the layout and handles state for this figure.
 * It also passes it's scales to it's children props as well as the edges to the branches and the nodes to the nodes.
 */
export declare const defaultOpts: FigtreeProps;
declare function FigTree(props: FigtreeProps): React.JSX.Element;
export default FigTree;
