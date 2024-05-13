import { useSelector } from "react-redux";
import RecipePicture from "../RecipePicture/RecipePicture";
import RecipeDetailIngredients from "./components/RecipeDetailIngredients";
import RecipeDetailSteps from "./components/RecipeDetailSteps";
import RecipeDetailTitle from "./components/RecipeDetailTitle";
import RecipeDetailRecap from "./components/RecipeDetailRecap";

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
