import Bouton from "../../../Components/ui/Bouton/Bouton";
import image from "../../../assets/HCDarkOp.jpg";

type Props = {
  setVisibleRecipeContainer: React.Dispatch<React.SetStateAction<boolean>>,
}

const ShoppingHome = (props: Props) => {
  return (
    <div className="shoppingList_container_home">
      <img src={image} alt="background shopping" />
      <Bouton
        btnTexte={"Choisir mes recettes"}
        btnAction={() => props.setVisibleRecipeContainer(true)}
      ></Bouton>
    </div>
  );
};

export default ShoppingHome;