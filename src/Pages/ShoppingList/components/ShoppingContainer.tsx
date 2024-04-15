import { BiEditAlt } from "react-icons/bi";
import Bouton from "../../../Components/ui/Bouton/Bouton";
import ShoppingListCard from "../../../Components/ShoppingListCard/ShoppingListCard";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../../Store/Reducers/recipeReducer";
import ModalShoppingResult from "./ModalShoppingResult";
import { useState } from "react";

type Props = {
  setVisibleRecipeContainer: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingContainer = (props: Props) => {
  const recipeR = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch()
  const [visibleList, setVisibleList] = useState<boolean>(false);

  const modifyRecipeList = (word: number, recipe: RecipeShopping) => {
    const tempArray: RecipeShopping[] = [];
    recipeR.chosenRecipes.forEach((element) => {
      if (element.id === recipe.id) {
        tempArray.push({
          ...element,
          multiplyer: word
        });
      } else {
        tempArray.push({ ...element })
      }
    });
    dispatch(updateRecipe({ chosenRecipes: tempArray }));
  };

  return (
    <div className="shoppingList_container_export">
      <div className="shoppingList_container_export_top">
        <h2 className="shoppingList_container_export_top_title">
          Mes recettes pour la liste de course
        </h2>
        <Bouton
          type={"normal"}
          btnTexte={"Modifier"}
          btnAction={() => props.setVisibleRecipeContainer(true)}
        >
          <BiEditAlt></BiEditAlt>
        </Bouton>
      </div>
      <div className="shoppingList_container_export_recipes">
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
        type={"normal"}
        btnTexte={"Créer ma liste de course"}
        btnAction={() => setVisibleList(true)}
      ></Bouton>
      {visibleList && (
        <ModalShoppingResult
          visible={visibleList}
          setVisible={setVisibleList}
        ></ModalShoppingResult>
      )}
    </div>
  );
};

export default ShoppingContainer;