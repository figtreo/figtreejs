import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import treeReducer from '../features/Tree/treeSlice';
import settingReducer from '../features/Settings/settingsSlice';
import headerReducer from '../features/Header/headerSlice';
import {  treeSelectorFactory } from '@figtreejs/core';
export const store = configureStore({
  reducer: {
    treeStatus: treeReducer,
    settings: settingReducer,
    header:headerReducer
  },
});

//todo update this selector so we cache the tree instance if the tree data is not changed.
export const selectTree = treeSelectorFactory( store, (state:any)=>state.treeStatus.tree
)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

