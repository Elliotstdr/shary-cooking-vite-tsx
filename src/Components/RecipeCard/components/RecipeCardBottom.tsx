import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchDelete, fetchPost } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Modal/Modal";
import Bouton from "../../ui/Bouton/Bouton";
import { updateRecipe } from "../../../Store/Reducers/recipeReducer";
import CreateRecipe from "../../../Pages/CreateRecipe/CreateRecipe";

type Props = {
  recipeItem: Recipe,
}

const RecipeCardBottom = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const recipe = useSelector((state: RootState) => state.recipe);
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

    dispatch(updateRecipe({
      recipes: recipe.recipes.map((x) => {
        return x.id === props.recipeItem.id ? response.data : x
      })
    }))
    setIsFavorite(!isFavorite);
  };

  const deleteRecipe = async () => {
    const response = await fetchDelete(`/recipes/${props.recipeItem.id}`);
    if (response.error) {
      errorToast("Une erreur est survenue, la recette n'a pas été supprimée");
      return;
    }
    setWantToDelete(false);
    dispatch(updateRecipe({
      recipes: recipe.recipes.filter((x) => x.id !== props.recipeItem.id)
    }))
  };

  return (
    <div className="recipeCard__bottom">
      <div className="recipeCard__bottom__fav">
        {isFavorite ? (
          <AiFillStar onClick={() => addToFavorites("delete")}></AiFillStar>
        ) : (
          <AiOutlineStar
            onClick={() => addToFavorites("add")}
          ></AiOutlineStar>
        )}
      </div>
      {allowActions && (
        <div className="recipeCard__bottom__edit">
          <CiEdit onClick={() => setVisibleModif(true)}></CiEdit>
        </div>
      )}
      {allowActions && (
        <div className="recipeCard__bottom__delete">
          <RiDeleteBin6Line
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
          <div className="recipe_delete_modal">
            <div className="recipe_delete_modal_question">
              Etes vous sur de vouloir supprimer cette recette ?
            </div>
            <div className="recipe_delete_modal_buttons">
              <Bouton type={"normal"} btnAction={() => deleteRecipe()}>
                Oui
              </Bouton>
              <Bouton type={"normal"} btnAction={() => setWantToDelete(false)}>
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
          className={"modify_recipe_modal"}
        >
          <CreateRecipe
            recipe={props.recipeItem}
            setVisibleModif={setVisibleModif}
          ></CreateRecipe>
        </Modal>
      )}
    </div>
  );
};

export default RecipeCardBottom;