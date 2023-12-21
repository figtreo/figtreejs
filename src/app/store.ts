import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import treeReducer from '../features/Tree/treeSlice';
import settingReducer from '../features/Settings/settingsSlice';
import headerReducer from '../features/Header/headerSlice';
import { TreeduxList } from '@figtreejs/core';
export const store = configureStore({
  reducer: {
    treeStatus: treeReducer,
    settings: settingReducer,
    header:headerReducer
  },
});


export const tree = new TreeduxList(store,(store)=>store.getState().treeStatus.tree);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

