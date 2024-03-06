interface RootState {
  auth: AuthState,
  recipe: RecipeState,
  secondaryTables: SecondaryState
}

interface AuthState {
  isConnected: boolean,
  token: string | null,
  refreshToken: string | null,
  userConnected: User | null,
  toast: MutableRefObject<null> | null
}

interface RecipeState {
  chosenRecipes: Array<Recipe>,
  editable: boolean,
  shopping: boolean,
  favourite: boolean,
  savedForm: any
}

interface SecondaryState {
    types: Array<Type> | null,
    units: Array<Unit> | null,
    regimes: Array<Regime> | null,
    ingTypes: Array<IngredientType> | null,
    ingData: Array<IngredientData> | null,
    users: Array<RestrictedUser> | null
}