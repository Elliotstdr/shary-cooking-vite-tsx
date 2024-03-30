import React, { useState } from "react";
import "./RecipeCard.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsFillCheckCircleFill } from "react-icons/bs";
import CardDetail from "./CardDetail/CardDetail";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import Bouton from "../../ui/Bouton/Bouton";
import SlideIn from "../../ui/SlideIn/SlideIn";
import { errorToast, timeToString } from "../../../Services/functions";
import { GiCook } from "react-icons/gi";
import CreateRecipe from "../../../Pages/CreateRecipe/CreateRecipe";
import { fetchDelete, fetchPost } from "../../../Hooks/api.hook";
import { useIntersectionObserver } from "../../../Hooks/useIntersectionObserver.hook";
import { updateRecipe } from "../../../Store/Reducers/recipeReducer";
import RecipePicture from "../../RecipePicture/RecipePicture";

interface Props {
  recipeItem: Recipe,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
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
    if (window.location.pathname === "/fav" && actionType === "delete") {
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
    if (window.location.pathname === "/shop") {
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
  return (
    <div
      className={`recipeCard cardHover ${window.location.pathname === "/shop" && recipe.chosenRecipes?.length > 0 &&
        recipe.chosenRecipes.some((recipe) => recipe.id === props.recipeItem.id) &&
        "chosen"
        }`}
      onClick={() => {
        shoppingAction();
      }}
      ref={intersectionRef}
    >
      {window.location.pathname === "/shop" && recipe.chosenRecipes?.length > 0 &&
        recipe.chosenRecipes.some(
          (recipe) => recipe.id === props.recipeItem.id
        ) && (
          <BsFillCheckCircleFill className="chosen_check"></BsFillCheckCircleFill>
        )}
      <div
        className="recipeCard__top"
        onClick={() => window.location.pathname !== "/shop" && setVisibleDetail(true)}
      >
        <div className="recipeCard__top__categorie">
          <span className="etiquette"> {props.recipeItem.type.label} </span>
        </div>
        <div className="recipeCard__top__image">
          {isVisibleIntersection &&
            <RecipePicture
              url={props.recipeItem.imageUrl}
              isFromHellof={props.recipeItem.fromHellof}
            ></RecipePicture>
          }
        </div>
      </div>
      <div
        className="recipeCard__corps"
        onClick={() => window.location.pathname !== "/shop" && setVisibleDetail(true)}
      >
        <div className="recipeCard__corps__author">
          {props.recipeItem.postedByUser.imageUrl && isVisibleIntersection ? (
            <img
              src={
                import.meta.env.VITE_BASE_URL_API +
                props.recipeItem.postedByUser.imageUrl
              }
              alt="ma pp"
              className="creatorPP"
            ></img>
          ) : (
            <GiCook className="cooker"></GiCook>
          )}
          <span>Créée par {props.recipeItem.postedByUser.name}</span>
        </div>
        <div className="recipeCard__corps__title">{props.recipeItem.title}</div>
        <div className="recipeCard__corps__regime">
          <span>
            <GiKnifeFork></GiKnifeFork>
            {props.recipeItem.regime.label}
          </span>
        </div>
        <div className="recipeCard__corps__number">
          <span>
            <BsPeople></BsPeople>
            {props.recipeItem.number} personnes
          </span>
        </div>
        <div className="recipeCard__corps__time">
          <span>
            <BiTimer></BiTimer>
            {timeToString(props.recipeItem.time)}
          </span>
        </div>
      </div>
      <div className="recipeCard__bottom">
        <div className="recipeCard__bottom__fav">
          {isFavorite || window.location.pathname === "/fav" ? (
            <AiFillStar onClick={() => addToFavorites("delete")}></AiFillStar>
          ) : (
            <AiOutlineStar
              onClick={() => addToFavorites("add")}
            ></AiOutlineStar>
          )}
        </div>
        {props.recipeItem.postedByUser.id === auth.userConnected?.id && window.location.pathname !== "/shop" && (
          <div className="recipeCard__bottom__edit">
            <CiEdit onClick={() => setVisibleModif(true)}></CiEdit>
          </div>
        )}
        {props.recipeItem.postedByUser.id === auth.userConnected?.id && window.location.pathname !== "/shop" && (
          <div className="recipeCard__bottom__delete">
            <RiDeleteBin6Line
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
          className={"modify_recipe_modal"}
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
