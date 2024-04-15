import { useEffect, useState } from "react";
import "./ShoppingList.scss";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import ShoppingHome from "./components/ShoppingHome";
import ShoppingContainer from "./components/ShoppingContainer";
import ModalChooseRecipe from "./components/ModalChooseRecipe";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";
import { useFetchGet } from "../../Hooks/api.hook";

const ShoppingList = () => {
  const recipeR = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const [visibleRecipeContainer, setVisibleRecipeContainer] = useState(false);
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  useEffect(() => {
    ingredientData.loaded && ingredientData.data &&
      dispatch(updateSecondaryTables({
        ingData: ingredientData.data
      }))
  }, [ingredientData.loaded, ingredientData.data])

  useEffect(() => {
    return () => {
      dispatch(updateRecipe({
        chosenRecipes: []
      }));
    }
  }, []);

  return (
    <div className="shopping">
      <NavBar></NavBar>
      <div className="shoppingList_container">
        {recipeR.chosenRecipes.length === 0 ? (
          <ShoppingHome
            setVisibleRecipeContainer={setVisibleRecipeContainer}
          ></ShoppingHome>
        ) : (
          <ShoppingContainer
            setVisibleRecipeContainer={setVisibleRecipeContainer}
          ></ShoppingContainer>
        )}
      </div>
      <Footer></Footer>
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
