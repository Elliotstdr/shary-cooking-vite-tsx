import { BiTimer } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { GiCook, GiKnifeFork } from "react-icons/gi";
import { timeToString } from "../../../Services/functions";

type Props = {
  isVisibleIntersection: boolean
  recipeItem: Recipe
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeCardMiddle = (props: Props) => {
  return (
    <div
      className="recipeCard__corps"
      onClick={() => window.location.pathname !== "/shop" && props.setVisibleDetail(true)}
    >
      <div className="recipeCard__corps__author">
        {props.recipeItem.postedByUser.imageUrl && props.isVisibleIntersection ? (
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
  );
};

export default RecipeCardMiddle;