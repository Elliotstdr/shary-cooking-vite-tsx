import image from "src/assets/accueilHC.jpg";

const HomeBanner = () => {
  return (
    <div className="font-dilgante relative h-[600px]">
      <img src={image} alt="accueil" className="h-[600px] w-full object-cover brightness-75" />
      <div className="w-11/12 text-white absolute-centering">
        <h1 className="mt-0 mb-4 font-bold uppercase text-5xl tablet:text-6xl">Bienvenue sur SHARY COOKING !</h1>
        <span className=" text-base tablet:text-2xl">Venez ajouter votre grain de sel...</span>
      </div>
    </div>
  );
};

export default HomeBanner;