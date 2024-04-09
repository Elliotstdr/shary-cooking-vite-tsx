export const regimeTooltips = [
  "Contient tout type de nourriture",
  "Régime sans viande ni poisson mais avec des produits d'origine animale",
  "Régime végétarien à l'exception des produits de la mer",
  "Régime sans viande, poisson ou produits d'origine animale",
];

export const checkSteps = (steps: Step[]) => {
  let response = undefined;
  steps.forEach((step) => {
    if (step.description === "") {
      response = `L'étape ${step.stepIndex} est vide, veuillez la supprimer`;
    }
  });
  return response;
};

export const checkIngredients = (ingredients: FormIngredient[]) => {
  let response = undefined;
  ingredients.forEach((ing) => {
    if (
      ing.label === "" ||
      ing.quantity === "0" ||
      ing.quantity === "" ||
      ing.quantity === undefined ||
      !ing.unit
    ) {
      response = "Un ou plusieurs ingrédient n'est pas correctement rempli";
    }
  });
  return response;
};

export const getLastId = (ingredientArray: FormIngredient[]) => {
  if (!ingredientArray) return null;
  let sortedList = [...ingredientArray]
  sortedList = sortedList.sort((a, b) => {
    if (a.id === undefined && b.id === undefined) { return 0 }
    if (a.id === undefined) { return 1 }
    if (b.id === undefined) { return -1 }
    return b.id - a.id;
  })
  return sortedList[0].id ? sortedList[0].id + 1 : null
}