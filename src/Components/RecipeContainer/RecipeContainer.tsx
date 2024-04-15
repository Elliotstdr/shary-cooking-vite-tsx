import { useEffect, useRef, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeContainer.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useFetchGet } from "../../Hooks/api.hook";
import { Paginator } from "primereact/paginator";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";

const RecipeContainer = () => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const recipesData = useFetchGet<Recipe[]>("/recipes");
  const screenSize = useScreenSize()
  const dispatch = useDispatch()

  const rows = 12;
  const ref = useRef(null);

  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (recipesData.loaded && recipesData.data) {
      dispatch(updateRecipe({ recipes: recipesData.data }))
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
      <SearchBar></SearchBar>
      <div className="recipeContainer_cards">
        {recipe.filteredRecipes ? (
          recipe.filteredRecipes.length > 0 ? (
            [...recipe.filteredRecipes]
              .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
              .slice(first, first + rows)
              .map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipeItem={recipe}
                ></RecipeCard>
              ))
          ) : (
            <span className="noCard">
              {"Je n'ai aucune recette à vous afficher malheureusement ..."}
            </span>
          )
        ) : (
          <>
            <CardSkeleton></CardSkeleton>
            {screenSize.width > 1310 && <CardSkeleton></CardSkeleton>}
            {screenSize.width >= 720 && <CardSkeleton></CardSkeleton>}
          </>
        )}
      </div>
      {recipe.filteredRecipes && (
        <Paginator
          first={first}
          totalRecords={recipe.filteredRecipes.length}
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
