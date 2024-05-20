import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RecipeState = {
  savedForm: null,
  recipes: [],
  filteredRecipes: null
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    updateRecipe: (state, action: PayloadAction<Partial<RecipeState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeRecipeInRecipes: (state, action: PayloadAction<Recipe>) => {
      return {
        ...state,
        recipes: [...state.recipes].filter((x) => x.id !== action.payload.id),
      };
    },
    editRecipeInRecipes: (state, action: PayloadAction<Recipe>) => {
      return {
        ...state,
        recipes: [...state.recipes].map((x) => {
          return x.id === action.payload.id ? action.payload : x
        })
      };
    },
  }
})

export const {
  updateRecipe,
  removeRecipeInRecipes,
  editRecipeInRecipes,
} = recipeSlice.actions
export default recipeSlice.reducer;
