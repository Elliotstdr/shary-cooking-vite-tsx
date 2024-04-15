import { useState } from "react";
import "./RecipeCard.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import RecipeCardDetail from "../RecipeCardDetail/RecipeCardDetail";
import { useDispatch, useSelector } from "react-redux";
import SlideIn from "../ui/SlideIn/SlideIn";
import { useIntersectionObserver } from "../../Hooks/useIntersectionObserver.hook";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import RecipeCardTop from "./components/RecipeCardTop";
import RecipeCardMiddle from "./components/RecipeCardMiddle";
import RecipeCardBottom from "./components/RecipeCardBottom";

interface Props {
  recipeItem: Recipe,
}

const RecipeCard = (props: Props) => {
  const [intersectionRef, isVisibleIntersection] = useIntersectionObserver()
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

  return (
    <div
      className={`recipeCard cardHover ${window.location.pathname === "/shop" && recipe.chosenRecipes?.length > 0 &&
        recipe.chosenRecipes.some((recipe) => recipe.id === props.recipeItem.id) &&
        "chosen"
        }`}
      onClick={() => {
        shoppingAction();
      }}
      ref={intersectionRef}
    >
      {window.location.pathname === "/shop" && recipe.chosenRecipes?.length > 0 &&
        recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        ) && (
          <BsFillCheckCircleFill className="chosen_check"></BsFillCheckCircleFill>
        )}
      <RecipeCardTop
        setVisibleDetail={setVisibleDetail}
        recipeItem={props.recipeItem}
        isVisibleIntersection={isVisibleIntersection}
      ></RecipeCardTop>
      <RecipeCardMiddle
        setVisibleDetail={setVisibleDetail}
        recipeItem={props.recipeItem}
        isVisibleIntersection={isVisibleIntersection}
      ></RecipeCardMiddle>
      <RecipeCardBottom
        recipeItem={props.recipeItem}
      ></RecipeCardBottom>
      {visibleDetail && (
        <SlideIn
          setVisible={setVisibleDetail}
          visible={visibleDetail}
          width={"70%"}
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
