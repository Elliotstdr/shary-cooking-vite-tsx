import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "../../Components/Login/Login";
import { useFetchGetConditional } from "../../Hooks/api.hook";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import image2 from "src/assets/accueil_second.jpg";
import image3 from "src/assets/accueil_third.jpg";
import { errorToast } from "../../Services/functions";
import HomeBanner from "./components/HomeBanner";
import TopRecipes from "./components/TopRecipes";
import SimpleBlock from "./components/SimpleBlock";

const Accueil = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const typesData = useFetchGetConditional("/types", "types");
  const unitsData = useFetchGetConditional("/units", "units");
  const regimesData = useFetchGetConditional("/regimes", "regimes");
  const ingredientTypeData = useFetchGetConditional("/ingredient_types", "ingTypes");

  useEffect(() => {
    if (typesData.error || unitsData.error || regimesData.error || ingredientTypeData.error) {
      errorToast("Le site a rencontré une erreur technique, veuillez revenir dans quelques minutes")
      setIsError(true)
    }
    // eslint-disable-next-line
  }, [typesData.loaded, unitsData.loaded, regimesData.loaded, ingredientTypeData.loaded]);

  return (
    <>
      {auth.isConnected && !isError ? (
        <>
          <NavBar></NavBar>
          <div id="accueil">
            <HomeBanner />
            <SimpleBlock
              image={image2}
              redirect="/create"
              text="Partagez vos meilleures recettes, donnez vos ingrédients secrets !"
              btnText="Créer une recette"
              reverse
            ></SimpleBlock>
            <TopRecipes />
            <SimpleBlock
              image={image3}
              redirect="/all"
              text="On piocherait pas une petite recette pour ce soir ?"
              btnText="Voir la galerie de recettes"
            ></SimpleBlock>
          </div>
          <Footer></Footer>
        </>
      ) : (
        <Login></Login>
      )}
    </>
  );
};

export default Accueil;
