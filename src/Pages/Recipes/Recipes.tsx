import RecipeContainer from "../../Components/RecipeContainer/RecipeContainer";
import { useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";

interface Props {
  mine: boolean
  favourite: boolean
}

const Recipes = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

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
