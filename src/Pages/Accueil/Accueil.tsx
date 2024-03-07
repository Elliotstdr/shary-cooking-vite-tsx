import { Key, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../Components/Login/Login";
import "./Accueil.scss";
import { useFetchGet, useFetchGetConditional } from "../../Hooks/api.hook";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import image from "../../assets/accueilHC.jpg";
import image2 from "../../assets/accueil_second.jpg";
import image3 from "../../assets/accueil_third.jpg";
import Bouton from "../../Utils/Bouton/Bouton";
import { useNavigate } from "react-router-dom";
import Loader from "../../Utils/Loader/loader";
import RecipeCard from "../../Components/RecipeContainer/RecipeCard/RecipeCard";
import { errorToast } from "../../Services/functions";
import { updateSecondaryTables } from "../../Store/Reducers/secondaryTablesReducer";

const Accueil = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipeUrl, setRecipeUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const recipesData = useFetchGet<Recipe[]>(recipeUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (auth.isConnected) {
      setRecipeUrl("/recipes");
    }
  }, [auth.isConnected]);

  useEffect(() => {
    recipesData.loaded && recipesData.data && setRecipes(recipesData.data)
    // eslint-disable-next-line
  }, [recipesData.loaded])

  const typesData = useFetchGetConditional<Type[]>("/types", secondaryTables.types);
  const unitsData = useFetchGetConditional<Unit[]>("/units", secondaryTables.units);
  const regimesData = useFetchGetConditional<Regime[]>("/regimes", secondaryTables.regimes);
  const ingredientTypeData = useFetchGetConditional<IngredientType[]>(
    "/ingredient_types",
    secondaryTables.ingTypes,
  );

  useEffect(() => {
    if (typesData.error || unitsData.error || regimesData.error || ingredientTypeData.error) {
      errorToast("Le site a rencontré une erreur technique, veuillez revenir dans quelques minutes")
      setIsError(true)
    }
    typesData.loaded &&
      unitsData.loaded &&
      regimesData.loaded &&
      ingredientTypeData.loaded &&
      dispatch(updateSecondaryTables({
        types: typesData.data,
        units: unitsData.data,
        regimes: regimesData.data,
        ingTypes: ingredientTypeData.data,
      }));
    // eslint-disable-next-line
  }, [
    typesData.loaded,
    unitsData.loaded,
    regimesData.loaded,
    ingredientTypeData.loaded,
  ]);

  return (
    <div className="accueil_container">
      {auth.isConnected && !isError ? (
        <div className="accueil">
          <NavBar></NavBar>
          <div className="accueil_connected">
            <div className="first block">
              <img src={image} alt="accueil" />
              <div>
                <h1>Bienvenue sur SHARY COOKING !</h1>
                <span>Venez ajouter votre grain de sel...</span>
              </div>
            </div>
            <div className="second block">
              <div className="second_text">
                <span>
                  Partagez vos meilleures recettes, donnez vos ingrédients
                  secrets !
                </span>
                <Bouton
                  btnTexte={"Créer une recette"}
                  btnAction={() => navigate("/create")}
                ></Bouton>
              </div>
              <img src={image2} alt="accueil" />
            </div>
            <div className="fourth block">
              <h1>Les recettes au top !</h1>
              <div className="fourth_recipes">
                {recipes.length > 0 ? (
                  recipes
                    .sort(
                      (a: Recipe, b: Recipe) => b.savedByUsers.length - a.savedByUsers.length
                    )
                    .slice(0, 3)
                    .map((recipe: Recipe, index: Key) => (
                      <RecipeCard
                        key={index}
                        recipeItem={recipe}
                        setFilteredRecipes={setRecipes}
                      ></RecipeCard>
                    ))
                ) : (
                  <Loader></Loader>
                )}
              </div>
            </div>
            <div className="third block">
              <img src={image3} alt="accueil" />
              <div className="third_text">
                <span>On piocherait pas une petite recette pour ce soir ?</span>
                <Bouton
                  btnTexte={"Voir la galerie de recettes"}
                  btnAction={() => navigate("/all")}
                ></Bouton>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
};

export default Accueil;
