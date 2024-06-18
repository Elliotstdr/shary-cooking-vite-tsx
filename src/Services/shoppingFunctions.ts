import { store } from "../Store/store";
import { getIngredientFullName } from "./pluralService";

type ExtendedIngredient = Ingredient & {
  type: string;
};

export const formatShoppingData = (chosenRecipes: RecipeShopping[]) => {
  let ingredientList: Array<Ingredient> = [];

  const tempArray = recipesWithMultipliedQuantity(chosenRecipes);

  tempArray.forEach(
    (recipe: Recipe) =>
      (ingredientList = ingredientList.concat(recipe.ingredients))
  );

  let finalList = groupIngredientsByType(ingredientList);

  if (finalList.length === 0) return [];

  finalList = finalList.sort((a, b) => a.type.localeCompare(b.type));

  return finalList.map((x) => {
    const ingredientFullName = getIngredientFullName(x);

    return {
      name: ingredientFullName.quantity + ingredientFullName.name,
      selected: false,
      fromRecipe: true,
    };
  });
};

const recipesWithMultipliedQuantity = (
  recipes: RecipeShopping[]
): RecipeShopping[] => {
  return recipes.map((recipe: RecipeShopping) => {
    const updatedIngredients = recipe.ingredients.map((element: Ingredient) => {
      const newElement = { ...element };
      newElement.quantity = newElement.quantity * (recipe.multiplyer || 1);

      if (newElement.quantity === 0.99) newElement.quantity = 1;
      return newElement;
    });

    return {
      ...recipe,
      ingredients: updatedIngredients,
    };
  });
};

const groupIngredientsByType = (
  ingredients: Ingredient[]
): ExtendedIngredient[] => {
  const data = store.getState().secondaryTables.ingData;
  const types = store.getState().secondaryTables.ingTypes;

  const typesMap = new Map();
  types?.forEach((x) => typesMap.set(x.id, x.label));

  const finalList: Array<ExtendedIngredient> = [];

  if (!data) return [];

  ingredients.forEach((ingredient) => {
    let isIn = false;
    finalList.forEach((element, index) => {
      if (
        (element.label.toLowerCase() === ingredient.label.toLowerCase() ||
          element.label.toLowerCase() + "s" ===
            ingredient.label.toLowerCase() ||
          element.label.toLowerCase() + "x" ===
            ingredient.label.toLowerCase() ||
          element.label.toLowerCase() ===
            ingredient.label.toLowerCase() + "s" ||
          element.label.toLowerCase() ===
            ingredient.label.toLowerCase() + "x") &&
        element.unit.label === ingredient.unit.label
      ) {
        const updatedElement = { ...element };
        updatedElement.quantity += ingredient.quantity;
        finalList[index] = updatedElement;
        isIn = true;
      }
    });
    if (!isIn) {
      const elementInBase = data.find(
        (element) => element.name === ingredient.label
      );

      const type = elementInBase
        ? typesMap.get(elementInBase.ingredientTypeId)
        : "unknown";
      finalList.push({ ...ingredient, type });
    }
  });

  return finalList;
};
