import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RecipeState = {
  chosenRecipes: [],
  editable: false,
  shopping: false,
  favourite: false,
  savedForm: null
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
    }
  }
})

export const { updateRecipe } = recipeSlice.actions
export default recipeSlice.reducer;
