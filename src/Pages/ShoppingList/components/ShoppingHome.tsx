import Bouton from "../../../Components/ui/Bouton/Bouton";
import image from "../../../assets/HCDarkOp.jpg";

type Props = {
  setVisibleRecipeContainer: React.Dispatch<React.SetStateAction<boolean>>,
}

const ShoppingHome = (props: Props) => {
  return (
    <div className="w-160 h-100 my-20 flex-center relative">
      <img src={image} alt="background shopping" className="absolute size-full object-cover rounded-lg" />
      <Bouton
        btnTexte={"Choisir mes recettes"}
        btnAction={() => props.setVisibleRecipeContainer(true)}
        className="!text-white !text-xl hover:!border-white hover:!border"
        afterClassName="!bg-green"
      ></Bouton>
    </div>
  );
};

export default ShoppingHome;