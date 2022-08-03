import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './Home/slice';

const customerReducer = {
  homeReducer,
};

const store = configureStore({
  reducer: customerReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type CustomerState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
