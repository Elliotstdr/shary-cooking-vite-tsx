import Loader from "../../../Components/ui/Loader/loader";
import RecipeCard from "../../../Components/RecipeCard/RecipeCard";
import { Key, useEffect, useState } from "react";
import { useFetchGet } from "../../../Hooks/api.hook";
import { useSelector } from "react-redux";

const TopRecipes = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipeUrl, setRecipeUrl] = useState("");

  const recipesData = useFetchGet<Recipe[]>(recipeUrl);

  useEffect(() => {
    if (auth.isConnected) {
      setRecipeUrl("/recipes");
    }
  }, [auth.isConnected]);

  useEffect(() => {
    recipesData.loaded && recipesData.data && setRecipes(recipesData.data)
    // eslint-disable-next-line
  }, [recipesData.loaded])

  return (
    <div className=" bg-white">
      <h1 className="font-dilgante font-bold m-0 px-0 py-12 text-5xl leading-20">Les recettes au top !</h1>
      <div className=" pb-12 grid justify-center gap-x-12 gap-y-0 grid-cols-home">
        {recipes.length > 0 ? (
          recipes
            .sort(
              (a: Recipe, b: Recipe) => b.savedByUsers.length - a.savedByUsers.length
            )
            .slice(0, 3)
            .map((recipe: Recipe, index: Key) => (
              <RecipeCard
                key={index}
                recipeItem={recipe}
                setFilteredRecipes={setRecipes}
                className="shadow-home"
              ></RecipeCard>
            ))
        ) : (
          <Loader></Loader>
        )}
      </div>
    </div>
  );
};

export default TopRecipes;