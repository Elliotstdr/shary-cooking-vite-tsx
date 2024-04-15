import { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import "./Accueil.scss";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import image2 from "../../assets/accueil_second.jpg";
import image3 from "../../assets/accueil_third.jpg";
import HomeBanner from "./components/HomeBanner";
import HomeRedirectBlock from "./components/HomeRedirectBlock";
import HomeTopRecipes from "./components/HomeTopRecipes";

const Accueil = () => {
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="accueil_container">
      {auth.isConnected ? (
        <div className="accueil">
          <NavBar></NavBar>
          <div className="accueil_connected">
            <HomeBanner></HomeBanner>
            <HomeRedirectBlock
              image={image2}
              text="Partagez vos meilleures recettes, donnez vos ingrédients secrets !"
              btnText="Créer une recette"
              to="/create"
              reverse
            ></HomeRedirectBlock>
            <HomeTopRecipes></HomeTopRecipes>
            <HomeRedirectBlock
              image={image3}
              text="On piocherait pas une petite recette pour ce soir ?"
              btnText="Voir la galerie de recettes"
              to="/all"
            ></HomeRedirectBlock>
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
