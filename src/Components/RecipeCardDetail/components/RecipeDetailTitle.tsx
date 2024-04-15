import { useState } from "react";
import CreateRecipe from "../../../Pages/CreateRecipe/CreateRecipe";
import Modal from "../../Modal/Modal";
import { CiEdit } from "react-icons/ci";

type Props = {
  editable: boolean
  recipe: Recipe
}

const RecipeDetailTitle = ({ editable, recipe }: Props) => {
  const [visibleModif, setVisibleModif] = useState(false);

  return (
    <>
      <h2 className="cardDetail_container_title">
        {recipe.title}
        {editable && (
          <div className="recipeCard__bottom__edit">
            <CiEdit
              onClick={() => {
                setVisibleModif(true);
              }}
            ></CiEdit>
          </div>
        )}
      </h2>
      {visibleModif && recipe && (
        <Modal
          visible={visibleModif}
          setVisible={setVisibleModif}
          header={"Modifier ma recette"}
          className={"modify_recipe_modal"}
        >
          <CreateRecipe
            recipe={recipe}
            setVisibleModif={setVisibleModif}
          ></CreateRecipe>
        </Modal>
      )}
    </>
  );
};

export default RecipeDetailTitle;