import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiTrash } from "react-icons/pi";
import { fetchDelete, fetchPost } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRecipeInRecipes, removeRecipeInRecipes } from "../../../Store/Reducers/recipeReducer";
import RecipeCreationContainer from "../RecipeCreationContainer";
import ModalDeleteConfirm from "../../Modal/ModalDeleteConfirm";
import Modal from "../../ui/Modal";

type Props = {
  recipeItem: Recipe,
}

const RecipeCardBottom = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [wantToDelete, setWantToDelete] = useState(false);
  const [visibleModif, setVisibleModif] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    props.recipeItem.savedByUsers?.some(
      (user) => user.userId === auth.userConnected?.id
    )
  );

  const allowActions = props.recipeItem.postedByUser.id === auth.userConnected?.id && window.location.pathname !== "/shop"

  const addToFavorites = async (actionType: "save" | "unsave") => {
    const response = await fetchPost(`/recipes/${actionType}/${props.recipeItem.id}`, {});
    if (response.error) {
      errorToast("Une erreur est survenue");
      return;
    }
    dispatch(editRecipeInRecipes(response.data))
    setIsFavorite(!isFavorite);
  };

  const deleteRecipe = async () => {
    const response = await fetchDelete(`/recipes/${props.recipeItem.id}`);
    if (response.error) {
      errorToast("Une erreur est survenue, la recette n'a pas été supprimée");
      return;
    }
    setWantToDelete(false);
    dispatch(removeRecipeInRecipes(props.recipeItem))
  };

  return (
    <div className="flex items-center justify-around px-4 pt-2 pb-4">
      <div className="cursor-pointer">
        {isFavorite ? (
          <AiFillStar
            onClick={() => addToFavorites("unsave")}
            className="text-orange size-[30px]"
          ></AiFillStar>
        ) : (
          <AiOutlineStar
            onClick={() => addToFavorites("save")}
            className="text-orange size-[30px]"
          ></AiOutlineStar>
        )}
      </div>
      {allowActions && (
        <div className="cursor-pointer">
          <CiEdit
            className="text-green size-8"
            onClick={() => setVisibleModif(true)}
          ></CiEdit>
        </div>
      )}
      {allowActions && (
        <div className="cursor-pointer">
          <PiTrash
            className="text-green size-[30px]"
            onClick={() => setWantToDelete(true)}
          ></PiTrash>
        </div>
      )}
      {wantToDelete && (
        <ModalDeleteConfirm
          wantToDelete={wantToDelete}
          setWantToDelete={setWantToDelete}
          deleteAction={deleteRecipe}
        ></ModalDeleteConfirm>
      )}
      {visibleModif && (
        <Modal
          visible={visibleModif}
          setVisible={setVisibleModif}
          header="Modifier ma recette"
          className="min-w-[70%] max-w-[98%]"
          headerClassName="!p-4"
          contentClassName="!px-2 tablet:!px-4"
        >
          <RecipeCreationContainer
            recipe={props.recipeItem}
            setVisibleModif={setVisibleModif}
          ></RecipeCreationContainer>
        </Modal>
      )}
    </div>
  );
};

export default RecipeCardBottom;