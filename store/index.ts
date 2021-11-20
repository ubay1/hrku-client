import { Action, combineReducers, configureStore, Store, ThunkAction } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer, { RootState } from './rootReducer'

import {createWrapper, HYDRATE, MakeStore} from 'next-redux-wrapper';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore: any = (initialState: any, options: any): Store => {
  const stores: Store = configureStore({
    reducer: persistedReducer
  });

  // @ts-ignore
  // if (process.env.NODE_ENV === "development" && module.hot) {
  //   // @ts-ignore
  //   module.hot.accept("./slice", () => {
  //     const newRootReducer = require("./slice").default;
  //     store.replaceReducer(newRootReducer);
  //   });
  // }

  return stores;
};

export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<AppStore>(makeStore);

export const store = configureStore({
    reducer: persistedReducer,
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>