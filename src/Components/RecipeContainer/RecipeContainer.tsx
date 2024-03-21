import { useEffect, useRef, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import SearchBar from "../SearchBar/SearchBar";
import { useFetchGet } from "../../Hooks/api.hook";
import { Paginator } from "primereact/paginator";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import ShoppingCheckboxes from "./ShoppingCheckboxes";

interface Props {
  checkboxes?: boolean,
  dataToCall: string
}

const RecipeContainer = (props: Props) => {
  const recipesData = useFetchGet<Recipe[]>(props.dataToCall);

  const rows = 12;
  const ref = useRef(null);

  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0)
  const [filteredRecipes, setFilteredRecipes] = useState<Array<Recipe>>([]);
  const [startData, setStartData] = useState<Recipe[]>([]);

  useEffect(() => {
    if (recipesData.loaded && recipesData.data) {
      setFilteredRecipes(recipesData.data);
      setStartData(recipesData.data);
    }
    // eslint-disable-next-line
  }, [recipesData])

  useEffect(() => {
    window.scroll({
      top: -1,
      behavior: "smooth",
    });
  }, [page])

  return (
    <div id="recipes" className={`flex flex-col ${props.checkboxes ? "w-full" : ""}`} ref={ref}>
      {props.checkboxes && recipesData.loaded &&
        <ShoppingCheckboxes
          recipesData={recipesData.data}
          setStartData={setStartData}
        ></ShoppingCheckboxes>
      }
      <SearchBar
        startData={startData}
        setFilteredRecipes={setFilteredRecipes}
      ></SearchBar>
      <div className="py-8 px-4 grid justify-center grid-cols-home gap-x-12 desktop:py-12 desktop:px-32">
        {recipesData.loaded ? (
          filteredRecipes.length > 0 ? (
            filteredRecipes
              .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
              .slice(first, first + rows)
              .map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipeItem={recipe}
                  setFilteredRecipes={setFilteredRecipes}
                ></RecipeCard>
              ))
          ) : (
            <span className="text-xl my-24">
              {window.location.pathname === "/fav"
                ? "Vous n'avez pas encore sélectionné vos recettes préférées !"
                : "Je n'ai aucune recette à vous afficher malheureusement ..."}
            </span>
          )
        ) : (
          <>
            <CardSkeleton></CardSkeleton>
            <CardSkeleton></CardSkeleton>
            <CardSkeleton></CardSkeleton>
          </>
        )}
      </div>
      {filteredRecipes && (
        <Paginator
          first={first}
          totalRecords={filteredRecipes.length}
          rows={rows}
          onPageChange={(e) => {
            setPage(e.page)
            setFirst(e.first);
          }}
          className="mb-8 !bg-transparent"
        ></Paginator>
      )}
    </div>
  );
};

export default RecipeContainer;
