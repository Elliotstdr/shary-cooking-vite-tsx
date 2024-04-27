import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import RecipeCardDetail from "../RecipeCardDetail/RecipeCardDetail";
import { useDispatch, useSelector } from "react-redux";
import SlideIn from "../ui/SlideIn/SlideIn";
import { addRecipeInChosenRecipes, removeRecipeInChosenRecipes } from "../../Store/Reducers/recipeReducer";
import RecipeCardTop from "./components/RecipeCardTop";
import RecipeCardMiddle from "./components/RecipeCardMiddle";
import RecipeCardBottom from "./components/RecipeCardBottom";

interface Props {
  recipeItem: Recipe,
  className?: string
}

const RecipeCard = (props: Props) => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const [visibleDetail, setVisibleDetail] = useState(false);

  const shoppingAction = () => {
    if (window.location.pathname === "/shop") {
      if (
        recipe.chosenRecipes.length === 0 ||
        !recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        )
      ) {
        dispatch(addRecipeInChosenRecipes(props.recipeItem))
      } else {
        dispatch(removeRecipeInChosenRecipes(props.recipeItem))
      }
    }
  };

  const isSelected = () => {
    return window.location.pathname === "/shop" && recipe.chosenRecipes?.length > 0 &&
      recipe.chosenRecipes.some((recipe) => recipe.id === props.recipeItem.id)
  }

  return (
    <div
      className={`laptop:min-h-[95%] rounded-md mb-8 w-80 cardHover ${props.className} ${isSelected() && "border-card-green border-4 relative"}`}
      onClick={() => {
        shoppingAction();
      }}
    >
      {isSelected() && (
        <BsFillCheckCircleFill className="absolute-centering size-20 text-card-green"></BsFillCheckCircleFill>
      )}
      <RecipeCardTop
        setVisibleDetail={setVisibleDetail}
        recipeItem={props.recipeItem}
      ></RecipeCardTop>
      <RecipeCardMiddle
        setVisibleDetail={setVisibleDetail}
        recipeItem={props.recipeItem}
      ></RecipeCardMiddle>
      <RecipeCardBottom
        recipeItem={props.recipeItem}
      ></RecipeCardBottom>
      {visibleDetail && (
        <SlideIn
          setVisible={setVisibleDetail}
          visible={visibleDetail}
          className="!w-11/12 laptop:!w-2/3"
        >
          <RecipeCardDetail
            recipeDetail={props.recipeItem}
          ></RecipeCardDetail>
        </SlideIn>
      )}
    </div>
  );
};

export default RecipeCard;
