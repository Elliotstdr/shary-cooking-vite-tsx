import { useDispatch, useSelector } from "react-redux";
import Bouton from "../../../Components/ui/Bouton/Bouton";
import { exportRecipe } from "../../../Services/functions";
import ShoppingListCard from "./ShoppingListCard";
import { BiEditAlt } from "react-icons/bi";
import { updateRecipe } from "../../../Store/Reducers/recipeReducer";
import { useFetchGet } from "../../../Hooks/api.hook";

type Props = {
  setVisibleRecipeContainer: React.Dispatch<React.SetStateAction<boolean>>
  setStringShopping: React.Dispatch<React.SetStateAction<string>>
  setVisibleList: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingListContainer = (props: Props) => {
  const recipeR = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  const modifyRecipeList = (word: number, recipe: RecipeShopping) => {
    const tempArray: RecipeShopping[] = [...recipeR.chosenRecipes];
    tempArray.forEach((element) => {
      if (element.id === recipe.id) {
        element.multiplyer = word;
      }
    });
    dispatch(updateRecipe({ chosenRecipes: tempArray }));
  };

  return (
    <div className="flex flex-col mx-2 w-full laptop:mx-0 laptop:w-3/5">
      <div className="flex flex-col justify-center font-bold text-2xl my-4 laptop:flex-row laptop:items-center">
        <h2 className="my-2 laptop:m-0"> Mes recettes pour la liste de course </h2>
        <Bouton
          className="!h-8 ml-4 self-center"
          type={"normal"}
          btnTexte={"Modifier"}
          btnAction={() => props.setVisibleRecipeContainer(true)}
        >
          <BiEditAlt className="font-bold"></BiEditAlt>
        </Bouton>
      </div>
      <div className="flex flex-col items-center">
        {(recipeR.chosenRecipes as RecipeShopping[]).map((recipe, index) => (
          <ShoppingListCard
            recipe={recipe}
            modifyRecipeList={(word, recipe) =>
              modifyRecipeList(word, recipe)
            }
            key={index}
          ></ShoppingListCard>
        ))}
      </div>
      <Bouton
        className="self-center"
        type={"normal"}
        btnTexte={"Créer ma liste de course"}
        btnAction={() => {
          ingredientData.data && props.setStringShopping(
            exportRecipe(recipeR.chosenRecipes, ingredientData.data)
          );
          props.setVisibleList(true);
        }}
      ></Bouton>
    </div>
  );
};

export default ShoppingListContainer;