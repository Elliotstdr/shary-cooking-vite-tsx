import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { GrPowerReset } from "react-icons/gr";
import { Checkbox } from "primereact/checkbox";
import { resetSearch, updateSearch } from "../../Store/Reducers/searchReducer";
import {
  fillAvailableIngredientsOnly,
  fillAvailableRegimesOnly,
  fillAvailableTypesOnly,
  filterByIngredient,
  filterByTime,
  timeList
} from "../../Services/searchBarFunctions";

type Props = {
  startData: Recipe[]
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

const SearchBar = (props: Props) => {
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.search);
  const auth = useSelector((state: RootState) => state.auth);
  const [visibleMobile, setVisibleMobile] = useState(false);

  useEffect(() => {
    let tempRecipes = props.startData;
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

    if (
      (!search.regime || search.regime?.length === 0) &&
      (!search.type || search.type?.length === 0) &&
      (!search.time) &&
      (!search.ingredient || search.ingredient?.length === 0) &&
      !search.boxMine && !search.boxFavorites &&
      search.keyword === ""
    ) {
      dispatch(updateSearch({ isSearch: false }))
      props.setFilteredRecipes(props.startData);
    } else {
      dispatch(updateSearch({ isSearch: true }))
      props.setFilteredRecipes(tempRecipes);
    }
    // eslint-disable-next-line
  }, [
    search.regime, search.type, search.keyword, search.time, search.ingredient,
    search.boxFavorites, search.boxMine, props.startData
  ]);

  return (
    <div className="searchbar">
      <div
        className="searchbar__mobile"
        onClick={() => setVisibleMobile(!visibleMobile)}
      >
        <div className="pi pi-sliders-h"></div>
        Filtrer
      </div>
      <div className={`searchbar_container ${visibleMobile ? "visible" : "hidden"}`}>
        <div className="searchbar_container__top">
          <InputText
            placeholder="Tomates farcies, ..."
            value={search.keyword}
            onChange={(e) => dispatch(updateSearch({ keyword: e.target.value }))}
          ></InputText>
          <MultiSelect
            showClear
            value={search.regime}
            onChange={(e) => dispatch(updateSearch({ regime: e.value }))}
            options={fillAvailableRegimesOnly(props.startData)}
            placeholder="Régime alimentaire"
            maxSelectedLabels={2}
            selectedItemsLabel={search.regime?.length + " éléments choisis"}
          ></MultiSelect>
          <MultiSelect
            showClear
            value={search.type}
            onChange={(e) => dispatch(updateSearch({ type: e.value }))}
            options={fillAvailableTypesOnly(props.startData)}
            placeholder="Type de plat"
          ></MultiSelect>
          <Dropdown
            showClear
            value={search.time}
            onChange={(e) => dispatch(updateSearch({ time: e.value }))}
            options={timeList}
            placeholder="Temps"
          ></Dropdown>
          <MultiSelect
            showClear
            value={search.ingredient}
            onChange={(e) => dispatch(updateSearch({ ingredient: e.value }))}
            options={fillAvailableIngredientsOnly(props.startData)}
            optionLabel="name"
            filter
            placeholder="Ingrédient"
            maxSelectedLabels={2}
            selectedItemsLabel={search.ingredient?.length + " éléments choisis"}
          ></MultiSelect>
        </div>
        <div className="searchbar_container__bottom">
          <div>
            <Checkbox
              onChange={(e) => dispatch(updateSearch({ boxMine: e.checked || false }))}
              checked={search.boxMine}
            ></Checkbox>
            <span>Mes recettes</span>
          </div>
          <div>
            <Checkbox
              onChange={(e) => dispatch(updateSearch({ boxFavorites: e.checked || false }))}
              checked={search.boxFavorites}
            ></Checkbox>
            <span>Mes favoris</span>
          </div>
          {search.isSearch &&
            <GrPowerReset
              className="reset"
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
