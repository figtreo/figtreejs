import layoutReducer from './panels/layout/layout-slice';
import appearanceReducer from './panels/appearance/appearance-slice';
import { combineReducers } from '@reduxjs/toolkit';
import timeScaleSlice from './panels/time/time-scale-slice';
import { tipLabelReducer, nodeLabelReducer, branchLabelReducer } from './panels/label/label-slice';
import { nodeBackgroundReducer, tipBackgroundReducer, tipShapeReducer ,nodeShapeReducer} from './panels/shapes/shape-slice';
import axisReducer from './panels/axis/axis-slice'
import titleReducer from './panels/title/title-slice'
import { tanglegramReducer } from './panels/tanglegram/tangle-slice';

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
    axis:axisReducer,
    tanglegram:tanglegramReducer
    
});

export default settingsReducer;
//TODO make all the settings. 