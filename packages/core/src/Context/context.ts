import React from "react";
import { NormalizedTree } from "../Tree/normalizedTree/normalizedTree";
import { Vertices } from "../Layouts/LayoutInterface";
import { Tree } from "../Tree/Tree.types";


export const InteractionStateContext = React.createContext(false);
export const InteractionDispatchContext = React.createContext(false);


export const DataContext = React.createContext<{x:number,y:number}[]>([{x:1,y:1},{x:3,y:3}]);
export const TreeContext = React.createContext<Tree>( NormalizedTree.fromNewick('(A:1,B:1,(C:1,D:1):1)F;'));
export const LayoutContext = React.createContext<Vertices>({
    byId: {},
    allIds: []
});

export const AnimationContext = React.createContext<boolean>(false);