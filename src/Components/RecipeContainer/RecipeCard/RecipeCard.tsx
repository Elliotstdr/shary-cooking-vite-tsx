import React, { useState } from "react";
import default2 from "../../../assets/default2.jpg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsFillCheckCircleFill } from "react-icons/bs";
import CardDetail from "./CardDetail/CardDetail";
import Modal from "../../ui/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import Bouton from "../../ui/Bouton/Bouton";
import SlideIn from "../../ui/SlideIn/SlideIn";
import { errorToast, timeToString } from "../../../Services/functions";
import { GiCook } from "react-icons/gi";
import CreateRecipe from "../../../Pages/CreateRecipe/CreateRecipe";
import { fetchDelete, fetchPost } from "../../../Hooks/api.hook";
import { useIntersectionObserver } from "../../../Hooks/useIntersectionObserver.hook";
import { updateRecipe } from "../../../Store/Reducers/recipeReducer";

interface Props {
  recipeItem: Recipe,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  className?: string
}

const RecipeCard = (props: Props) => {
  const [intersectionRef, isVisibleIntersection] = useIntersectionObserver()
  const auth = useSelector((state: RootState) => state.auth);
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleModif, setVisibleModif] = useState(false);
  const [wantToDelete, setWantToDelete] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    props.recipeItem.savedByUsers?.some(
      (user) => user.id === auth.userConnected?.id
    )
  );

  const addToFavorites = async (actionType: string) => {
    const response = await fetchPost(
      `/recipes/${props.recipeItem.id}/users/${auth.userConnected?.id}`,
      { action: actionType }
    );
    if (response.error) {
      errorToast("Une erreur est survenue");
      return;
    }
    if (recipe.favourite && actionType === "delete") {
      props.setFilteredRecipes((prev) => prev.filter((x) => x.id !== props.recipeItem.id));
    }
    setIsFavorite(!isFavorite);
  };

  const deleteRecipe = async () => {
    const response = await fetchDelete(`/recipes/${props.recipeItem.id}`);
    if (response.error) {
      errorToast("Une erreur est survenue, la recette n'a pas été supprimée");
      return;
    }
    setWantToDelete(false);
    props.setFilteredRecipes((prev) => prev.filter((x) => x.id !== props.recipeItem.id));
  };

  const shoppingAction = () => {
    if (recipe.shopping) {
      if (
        recipe.chosenRecipes.length === 0 ||
        !recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        )
      ) {
        dispatch(updateRecipe({
          chosenRecipes: [...recipe.chosenRecipes, props.recipeItem],
        }));
      } else {
        dispatch(updateRecipe({
          chosenRecipes: recipe.chosenRecipes.filter(
            (recipe) => recipe.id !== props.recipeItem.id
          ),
        }));
      }
    }
  };

  const editRecipe = (item: Recipe) => {
    props.setFilteredRecipes((prev) => prev.map((x) => {
      if (x.id === item.id) {
        return item
      }
      else return x
    }));
  }

  const isSelected = () => {
    return recipe.chosenRecipes?.length > 0 &&
      recipe.chosenRecipes.some((recipe) => recipe.id === props.recipeItem.id)
  }
  return (
    <div
      className={`laptop:min-h-[95%] rounded-s-md mb-8 w-80 cardHover ${props.className} ${isSelected() && "border-card-green border-solid border-4 relative"}`}
      onClick={() => {
        shoppingAction();
      }}
      ref={intersectionRef}
    >
      {recipe.chosenRecipes?.length > 0 &&
        recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        ) && (
          <BsFillCheckCircleFill className="absolute-centering size-20 text-card-green"></BsFillCheckCircleFill>
        )}
      <div onClick={() => !recipe.shopping && setVisibleDetail(true)}>
        <div className="font-bold text-picto relative flex justify-end">
          <span className="absolute mt-4 mr-8 py-1 px-8 text-gris bg-white rounded-md"> {props.recipeItem.type.label} </span>
        </div>
        <div className="cursor-pointer h-48">
          {isVisibleIntersection && <img
            src={
              props.recipeItem.imageUrl
                ? import.meta.env.VITE_BASE_URL_API + props.recipeItem.imageUrl
                : default2
            }
            alt="Fond news"
            loading="lazy"
            className="w-full h-48 object-cover font-bold rounded-t-md"
          />}
        </div>
      </div>
      <div
        className="flex flex-col h-[15.5rem] py-4 pl-4 items-start"
        onClick={() => !recipe.shopping && setVisibleDetail(true)}
      >
        <div className="flex items-start text-sm">
          {props.recipeItem.postedByUser.imageUrl && isVisibleIntersection ? (
            <img
              src={
                import.meta.env.VITE_BASE_URL_API +
                props.recipeItem.postedByUser.imageUrl
              }
              alt="ma pp"
              className="size-6 rounded-full mr-2 object-cover"
            ></img>
          ) : (
            <GiCook className="size-6 rounded-full mr-2 object-cover"></GiCook>
          )}
          <span>Créée par {props.recipeItem.postedByUser.name}</span>
        </div>
        <div className="cursor-pointer text-green my-6 mx-2 text-2xl line-clamp-3">{props.recipeItem.title}</div>
        <div>
          <span className="flex items-center">
            <GiKnifeFork className="mx-2"></GiKnifeFork>
            {props.recipeItem.regime.label}
          </span>
        </div>
        <div>
          <span className="flex items-center">
            <BsPeople className="mx-2"></BsPeople>
            {props.recipeItem.number} personnes
          </span>
        </div>
        <div>
          <span className="flex items-center">
            <BiTimer className="mx-2"></BiTimer>
            {timeToString(props.recipeItem.time)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-around px-4 pt-2 pb-4">
        <div className="cursor-pointer">
          {isFavorite || recipe.favourite ? (
            <AiFillStar onClick={() => addToFavorites("delete")} className="text-orange size-8"></AiFillStar>
          ) : (
            <AiOutlineStar
              className="text-orange size-8"
              onClick={() => addToFavorites("add")}
            ></AiOutlineStar>
          )}
        </div>
        {recipe.editable && (
          <div className="cursor-pointer">
            <CiEdit onClick={() => setVisibleModif(true)} className="text-green size-8"></CiEdit>
          </div>
        )}
        {recipe.editable && (
          <div className="cursor-pointer">
            <RiDeleteBin6Line
              className="text-green size-8"
              onClick={() => setWantToDelete(true)}
            ></RiDeleteBin6Line>
          </div>
        )}
      </div>
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
              <Bouton className="mr-4" type={"normal"} btnAction={() => deleteRecipe()}>
                Oui
              </Bouton>
              <Bouton className="mr-4" type={"normal"} btnAction={() => setWantToDelete(false)}>
                Non
              </Bouton>
            </div>
          </div>
        </Modal>
      )}
      {visibleDetail && (
        <SlideIn
          setVisible={setVisibleDetail}
          visible={visibleDetail}
          width={"70%"}
        >
          <CardDetail
            id={props.recipeItem.id}
            setVisible={setVisibleDetail}
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

export default RecipeCard;
