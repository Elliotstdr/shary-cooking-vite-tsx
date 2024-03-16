import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  recipesData: Recipe[] | null
  setStartData: React.Dispatch<React.SetStateAction<Recipe[]>>
}

const ShoppingCheckboxes = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [boxFavorites, setBoxFavorites] = useState(false);
  const [boxMine, setBoxMine] = useState(false);

  useEffect(() => {
    if (props.recipesData) {
      let tempArray = [...props.recipesData];
      if (boxFavorites) {
        tempArray = tempArray.filter((recipe) =>
          recipe.savedByUsers.some(
            (element: RestrictedUser) => element.id === auth.userConnected?.id
          )
        );
      }
      if (boxMine) {
        tempArray = tempArray.filter(
          (recipe) => recipe.postedByUser.id === auth.userConnected?.id
        );
      }
      props.setStartData(tempArray);
    }
    // eslint-disable-next-line
  }, [boxFavorites, boxMine]);

  return (
    <div className="mt-8 flex items-center justify-center">
      <Checkbox
        onChange={(e) => setBoxFavorites(e.checked ?? false)}
        checked={boxFavorites}
      ></Checkbox>
      <span className="mr-4 ml-1">Favoris</span>
      <Checkbox
        onChange={(e) => setBoxMine(e.checked ?? false)}
        checked={boxMine}
      ></Checkbox>
      <span className="mr-4 ml-1">Mes recettes</span>
    </div>
  );
};

export default ShoppingCheckboxes;