import { useSelector } from "react-redux";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import RecipeCard from "../Recipe/RecipeCard";
import { useScreenSize } from "../../Hooks/useScreenSize.hook";
import { useFetchGet } from "../../Hooks/api.hook";

const HomeTopRecipes = () => {
  const screenSize = useScreenSize()
  const auth = useSelector((state: RootState) => state.auth);

  const topRecipes = useFetchGet<Recipe[]>(auth.isConnected ? "/recipes/top/recipes" : "");

  return (
    <div className="bg-white">
      <h1 className="py-12 text-5xl font-dilgante">Les recettes au top !</h1>
      <div className="grid pb-12 grid-cols-home justify-center gap-x-12">
        {topRecipes.data && topRecipes.data.length > 0 ? (
          topRecipes.data
            .map((recipe: Recipe, index) => (
              <RecipeCard
                key={index}
                recipeItem={recipe}
                className="shadow-home"
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