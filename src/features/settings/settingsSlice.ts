import layoutReducer from './layout/layoutSlice';
import appearanceReducer from './appearance/appearanceSlice';
import { combineReducers } from '@reduxjs/toolkit';


const  settingsReducer = combineReducers({
    layout:layoutReducer,
    appearance:appearanceReducer
});

export default settingsReducer;
//TODO make all the settings. 