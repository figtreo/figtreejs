import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import treeReducer from '../features/Tree/treeSlice';
import settingReducer from '../features/settings/settingsSlice';
export const store = configureStore({
  reducer: {
    tree: treeReducer,
    settings: settingReducer
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

