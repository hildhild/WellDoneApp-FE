import { API } from "@/Services/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { homeReducers, themeReducers, userReducers, profileReducers, notificationReducers, projectReducers, groupReducers, userListReducers} from "./reducers";

const reducers = combineReducers({
  api: API.reducer,
  theme: themeReducers,
  home: homeReducers,
  user: userReducers,
  profile: profileReducers,
  userList: userListReducers,
  group: groupReducers,
  notification: notificationReducers,
  project: projectReducers
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["profile", "group", "userList"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export { persistor, store };
