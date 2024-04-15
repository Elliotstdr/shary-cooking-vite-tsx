import RecipePicture from "../../RecipePicture/RecipePicture";

type Props = {
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>
  recipeItem: Recipe,
  isVisibleIntersection: boolean
}

const RecipeCardTop = (props: Props) => {
  return (
    <div
      className="recipeCard__top"
      onClick={() => window.location.pathname !== "/shop" && props.setVisibleDetail(true)}
    >
      <div className="recipeCard__top__categorie">
        <span className="etiquette"> {props.recipeItem.type.label} </span>
      </div>
      <div className="recipeCard__top__image">
        {props.isVisibleIntersection &&
          <RecipePicture
            url={props.recipeItem.imageUrl}
            isFromHellof={props.recipeItem.fromHellof}
          ></RecipePicture>
        }
      </div>
    </div>
  );
};

export default RecipeCardTop;