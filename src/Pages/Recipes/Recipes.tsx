import RecipeContainer from "../../Components/RecipeContainer/RecipeContainer";
import { useDispatch } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { useFetchGet } from "../../Hooks/api.hook";
import { useEffect } from "react";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";

const Recipes = () => {
  const dispatch = useDispatch();
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  useEffect(() => {
    ingredientData.loaded && ingredientData.data &&
      dispatch(updateSecondaryTables({
        ingData: ingredientData.data
      }))
  }, [ingredientData.loaded, ingredientData.data])

  return (
    <div className="recipes">
      <NavBar></NavBar>
      <RecipeContainer></RecipeContainer>
      <Footer></Footer>
    </div>
  );
};

export default Recipes;
