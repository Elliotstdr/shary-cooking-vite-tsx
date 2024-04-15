import { useSelector } from "react-redux";
import CardSkeleton from "../../../Components/CardSkeleton/CardSkeleton";
import RecipeCard from "../../../Components/RecipeCard/RecipeCard";
import { useScreenSize } from "../../../Hooks/useScreenSize.hook";
import { useFetchGet } from "../../../Hooks/api.hook";

const HomeTopRecipes = () => {
  const screenSize = useScreenSize()
  const auth = useSelector((state: RootState) => state.auth);

  const topRecipes = useFetchGet<Recipe[]>(auth.isConnected ? "/topRecipes/recipes" : "");

  return (
    <div className="top__recipes">
      <h1>Les recettes au top !</h1>
      <div className="top__recipes__recipes">
        {topRecipes.data && topRecipes.data.length > 0 ? (
          topRecipes.data
            .map((recipe: Recipe, index) => (
              <RecipeCard
                key={index}
                recipeItem={recipe}
              ></RecipeCard>
            ))
        ) : (
          <>
            <CardSkeleton></CardSkeleton>
            {screenSize.width > 1055 && <CardSkeleton></CardSkeleton>}
            {screenSize.width > 687 && <CardSkeleton></CardSkeleton>}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeTopRecipes;