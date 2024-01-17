import layoutReducer from './panels/layout/layoutSlice';
import appearanceReducer from './panels/appearance/appearanceSlice';
import { combineReducers } from '@reduxjs/toolkit';
import timeScaleSlice from './panels/timeScale/timeScaleSlice';
import { tipLabelReducer, nodeLabelReducer, branchLabelReducer } from './panels/label/labelSlice';
import { nodeBackgroundReducer, tipBackgroundReducer, tipShapeReducer ,nodeShapeReducer} from './panels/shapes/shapeSlice';
import axisReducer from './panels/axis/axisSlice'
import titleReducer from './panels/title/titleSlice'

const  settingsReducer = combineReducers({
    layout:layoutReducer,
    appearance:appearanceReducer,
    title:titleReducer,
    timeScale:timeScaleSlice,
    tipLabels:tipLabelReducer,
    nodeLabels:nodeLabelReducer,
    branchLabels:branchLabelReducer,
    tipShapes:tipShapeReducer,
    tipBackgroundShapes:tipBackgroundReducer,
    nodeShapes:nodeShapeReducer,
    nodeBackgroundShapes:nodeBackgroundReducer,
    axis:axisReducer
    
});

export default settingsReducer;
//TODO make all the settings. 