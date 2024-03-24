import RecipeContainer from "../../Components/RecipeContainer/RecipeContainer";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { useFetchGet } from "../../Hooks/api.hook";
import { useEffect } from "react";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";

interface Props {
  mine: boolean
  favourite: boolean
}

const Recipes = (props: Props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  useEffect(() => {
    ingredientData.loaded && ingredientData.data &&
      dispatch(updateSecondaryTables({
        ingData: ingredientData.data
      }))
    // eslint-disable-next-line
  }, [ingredientData.loaded, ingredientData.data])

  return (
    <div className="recipes">
      <NavBar></NavBar>
      <RecipeContainer
        dataToCall={
          props.favourite
            ? `/recipes/user_fav/${auth.userConnected?.id}`
            : props.mine
              ? `/recipes/user/${auth.userConnected?.id}`
              : "/recipes"
        }
      ></RecipeContainer>
      <Footer></Footer>
    </div>
  );
};

Recipes.defaultProps = {
  mine: false,
  favourite: false,
};

export default Recipes;
