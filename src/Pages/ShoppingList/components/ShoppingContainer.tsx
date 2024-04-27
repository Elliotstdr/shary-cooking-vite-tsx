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
    <div className="flex flex-col mx-2 w-full laptop:w-7/12">
      <div className="flex flex-col justify-center tablet:flex-row gap-4">
        <h2 className="my-4 font-bold text-2xl">
          Mes recettes pour la liste de course
        </h2>
        <Bouton
          type={"normal"}
          btnTexte={"Modifier"}
          btnAction={() => props.setVisibleRecipeContainer(true)}
          className="!h-8 self-center"
        >
          <BiEditAlt className="font-bold"></BiEditAlt>
        </Bouton>
      </div>
      <div className="flex flex-col items-center laptop:items-start">
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
        className="self-center"
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