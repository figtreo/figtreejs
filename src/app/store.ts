import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import treeReducer from '../features/Tree/treeSlice';
import layoutReducer from '../features/settings/layout/layoutSlice';
import appearnceReducer from '../features/settings/appearance/appearanceSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tree: treeReducer,
    layout: layoutReducer,
    appearance: appearnceReducer,
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
