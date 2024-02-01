const INITIAL_STATE: RecipeState = {
  chosenRecipes: [],
  editable: false,
  shopping: false,
  favourite: false,
  savedForm: null
};

export const UPDATE_RECIPE = "UPDATE_RECIPE";

const recipeReducer = (state = INITIAL_STATE, action: any): RecipeState => {
  switch (action.type) {
    case UPDATE_RECIPE: {
      return {
        ...state,
        ...action.value,
      };
    }
    default:
      return state;
  }
};

export default recipeReducer;
