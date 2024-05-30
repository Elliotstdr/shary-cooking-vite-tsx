import { useState } from "react";
import Bouton from "../../Components/ui/Bouton";
import image from "src/assets/HCDarkOp.jpg";
import ModalChooseRecipe from "../../Components/Modal/ModalChooseRecipe";

const Empty = () => {
  const [visibleChooseRecipe, setVisibleChooseRecipe] = useState(false);

  return (
    <>
      <div className="w-160 h-100 my-20 flex-center relative">
        <img src={image} alt="background shopping" className="absolute size-full object-cover rounded-lg" />
        <Bouton
          btnAction={() => setVisibleChooseRecipe(true)}
          type="nav"
        >Créer une liste de courses</Bouton>
      </div>
      {visibleChooseRecipe &&
        <ModalChooseRecipe
          visible={visibleChooseRecipe}
          setVisible={setVisibleChooseRecipe}
        ></ModalChooseRecipe>
      }
    </>
  );
};

export default Empty;