import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import { MultiSelect } from "primereact/multiselect";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { GrPowerReset } from "react-icons/gr";
import { Checkbox } from "primereact/checkbox";

interface Props {
  startData: Array<Recipe>
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Array<Recipe>>>,
  className?: string
}

interface TimeList {
  code: string,
  label: string
}

const SearchBar = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);
  const auth = useSelector((state: RootState) => state.auth);
  const [reset, setReset] = useState(false);
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [regime, setRegime] = useState<Regime[] | null>(null);
  const [type, setType] = useState<Type[] | null>(null);
  const [keyword, setKeyword] = useState("");
  const [time, setTime] = useState<TimeList | null>(null);
  const [ingredient, setIngredient] = useState<IngredientData[] | null>(null);
  const [boxFavorites, setBoxFavorites] = useState(false);
  const [boxMine, setBoxMine] = useState(false);

  useEffect(() => {
    let tempRecipes = props.startData;
    if (boxFavorites) {
      tempRecipes = tempRecipes.filter((recipe) =>
        recipe.savedByUsers.some(
          (element: RestrictedUser) => element.id === auth.userConnected?.id
        )
      );
    }
    if (boxMine) {
      tempRecipes = tempRecipes.filter(
        (recipe) => recipe.postedByUser.id === auth.userConnected?.id
      );
    }
    if (regime && regime?.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) =>
        regime.some((reg) => reg.id === recipe.regime.id)
      );
    }
    if (type && type?.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) =>
        type.some((typ) => typ.id === recipe.type.id)
      );
    }
    if (keyword.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    if (ingredient && ingredient?.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) =>
        filterByIngredient(recipe, ingredient)
      );
    }
    if (time) {
      tempRecipes = tempRecipes.filter((recipe) => filterByTime(recipe, time));
    }

    if (
      (!regime || regime?.length === 0) &&
      (!type || type?.length === 0) &&
      (!time) &&
      (!ingredient || ingredient?.length === 0) &&
      !boxMine && !boxFavorites &&
      keyword === ""
    ) {
      setReset(false)
      props.setFilteredRecipes(props.startData);
    } else {
      setReset(true)
      props.setFilteredRecipes(tempRecipes);
    }
    // eslint-disable-next-line
  }, [regime, type, keyword, time, ingredient, boxFavorites, boxMine, props.startData]);

  const timeList: TimeList[] = [
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

  const filterByIngredient = (recipe: Recipe, ingredients: IngredientData[]) => {
    let isIn = true;
    ingredients.forEach((ingredient) => {
      if (!recipe.ingredients.some((ing) => ing.label === ingredient.name)) {
        isIn = false;
      }
    });
    return isIn;
  };

  const filterByTime = (recipe: Recipe, time: TimeList) => {
    const splittedTime = recipe.time.split(":");
    const hours = Number(splittedTime[0]);
    const minutes = Number(splittedTime[1]);
    switch (time.code) {
      case "rapide":
        return hours === 0 && minutes <= 30;
      case "moyen":
        return hours === 0 && minutes > 30;
      case "long":
        return hours === 1 && minutes <= 30;
      case "infini":
        return (hours === 1 && minutes > 30) || hours > 1;
      default:
        return false;
    }
  };

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
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          ></InputText>
          <MultiSelect
            showClear
            value={regime}
            onChange={(e) => {
              setRegime(e.value);
            }}
            options={secondaryTables?.regimes?.filter((regime) =>
              props.startData?.some((recipe) => recipe.regime.id === regime.id)
            )}
            placeholder="Régime alimentaire"
            maxSelectedLabels={2}
            selectedItemsLabel={regime?.length + " éléments choisis"}
          ></MultiSelect>
          <MultiSelect
            showClear
            value={type}
            onChange={(e) => {
              setType(e.value);
            }}
            options={secondaryTables?.types?.filter((type) =>
              props.startData?.some((recipe) => recipe.type.id === type.id)
            )}
            placeholder="Type de plat"
          ></MultiSelect>
          <Dropdown
            showClear
            value={time}
            onChange={(e) => {
              setTime(e.value);
            }}
            options={timeList}
            placeholder="Temps"
          ></Dropdown>
          <MultiSelect
            showClear
            value={ingredient}
            onChange={(e) => {
              setIngredient(e.value);
            }}
            options={secondaryTables.ingData || []}
            optionLabel="name"
            filter
            placeholder="Ingrédient"
            maxSelectedLabels={2}
            selectedItemsLabel={ingredient?.length + " éléments choisis"}
          ></MultiSelect>
        </div>
        <div className="searchbar_container__bottom">
          <div>
            <Checkbox
              onChange={(e) => setBoxMine(e.checked ?? false)}
              checked={boxMine}
            ></Checkbox>
            <span>Mes recettes</span>
          </div>
          <div>
            <Checkbox
              onChange={(e) => setBoxFavorites(e.checked ?? false)}
              checked={boxFavorites}
            ></Checkbox>
            <span>Mes favoris</span>
          </div>
          {reset &&
            <GrPowerReset
              className="reset"
              onClick={() => {
                setKeyword("")
                setRegime(null)
                setIngredient(null)
                setTime(null)
                setType(null)
                setBoxMine(false)
                setBoxFavorites(false)
              }}
            ></GrPowerReset>
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
