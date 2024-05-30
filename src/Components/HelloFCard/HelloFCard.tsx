import Bouton from "../ui/Bouton";
import { fillIngredient, findRegime, findType, getTime } from "../../Services/hfFunctions";
import { useState } from "react";
import Modal from "../Modal/Modal";
import default2 from "/src/assets/default2.jpg";
import RecipeCreationContainer from "../RecipeCreationContainer/RecipeCreationContainer";

type Props = {
  recipe: HFRecipe
}

const HelloFCard = (props: Props) => {
  const [visibleRecipeForm, setVisibleRecipeForm] = useState(false)
  const [filledRecipe, setFilledRecipe] = useState<HFFillRecipe | null>(null)

  const fillRecipeForm = (HFRecipe: HFRecipe) => {
    setFilledRecipe({
      title: HFRecipe.name,
      time: getTime(HFRecipe.prepTime),
      number: 2,
      image: HFRecipe?.imagePath,
      type: findType(),
      regime: findRegime(HFRecipe.tags),
      steps: HFRecipe.steps.map((x) => {
        return {
          stepIndex: x.index,
          description: x.instructions.trim().replace(/^(\n)+|(\n)+$/g, '')
        }
      }),
      ingredients: fillIngredient(HFRecipe.ingredients, HFRecipe.yields)
    })
  }

  return (
    <>
      <div className="flex flex-col justify-between bg-white rounded-lg w-80 pb-4">
        <img
          src={props.recipe?.imagePath}
          alt=""
          onError={(e) => e.currentTarget.src = default2}
          className="w-80 max-h-60 object-cover rounded-t-lg"
        />
        <div className="p-4 font-bold">{props.recipe.name}</div>
        <Bouton
          btnAction={() => {
            fillRecipeForm(props.recipe);
            setVisibleRecipeForm(true)
          }}
          className="self-center"
        >Ajouter au site</Bouton>
      </div>
      {visibleRecipeForm && filledRecipe && (
        <Modal
          visible={visibleRecipeForm}
          setVisible={setVisibleRecipeForm}
          className="min-w-[70%] max-w-[98%]"
          headerClassName="!py-2"
          contentClassName="!px-2 tablet:!px-4"
        >
          <RecipeCreationContainer
            HFFillRecipe={filledRecipe}
            setVisibleModif={setVisibleRecipeForm}
          ></RecipeCreationContainer>
        </Modal>
      )}
    </>
  );
};

export default HelloFCard;