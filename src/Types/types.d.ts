type User = {
  id: number,
  name: string,
  lastname: string,
  email: string,
  imageUrl: string
}

type RestrictedUser = {
  id: number,
  name: string,
  imageUrl: string
}

type Recipe = {
  id: number,
  title: string,
  time: string,
  number: number,
  imageUrl: string,
  createdAt: string,
  type: Type,
  regime: Regime,
  savedByUsers: RestrictedUser[],
  postedByUser: RestrictedUser,
  ingredients: Ingredient[],
  steps: Steps[],
}
interface RecipeShopping extends Recipe {
  multiplyer?: number
}

type Step = {
  id?: number,
  description: string,
  stepIndex: number
}

type Ingredient = {
  id?: number,
  quantity: number,
  label: string,
  unit: Unit,
}

type Type = {
  id: number,
  label: string
}

type Regime = {
  id: number,
  label: string
}

type Unit = {
  id: number,
  label: string
}

type IngredientType = {
  id: number,
  label: string
}

type IngredientData = {
  id?: number,
  name: string,
  type: Type,
  frequency: number|null
}

/**
 * Specific types
 */
type FormIngredient = {
  id?: number,
  label: string,
  quantity: string | undefined,
  unit: Unit | null,
}