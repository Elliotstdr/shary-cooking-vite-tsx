type RootState = {
  auth: AuthState,
  recipe: RecipeState,
  secondaryTables: SecondaryState
}

type AuthState = {
  isConnected: boolean,
  token: string | null,
  refreshToken: string | null,
  userConnected: User | null,
  toast: MutableRefObject<null> | null
}

type RecipeState = {
  chosenRecipes: Recipe[],
  editable: boolean,
  shopping: boolean,
  favourite: boolean,
  savedForm: any
}

type SecondaryState = {
    types: Type[] | null,
    units: Unit[] | null,
    regimes: Regime[] | null,
    ingTypes: IngredientType[] | null,
    ingData: IngredientData[] | null,
    users: RestrictedUser[] | null
}