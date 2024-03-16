import { useEffect } from "react";
import RecipeContainer from "../../Components/RecipeContainer/RecipeContainer";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { updateRecipe } from "../../Store/Reducers/recipeReducer";
import { useFetchGet } from "../../Hooks/api.hook";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";

interface Props {
  mine: boolean
  favourite: boolean
}

const Recipes = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");
  const usersData = useFetchGet<RestrictedUser[]>("/users");

  useEffect(() => {
    ingredientData.loaded && usersData.loaded &&
      dispatch(updateSecondaryTables({
        users: usersData.data,
        ingData: ingredientData.data
      }))
    // eslint-disable-next-line
  }, [ingredientData.loaded, usersData.loaded])

  useEffect(() => {
    dispatch(updateRecipe({
      editable: props.mine,
      favourite: props.favourite,
    }));
    return () => {
      dispatch(updateRecipe({
        editable: false,
        favourite: false,
      }));
    }
    // eslint-disable-next-line
  }, [props.favourite, props.mine]);

  return (
    <>
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
    </>
  );
};

Recipes.defaultProps = {
  mine: false,
  favourite: false,
};

export default Recipes;
