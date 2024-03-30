import { useEffect, useRef, useState } from "react";
import RecipeCard from "./RecipeCard/RecipeCard";
import "./RecipeContainer.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useFetchGet } from "../../Hooks/api.hook";
import { Paginator } from "primereact/paginator";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const RecipeContainer = () => {
  const recipesData = useFetchGet<Recipe[]>("/recipes");

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
  }, [recipesData.loaded, recipesData.data]);

  useEffect(() => {
    window.scroll({
      top: -1,
      behavior: "smooth",
    });
  }, [page])

  return (
    <div className="recipeContainer" ref={ref}>
      <SearchBar
        startData={startData}
        setFilteredRecipes={setFilteredRecipes}
      ></SearchBar>
      <div className="recipeContainer_cards">
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
            <span className="noCard">
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
        ></Paginator>
      )}
    </div>
  );
};

export default RecipeContainer;
