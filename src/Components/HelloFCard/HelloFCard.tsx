import Bouton from "../ui/Bouton/Bouton";
import { fillIngredient, findRegime, findType, getTime } from "../../Services/hfFunctions";
import "./HelloFCard.scss"
import { useState } from "react";
import Modal from "../Modal/Modal";
import default2 from "/src/assets/default2.jpg";
import CreateRecipeContainer from "../CreateRecipeContainer/CreateRecipeContainer";

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
      <div className="HF__card">
        <img src={props.recipe?.imagePath} alt="" onError={(e) => e.currentTarget.src = default2} />
        <div className="name">{props.recipe.name}</div>
        <Bouton btnTexte="Ajouter au site" btnAction={() => {
          fillRecipeForm(props.recipe);
          setVisibleRecipeForm(true)
        }}></Bouton>
      </div>
      {visibleRecipeForm && filledRecipe && (
        <Modal
          visible={visibleRecipeForm}
          setVisible={setVisibleRecipeForm}
          className={"modify_recipe_modal"}
        >
          <CreateRecipeContainer
            HFFillRecipe={filledRecipe}
            setVisibleModif={setVisibleRecipeForm}
          ></CreateRecipeContainer>
        </Modal>
      )}
    </>
  );
};

export default HelloFCard;