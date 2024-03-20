import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { fetchPost } from "../../Hooks/api.hook";
import { errorToast } from "../../Services/functions";
import { useSelector } from "react-redux";
import { useState } from "react";
import SlideIn from "../ui/SlideIn/SlideIn";
import ModalDeleteRecipe from "../Modal/ModalDeleteRecipe";
import CardDetail from "../RecipeCardDetail/RecipeCardDetail";
import Modal from "../ui/Modal/Modal";
import CreateRecipe from "../../Pages/CreateRecipe/CreateRecipe";

type Props = {
  recipeItem: Recipe,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  visibleDetail: boolean
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeCardBottom = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isFavorite, setIsFavorite] = useState(
    props.recipeItem.savedByUsers?.some(
      (user) => user.id === auth.userConnected?.id
    )
  );
  const [visibleModif, setVisibleModif] = useState(false);
  const [wantToDelete, setWantToDelete] = useState(false);

  const addToFavorites = async (actionType: string) => {
    const response = await fetchPost(
      `/recipes/${props.recipeItem.id}/users/${auth.userConnected?.id}`,
      { action: actionType }
    );
    if (response.error) {
      errorToast("Une erreur est survenue");
      return;
    }
    if (window.location.pathname === "/fav" && actionType === "delete") {
      props.setFilteredRecipes((prev) => prev.filter((x) => x.id !== props.recipeItem.id));
    }
    setIsFavorite(!isFavorite);
  };

  const editRecipe = (item: Recipe) => {
    props.setFilteredRecipes((prev) => prev.map((x) => {
      if (x.id === item.id) {
        return item
      }
      else return x
    }));
  }

  return (
    <div className="flex items-center justify-around px-4 pt-2 pb-4">
      <div className="cursor-pointer">
        {isFavorite || window.location.pathname === "/fav" ? (
          <AiFillStar onClick={() => addToFavorites("delete")} className="text-orange size-8"></AiFillStar>
        ) : (
          <AiOutlineStar
            className="text-orange size-8"
            onClick={() => addToFavorites("add")}
          ></AiOutlineStar>
        )}
      </div>
      {props.recipeItem.postedByUser.id === auth.userConnected?.id && window.location.pathname !== "/shop" && (
        <div className="cursor-pointer">
          <CiEdit onClick={() => setVisibleModif(true)} className="text-green size-8"></CiEdit>
        </div>
      )}
      {props.recipeItem.postedByUser.id === auth.userConnected?.id && window.location.pathname !== "/shop" && (
        <div className="cursor-pointer">
          <RiDeleteBin6Line
            className="text-green size-8"
            onClick={() => setWantToDelete(true)}
          ></RiDeleteBin6Line>
        </div>
      )}

      {wantToDelete && (
        <ModalDeleteRecipe
          visible={wantToDelete}
          setVisible={setWantToDelete}
          recipeId={props.recipeItem.id}
          setFilteredRecipes={props.setFilteredRecipes}
        ></ModalDeleteRecipe>
      )}
      {props.visibleDetail && (
        <SlideIn
          setVisible={props.setVisibleDetail}
          visible={props.visibleDetail}
          width={"70%"}
        >
          <CardDetail
            id={props.recipeItem.id}
            setVisible={props.setVisibleDetail}
            setVisibleModif={setVisibleModif}
          ></CardDetail>
        </SlideIn>
      )}
      {visibleModif && (
        <Modal
          visible={visibleModif}
          setVisible={setVisibleModif}
          header={"Modifier ma recette"}
        >
          <CreateRecipe
            recipe={props.recipeItem}
            editRecipe={(item: Recipe) => editRecipe(item)}
            setVisibleModif={setVisibleModif}
          ></CreateRecipe>
        </Modal>
      )}
    </div>
  );
};

export default RecipeCardBottom;