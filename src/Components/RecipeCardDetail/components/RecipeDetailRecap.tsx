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
      <div className="flex items-center">
        {recipeDetail.postedByUser?.imageUrl && (
          <img
            src={import.meta.env.VITE_BASE_URL_API + recipeDetail.postedByUser?.imageUrl}
            alt="ma pp"
            className=" size-6 rounded-full mr-2 object-cover"
          ></img>
        )}
        <span>Créée par {recipeDetail.postedByUser?.name}</span>
      </div>
      <div className="flex flex-col self-start ml-8 laptop:flex-row laptop:self-center laptop:ml-0">
        <div className="m-4 flex items-center font-bold">
          <BiTimer className="mr-1"></BiTimer> {timeToString(recipeDetail.time)}
        </div>
        <div className="m-4 flex items-center font-bold">
          <BsPeople className="mr-1"></BsPeople> {recipeDetail.number} personnes
        </div>
        <div className="m-4 flex items-center font-bold">
          <GiKnifeFork className="mr-1"></GiKnifeFork> {recipeDetail.type?.label}
        </div>
        <div className="m-4 flex items-center font-bold">
          <BiAward className="mr-1"></BiAward> {recipeDetail.regime?.label}
        </div>
      </div>
    </>
  );
};

export default RecipeDetailRecap;