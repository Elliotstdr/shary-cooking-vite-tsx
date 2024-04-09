import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";
import secondaryTablesReducer from "./Reducers/secondaryTablesReducer";
import recipeReducer from "./Reducers/recipeReducer";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Reducers/searchReducer";
import storageSession from "redux-persist/lib/storage/session";

const rootConfig = {
  key: 'root', 
  storage, 
  blacklist: ['recipe', 'search'] 
}

const recipeConfig: PersistConfig<RecipeState> = { 
  key: 'recipe', 
  storage: storageSession,
  blacklist: ['chosenRecipes']

}

const searchConfig: PersistConfig<SearchState> = { 
  key: 'search', 
  storage: storageSession
}

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: persistReducer(recipeConfig, recipeReducer),
  secondaryTables: secondaryTablesReducer,
  search: persistReducer(searchConfig, searchReducer),
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
