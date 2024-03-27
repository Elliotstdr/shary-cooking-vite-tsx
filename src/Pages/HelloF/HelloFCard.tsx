import { useSelector } from "react-redux";
import Bouton from "../../Components/ui/Bouton/Bouton";
import { fillIngredient, findRegime, getTime } from "../../Services/hfFunctions";

type Props = {
  setFilledRecipe: React.Dispatch<React.SetStateAction<HFFillRecipe | null>>
  setVisibleRecipeForm: React.Dispatch<React.SetStateAction<boolean>>
  recipe: HFRecipe
}

const HelloFCard = (props: Props) => {
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);

  const fillRecipeForm = (HFRecipe: HFRecipe) => {
    props.setFilledRecipe({
      title: HFRecipe.name,
      time: getTime(HFRecipe.prepTime),
      number: 2,
      image: `${import.meta.env.VITE_BASE_HF_IMAGE_URL}${HFRecipe?.imagePath}`,
      type: secondaryTables?.types?.find((x) => x.label === "Plat") || { id: 2, label: "Plat" },
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
    <div className="HF__container__items__item">
      <img src={`${import.meta.env.VITE_BASE_HF_IMAGE_URL}${props.recipe?.imagePath}`} alt="" />
      <div className="name">{props.recipe.name}</div>
      <Bouton btnTexte="Ajouter au site" btnAction={() => {
        fillRecipeForm(props.recipe);
        props.setVisibleRecipeForm(true)
      }}></Bouton>
    </div>
  );
};

export default HelloFCard;