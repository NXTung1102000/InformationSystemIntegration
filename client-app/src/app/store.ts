import loadingSlice from "../component/LoadingAndNotice/loadingSlice";
import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../pages/counter/counterSlice";
import AuthSlice from "../pages/LogIn_Register/AuthSlice";
import CartSlice from "../pages/user/cart/CartSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import noticeSlice from "../component/LoadingAndNotice/noticeSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice),
  cart: persistReducer(cartPersistConfig, CartSlice),
  counter: counterReducer,
  isLoading: loadingSlice,
  notice: noticeSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
