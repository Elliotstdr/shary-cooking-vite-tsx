import default2 from "src/assets/default2.jpg";

type Props = {
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>
  recipeItem: Recipe,
  isVisibleIntersection: boolean
}

const RecipeCardTop = (props: Props) => {
  return (
    <div onClick={() => window.location.pathname !== "/shop" && props.setVisibleDetail(true)}>
      <div className="font-bold text-picto relative flex justify-end">
        <span className="absolute mt-4 mr-8 py-1 px-8 text-gris bg-white rounded-md"> {props.recipeItem.type.label} </span>
      </div>
      <div className="cursor-pointer h-48">
        {props.isVisibleIntersection && <img
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
  );
};

export default RecipeCardTop;