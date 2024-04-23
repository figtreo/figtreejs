import React from "react";
import { ImmutableTree } from "../Evo/Tree";
import { Vertices } from "../Layouts/LayoutInterface";
import { Tree } from "../Evo/Tree/Tree.types";


export const InteractionStateContext = React.createContext(false);
export const InteractionDispatchContext = React.createContext(false);


export const DataContext = React.createContext<{x:number,y:number}[]>([{x:1,y:1},{x:3,y:3}]);
export const TreeContext = React.createContext<Tree>( ImmutableTree.fromNewick('(A:1,B:1,(C:1,D:1):1)F;'));
export const LayoutContext = React.createContext<Vertices>({
    vertices:[],
    type: "Rectangular"
});
export type scaleContextType= {width:number,height:number,domain:[number,number],maxR?:number,theta?:[number,number],padding:number}
//Do we need this context? We could caclulte it from the tree and we already have that.
export const ScaleContext = React.createContext<scaleContextType>({width:0,height:0,domain:[0,0],padding:0})
export const AnimationContext = React.createContext<boolean>(false);