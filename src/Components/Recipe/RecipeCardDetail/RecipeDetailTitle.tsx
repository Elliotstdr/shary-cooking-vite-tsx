import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import RecipeCreationContainer from "../RecipeCreationContainer";
import { Dialog } from "primereact/dialog";

type Props = {
  editable: boolean
  recipe: Recipe
}

const RecipeDetailTitle = ({ editable, recipe }: Props) => {
  const [visibleModif, setVisibleModif] = useState(false);

  return (
    <>
      <h2 className="flex font-bold items-center self-start text-3xl flex-col laptop:flex-row laptop:text-5xl">
        {recipe.title}
        {editable && (
          <div className="mt-2 laptop:mt-0 laptop:ml-8 cursor-pointer">
            <CiEdit
              onClick={() => {
                setVisibleModif(true);
              }}
            ></CiEdit>
          </div>
        )}
      </h2>
      {visibleModif && recipe && (
        <Dialog
          visible={visibleModif}
          onHide={() => setVisibleModif(false)}
          header="Modifier ma recette"
          className="min-w-[70%] max-w-[98%]"
          headerClassName="!py-2"
          contentClassName="!px-2 tablet:!px-4"
        >
          <RecipeCreationContainer
            recipe={recipe}
            setVisibleModif={setVisibleModif}
          ></RecipeCreationContainer>
        </Dialog>
      )}
    </>
  );
};

export default RecipeDetailTitle;