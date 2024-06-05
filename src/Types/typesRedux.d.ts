type RootState = {
  auth: AuthState;
  recipe: RecipeState;
  secondaryTables: SecondaryState;
  search: SearchState;
  shopping: ShoppingState;
};

type AuthState = {
  isConnected: boolean;
  token: string | null;
  userConnected: User | null;
  toast: MutableRefObject<null> | null;
};

type RecipeState = {
  savedForm: any;
  recipes: Recipe[];
  filteredRecipes: Recipe[] | null;
};

type SecondaryState = {
  types: Type[] | null;
  units: Unit[] | null;
  regimes: Regime[] | null;
  ingTypes: IngredientType[] | null;
  ingData: IngredientData[] | null;
};

type SearchState = {
  keyword: string;
  time: TimeList | null;
  type: Type[] | null;
  regime: Regime[] | null;
  ingredient: IngredientData[] | null;
  boxFavorites: boolean;
  boxMine: boolean;
  isSearch: boolean;
};

type ShoppingState = {
  lists: List[];
  defaultProduct: DefaultProduct[];
  selectedList: List | null;
};
