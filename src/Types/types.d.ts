type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  imageUrl: string;
};

type RestrictedUser = {
  id: number;
  name: string;
  imageUrl: string;
};

type SavedByUsers = {
  userId: number;
  recipeId: number;
};

type Recipe = {
  id: number;
  title: string;
  time: string;
  number: number;
  imageUrl: string;
  createdAt: string;
  type: Type;
  regime: Regime;
  savedByUsers: SavedByUsers[];
  postedByUser: RestrictedUser;
  ingredients: Ingredient[];
  steps: Step[];
  fromHellof: boolean;
};
interface RecipeShopping extends Recipe {
  multiplyer?: number;
}

type Step = {
  id?: number;
  description: string;
  stepIndex: number;
};

type Ingredient = {
  id?: number;
  quantity: number;
  label: string;
  unit: Unit;
};

type Type = {
  id: number;
  label: string;
};

type Regime = {
  id: number;
  label: string;
};

type Unit = {
  id: number;
  label: string;
};

type IngredientType = {
  id: number;
  label: string;
};

type IngredientData = {
  id?: number;
  name: string;
  ingredientTypeId: number;
  frequency: number | null;
};

/**
 * Specific types
 */
type TimeList = {
  code: string;
  label: string;
};

type FormIngredient = {
  id?: number;
  label: string;
  quantity: string | undefined;
  unit: Unit | null;
};

type HFFillRecipe = {
  title: string;
  time: string;
  number: number;
  image: string;
  type: Type;
  regime: Regime;
  steps: Step[];
  ingredients: FormIngredient[];
};

type HFRecipe = {
  id: string;
  imagePath: string;
  name: string;
  prepTime: string;
  ingredients: HFIngredient[];
  steps: HFStep[];
  tags: HFTag[];
  yields: HFYield[];
  averageRating: number;
};

type HFIngredient = {
  id: string;
  name: string;
};

type HFStep = {
  index: number;
  instructions: string;
};

type HFTag = {
  type: string;
};

type HFYield = {
  yields: number;
  ingredients: HFYieldsIngredient[];
};

type HFYieldsIngredient = {
  id: string;
  amount: number | null;
  unit: string;
};

type DefaultProduct = {
  id: number;
  name: string;
  userId: number;
};

type List = {
  id: number;
  name: string;
  userId: number;
  content: ListContent[];
  selectedRecipes: ListRecipes[];
  createdAt: Date;
  updatedAt: Date;
};

type ListContent = {
  name: string;
  selected: boolean;
  fromRecipe: boolean;
};

type ListRecipes = {
  id: number;
  title: string;
};
