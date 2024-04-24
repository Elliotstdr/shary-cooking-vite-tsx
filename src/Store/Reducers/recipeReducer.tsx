import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RecipeState = {
  chosenRecipes: [],
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
    removeRecipeInChosenRecipes: (state, action: PayloadAction<Recipe>) => {
      return {
        ...state,
        chosenRecipes: [...state.chosenRecipes].filter((x) => x.id !== action.payload.id),
      };
    },
    addRecipeInChosenRecipes: (state, action: PayloadAction<Recipe>) => {
      return {
        ...state,
        chosenRecipes: [...state.chosenRecipes, action.payload],
      };
    }
  }
})

export const {
  updateRecipe,
  removeRecipeInRecipes,
  editRecipeInRecipes,
  removeRecipeInChosenRecipes,
  addRecipeInChosenRecipes
} = recipeSlice.actions
export default recipeSlice.reducer;
