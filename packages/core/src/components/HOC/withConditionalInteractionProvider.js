import React, {useContext,useReducer} from "react";
import {InteractionDispatchContext,InteractionStateContext} from "../../Context/context";
import {useInteractionsState} from "../../hooks";
import interactionReducer, {initialState} from "../../Context/reducers/interactionReducer";

//Why the condition?
export default function withConditionalInteractionProvider(WrappedComponent){

    return function(props){
        const value = useInteractionsState();

        if(value===false){
            const [state,dispatch]=useReducer(interactionReducer,initialState);

            return (
                <InteractionStateContext.Provider value = {state}>
                    <InteractionDispatchContext.Provider value ={dispatch}>
                    <WrappedComponent {...props}/>
                    </InteractionDispatchContext.Provider>
                </InteractionStateContext.Provider>
            )
        }else{
            return <WrappedComponent {...props}/>
        }
    }



}