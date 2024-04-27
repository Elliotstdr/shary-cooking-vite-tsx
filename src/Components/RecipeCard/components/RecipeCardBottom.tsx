import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchDelete, fetchPost } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Modal/Modal";
import Bouton from "../../ui/Bouton/Bouton";
import { editRecipeInRecipes, removeRecipeInRecipes } from "../../../Store/Reducers/recipeReducer";
import CreateRecipeContainer from "../../CreateRecipeContainer/CreateRecipeContainer";

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
      (user) => user.id === auth.userConnected?.id
    )
  );

  const allowActions = props.recipeItem.postedByUser.id === auth.userConnected?.id && window.location.pathname !== "/shop"

  const addToFavorites = async (actionType: string) => {
    const response = await fetchPost(
      `/recipes/${props.recipeItem.id}/users/${auth.userConnected?.id}`,
      { action: actionType }
    );
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
            onClick={() => addToFavorites("delete")}
            className="text-orange size-8"
          ></AiFillStar>
        ) : (
          <AiOutlineStar
            onClick={() => addToFavorites("add")}
            className="text-orange size-8"
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
          <RiDeleteBin6Line
            className="text-green size-8"
            onClick={() => setWantToDelete(true)}
          ></RiDeleteBin6Line>
        </div>
      )}
      {wantToDelete && (
        <Modal
          visible={wantToDelete}
          setVisible={setWantToDelete}
          header={"Suppression de recette"}
        >
          <div>
            <div className="my-8">
              Etes vous sur de vouloir supprimer cette recette ?
            </div>
            <div className="flex justify-center">
              <Bouton type="normal" btnAction={() => deleteRecipe()} className="mr-4">
                Oui
              </Bouton>
              <Bouton type="normal" btnAction={() => setWantToDelete(false)} className="mr-4">
                Non
              </Bouton>
            </div>
          </div>
        </Modal>
      )}
      {visibleModif && (
        <Modal
          visible={visibleModif}
          setVisible={setVisibleModif}
          header={"Modifier ma recette"}
          className="min-w-[70%] max-w-[90%]"
        >
          <CreateRecipeContainer
            recipe={props.recipeItem}
            setVisibleModif={setVisibleModif}
          ></CreateRecipeContainer>
        </Modal>
      )}
    </div>
  );
};

export default RecipeCardBottom;