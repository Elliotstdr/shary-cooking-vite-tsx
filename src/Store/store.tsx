import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";
import secondaryTablesReducer from "./Reducers/secondaryTablesReducer";
import recipeReducer from "./Reducers/recipeReducer";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Reducers/searchReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  recipe: recipeReducer,
  secondaryTables: secondaryTablesReducer,
  search: searchReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
export const persistor = persistStore(store);
