import image from "../../../assets/accueilHC.jpg";

const HomeBanner = () => {
  return (
    <div className="home__banner">
      <img src={image} alt="accueil" />
      <div>
        <h1>Bienvenue sur SHARY COOKING !</h1>
        <span>Venez ajouter votre grain de sel...</span>
      </div>
    </div>
  );
};

export default HomeBanner;