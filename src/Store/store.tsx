import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";
import secondaryTablesReducer from "./Reducers/secondaryTablesReducer";
import recipeReducer from "./Reducers/recipeReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "secondaryTables", "recipe"],
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  recipe: recipeReducer,
  secondaryTables: secondaryTablesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
