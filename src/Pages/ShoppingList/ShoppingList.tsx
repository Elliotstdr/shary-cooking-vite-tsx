import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import ShoppingHome from "./components/ShoppingHome";
import ShoppingContainer from "./components/ShoppingContainer";
import ModalChooseRecipe from "./components/ModalChooseRecipe";

const ShoppingList = () => {
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const [visibleRecipeContainer, setVisibleRecipeContainer] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(updateRecipe({
        chosenRecipes: []
      }));
    }
  }, []);

  return (
    <div id="shopping" className="flex-center my-8 mx-auto">
      {recipe.chosenRecipes.length === 0 ? (
        <ShoppingHome
          setVisibleRecipeContainer={setVisibleRecipeContainer}
        ></ShoppingHome>
      ) : (
        <ShoppingContainer
          setVisibleRecipeContainer={setVisibleRecipeContainer}
        ></ShoppingContainer>
      )}
      {visibleRecipeContainer && (
        <ModalChooseRecipe
          visible={visibleRecipeContainer}
          setVisible={setVisibleRecipeContainer}
        ></ModalChooseRecipe>
      )}
    </div>
  );
};

export default ShoppingList;
