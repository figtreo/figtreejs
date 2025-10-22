import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import treeReducer from '../features/Tree/treeSlice';
import settingReducer from '../features/Settings/settingsSlice';
import headerReducer from '../features/Header/headerSlice';
import colorScaleReducer from '../features/Settings/panels/colorScales/colourSlice'
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

