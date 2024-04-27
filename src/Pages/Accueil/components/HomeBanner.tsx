import image from "../../../assets/accueilHC.jpg";

const HomeBanner = () => {
  return (
    <div className="font-dilgante relative h-[600px]">
      <img src={image} alt="accueil" className="w-full h-[600px] object-cover brightness-75" />
      <div className="w-11/12 text-white absolute-centering">
        <h1 className="text-5xl mb-4 font-bold uppercase tablet:text-6xl">Bienvenue sur SHARY COOKING !</h1>
        <span className="text-xl tablet:text-2xl">Venez ajouter votre grain de sel...</span>
      </div>
    </div>
  );
};

export default HomeBanner;