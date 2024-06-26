import image from "src/assets/HCDarkOp.jpg";

const HomeBanner = () => {
  return (
    <div className="font-dilgante relative h-150">
      <img src={image} alt="accueil" className="w-full h-150 object-cover" />
      <div className="w-11/12 text-white absolute-centering">
        <h1 className="text-5xl mb-8 font-bold uppercase tablet:text-[4rem]">Bienvenue sur SHARY COOKING !</h1>
        <span className="text-xl tablet:text-2xl">Venez ajouter votre grain de sel...</span>
      </div>
    </div>
  );
};

export default HomeBanner;