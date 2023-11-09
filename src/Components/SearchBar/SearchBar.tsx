import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import { MultiSelect } from "primereact/multiselect";
import { useFetchGet } from "../../Services/api";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { ClassIngredientData, ClassRestrictedUser } from "../../Types/class";
import Loader from "../../Utils/Loader/loader";

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
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas", new ClassIngredientData());
  const usersData = useFetchGet<RestrictedUser[]>("/users", new ClassRestrictedUser());
  const [moreVisible, setMoreVisible] = useState(false);
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [regime, setRegime] = useState<Regime[] | null>(null);
  const [type, setType] = useState<Type[] | null>(null);
  const [user, setUser] = useState<RestrictedUser[] | null>(null);
  const [keyword, setKeyword] = useState("");
  const [time, setTime] = useState<TimeList | null>(null);
  const [ingredient, setIngredient] = useState<IngredientData[] | null>(null);

  useEffect(() => {
    let tempRecipes = props.startData;
    if (user && user?.length > 0) {
      tempRecipes = tempRecipes.filter((recipe) =>
        user.some((user) => user.id === recipe.postedByUser.id)
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
      (!user || user?.length === 0) &&
      (!regime || regime?.length === 0) &&
      (!type || type?.length === 0) &&
      (!time) &&
      (!ingredient || ingredient?.length === 0) &&
      keyword === ""
    ) {
      props.setFilteredRecipes(props.startData);
    } else {
      props.setFilteredRecipes(tempRecipes);
    }
    // eslint-disable-next-line
  }, [user, regime, type, keyword, time, ingredient, props.startData]);

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
    <>
      {usersData.data && ingredientData.data ?
        <div className="searchbar">
          <div
            className="searchbar__mobile"
            onClick={() => setVisibleMobile(!visibleMobile)}
          >
            <div className="pi pi-sliders-h"></div>
            Filtrer
          </div>
          <div className={`searchbar_container ${visibleMobile ? "visible" : "hidden"}`}>
            <div className="filters">
              <div className="group">
                <InputText
                  placeholder="Tomates farcies, ..."
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                ></InputText>
                <MultiSelect
                  showClear
                  value={user}
                  onChange={(e) => {
                    setUser(e.value);
                  }}
                  options={usersData.data.filter((user: RestrictedUser) =>
                    props.startData?.some(
                      (recipe) => recipe.postedByUser.id === user.id
                    )
                  )}
                  optionLabel="name"
                  filter
                  placeholder="Créée par"
                  maxSelectedLabels={2}
                  selectedItemsLabel={user?.length + " éléments choisis"}
                ></MultiSelect>
                <MultiSelect
                  showClear
                  value={regime}
                  onChange={(e) => {
                    setRegime(e.value);
                  }}
                  options={secondaryTables?.regimes?.filter((regime) =>
                    props.startData?.some((recipe) => recipe.regime.id === regime.id)
                  )}
                  optionLabel="label"
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
                  optionLabel="label"
                  placeholder="Type de plat"
                ></MultiSelect>
              </div>
              <div className={`group ${moreVisible}`}>
                <Dropdown
                  showClear
                  value={time}
                  onChange={(e) => {
                    setTime(e.value);
                  }}
                  options={timeList}
                  optionLabel="label"
                  placeholder="Temps"
                ></Dropdown>
                <MultiSelect
                  showClear
                  value={ingredient}
                  onChange={(e) => {
                    setIngredient(e.value);
                  }}
                  options={ingredientData.data}
                  optionLabel="name"
                  filter
                  placeholder="Ingrédient"
                  maxSelectedLabels={2}
                  selectedItemsLabel={ingredient?.length + " éléments choisis"}
                ></MultiSelect>
              </div>
            </div>
            {moreVisible ? (
              <FiMinusCircle
                className="more"
                onClick={() => setMoreVisible(false)}
              ></FiMinusCircle>
            ) : (
              <FiPlusCircle
                className="more"
                onClick={() => setMoreVisible(true)}
              ></FiPlusCircle>
            )}
          </div>
        </div>
        : <Loader></Loader>
      }
    </>
  );
};

export default SearchBar;
