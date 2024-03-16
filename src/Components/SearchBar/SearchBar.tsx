import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import Loader from "../ui/Loader/loader";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";

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
  const screenSize = useScreenSize()
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);
  const [moreVisible, setMoreVisible] = useState(false);
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [regime, setRegime] = useState<Regime[] | null>(null);
  const [type, setType] = useState<Type[] | null>(null);
  const [user, setUser] = useState<RestrictedUser[] | null>(null);
  const [keyword, setKeyword] = useState("");
  const [time, setTime] = useState<TimeList | null>(null);
  const [ingredient, setIngredient] = useState<IngredientData[] | null>(null);

  useEffect(() => {
    screenSize.width > 1100 && setVisibleMobile(true)
    // eslint-disable-next-line
  }, [])

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
      {secondaryTables.users && secondaryTables.ingData ?
        <div className="searchbar mt-8 flex flex-col desktop:mt-12">
          <div
            className="flex items-center cursor-pointer font-bold bg-white rounded-md p-4 mx-auto border-solid border-search border-width desktop:hidden"
            onClick={() => setVisibleMobile(!visibleMobile)}
          >
            <div className="pi pi-sliders-h mr-2"></div>
            Filtrer
          </div>
          <div className={`flex flex-col items-center px-4 py-0 bg-fond transition-all duration-300 ease-in-out desktop:flex-row desktop:items-center desktop:w-[63rem] desktop:p-3 desktop:bg-white rounded-[50px] desktop:mx-auto desktop:shadow-search ${visibleMobile ? "visible-transition" : "hidden-transition"}`}>
            <div className="flex flex-col my-4 desktop:m-0">
              <div className="flex flex-col justify-evenly desktop:my-4 desktop:flex-row">
                <InputText
                  className="my-2 w-48 text-left desktop:my-0 desktop:!mx-4"
                  placeholder="Tomates farcies, ..."
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                ></InputText>
                <MultiSelect
                  className="my-2 w-48 text-left desktop:my-0 desktop:mx-4"
                  showClear
                  value={user}
                  onChange={(e) => {
                    setUser(e.value);
                  }}
                  options={secondaryTables.users.filter((user: RestrictedUser) =>
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
                  className="my-2 w-48 text-left desktop:my-0 desktop:mx-4"
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
                  className="my-2 w-48 text-left desktop:my-0 desktop:mx-4"
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
              <div className={`flex flex-col desktop:my-4 desktop:flex-row ${moreVisible ? "mb-4" : "desktop:hidden"}`}>
                <Dropdown
                  className="my-2 w-48 text-left desktop:my-0 desktop:mx-4"
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
                  className="my-2 w-48 text-left desktop:my-0 desktop:mx-4"
                  showClear
                  value={ingredient}
                  onChange={(e) => {
                    setIngredient(e.value);
                  }}
                  options={secondaryTables.ingData}
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
                className="cursor-pointer text-orange ml-8 size-8"
                onClick={() => setMoreVisible(false)}
              ></FiMinusCircle>
            ) : (
              <FiPlusCircle
                className="cursor-pointer text-orange ml-8 size-8"
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
