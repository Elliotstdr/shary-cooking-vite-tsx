import { useEffect, useRef, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import SearchBar from "../SearchBar/SearchBar";
import { useFetchGet } from "../../Hooks/api.hook";
import { Paginator } from "primereact/paginator";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";

const RecipeContainer = () => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const recipesData = useFetchGet<Recipe[]>("/recipes");
  const screenSize = useScreenSize()
  const dispatch = useDispatch()
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  const rows = 12;
  const ref = useRef(null);

  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0)

  useEffect(() => {
    ingredientData.loaded && ingredientData.data &&
      dispatch(updateSecondaryTables({
        ingData: ingredientData.data
      }))
  }, [ingredientData.loaded, ingredientData.data])

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
    <div className={`flex flex-col ${window.location.pathname === "/shop" ? "w-full" : ""}`} ref={ref} id="recipes">
      <SearchBar></SearchBar>
      <div className="grid grid-cols-home justify-center gap-x-12 py-8 px-4 desktop:py-12 desktop:px-32">
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
            <span className="text-xl my-24">
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
          className="!mb-8 !bg-transparent"
        ></Paginator>
      )}
    </div>
  );
};

export default RecipeContainer;
