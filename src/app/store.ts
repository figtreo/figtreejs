import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import treeReducer from '../features/Tree/treeSlice';
import settingReducer from '../features/settings/settingsSlice';
import headerReducer from '../features/Header/headerSlice';
export const store = configureStore({
  reducer: {
    tree: treeReducer,
    settings: settingReducer,
    header:headerReducer
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

