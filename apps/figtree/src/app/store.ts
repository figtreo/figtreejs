import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import treeReducer from '../features/tree/tree-slice';
import settingReducer from '../features/Settings/settings-slice';
import headerReducer from '../features/header/header-slice';
import colorScaleReducer from '../features/Settings/panels/color/colour-slice'
import undoable from 'redux-undo';



export const store = configureStore({
  reducer: {
    tree: undoable(treeReducer,{limit:10}), // Don't think I need tree in the state here.
    settings: settingReducer,
    header:headerReducer,
    colorScales:colorScaleReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

