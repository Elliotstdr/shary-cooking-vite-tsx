import { useState } from "react";
import RecipeCardDetail from "../RecipeCardDetail/RecipeCardDetail";
import SlideIn from "../ui/SlideIn";
import RecipeCardTop from "./components/RecipeCardTop";
import RecipeCardMiddle from "./components/RecipeCardMiddle";
import RecipeCardBottom from "./components/RecipeCardBottom";

interface Props {
  recipeItem: Recipe,
  className?: string
}

const RecipeCard = (props: Props) => {
  const [visibleDetail, setVisibleDetail] = useState(false);

  return (
    <>
      <div
        className={`
        laptop:min-h-[95%] rounded-md mb-8 w-80 hover:shadow-card hover:scale-[1.01] duration-200 bg-white
        ${props.className || ""} 
      `}
      >
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
      </div>
      {visibleDetail && <SlideIn visible={visibleDetail} setVisible={setVisibleDetail}>
        <RecipeCardDetail
          recipeDetail={props.recipeItem}
        ></RecipeCardDetail>
      </SlideIn>}
    </>
  );
};

export default RecipeCard;
