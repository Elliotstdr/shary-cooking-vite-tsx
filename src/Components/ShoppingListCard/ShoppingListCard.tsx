import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { timeToString } from "../../Services/functions";
import RecipePicture from "../RecipePicture/RecipePicture";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import Dropdown from "../ui/Dropdown";

interface Props {
  recipe: RecipeShopping,
}

const ShoppingListCard = (props: Props) => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch()

  const modifyRecipeList = (multiplyer: number, item: RecipeShopping) => {
    const tempArray: RecipeShopping[] = [];
    recipe.chosenRecipes.forEach((element) => {
      if (element.id === item.id) {
        tempArray.push({
          ...element,
          multiplyer: multiplyer
        });
      } else {
        tempArray.push({ ...element })
      }
    });
    dispatch(updateRecipe({ chosenRecipes: tempArray }));
  };

  return (
    <div className="w-80 rounded-lg bg-white my-4 flex flex-col laptop:h-48 laptop:w-full laptop:flex-row">
      <RecipePicture
        url={props.recipe.imageUrl}
        isFromHellof={props.recipe.fromHellof}
        className="rounded-t-lg w-full h-64 object-cover laptop:w-72 laptop:h-48 laptop:rounded-bl-xl laptop:rounded-tr-none"
      ></RecipePicture>
      <div className="flex flex-col p-6 grow justify-between laptop:py-8">
        <div className="flex flex-col items-center justify-between mt-2 mb-8 laptop:m-0 laptop:flex-row">
          <div className="text-xl mb-4 font-bold line-clamp-2 text-left laptop:line-clamp-1 laptop:m-0 laptop:max-w-[70%]">
            {props.recipe.title}
          </div>
          <div>
            Créé par {props.recipe.postedByUser.name}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-start">
            <div>
              <span className="flex items-center p-1">
                <GiKnifeFork className="mr-2"></GiKnifeFork>
                {props.recipe.regime.label}
              </span>
            </div>
            <div>
              <span className="flex items-center p-1">
                <BsPeople className="mr-2"></BsPeople>
                {props.recipe.number} personnes
              </span>
            </div>
            <div>
              <span className="flex items-center p-1">
                <BiTimer className="mr-2"></BiTimer>
                {timeToString(props.recipe.time)}
              </span>
            </div>
          </div>
          <Dropdown
            defaultValue={props.recipe.number.toString()}
            items={[
              { label: props.recipe.number, multiplyer: 1 },
              { label: props.recipe.number * 2, multiplyer: 2 },
              { label: props.recipe.number * 3, multiplyer: 3 },
              { label: props.recipe.number * 4, multiplyer: 4 },
            ]}
            onChange={(e) => {
              modifyRecipeList(e.multiplyer, props.recipe);
            }}
            className="w-20"
          ></Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListCard;
