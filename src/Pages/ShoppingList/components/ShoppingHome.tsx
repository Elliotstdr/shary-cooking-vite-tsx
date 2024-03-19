import Bouton from "../../../Components/ui/Bouton/Bouton";
import image from "src/assets/HCDarkOp.jpg";

type Props = {
  setVisibleRecipeContainer: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingHome = ({ setVisibleRecipeContainer }: Props) => {
  return (
    <div className="w-[40rem] h-[25rem] my-20 flex-center relative">
      <img src={image} alt="background shopping" className="absolute size-full object-cover rounded-xl" />
      <Bouton
        className="!text-white !text-xl hover:border-solid hover:border-white after:!bg-green"
        btnTexte={"Choisir mes recettes"}
        btnAction={() => setVisibleRecipeContainer(true)}
      ></Bouton>
    </div>
  );
};

export default ShoppingHome;