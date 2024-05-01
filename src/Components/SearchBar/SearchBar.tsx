import { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch, useSelector } from "react-redux";
import { GrPowerReset } from "react-icons/gr";
import { resetSearch, updateSearch } from "../../Store/Reducers/searchReducer";
import {
  fillAvailableIngredientsOnly,
  fillAvailableRegimesOnly,
  fillAvailableTypesOnly,
  filterByIngredient,
  filterByTime,
  timeList
} from "../../Services/searchBarFunctions";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import { Input } from "../ui/input";
import Dropdown from "../ui/Dropdown";

const SearchBar = () => {
  const screenSize = useScreenSize()
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.search);
  const auth = useSelector((state: RootState) => state.auth);
  const recipe = useSelector((state: RootState) => state.recipe);
  const [visibleMobile, setVisibleMobile] = useState(false);

  useEffect(() => {
    if (
      (!search.regime || search.regime?.length === 0) &&
      (!search.type || search.type?.length === 0) &&
      (!search.time) &&
      (!search.ingredient || search.ingredient?.length === 0) &&
      !search.boxMine && !search.boxFavorites &&
      search.keyword === ""
    ) {
      dispatch(updateSearch({ isSearch: false }))
      dispatch(updateRecipe({ filteredRecipes: recipe.recipes }))
      return
    }

    if (recipe.recipes.length === 0) return

    let tempRecipes = recipe.recipes;

    if (search.boxFavorites) {
      tempRecipes = tempRecipes.filter((recipe) =>
        recipe.savedByUsers.some(
          (element: RestrictedUser) => element.id === auth.userConnected?.id
        )
      );
    }
    if (search.boxMine) {
      tempRecipes = tempRecipes.filter(
        (recipe) => recipe.postedByUser.id === auth.userConnected?.id
      );
    }

    if (search.regime && search.regime?.length > 0) {
      const regimeSet: Set<number> = new Set();
      search.regime.forEach((regime) => regimeSet.add(regime.id))
      tempRecipes = tempRecipes.filter((recipe) => regimeSet.has(recipe.regime.id));
    }

    if (search.type && search.type?.length > 0) {
      const typeSet: Set<number> = new Set();
      search.type.forEach((type) => typeSet.add(type.id))
      tempRecipes = tempRecipes.filter((recipe) => typeSet.has(recipe.type.id));
    }

    if (search.keyword.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.keyword.toLowerCase())
      );
    }
    if (search.ingredient && search.ingredient?.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) => filterByIngredient(recipe.ingredients));
    }
    if (search.time) {
      tempRecipes = tempRecipes.filter((recipe) => filterByTime(recipe.time));
    }

    dispatch(updateSearch({ isSearch: true }))
    dispatch(updateRecipe({ filteredRecipes: tempRecipes }))
  }, [
    search.regime, search.type, search.keyword, search.time, search.ingredient,
    search.boxFavorites, search.boxMine, recipe.recipes
  ]);

  return (
    <div className="searchbar flex flex-col items-center mt-8 gap-2 desktop:flex-row desktop:mt-12">
      <div
        className="flex items-center cursor-pointer font-bold bg-white border border-search rounded-md p-4 mx-auto desktop:hidden"
        onClick={() => setVisibleMobile(!visibleMobile)}
      >
        <div className="pi pi-sliders-h mr-2"></div>
        Filtrer
      </div>
      <div className={`
        flex justify-center flex-col gap-4 px-4 transition-300 relative rounded-xl 
        desktop:shadow-searchbar mx-auto desktop:gap-6 desktop:px-6 desktop:py-4 desktop:bg-white 
        ${visibleMobile || screenSize.width > 1100 ? "visible-transition" : "hidden-transition"}
      `}>
        <div className="flex flex-col justify-evenly gap-4 desktop:flex-row desktop:gap-8">
          <Input
            placeholder="Tomates farcies, ..."
            value={search.keyword}
            onChange={(e) => dispatch(updateSearch({ keyword: e.target.value }))}
            className="w-44 border-0 border-b rounded-none"
          ></Input>
          <MultiSelect
            showClear
            value={search.regime}
            onChange={(e) => dispatch(updateSearch({ regime: e.value }))}
            options={fillAvailableRegimesOnly()}
            placeholder="Régime alimentaire"
            maxSelectedLabels={2}
            selectedItemsLabel={search.regime?.length + " éléments choisis"}
          ></MultiSelect>
          <MultiSelect
            showClear
            value={search.type}
            onChange={(e) => dispatch(updateSearch({ type: e.value }))}
            options={fillAvailableTypesOnly()}
            placeholder="Type de plat"
          ></MultiSelect>
          <Dropdown
            // showClear
            onChange={(e) => dispatch(updateSearch({ time: e }))}
            items={timeList}
            placeholder="Temps"
            className="w-44 border-0 border-b rounded-none"
          ></Dropdown>
          <MultiSelect
            showClear
            value={search.ingredient}
            onChange={(e) => dispatch(updateSearch({ ingredient: e.value }))}
            options={fillAvailableIngredientsOnly()}
            optionLabel="name"
            filter
            placeholder="Ingrédient"
            maxSelectedLabels={2}
            selectedItemsLabel={search.ingredient?.length + " éléments choisis"}
          ></MultiSelect>
        </div>
        <div className="w-full flex flex-col items-start gap-4 desktop:h-6 desktop:flex-row">
          <div className="flex items-center">
            <Input
              type="checkbox"
              onChange={(e) => dispatch(updateSearch({ boxMine: e.target.checked }))}
              checked={search.boxMine}
              className="size-4 accent-orange"
            ></Input>
            <span className="mr-4 ml-1 text-sm">Mes recettes</span>
          </div>
          <div className="flex items-center">
            <Input
              type="checkbox"
              onChange={(e) => dispatch(updateSearch({ boxFavorites: e.target.checked }))}
              checked={search.boxFavorites}
              className="size-4 accent-orange"
            ></Input>
            <span className="mr-4 ml-1 text-sm">Mes favoris</span>
          </div>
          {search.isSearch &&
            <GrPowerReset
              className="reset ml-4 cursor-pointer text-orange self-center size-8 desktop:size-6"
              onClick={() => {
                dispatch(resetSearch())
              }}
            ></GrPowerReset>
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
