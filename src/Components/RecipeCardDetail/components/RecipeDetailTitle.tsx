import { useState } from "react";
import Modal from "../../Modal/Modal";
import { CiEdit } from "react-icons/ci";
import CreateRecipeContainer from "../../CreateRecipeContainer/CreateRecipeContainer";

type Props = {
  editable: boolean
  recipe: Recipe
}

const RecipeDetailTitle = ({ editable, recipe }: Props) => {
  const [visibleModif, setVisibleModif] = useState(false);

  return (
    <>
      <h2 className="flex font-bold items-center text-3xl flex-col w-11/12 laptop:flex-row laptop:text-5xl">
        {recipe.title}
        {editable && (
          <div className="mt-4 ml-8 laptop:mt-0 cursor-pointer">
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
          className="min-w-[70%]"
        >
          <CreateRecipeContainer
            recipe={recipe}
            setVisibleModif={setVisibleModif}
          ></CreateRecipeContainer>
        </Modal>
      )}
    </>
  );
};

export default RecipeDetailTitle;