import { useIntersectionObserver } from "../../../Hooks/useIntersectionObserver.hook";
import RecipePicture from "../RecipePicture";

type Props = {
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>
  recipeItem: Recipe,
}

const RecipeCardTop = (props: Props) => {
  const [intersectionRef, isVisibleIntersection] = useIntersectionObserver()

  return (
    <div
      onClick={() => window.location.pathname !== "/shop" && props.setVisibleDetail(true)}
      ref={intersectionRef}
    >
      <div className="font-bold text-picto relative flex justify-end">
        <span className="absolute mt-4 mr-8 py-1 px-8 text-gris bg-white rounded-md"> {props.recipeItem.type.label} </span>
      </div>
      <div className="cursor-pointer h-40 tablet:h-48">
        {isVisibleIntersection &&
          <RecipePicture
            url={props.recipeItem.imageUrl}
            isFromHellof={props.recipeItem.fromHellof}
            className="size-full object-cover font-bold rounded-t-md"
          ></RecipePicture>
        }
      </div>
    </div>
  );
};

export default RecipeCardTop;