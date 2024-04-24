import { BiEditAlt } from "react-icons/bi";
import Bouton from "../../../Components/ui/Bouton/Bouton";
import ShoppingListCard from "../../../Components/ShoppingListCard/ShoppingListCard";
import { useSelector } from "react-redux";
import ModalShoppingResult from "./ModalShoppingResult";
import { useState } from "react";

type Props = {
  setVisibleRecipeContainer: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingContainer = (props: Props) => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const [visibleList, setVisibleList] = useState<boolean>(false);

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
        {(recipe.chosenRecipes as RecipeShopping[]).map((recipe) => (
          <ShoppingListCard
            recipe={recipe}
            key={recipe.id}
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