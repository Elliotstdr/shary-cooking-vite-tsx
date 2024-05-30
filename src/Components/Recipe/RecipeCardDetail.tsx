import { useSelector } from "react-redux";
import RecipePicture from "./RecipePicture";
import RecipeDetailIngredients from "./RecipeCardDetail/RecipeDetailIngredients";
import RecipeDetailSteps from "./RecipeCardDetail/RecipeDetailSteps";
import RecipeDetailTitle from "./RecipeCardDetail/RecipeDetailTitle";
import RecipeDetailRecap from "./RecipeCardDetail/RecipeDetailRecap";

interface Props {
  recipeDetail: Recipe,
}

const RecipeCardDetail = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const recipeDetail = props.recipeDetail;

  return (
    <div className="flex-center flex-col text-lg whitespace-pre-line gap-8 px-4 laptop:px-8">
      <div className="flex-center w-full max-h-96 overflow-hidden rounded-lg">
        <RecipePicture
          url={recipeDetail.imageUrl}
          isFromHellof={recipeDetail.fromHellof}
          className="w-full"
        ></RecipePicture>
      </div>
      <RecipeDetailTitle
        editable={recipeDetail.postedByUser.id === auth.userConnected?.id}
        recipe={recipeDetail}
      ></RecipeDetailTitle>
      <RecipeDetailRecap
        recipeDetail={recipeDetail}
      ></RecipeDetailRecap>
      <RecipeDetailIngredients
        ingredients={recipeDetail.ingredients}
      ></RecipeDetailIngredients>
      <RecipeDetailSteps
        steps={recipeDetail.steps}
      ></RecipeDetailSteps>
    </div>
  );
};

export default RecipeCardDetail;
