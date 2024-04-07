type RootState = {
  auth: AuthState,
  recipe: RecipeState,
  secondaryTables: SecondaryState,
  search: SearchState
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
  savedForm: any
}

type SecondaryState = {
    types: Type[] | null,
    units: Unit[] | null,
    regimes: Regime[] | null,
    ingTypes: IngredientType[] | null,
    ingData: IngredientData[] | null,
}

type SearchState = {
  keyword: string,
  time: TimeList | null,
  type: Type[] | null,
  regime: Regime[] | null,
  ingredient: IngredientData[] | null,
  boxFavorites: boolean,
  boxMine: boolean,
  isSearch: boolean
}