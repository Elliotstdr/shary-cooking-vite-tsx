import { store } from "../Store/store";

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

  const content: ListContent[] = finalList.map((x) => {
    let elementString = "";
    if (x.unit.label !== "un peu") elementString += x.quantity + " ";
    if (x.unit.label !== "unité") elementString += x.unit.label + " de ";
    elementString += x.label.toLowerCase();

    return {
      name: elementString,
      selected: false,
    };
  });

  return content;
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

export const timeToString = (time: string) => {
  const splittedTime = time.split(":");
  const hours = Number(splittedTime[0]);
  const minutes = Number(splittedTime[1]);

  if (hours === 1) {
    if (minutes === 0) {
      return hours + " heure";
    } else {
      return hours + "h" + minutes;
    }
  } else if (hours > 1) {
    if (minutes === 0) {
      return hours + " heures";
    } else {
      return hours + "h" + minutes;
    }
  } else {
    return minutes + " minutes";
  }
};

/**
 * Retourne une date string au format MM-YYYY
 * @param date
 * @returns string
 */
export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const monthKey = `${newDate.getDate().toString().padStart(2, "0")}-${(
    newDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${newDate.getFullYear()}`;

  return monthKey;
};

export const successToast = (message: string, summary: string = "Succès") => {
  const reduxStore = store.getState();
  reduxStore.auth.toast.show({
    severity: "success",
    summary: `${summary} : `,
    detail: message,
    life: 3000,
  });
};

export const errorToast = (message: string, summary: string = "Erreur") => {
  const reduxStore = store.getState();
  reduxStore.auth.toast.show({
    severity: "error",
    summary: `${summary} : `,
    detail: message,
    life: 3000,
  });
};
