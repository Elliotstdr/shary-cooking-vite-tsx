import { timeToString } from "../../../Services/functions";
import { GiKnifeFork } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { BiAward } from "react-icons/bi";

type Props = {
  recipeDetail: Recipe
}

const RecipeDetailRecap = ({ recipeDetail }: Props) => {
  return (
    <>
      <div className="cardDetail_container_author">
        {recipeDetail.postedByUser?.imageUrl && (
          <img
            src={import.meta.env.VITE_BASE_URL_API + recipeDetail.postedByUser?.imageUrl}
            alt="ma pp"
            className="creatorPP"
          ></img>
        )}
        <span>Créée par {recipeDetail.postedByUser?.name}</span>
      </div>
      <div className="cardDetail_container_group">
        <div className="cardDetail_container_time">
          <BiTimer></BiTimer> {timeToString(recipeDetail.time)}
        </div>
        <div className="cardDetail_container_number">
          <BsPeople></BsPeople> {recipeDetail.number} personnes
        </div>
        <div className="cardDetail_container_infos_type">
          <GiKnifeFork></GiKnifeFork> {recipeDetail.type?.label}
        </div>
        <div className="cardDetail_container_infos_regime">
          <BiAward></BiAward> {recipeDetail.regime?.label}
        </div>
      </div>
    </>
  );
};

export default RecipeDetailRecap;