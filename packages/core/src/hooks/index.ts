import {useCallback,useContext} from "react";
import {applyInteractions, mapAttrsToProps} from "../baubleHelpers";
import {
    DataContext,
    AnimationContext,
    InteractionDispatchContext,
    InteractionStateContext, LayoutContext,
     TreeContext,
     ScaleContext
} from "../Context/context";

/*
This function takes props which define the attributes of an element and provide information about how to update
those attributes if the element is selected or hovered. There are also options for a tooltip and interaction
object. 
It returns a function that maps data to attributes and updates those attributes if the node is hovered or selected.

It's not clear what dataEntry is here and I think it should be a node ref which can be made from a vertex.
*/

export function useAttributeMappers(props:any,hoverKey="id",selectionKey="id"){
    const { attrs, interactions,tooltip} = props;
    // const {state,dispatch} =useInteractions();
    //This memorizes the functions so they are not made each time - maybe overkill.
    const baseAttrMapper = useCallback(mapAttrsToProps((attrs?attrs:{})), [attrs]);
    const baseInteractionMapper = useCallback(applyInteractions((interactions?interactions:{})), [interactions]);
    // const tooltipMapper = useCallback(mapAttrsToProps((tooltip?tooltip:{})),[tooltip]);

    function attrMapper(dataEntry:any) {
        let attrs = baseAttrMapper(dataEntry);
        return attrs;
    };
    //interactions are separate because they are functions that do not get called immediately
    function interactionMapper(dataEntry:any) {
        let interactions = baseInteractionMapper(dataEntry);
        return interactions;
    }

    // TODO handle interactions her

    //Maps interactions to element. Default hover dispatch etc. 

    // function interactionMapper(dataEntry) {
    //     const optionalInteractions = interactions ? interactions : {};
    //     return {
    //         onMouseEnter: () => {
    //             if ("onMouseEnter" in optionalInteractions) {
    //                 interactions.onMouseEnter(dataEntry);
    //             }
    //             dispatch(hoverAction(dataEntry, hoverKey))
    //         },
    //         onMouseLeave: () => {
    //             if ("onMouseLeave" in optionalInteractions) {
    //                 interactions.onMouseLeave(dataEntry);
    //             }
    //             dispatch({type: "unhover"})
    //         },
    //         onClick: () => {
    //             if ("onClick" in optionalInteractions) {
    //                 console.log("clicked");
    //                 interactions.onClick(dataEntry);
    //             }
    //             // dispatch(select.actionCreator(dataEntry))}
    //         }
    //     };
    // }
    return function shapeProps(dataEntry:any) {
        return {attrs: attrMapper(dataEntry),interactions: interactionMapper(dataEntry)}//,tooltip:tooltipMapper(dataEntry)}
    }

}

export  function useInteractions(){
    const state = useInteractionsState();
    const dispatch = useInteractionsDispatch();
    return {state,dispatch}
}
export function useInteractionsState(){
    return useContext(InteractionStateContext)
}
export function useInteractionsDispatch(){
    return useContext(InteractionDispatchContext)
}

// export  function useScales(){
//     return useContext(ScaleContext)
// }
export function useData(){
    return useContext(DataContext);
}
export function useLayout(){
    return useContext(LayoutContext);
}
export function useTree(){
    return useContext(TreeContext);
}



export function useAnimation(){
    return useContext(AnimationContext);
}
export const useFigtreeContext={layout:useLayout,tree:useTree};

//TODO remove and make this a prop for each axis. 
export function useScale(){
    return useContext(ScaleContext);
}
//Dispatch a hover action are we hovering by id (just this node) or by annotation all nodes with this annotation value?
// function hoverAction(dataEntry,key){
//     const value = key==="id"?dataEntry.id:dataEntry.annotations[key];
//     return {type:"hover",payload:{type:DataType.DISCRETE,key:key,value:value}}
// }

//Should this node be hovered? 
// Assumes a certain structure to the data 
// Todo this could be extracted and made available 
// function hoverPredicate({hovered},dataEntry){
//     if(hovered.key==="id") {
//         return dataEntry.id === hovered.value;
//     }
//     if("annotations" in dataEntry){
//         if(hovered.key in dataEntry.annotations) {
//             return hovered.value===dataEntry.annotations[hovered.key]
//         }
//     }
//     return false;
// }