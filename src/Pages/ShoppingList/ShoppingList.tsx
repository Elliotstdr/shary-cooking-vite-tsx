import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import ModalChooseRecipe from "../../Components/Modal/ModalChooseRecipe";
import ModalShoppingResult from "../../Components/Modal/ModalShoppingResult";
import ShoppingHome from "./components/ShoppingHome";
import ShoppingListContainer from "./components/ShoppingListContainer";

const ShoppingList = () => {
  const recipeR = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();

  const [visibleRecipeContainer, setVisibleRecipeContainer] = useState(false);
  const [visibleList, setVisibleList] = useState<boolean>(false);
  const [stringShopping, setStringShopping] = useState("");

  useEffect(() => {
    return () => {
      dispatch(updateRecipe({
        chosenRecipes: [],
      }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="my-[5%] mx-auto flex-center">
        {recipeR.chosenRecipes.length > 0 ? (
          <ShoppingListContainer
            setVisibleRecipeContainer={setVisibleRecipeContainer}
            setStringShopping={setStringShopping}
            setVisibleList={setVisibleList}
          ></ShoppingListContainer>
        ) : (
          <ShoppingHome setVisibleRecipeContainer={setVisibleRecipeContainer}></ShoppingHome>
        )}
      </div>
      <Footer></Footer>
      {visibleRecipeContainer && (
        <ModalChooseRecipe
          visible={visibleRecipeContainer}
          setVisible={setVisibleRecipeContainer}
        ></ModalChooseRecipe>
      )}
      {visibleList && stringShopping.length > 0 && (
        <ModalShoppingResult
          visible={visibleList}
          setVisible={setVisibleList}
          stringShopping={stringShopping}
          setStringShopping={setStringShopping}
        ></ModalShoppingResult>
      )}
    </>
  );
};

export default ShoppingList;
