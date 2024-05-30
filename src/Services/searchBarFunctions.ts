import { store } from "../Store/store";

export const timeList: TimeList[] = [
  {
    code: "rapide",
    label: "Rapide (< 30 minutes)",
  },
  {
    code: "moyen",
    label: "Moyen (30 minutes à 1h)",
  },
  {
    code: "long",
    label: "Un peu long (1h à 1h30)",
  },
  {
    code: "infini",
    label: "Long (> 1h30)",
  },
];

export const filterByIngredient = (recipeIngredients: Ingredient[]) => {
  const search = store.getState().search;
  const recipeIngredientsSet: Set<string> = new Set();
  recipeIngredients.forEach((ing) => recipeIngredientsSet.add(ing.label));

  for (const ingredient of search.ingredient || []) {
    if (!recipeIngredientsSet.has(ingredient.name)) return false;
  }
  return true;
};

export const filterByTime = (recipeTime: string) => {
  const search = store.getState().search;
  const splittedTime = recipeTime.split(":");
  const minutes = 60 * Number(splittedTime[0]) + Number(splittedTime[1]);
  switch (search.time?.code) {
    case "rapide":
      return minutes <= 30;
    case "moyen":
      return minutes > 30;
    case "long":
      return minutes <= 90;
    case "infini":
      return minutes > 90;
    default:
      return false;
  }
};

export const fillAvailableTypesOnly = (): Type[] => {
  const secondaryTables = store.getState().secondaryTables;
  const recipes = store.getState().recipe.recipes;

  const typesSet = new Set();
  recipes.forEach((recipe) => typesSet.add(recipe.type.id));

  return secondaryTables?.types?.filter((type) => typesSet.has(type.id)) || [];
};

export const fillAvailableRegimesOnly = (): Regime[] => {
  const secondaryTables = store.getState().secondaryTables;
  const recipes = store.getState().recipe.recipes;

  const regimesSet = new Set();
  recipes.forEach((recipe) => regimesSet.add(recipe.regime.id));

  return (
    secondaryTables?.regimes?.filter((type) => regimesSet.has(type.id)) || []
  );
};

export const fillAvailableIngredientsOnly = (): IngredientData[] => {
  const secondaryTables = store.getState().secondaryTables;
  const recipes = store.getState().recipe.recipes;

  const ingredientsSet = new Set();
  recipes.forEach((recipe) =>
    recipe.ingredients.forEach((ingredient) =>
      ingredientsSet.add(ingredient.label)
    )
  );

  return (
    secondaryTables?.ingData?.filter((ing) => ingredientsSet.has(ing.name)) ||
    []
  );
};
