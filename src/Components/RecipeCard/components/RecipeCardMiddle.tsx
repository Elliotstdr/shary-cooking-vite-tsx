import { BiTimer } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { GiCook, GiKnifeFork } from "react-icons/gi";
import { timeToString } from "../../../Services/functions";
import { useIntersectionObserver } from "../../../Hooks/useIntersectionObserver.hook";

type Props = {
  recipeItem: Recipe
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeCardMiddle = (props: Props) => {
  const [intersectionRef, isVisibleIntersection] = useIntersectionObserver()

  return (
    <div
      className="flex flex-col h-62 py-4 pl-4 items-start"
      onClick={() => window.location.pathname !== "/shop" && props.setVisibleDetail(true)}
      ref={intersectionRef}
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
      <div className="cursor-pointer text-green my-6 mx-2 text-2xl line-clamp-2 self-center">{props.recipeItem.title}</div>
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
  );
};

export default RecipeCardMiddle;