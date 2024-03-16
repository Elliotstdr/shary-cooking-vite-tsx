import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useIntersectionObserver } from "../../Hooks/useIntersectionObserver.hook";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import RecipeCardBottom from "./RecipeCardBottom";
import RecipeCardTop from "./RecipeCardTop";
import RecipeCardMiddle from "./RecipeCardMiddle";

interface Props {
  recipeItem: Recipe,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  className?: string
}

const RecipeCard = (props: Props) => {
  const [intersectionRef, isVisibleIntersection] = useIntersectionObserver()
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const [visibleDetail, setVisibleDetail] = useState(false);

  const shoppingAction = () => {
    if (recipe.shopping) {
      if (
        recipe.chosenRecipes.length === 0 ||
        !recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        )
      ) {
        dispatch(updateRecipe({
          chosenRecipes: [...recipe.chosenRecipes, props.recipeItem],
        }));
      } else {
        dispatch(updateRecipe({
          chosenRecipes: recipe.chosenRecipes.filter(
            (recipe) => recipe.id !== props.recipeItem.id
          ),
        }));
      }
    }
  };

  const isSelected = () => {
    return recipe.chosenRecipes?.length > 0 &&
      recipe.chosenRecipes.some((recipe) => recipe.id === props.recipeItem.id)
  }

  return (
    <div
      className={`laptop:min-h-[95%] rounded-s-md mb-8 w-80 cardHover ${props.className} ${isSelected() && "border-card-green border-solid border-4 relative"}`}
      onClick={() => {
        shoppingAction();
      }}
      ref={intersectionRef}
    >
      {recipe.chosenRecipes?.length > 0 &&
        recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        ) && (
          <BsFillCheckCircleFill className="absolute-centering size-20 text-card-green"></BsFillCheckCircleFill>
        )}
      <RecipeCardTop
        isVisibleIntersection={isVisibleIntersection}
        recipeItem={props.recipeItem}
        setVisibleDetail={setVisibleDetail}
      ></RecipeCardTop>
      <RecipeCardMiddle
        isVisibleIntersection={isVisibleIntersection}
        recipeItem={props.recipeItem}
        setVisibleDetail={setVisibleDetail}
      ></RecipeCardMiddle>
      <RecipeCardBottom
        recipeItem={props.recipeItem}
        setFilteredRecipes={props.setFilteredRecipes}
        visibleDetail={visibleDetail}
        setVisibleDetail={setVisibleDetail}
      ></RecipeCardBottom>
    </div>
  );
};

export default RecipeCard;
